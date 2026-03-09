function fmt(date) {
  return date.toISOString().split("T")[0];
}

function subDays(d, n) {
  const date = new Date(d);
  date.setDate(date.getDate() - n);
  return date;
}

export function getDateRange(range) {
  const end = new Date();
  end.setDate(end.getDate() - 2);
  const days = { last7: 7, last28: 28, last90: 90, last6m: 180 }[range] ?? 90;
  return { start: fmt(subDays(end, days)), end: fmt(end) };
}

export function getCompareDateRange(range) {
  const days = { last7: 7, last28: 28, last90: 90, last6m: 180 }[range] ?? 90;
  const end = new Date();
  end.setDate(end.getDate() - 2);
  const compareEnd = subDays(end, days);
  const compareStart = subDays(compareEnd, days);
  return { compareStart: fmt(compareStart), compareEnd: fmt(compareEnd) };
}

export function getDecayDateRanges() {
  const end = new Date();
  end.setDate(end.getDate() - 2);
  return {
    currentStart:  fmt(subDays(end, 90)),
    currentEnd:    fmt(end),
    previousStart: fmt(subDays(end, 180)),
    previousEnd:   fmt(subDays(end, 91)),
  };
}
