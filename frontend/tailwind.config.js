module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors:{
        'lightgray' : '#1A1A1A',
        'bordergray' : '#222222',
        'eventgray' : '#404040',
        'peviewpagebckcol' : '#101010',
        'previewpageboxbckcl' : "#1F1F1F",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}


