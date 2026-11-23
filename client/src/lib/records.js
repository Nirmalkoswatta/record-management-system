// Pure helpers for the records list (no React), so they can be tested with plain node.

// shortcut: filters/sorts in the browser over the full list; move to server-side query + pagination past a few thousand records.
export function filterAndSort(records, { query = "", species = "All", sort = "newest" }) {
  const q = query.trim().toLowerCase();
  const out = records.filter(
    (r) =>
      (species === "All" || (r.species ?? "Other") === species) &&
      (!q || [r.petName, r.ownerName, r.petBreed, r.ownerPhone].some((v) => v?.toLowerCase().includes(q)))
  );
  const by = {
    newest: (a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""),
    name: (a, b) => a.petName.localeCompare(b.petName),
    owner: (a, b) => a.ownerName.localeCompare(b.ownerName),
    age: (a, b) => (a.petAge ?? Infinity) - (b.petAge ?? Infinity),
  };
  return out.sort(by[sort] ?? by.newest);
}

export function stats(records, now = Date.now()) {
  const ages = records.map((r) => r.petAge).filter((a) => typeof a === "number");
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  return {
    total: records.length,
    owners: new Set(records.map((r) => r.ownerName.trim().toLowerCase())).size,
    avgAge: ages.length ? Math.round((ages.reduce((s, a) => s + a, 0) / ages.length) * 10) / 10 : null,
    thisWeek: records.filter((r) => r.createdAt && Date.parse(r.createdAt) >= weekAgo).length,
  };
}

const CSV_COLUMNS = ["petName", "species", "petBreed", "petAge", "ownerName", "ownerPhone", "specialNotes", "createdAt"];

// Quote every cell; prefix formula-looking cells so Excel/Sheets won't execute them (CSV injection).
const cell = (v) => {
  let s = v == null ? "" : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export const toCsv = (records) =>
  [CSV_COLUMNS.join(","), ...records.map((r) => CSV_COLUMNS.map((c) => cell(r[c])).join(","))].join("\r\n");
