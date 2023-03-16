// import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      script: [
        {
          src: 'https://accounts.google.com/gsi/client',
        },
        {
          src: "https://testoftimes.com/fb-sdk.js"
        }
      ],
    }
  }
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