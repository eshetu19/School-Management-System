const DatePicker = ({
  label,
  name,
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
  error = "",
  required = false,
  disabled = false,
  minDate = null,
  maxDate = null,
  className = "",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type="date"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        min={minDate}
        max={maxDate}
        className={`
          w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 transition
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
          }
          ${disabled ? "bg-slate-100 cursor-not-allowed" : "bg-white"}
       `}
      />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default DatePicker;
