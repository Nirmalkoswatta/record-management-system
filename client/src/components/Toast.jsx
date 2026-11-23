import { createContext, useCallback, useContext, useState } from "react";
import Icon from "./Icon";

const ToastContext = createContext(() => {});
// eslint-disable-next-line react-refresh/only-export-components -- hook belongs with its provider
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const dismiss = (id) => setToasts((t) => t.filter((x) => x.id !== id));
  const toast = useCallback((message, type = "success") => {
    const id = crypto.randomUUID();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => dismiss(id), 4000);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div aria-live="polite" className="fixed bottom-4 right-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`card flex items-start gap-3 p-4 ${t.type === "error" ? "border-red-200" : "border-emerald-200"}`}
          >
            <span className={t.type === "error" ? "text-red-600" : "text-emerald-600"}>
              <Icon name={t.type === "error" ? "alert" : "check"} />
            </span>
            <p className="flex-1 text-sm text-slate-700">{t.message}</p>
            <button
              className="-m-2 rounded p-2 text-slate-400 hover:text-slate-700"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
            >
              <Icon name="x" className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
