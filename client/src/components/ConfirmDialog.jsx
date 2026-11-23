import { useEffect, useRef } from "react";

// Native <dialog>: focus trap, Esc to close and backdrop come for free.
export default function ConfirmDialog({ open, title, children, confirmLabel = "Delete", busy, onConfirm, onCancel }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        onCancel();
      }}
      aria-labelledby="confirm-title"
      className="w-[calc(100%-2rem)] max-w-md rounded-xl p-0 shadow-xl"
    >
      <div className="p-6">
        <h2 id="confirm-title" className="text-lg font-semibold text-slate-900">{title}</h2>
        <div className="mt-2 text-sm text-slate-600">{children}</div>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button className="btn-secondary" onClick={onCancel} autoFocus>Cancel</button>
          <button className="btn-danger" onClick={onConfirm} disabled={busy}>
            {busy ? "Deleting…" : confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
