<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script>
// import { store } from '@/plugins/vuex.js'
// import { darkModeKey, styleKey } from '@/config.js'

export default {
  data() {
    return {
    }
  },
  mounted() {
    const currentStyle = 'white'

    this.$store.dispatch('setStyle', currentStyle)

    
    
    // const currentStoredDarkMode = typeof localStorage !== 'undefined' && localStorage[darkModeKey] === '1'
    
    // if ((!currentStoredDarkMode && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) || currentStoredDarkMode) {
    //   store.dispatch('setDarkMode', true)
    // }
  }
}

</script>