// // tailwind.config.js
// module.exports = {
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['var(--font-inter)', 'sans-serif'],
//         serif: ['var(--font-playfair)', 'serif'],
//       },
//       colors: {
//         // Paleta principal en tonos pasteles elegantes
//         primary: {
//           50: '#f4f9f7',
//           100: '#e5f2ef',
//           200: '#c4e4d9',
//           300: '#a1d5c3',
//           400: '#7ac6ac',
//           500: '#53b696',
//           600: '#399275',
//           700: '#2d7760',
//           800: '#255f4e',
//           900: '#1e4f41',
//         },
//         // Acentos en tonos pastel cálidos
//         secondary: {
//           50: '#fef7f7',
//           100: '#fdecea',
//           200: '#fbd0cc',
//           300: '#f9b3ac',
//           400: '#f5948a',
//           500: '#f1766a',
//           600: '#e85c4e',
//           700: '#d0473a',
//           800: '#b13c31',
//           900: '#96342a',
//         },
//         // Tono rosa pastel para detalles
//         rose: {
//           50: '#fef8fa',
//           100: '#fdedf2',
//           200: '#fbd0e0',
//           300: '#f8b3ce',
//           400: '#f594ba',
//           500: '#f174a6',
//           600: '#ec5491',
//           700: '#d9447d',
//           800: '#bc3b6c',
//           900: '#a3345e',
//         },
//         // Tono verde claro pastel complementario
//         mint: {
//           50: '#f4fbf7',
//           100: '#e3f7ec',
//           200: '#c2efd7',
//           300: '#9ee6c1',
//           400: '#71dca6',
//           500: '#4ed28e',
//           600: '#31b773',
//           700: '#28925c',
//           800: '#22784c',
//           900: '#1d6640',
//         },
//         // Tonos neutros para textos y fondos
//         neutral: {
//           50: '#f9f9f9',
//           100: '#f0f0f0',
//           200: '#e4e4e4',
//           300: '#d6d6d6',
//           400: '#c2c2c2',
//           500: '#a3a3a3',
//           600: '#828282',
//           700: '#696969',
//           800: '#545454',
//           900: '#363636',
//         },
//       },
//       // Efectos y animaciones con Tailwind
//       boxShadow: {
//         'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
//         'soft-lg': '0 10px 30px rgba(0, 0, 0, 0.07)',
//         'soft-xl': '0 15px 50px rgba(0, 0, 0, 0.1)',
//         'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.03)',
//         'elegant': '0 20px 80px -20px rgba(0, 0, 0, 0.12)',
//         'product': '0 15px 35px rgba(83, 182, 150, 0.15)',
//       },
//       animation: {
//         'float': 'float 6s ease-in-out infinite',
//         'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
//         'fade-in': 'fadeIn 0.6s ease-out forwards',
//         'slide-up': 'slideUp 0.8s ease-out forwards',
//         'slide-down': 'slideDown 0.8s ease-out forwards',
//         'slide-in-right': 'slideInRight 0.7s ease-out forwards',
//         'bounce-gentle': 'bounceGentle 2s infinite',
//       },
//       keyframes: {
//         float: {
//           '0%, 100%': { transform: 'translateY(0)' },
//           '50%': { transform: 'translateY(-10px)' },
//         },
//         fadeIn: {
//           '0%': { opacity: '0' },
//           '100%': { opacity: '1' },
//         },
//         slideUp: {
//           '0%': { transform: 'translateY(20px)', opacity: '0' },
//           '100%': { transform: 'translateY(0)', opacity: '1' },
//         },
//         slideDown: {
//           '0%': { transform: 'translateY(-20px)', opacity: '0' },
//           '100%': { transform: 'translateY(0)', opacity: '1' },
//         },
//         slideInRight: {
//           '0%': { transform: 'translateX(30px)', opacity: '0' },
//           '100%': { transform: 'translateX(0)', opacity: '1' },
//         },
//         bounceGentle: {
//           '0%, 100%': { transform: 'translateY(-2%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
//           '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
//         },
//       },
//       // Efectos de degradado y fondos
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//         'gradient-soft': 'linear-gradient(120deg, var(--tw-gradient-stops))',
//         'pattern-dots': 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
//         'circles-light': 'url("/img/bg-circles.svg")',
//       },
//       backgroundSize: {
//         'auto': 'auto',
//         'cover': 'cover',
//         'contain': 'contain',
//         'dots-sm': '16px 16px',
//         'dots-lg': '30px 30px',
//       },
//       // Bordes redondeados más suaves
//       borderRadius: {
//         'soft': '0.375rem',
//         'medium': '0.5rem',
//         'large': '1rem',
//         'xl': '1.5rem',
//         '2xl': '2rem',
//       },
//       // Espaciados adicionales
//       spacing: {
//         '72': '18rem',
//         '84': '21rem',
//         '96': '24rem',
//         '128': '32rem',
//       },
//     },
//   },
//   plugins: [
//     require('@tailwindcss/forms')({
//       strategy: 'class',
//     }),
//   ],
// };

