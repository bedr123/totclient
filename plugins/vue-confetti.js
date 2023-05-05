import VueConfetti from 'vue-confetti';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueConfetti);
  // Install the store instance as a plugin

});