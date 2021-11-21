module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#738047",
        lightPrimary: "#A4B375",
        slightPrimary: "#DFE4CE",
        heavyPrimaty: "#474f2c",
        slightRedPrimary: "#F7D4DD",
        heavyRedPrimary: "#8C3046",
      },
      backgroundImage: {
        bikeBg: "url('/bike.svg')",
      },
      animation: {
        jump: "jump 0.6s infinite alternate",
      },
      keyframes: {
        jump: {
          to: {
            transform: "translate3d(0, -10px, 0)",
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
