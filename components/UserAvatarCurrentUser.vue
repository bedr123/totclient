<script setup>
import { store } from "@/plugins/vuex";
import UserAvatar from "@/components/UserAvatar.vue";

</script>

<template>
  <UserAvatar :username="store.state.main.userName" :avatar="store.state.main.userAvatar">
    <slot />
  </UserAvatar>
</template>
