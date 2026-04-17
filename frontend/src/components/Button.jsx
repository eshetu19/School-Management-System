const Button = ({
  onClick,
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-2xl font-semibold shadow-lg shadow-slate-900/10 transition duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50";
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-500 text-white hover:from-blue-500 hover:to-indigo-400 shadow-blue-500/20 hover:-translate-y-0.5",
    secondary:
      "bg-slate-700 text-white hover:bg-slate-600 shadow-slate-700/20 hover:-translate-y-0.5",
    success:
      "bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-500/20 hover:-translate-y-0.5",
    outline:
      "bg-transparent border border-slate-300 text-slate-900 hover:bg-slate-100 hover:-translate-y-0.5",
    danger:
      "bg-red-600 text-white hover:bg-red-500 shadow-red-500/20 hover:-translate-y-0.5",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };
  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass =
    disabled || loading ? "opacity-60 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${disabledClass} ${className}`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="h-5 w-5 rounded-full border-4 border-white/30 border-t-white animate-spin"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
export default Button;
