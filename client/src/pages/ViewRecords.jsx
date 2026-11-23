import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import ConfirmDialog from "../components/ConfirmDialog";
import { useToast } from "../components/Toast";
import { deleteRecord, errorInfo, listRecords, SPECIES } from "../lib/api";
import { filterAndSort, stats, toCsv } from "../lib/records";

const speciesStyle = {
  Dog: "bg-amber-50 text-amber-800 ring-amber-200",
  Cat: "bg-violet-50 text-violet-800 ring-violet-200",
  Bird: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  Rabbit: "bg-pink-50 text-pink-800 ring-pink-200",
  Other: "bg-slate-100 text-slate-700 ring-slate-200",
};

const SpeciesBadge = ({ species = "Other" }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${speciesStyle[species] ?? speciesStyle.Other}`}>
    {species}
  </span>
);

const formatAge = (age) => (age == null ? "—" : `${age} ${age === 1 ? "yr" : "yrs"}`);

function StatCard({ icon, label, value }) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
        <Icon name={icon} />
      </span>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-2xl font-semibold tabular-nums text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function RowActions({ record, onDelete }) {
  return (
    <div className="flex justify-end gap-1">
      <Link to={`/update/${record._id}`} className="btn-icon" aria-label={`Edit ${record.petName}`} title="Edit">
        <Icon name="edit" className="h-4 w-4" />
      </Link>
      <button className="btn-icon hover:bg-red-50 hover:text-red-700" onClick={() => onDelete(record)}
        aria-label={`Delete ${record.petName}`} title="Delete">
        <Icon name="trash" className="h-4 w-4" />
      </button>
    </div>
  );
}

function PetRecordsTable() {
  const toast = useToast();
  const [records, setRecords] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [species, setSpecies] = useState("All");
  const [sort, setSort] = useState("newest");
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setStatus("loading");
    try {
      setRecords(await listRecords());
      setStatus("ready");
    } catch (e) {
      setError(errorInfo(e, "Failed to fetch pet records").message);
      setStatus("error");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const visible = useMemo(() => filterAndSort(records, { query, species, sort }), [records, query, species, sort]);
  const summary = useMemo(() => stats(records), [records]);
  const filtering = query.trim() || species !== "All";

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteRecord(toDelete._id);
      setRecords((rs) => rs.filter((r) => r._id !== toDelete._id));
      toast(`${toDelete.petName}'s record was deleted`);
      setToDelete(null);
    } catch (e) {
      toast(errorInfo(e, "Failed to delete pet record").message, "error");
    } finally {
      setDeleting(false);
    }
  };

  const exportCsv = () => {
    const url = URL.createObjectURL(new Blob([toCsv(visible)], { type: "text/csv;charset=utf-8" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `pet-records-${new Date().toISOString().slice(0, 10)}.csv` });
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Pet records</h1>
          <p className="mt-1 text-slate-600">Every patient and their owner in one place.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary" onClick={exportCsv} disabled={!visible.length}>
            <Icon name="download" className="h-4 w-4" /> Export CSV
          </button>
          <Link to="/add" className="btn-primary">
            <Icon name="plus" className="h-4 w-4" /> Add pet
          </Link>
        </div>
      </div>

      <section aria-label="Summary" className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon="paw" label="Total pets" value={status === "ready" ? summary.total : "—"} />
        <StatCard icon="users" label="Owners" value={status === "ready" ? summary.owners : "—"} />
        <StatCard icon="chart" label="Average age" value={summary.avgAge == null ? "—" : `${summary.avgAge} yrs`} />
        <StatCard icon="clock" label="Added this week" value={status === "ready" ? summary.thisWeek : "—"} />
      </section>

      <section aria-label="Records" className="card mt-6 overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <label htmlFor="search" className="sr-only">Search records</label>
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
              <Icon name="search" className="h-4 w-4" />
            </span>
            <input id="search" type="search" className="input pl-9" placeholder="Search pet, owner, breed or phone"
              value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className="flex gap-3">
            <div>
              <label htmlFor="species-filter" className="sr-only">Filter by species</label>
              <select id="species-filter" className="input" value={species} onChange={(e) => setSpecies(e.target.value)}>
                <option value="All">All species</option>
                {SPECIES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="sort" className="sr-only">Sort by</label>
              <select id="sort" className="input" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="newest">Newest first</option>
                <option value="name">Pet name A–Z</option>
                <option value="owner">Owner A–Z</option>
                <option value="age">Youngest first</option>
              </select>
            </div>
          </div>
        </div>

        {status === "loading" && (
          <ul aria-busy="true" aria-label="Loading records" className="divide-y divide-slate-100">
            {[0, 1, 2, 3].map((i) => (
              <li key={i} className="flex animate-pulse items-center gap-4 p-4">
                <div className="h-4 w-1/4 rounded bg-slate-200" />
                <div className="h-4 w-1/5 rounded bg-slate-100" />
                <div className="h-4 flex-1 rounded bg-slate-100" />
              </li>
            ))}
          </ul>
        )}

        {status === "error" && (
          <div role="alert" className="flex flex-col items-center gap-3 p-10 text-center">
            <span className="text-red-600"><Icon name="alert" className="h-8 w-8" /></span>
            <p className="font-medium text-slate-900">Couldn’t load records</p>
            <p className="text-sm text-slate-600">{error}</p>
            <button className="btn-secondary mt-2" onClick={load}>Try again</button>
          </div>
        )}

        {status === "ready" && visible.length === 0 && (
          <div className="flex flex-col items-center gap-3 p-10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <Icon name="paw" className="h-6 w-6" />
            </span>
            <p className="font-medium text-slate-900">{filtering ? "No records match your search" : "No pets yet"}</p>
            <p className="text-sm text-slate-600">
              {filtering ? "Try a different name or clear the filters." : "Add your first patient to get started."}
            </p>
            {filtering ? (
              <button className="btn-secondary mt-2" onClick={() => { setQuery(""); setSpecies("All"); }}>Clear filters</button>
            ) : (
              <Link to="/add" className="btn-primary mt-2"><Icon name="plus" className="h-4 w-4" /> Add pet</Link>
            )}
          </div>
        )}

        {status === "ready" && visible.length > 0 && (
          <>
            <p className="sr-only" aria-live="polite">{visible.length} records shown</p>

            {/* Desktop: table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th scope="col" className="px-4 py-3">Pet</th>
                    <th scope="col" className="px-4 py-3">Breed</th>
                    <th scope="col" className="px-4 py-3">Age</th>
                    <th scope="col" className="px-4 py-3">Owner</th>
                    <th scope="col" className="px-4 py-3">Notes</th>
                    <th scope="col" className="px-4 py-3 text-right"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visible.map((r) => (
                    <tr key={r._id} className="transition-colors hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-900">{r.petName}</span>
                          <SpeciesBadge species={r.species} />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{r.petBreed || "—"}</td>
                      <td className="px-4 py-3 tabular-nums text-slate-600">{formatAge(r.petAge)}</td>
                      <td className="px-4 py-3">
                        <div className="text-slate-900">{r.ownerName}</div>
                        {r.ownerPhone && (
                          <a href={`tel:${r.ownerPhone.replace(/\s/g, "")}`} className="text-xs text-brand-700 hover:underline">{r.ownerPhone}</a>
                        )}
                      </td>
                      <td className="max-w-xs px-4 py-3 text-slate-600">
                        <p className="line-clamp-2" title={r.specialNotes}>{r.specialNotes || "—"}</p>
                      </td>
                      <td className="px-4 py-2"><RowActions record={r} onDelete={setToDelete} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: cards */}
            <ul className="divide-y divide-slate-100 md:hidden">
              {visible.map((r) => (
                <li key={r._id} className="flex gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-slate-900">{r.petName}</span>
                      <SpeciesBadge species={r.species} />
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      {[r.petBreed, r.petAge != null && formatAge(r.petAge)].filter(Boolean).join(" · ") || "No breed or age"}
                    </p>
                    <p className="mt-1 text-sm text-slate-900">
                      {r.ownerName}
                      {r.ownerPhone && (
                        <> · <a href={`tel:${r.ownerPhone.replace(/\s/g, "")}`} className="text-brand-700 hover:underline">{r.ownerPhone}</a></>
                      )}
                    </p>
                    {r.specialNotes && <p className="mt-1 line-clamp-2 text-sm text-slate-500">{r.specialNotes}</p>}
                  </div>
                  <RowActions record={r} onDelete={setToDelete} />
                </li>
              ))}
            </ul>

            <p className="border-t border-slate-200 px-4 py-3 text-sm text-slate-500">
              Showing {visible.length} of {records.length} records
            </p>
          </>
        )}
      </section>

      <ConfirmDialog open={!!toDelete} title={`Delete ${toDelete?.petName ?? ""}?`} busy={deleting}
        onConfirm={confirmDelete} onCancel={() => setToDelete(null)}>
        This permanently removes the record for {toDelete?.petName} (owner {toDelete?.ownerName}). This can’t be undone.
      </ConfirmDialog>
    </>
  );
}

export default PetRecordsTable;
