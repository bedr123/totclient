<template>
    <div class="btn" @click="$emit('logout')">
      Logout
    </div>
</template>

<script>
export default {
    name: 'LogoutButton',
    // props: ['error'],
    methods: {

    }
}
</script>

<style scoped>
.btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  margin: 0.313rem 0;
  opacity: 0.9;
  display: flex;
  justify-content: center;
  font-size: 1.063rem;
  line-height: 1.25rem;
  text-decoration: none; /* remove underline from anchors */
  cursor: pointer;
}

.btn:hover {
  opacity: 1;
}

/* add appropriate colors to fb, twitter and google buttons */
.btn {
  background-color: #d11a09;
  color: white;
}
</style>