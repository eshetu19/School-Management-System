const Card = ({ children, title, className = "", onClick = null }) => {
  return (
    <div
      onClickCapture={onClick}
      className={`bg-white/95 border border-slate-200/80 shadow-glow rounded-[1.75rem] p-6 ${onClick ? "cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-transform duration-200" : ""} ${className}`}
    >
      {title && (
        <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
};
export default Card;
