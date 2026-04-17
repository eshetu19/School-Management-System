import { useEffect, useState } from "react";

const Alert = ({ type = "info", message, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const styles = {
    success: "border-emerald-500 bg-emerald-100 text-emerald-900",
    error: "border-rose-500 bg-rose-100 text-rose-900",
    warning: "border-amber-500 bg-amber-100 text-amber-900",
    info: "border-blue-500 bg-blue-100 text-blue-900",
  };

  const icons = {
    success: "✓",
    error: "✗",
    warning: "⚠",
    info: "ℹ",
  };

  return (
    <div
      className={`fixed top-24 right-4 z-50 w-full max-w-sm rounded-3xl border-l-4 p-4 shadow-2xl shadow-black/20 ${styles[type]} animate-slideIn`}
    >
      <div className="flex items-start gap-3">
        <span className="mt-1 text-2xl">{icons[type]}</span>
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-900">
            {type}
          </p>
          <p className="text-sm text-slate-700">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
          className="ml-auto text-slate-500 transition hover:text-slate-700"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Alert;