// // app/globals.css
// @tailwind base;
// @tailwind components;
// @tailwind utilities;

// @layer base {
//   html {
//     font - family: var(--font - inter), system - ui, sans - serif;
//     scroll - behavior: smooth;
//   }

//   body {
//     @apply bg - primary - 50 text - neutral - 800 antialiased;
//   }

//   h1, h2, h3, h4, h5, h6 {
//     @apply font - serif;
//   }

//   /* Estilos personalizados para scrollbar */
//   :: -webkit - scrollbar {
//     width: 8px;
//     height: 8px;
//   }

//   :: -webkit - scrollbar - track {
//     @apply bg - primary - 50;
//   }

//   :: -webkit - scrollbar - thumb {
//     @apply bg - primary - 300 rounded - full;
//   }

//   :: -webkit - scrollbar - thumb:hover {
//     @apply bg - primary - 400;
//   }
// }

// @layer components {
//   /* Botones personalizados */
//   .btn - primary {
//     @apply inline - flex items - center justify - center px - 6 py - 3 rounded - full text - white bg - primary - 600 hover: bg - primary - 700 transition - colors font - medium;
//   }

//   .btn - secondary {
//     @apply inline - flex items - center justify - center px - 6 py - 3 rounded - full text - primary - 700 bg - primary - 100 hover: bg - primary - 200 transition - colors font - medium;
//   }

//   .btn - outline {
//     @apply inline - flex items - center justify - center px - 6 py - 3 rounded - full border border - primary - 600 text - primary - 600 hover: bg - primary - 50 transition - colors font - medium;
//   }

//   .btn - ghost {
//     @apply inline - flex items - center justify - center px - 4 py - 2 rounded - full text - primary - 600 hover: bg - primary - 50 transition - colors font - medium;
//   }

//   /* Tarjetas con efectos */
//   .card {
//     @apply bg - white rounded - xl shadow - soft transition - shadow hover: shadow - soft - lg p - 6;
//   }

//   .card - hover {
//     @apply transform transition - transform duration - 300 hover: -translate - y - 1;
//   }

//   /* Campos de formulario estilizados */
//   .form - input {
//     @apply block w - full rounded - lg border - neutral - 300 shadow - sm focus: border - primary - 400 focus:ring focus: ring - primary - 300 focus: ring - opacity - 50;
//   }

//   .form - label {
//     @apply block text - sm font - medium text - neutral - 700 mb - 1;
//   }

//   /* Estilos para el hero */
//   .hero - gradient {
//     @apply bg - gradient - to - r from - primary - 900 / 90 to - primary - 800 / 80;
//   }

//   /* Efectos de texto */
//   .text - gradient {
//     @apply bg - clip - text text - transparent bg - gradient - to - r from - primary - 600 to - secondary - 500;
//   }

//   /* Divider con estilo */
//   .divider {
//     @apply h - px bg - gradient - to - r from - transparent via - primary - 200 to - transparent my - 8;
//   }

//   /* Animaciones de entrada */
//   .animate - on - scroll {
//     @apply opacity - 0 translate - y - 4 transition - all duration - 700;
//   }

//   .animate - on - scroll.is - visible {
//     @apply opacity - 100 translate - y - 0;
//   }
// }

// /* Swiper custom styles */
// .swiper - pagination - bullet {
//   @apply w - 3 h - 3 bg - primary - 200 opacity - 70;
// }

// .swiper - pagination - bullet - active {
//   @apply bg - primary - 500 opacity - 100;
// }

// /* Animate background shapes */
// .bg - shape {
//   animation: float 8s ease -in -out infinite;
//   opacity: 0.5;
// }

// .bg - shape: nth - child(2) {
//   animation - delay: 1s;
// }

// .bg - shape: nth - child(3) {
//   animation - delay: 2s;
// }

// /* Subtle background patterns */
// .pattern - dots {
//   background - image: radial - gradient(circle, rgba(83, 182, 150, 0.1) 1px, transparent 1px);
//   background - size: 20px 20px;
// }

// /* Smooth loading transitions */
// .page - transition - enter {
//   opacity: 0;
// }

// .page - transition - enter - active {
//   opacity: 1;
//   transition: opacity 300ms;
// }

// .page - transition - exit {
//   opacity: 1;
// }

// .page - transition - exit - active {
//   opacity: 0;
//   transition: opacity 300ms;
// }

// /* Glassmorphism effect */
// .glass - effect {
//   @apply backdrop - blur - md bg - white / 30 border border - white / 20;
// }

// /* Products grid optimal layout */
// .products - grid {
//   display: grid;
//   grid - template - columns: repeat(auto - fill, minmax(280px, 1fr));
//   gap: 1.5rem;
// }

// /* Animation for hero elements */
// @keyframes floatImage {
//   0 %, 100 % {
//     transform: translateY(0) rotate(0deg);
//   };
//   50 % {
//     transform: translateY(-12px) rotate(1deg);
//   };
// }

// .floating - image {
//   animation: floatImage 6s ease -in -out infinite;
// }