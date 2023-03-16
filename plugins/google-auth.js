import vue3GoogleLogin from 'vue3-google-login'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(vue3GoogleLogin, {
        clientId: '547722748340-bdqosldme9fudabda8879gdsgeja8h82.apps.googleusercontent.com'
    });  
});