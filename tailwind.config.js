// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adicione esta linha
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
  corePlugins: {
    scrollbar: false, // Desabilita a geração de classes de barra de rolagem padrão
  },
}