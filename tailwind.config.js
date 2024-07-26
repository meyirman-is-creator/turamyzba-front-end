module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        primary: '#f5385d',
      },
      boxShadow: {
        'custom': '0px 6px 10px 0px rgba(130, 130, 130, 0.25)',
      },
    },
  },
  plugins: [],
};
