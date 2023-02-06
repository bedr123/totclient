<template>
    <div class="footer-container">
        <div class="footer-top">
            <a href="https://www.instagram.com/test_of_times/" target="_blank" class="instagram">
                <img ref="instagram" src="@/assets/images/instagram-line.svg" alt="">
            </a>
            <a href="https://www.facebook.com/TestOfTimes1/" target="_blank" class="facebook">
                <img ref="facebook" src="@/assets/images/facebook-fill.svg" alt="">
            </a>
            <a href="https://twitter.com/Test_Of_Times" target="_blank" class="twitter">
                <img ref="twitter" src="@/assets/images/twitter-fill.svg" alt="">
            </a>
        </div>
        <!-- <div class="footer-bottom">
            © 2022 Copyright
        </div> -->
    </div>
</template>

<script>
export default {
  name: 'MainFooter',
  data() {
    return {
        isDarkMode: false
    }
  },
  methods: {
    setMode(isDark) {
        this.isDarkMode = isDark
        // if (isDark) {
        //     console.log(this.$refs.instagram.src)
        //     this.$refs.instagram.src = this.$refs.instagram.src.replace(/....$/,'-light.svg')
        //     console.log(this.$refs.instagram.src)
        //     this.$refs.facebook.src = this.$refs.facebook.src.replace(/....$/,'-light.svg')
        //     this.$refs.twitter.src = this.$refs.twitter.src.replace(/....$/,'-light.svg')
        // } else {
        //     this.$refs.instagram.src = this.$refs.instagram.src.replace(/..........$/,'.svg')
        //     this.$refs.facebook.src = this.$refs.facebook.src.replace(/..........$/,'.svg')
        //     this.$refs.twitter.src = this.$refs.twitter.src.replace(/..........$/,'.svg')
        // }
    }
  }
}
</script>

<style scoped>
.footer-container {
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px 0;
    /* background-color: #FEFCF3; */
    color: #1A120B;
    /* border-bottom: #F0DBDB 4px solid; */
}

.footer-top {
    max-width: 125px;
    width: 95%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin-bottom: 20px; */
}

.footer-bottom {
    text-align: center;
}

img {
    max-width: none;
    width: 32px;
    transition: all 300ms ease-out;
}

.facebook, .twitter {
    margin-left: 2rem;
}

img:hover {
    margin-top: -10px;

}

@media screen and (max-width: 523px) {
    img {
        width: 26px;
    }
}
</style>
