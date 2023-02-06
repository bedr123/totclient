<script setup>
import { store } from "@/plugins/vuex";
defineProps({
  display: {
    type: String,
    default: "flex",
  },
  useMargin: Boolean,
});
</script>

<template>
  <div
    :class="[
      display,
      store.state.style.navBarItemLabelStyle,
      store.state.style.navBarItemLabelHoverStyle,
      useMargin ? 'my-2 mx-3' : 'py-2 px-3',
    ]"
    class="items-center cursor-pointer dark:text-white dark:hover:text-slate-400"
  >
    <slot />
  </div>
</template>
