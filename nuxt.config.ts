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
    // runtimeConfig: {
      // public: {
      //     google_analytics_id: process.env.google_analytics_id,
      //     production_mode: true
      // }
  // }
});