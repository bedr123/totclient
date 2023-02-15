<script setup>
import { store } from "@/plugins/vuex.js";
</script>

<template>
  <div :class="{ dark: store.state.style.darkMode }">
    <div class="wrapper bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  min-height: 100vh;
}
</style>
