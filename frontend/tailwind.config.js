export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 25px 60px rgba(15, 23, 42, 0.12)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top, rgba(59, 130, 246, 0.16), transparent 28%), linear-gradient(180deg, #0f172a 0%, #020617 100%)",
      },
      keyframes: {
        slideIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        slideIn: "slideIn .22s ease-out forwards",
      },
    },
  },
};
