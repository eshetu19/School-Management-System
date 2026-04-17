const StudentAvatar = ({ name, photoUrl = null, size = "md", className = "" }) => {
  const getInitials = () => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-2xl"
  };
  
  const colors = [
    "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500",
    "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-orange-500"
  ];
  
  const getColorFromName = () => {
    const index = name.length % colors.length;
    return colors[index];
  };
  
  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={name}
        className={`${sizes[size]} rounded-full object-cover ${className}`}
      />
    );
  }
  
  return (
    <div
      className={`
        ${sizes[size]} ${getColorFromName()} rounded-full flex items-center justify-center text-white font-semibold ${className}`
      }
    >
      {getInitials()}
    </div>
  );
};

export default StudentAvatar;