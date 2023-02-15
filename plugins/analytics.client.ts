import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
    // const config = useRuntimeConfig()
    // if(config.public.production_mode) {
        nuxtApp.vueApp.use(VueGtag, {
            property: {
                id: "G-6EHHGXD4MD"
            }
        })
    // }
})
