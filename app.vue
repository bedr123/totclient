<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script>
import Cookie from 'js-cookie'

export default {
  data() {
    return {
    }
  },
  mounted() {
    const currentStyle = 'white'

    this.$store.dispatch('setStyle', currentStyle)

    if (localStorage.getItem('token')) {
      this.$store.commit("SET_TOKEN", localStorage.getItem('token'))
    }
    if (localStorage.getItem("user")) {
      this.$store.commit("SET_USER", JSON.parse(localStorage.getItem("user")))
      console.log(this.$store.getters.user)
    }
    
    // const currentStoredDarkMode = typeof localStorage !== 'undefined' && localStorage[darkModeKey] === '1'
    
    // if ((!currentStoredDarkMode && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) || currentStoredDarkMode) {
    //   store.dispatch('setDarkMode', true)
    // }
  }
}

</script>