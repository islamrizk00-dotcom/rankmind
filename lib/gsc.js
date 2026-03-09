const GSC_BASE = "https://searchconsole.googleapis.com/webmasters/v3";

function gscHeaders(accessToken) {
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
}

function encodeSite(siteUrl) {
  return encodeURIComponent(siteUrl);
}

export async function listSites(accessToken) {
  const res = await fetch(`${GSC_BASE}/sites`, {
    headers: gscHeaders(accessToken),
  });
  if (!res.ok) throw new Error("GSC listSites error");
  const data = await res.json();
  return (data.siteEntry || []).map(s => ({
    id: s.siteUrl,
    url: s.siteUrl,
    label: s.siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, ""),
    permissionLevel: s.permissionLevel,
  }));
}

export async function querySearchAnalytics({
  accessToken, siteUrl, startDate, endDate,
  dimensions = ["query"], rowLimit = 500, startRow = 0,
}) {
  const body = { startDate, endDate, dimensions, rowLimit, startRow, dataState: "all" };
  const res = await fetch(
    `${GSC_BASE}/sites/${encodeSite(siteUrl)}/searchAnalytics/query`,
    { method: "POST", headers: gscHeaders(accessToken), body: JSON.stringify(body) }
  );
  if (!res.ok) throw new Error("GSC query error");
  const data = await res.json();
  return data.rows || [];
}

export async function getKPIs({ accessToken, siteUrl, startDate, endDate, compareStart, compareEnd }) {
  const [currentRows, previousRows] = await Promise.all([
    querySearchAnalytics({ accessToken, siteUrl, startDate, endDate, dimensions: ["query"], rowLimit: 1000 }),
    querySearchAnalytics({ accessToken, siteUrl, startDate: compareStart, endDate: compareEnd, dimensions: ["query"], rowLimit: 1000 }),
  ]);

  function aggregate(rows) {
    let clicks = 0, impressions = 0, posSum = 0, posWeight = 0;
    for (const r of rows) {
      clicks += r.clicks || 0;
      impressions += r.impressions || 0;
      posSum += (r.position || 0) * (r.impressions || 1);
      posWeight += r.impressions || 1;
    }
    return {
      clicks, impressions,
      ctr: impressions > 0 ? +((clicks / impressions) * 100).toFixed(2) : 0,
      position: posWeight > 0 ? +(posSum / posWeight).toFixed(2) : 0,
    };
  }

  function pctChange(curr, prev) {
    if (!prev) return 0;
    return +(((curr - prev) / prev) * 100).toFixed(1);
  }

  const cur = aggregate(currentRows);
  const prv = aggregate(previousRows);

  return {
    clicks: cur.clicks,
    impressions: cur.impressions,
    ctr: cur.ctr,
    position: cur.position,
    clicksChange: pctChange(cur.clicks, prv.clicks),
    impressionsChange: pctChange(cur.impressions, prv.impressions),
    ctrChange: pctChange(cur.ctr, prv.ctr),
    positionChange: +(cur.position - prv.position).toFixed(2),
  };
}

export async function getQuickWins({ accessToken, siteUrl, startDate, endDate, minImpressions = 300 }) {
  const rows = await querySearchAnalytics({
    accessToken, siteUrl, startDate, endDate, dimensions: ["query"], rowLimit: 1000,
  });

  return rows
    .filter(r => r.position >= 8 && r.position <= 20 && r.impressions >= minImpressions)
    .map(r => {
      const ctr = r.ctr * 100;
      const opportunityScore = Math.min(100, Math.round(
        Math.min(40, (r.impressions / 1000) * 4) +
        Math.min(35, (r.position - 5) * 2.5) +
        Math.min(25, Math.max(0, 7.2 - ctr) * 2)
      ));
      return {
        query: r.keys[0],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: +ctr.toFixed(2),
        position: +r.position.toFixed(1),
        opportunityScore,
        estimatedUplift: Math.max(0, Math.round(r.impressions * 0.072 - r.clicks)),
      };
    })
    .sort((a, b) => b.opportunityScore - a.opportunityScore);
}

export async function getContentDecay({
  accessToken, siteUrl, currentStart, currentEnd, previousStart, previousEnd, dropThreshold = 25,
}) {
  const [curr, prev] = await Promise.all([
    querySearchAnalytics({ accessToken, siteUrl, startDate: currentStart, endDate: currentEnd, dimensions: ["page"], rowLimit: 1000 }),
    querySearchAnalytics({ accessToken, siteUrl, startDate: previousStart, endDate: previousEnd, dimensions: ["page"], rowLimit: 1000 }),
  ]);

  const prevMap = {};
  for (const r of prev) prevMap[r.keys[0]] = r.clicks;

  return curr
    .filter(r => {
      const peak = prevMap[r.keys[0]] || 0;
      return peak > 30 && r.clicks < peak && ((peak - r.clicks) / peak * 100) >= dropThreshold;
    })
    .map(r => {
      const peak = prevMap[r.keys[0]];
      const dropPct = (peak - r.clicks) / peak * 100;
      return {
        page: r.keys[0].replace(/^https?:\/\/[^/]+/, "") || "/",
        peak,
        current: r.clicks,
        drop: +(-dropPct).toFixed(1),
        severity: dropPct >= 60 ? "critical" : dropPct >= 40 ? "high" : dropPct >= 25 ? "medium" : "low",
      };
    })
    .sort((a, b) => a.drop - b.drop);
}

export async function getCannibalization({ accessToken, siteUrl, startDate, endDate }) {
  const rows = await querySearchAnalytics({
    accessToken, siteUrl, startDate, endDate, dimensions: ["query", "page"], rowLimit: 5000,
  });

  const map = {};
  for (const r of rows) {
    const [query, page] = r.keys;
    if (!map[query]) map[query] = {};
    const shortPage = page.replace(/^https?:\/\/[^/]+/, "") || "/";
    map[query][shortPage] = (map[query][shortPage] || 0) + r.clicks;
  }

  return Object.entries(map)
    .filter(([, pages]) => Object.keys(pages).length >= 2)
    .map(([keyword, pagesObj]) => {
      const pages = Object.keys(pagesObj);
      const topPage = pages.reduce((a, b) => pagesObj[a] >= pagesObj[b] ? a : b);
      return { keyword, pages, topPage };
    })
    .sort((a, b) => b.pages.length - a.pages.length)
    .slice(0, 50);
}
