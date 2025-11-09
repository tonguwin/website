/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

const withOpacityValue = (variable) => {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgb(var(${variable}) / ${opacityValue})`;
    }
    return `rgb(var(${variable}))`;
  };
};
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: withOpacityValue('--color-primary'),
        secondary: withOpacityValue('--color-secondary'),
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
}

// Main colors
// colors: {
//  secondary: "#131313",
//  primary: "#ebebeb",
// },

// /** @type {import('tailwindcss').Config} */
// const defaultTheme = require('tailwindcss/defaultTheme');

// module.exports = {
//   content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
//   theme: {
//     extend: {
//       colors: {
//         light: {
//           primary: '#ebebeb',
//           secondary: '#131313',
//         },
//         dark: {
//           primary: '#131313',
//           secondary: '#ebebeb',
//         },
//       },
//       fontFamily: {
//         sans: ['Inter', ...defaultTheme.fontFamily.sans],
//       },
//     },
//   },
//   plugins: [
//     function ({ addVariant }) {
//       addVariant('theme-light', '[data-theme="light"] &');
//       addVariant('theme-dark', '[data-theme="dark"] &');
//     },
//   ],
// };
