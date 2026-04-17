import { useEffect } from "react";
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showConfirmButtons = false,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "primary",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  if (!isOpen) return null;
  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[90vw]",
  };
  const confirmStyles = {
    primary: " bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
  };
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className={`${sizes[size]} w-full mx-4 bg-white rounded-3xl shadow-2xl shadow-slate-900/20 transform transition-all`}
      >
        {/* header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 focus:outline-none text-3xl leading-none"
          >
            ×
          </button>
        </div>
        {/* Body */}
        <div className="px-6 py-5 max-h-[85vh] overflow-y-auto">{children}</div>
        {/* footer */}
        {(showConfirmButtons || onConfirm) && (
          <div className="flex flex-wrap justify-end gap-3 px-6 py-4 border-t border-slate-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-700 bg-slate-100 rounded-2xl hover:bg-slate-200 transition"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                if (onConfirm) onConfirm();
                onClose();
              }}
              className={`px-4 py-2 rounded-2xl transition ${confirmStyles[confirmVariant]}`}
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Modal;
