const LoadingSpinner = ({ size = "md", fullScreen = false }) => {
  const sizes = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };
  const spinner = (
    <div className="flex justify-center items-center">
      <div
        className={`${sizes[size]} border-4 border-slate-200/30 border-t-blue-500 rounded-full animate-spin`}
      />
    </div>
  );
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }
  return spinner;
};
export default LoadingSpinner;
