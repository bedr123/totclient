// import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
    // modules: [
    //   '@nuxtjs/google-analytics'
    // ],
    // googleAnalytics: {
    //   // Options
    // }
});