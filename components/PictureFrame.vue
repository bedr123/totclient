<template>
    <div class="container">
        <img ref="picture" class="main-pic" :src="picturePath" alt="">
    </div>
</template>

<script>
export default {
  name: 'PictureFrame',
  data() {
    return {
    }
  },
  props: ['picture'],
  computed: {
    picturePath() {
        return this.picture ? this.picture.image : ''
    }
  },
  mounted() {
  },
  methods: {
    setMode(isDark) {
        if (isDark) {
            this.$refs.picture.classList.add("dark-mode")
        } else {
            this.$refs.picture.classList.remove("dark-mode")
        }
    }
  }
}
</script>

<style scoped>
.container {
    position: relative;
    width: 28.438rem;
    margin: 20px auto;
}

.main-pic {
    width: 100%;
    height: 18.75rem;
    object-fit: cover;
    border: 4px solid #013068;
    padding: 2px;
    backface-visibility: hidden;
    transition: all 300ms ease-out;
}

/* .back-box {
    position: absolute;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100%;
    height: 100%; 
    background-color: rgb(245, 245, 245);
    border: 2px solid #ffffff;
    outline: 4px solid #0c0228;
    transform: rotateY(180deg);
    backface-visibility: hidden;
    transition: all 1s ease-out;
} */

/* @media screen and (max-width: 624px) {
    .container {
        width: 60%;
    }
}

@media screen and (max-width: 320px) {
    .container {
        width: 70%;
    }
} */

/* .rotate {
    transform: rotateY(180deg);
}

.rotate2 {
    transform: rotateY(360deg);
} */
.dark-mode {
    border: 4px solid #ffffff;
}
</style>
