const GA4_BASE = "https://analyticsdata.googleapis.com/v1beta";

function ga4Headers(accessToken) {
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
}

export async function listGA4Properties(accessToken) {
  const res = await fetch(
    "https://analyticsadmin.googleapis.com/v1beta/accountSummaries",
    { headers: ga4Headers(accessToken) }
  );
  if (!res.ok) throw new Error("GA4 list properties error");
  const data = await res.json();
  const properties = [];
  for (const account of data.accountSummaries || []) {
    for (const prop of account.propertySummaries || []) {
      properties.push({
        id: prop.property.replace("properties/", ""),
        name: prop.displayName,
        accountName: account.displayName,
      });
    }
  }
  return properties;
}

async function runReport({ accessToken, propertyId, dimensions, metrics, startDate, endDate, limit = 500 }) {
  const body = {
    dateRanges: [{ startDate, endDate }],
    dimensions: dimensions.map(name => ({ name })),
    metrics: metrics.map(name => ({ name })),
    limit,
  };
  const res = await fetch(
    `${GA4_BASE}/properties/${propertyId}:runReport`,
    { method: "POST", headers: ga4Headers(accessToken), body: JSON.stringify(body) }
  );
  if (!res.ok) throw new Error("GA4 runReport error");
  return res.json();
}

export async function getSessionOverview({ accessToken, propertyId, startDate, endDate }) {
  const data = await runReport({
    accessToken, propertyId,
    dimensions: [],
    metrics: ["sessions", "bounceRate", "averageSessionDuration", "conversions", "totalUsers"],
    startDate, endDate,
  });
  const row = data.rows?.[0];
  if (!row) return null;
  const [sessions, bounceRate, avgDuration, conversions, users] = row.metricValues.map(v => parseFloat(v.value));
  return {
    sessions: Math.round(sessions),
    bounceRate: +(bounceRate * 100).toFixed(1),
    avgDuration: Math.round(avgDuration),
    conversions: Math.round(conversions),
    users: Math.round(users),
  };
}

export async function getLandingPageMetrics({ accessToken, propertyId, startDate, endDate }) {
  const data = await runReport({
    accessToken, propertyId,
    dimensions: ["landingPagePlusQueryString"],
    metrics: ["sessions", "bounceRate", "averageSessionDuration", "conversions"],
    startDate, endDate, limit: 500,
  });
  return (data.rows || []).map(row => {
    const [sessions, bounceRate, avgDuration, conversions] = row.metricValues.map(v => parseFloat(v.value));
    return {
      page: row.dimensionValues[0].value,
      sessions: Math.round(sessions),
      bounceRate: +(bounceRate * 100).toFixed(1),
      avgDuration: Math.round(avgDuration),
      conversions: Math.round(conversions),
    };
  });
}

export function mergeGscGa4(gscPages, ga4Pages) {
  const ga4Map = {};
  for (const p of ga4Pages) {
    ga4Map[p.page.split("?")[0]] = p;
  }
  return gscPages.map(gscPage => ({
    ...gscPage,
    sessions: ga4Map[gscPag
