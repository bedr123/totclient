<template>
    <div class="fb btn" @click="$emit('facebookLogin')">
      <img src="@/assets/images/facebook-login.svg" alt=""> Login with Facebook
    </div>
</template>

<script>
export default {
    name: 'FacebookButton',
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
.fb {
  background-color: #4267B2;
  color: white;
}

.fb img {
    width: 1.125rem;
    margin-right: 5px;
}
</style>