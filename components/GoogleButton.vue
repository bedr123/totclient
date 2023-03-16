<template>
    <div class="google btn" @click="$emit('googleLogin')">
      <img src="@/assets/images/google-login.svg" alt=""> Login with Google
    </div>
</template>

<script>
export default {
    name: 'GoogleButton',
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
.google {
  background-color: #DB4437;
  color: white;
}

.google img {
    width: 1.125rem;
    margin-right: 5px;
}
</style>