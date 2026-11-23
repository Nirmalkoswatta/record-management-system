import { useState } from "react";
import { Link } from "react-router-dom";
import { SPECIES } from "../lib/api";

const emptyRecord = { petName: "", species: "Dog", petBreed: "", petAge: "", ownerName: "", ownerPhone: "", specialNotes: "" };

// Client-side checks mirror the Mongoose schema; the server stays the source of truth.
const validate = (v) => {
  const e = {};
  if (!v.petName.trim()) e.petName = "Pet name is required";
  if (!v.ownerName.trim()) e.ownerName = "Owner name is required";
  if (v.petAge !== "" && (Number(v.petAge) < 0 || Number(v.petAge) > 60)) e.petAge = "Enter an age between 0 and 60";
  if (v.ownerPhone && !/^[+\d][\d\s-]{6,19}$/.test(v.ownerPhone)) e.ownerPhone = "Phone number looks invalid";
  return e;
};

function Field({ id, label, error, hint, required, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-600" aria-hidden="true">*</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}

export default function RecordForm({ initial = emptyRecord, submitLabel, onSubmit, serverErrors = {} }) {
  // Old records may have null/missing fields; normalise so inputs stay controlled.
  const [values, setValues] = useState(() =>
    Object.fromEntries(Object.keys(emptyRecord).map((k) => [k, initial[k] ?? emptyRecord[k]]))
  );
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const allErrors = { ...serverErrors, ...errors };

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((errs) => ({ ...errs, [k]: undefined }));
  };
  const props = (k, hint) => ({
    id: k,
    name: k,
    value: values[k],
    onChange: set(k),
    "aria-invalid": allErrors[k] ? true : undefined,
    "aria-describedby": allErrors[k] ? `${k}-error` : hint ? `${k}-hint` : undefined,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="card divide-y divide-slate-200">
      <fieldset className="grid gap-5 p-6 sm:grid-cols-2">
        <legend className="sr-only">Pet details</legend>
        <h2 className="text-base font-semibold text-slate-900 sm:col-span-2">Pet details</h2>
        <Field id="petName" label="Pet name" error={allErrors.petName} required>
          <input className="input" autoComplete="off" maxLength={60} {...props("petName")} />
        </Field>
        <Field id="species" label="Species">
          <select className="input" {...props("species")}>
            {SPECIES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field id="petBreed" label="Breed" error={allErrors.petBreed}>
          <input className="input" maxLength={60} {...props("petBreed")} />
        </Field>
        <Field id="petAge" label="Age (years)" error={allErrors.petAge}>
          <input className="input" type="number" inputMode="decimal" min="0" max="60" step="0.5" {...props("petAge")} />
        </Field>
      </fieldset>

      <fieldset className="grid gap-5 p-6 sm:grid-cols-2">
        <legend className="sr-only">Owner details</legend>
        <h2 className="text-base font-semibold text-slate-900 sm:col-span-2">Owner details</h2>
        <Field id="ownerName" label="Owner name" error={allErrors.ownerName} required>
          <input className="input" autoComplete="name" maxLength={80} {...props("ownerName")} />
        </Field>
        <Field id="ownerPhone" label="Phone" error={allErrors.ownerPhone} hint="Optional, e.g. +94 77 123 4567">
          <input className="input" type="tel" autoComplete="tel" {...props("ownerPhone", true)} />
        </Field>
        <div className="sm:col-span-2">
          <Field id="specialNotes" label="Special notes" error={allErrors.specialNotes} hint="Allergies, medication, behaviour…">
            <textarea className="input min-h-[112px]" maxLength={1000} {...props("specialNotes", true)} />
          </Field>
        </div>
      </fieldset>

      <div className="flex flex-col-reverse gap-3 p-6 sm:flex-row sm:justify-end">
        <Link to="/view" className="btn-secondary">Cancel</Link>
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
