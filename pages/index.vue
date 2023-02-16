<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="description" :content="description"></Meta>
      <Meta property="og:title" :content="title"></Meta>
      <Meta property="og:description" :content="description"></Meta>
      <Meta property="og:image" content="https://testoftimes.com/api/images/tot.png"></Meta>
      <Meta property="og:url" content="https://testoftimes.com"></Meta>
      <Link rel="apple-touch-icon" url="https://testoftimes.com/api/images/apple-touch-icon.png"></Link>
    </Head>
    <ShareModal @closeShareModal="shareModal = false" v-if="shareModal" />
    <Header ref="navbar" @buyTheGame="buyTheGame = true" @howToPlay="howToPlay = true" />
    <PictureFrame ref="picture" :picture="picture" />
    <GuessingPart @shareModal="shareModal = true" ref="guessingPart" :picture="picture" @showError="showError" @hideError="hideError" />
    <Footer ref="footer" />
    <Error ref="errorDialog" :error="error" />
    <HowToPlay ref="howToPlay" v-show="howToPlay" @closeHowToPlay="howToPlay = false" />
    <BuyTheGame ref="buyTheGame" v-show="buyTheGame" @closeBuyTheGame="buyTheGame = false" />
  </div>
</template>

<script>

export default {
  name: "IndexPage",
  data() {
    return {
      error: '',
      howToPlay: false,
      buyTheGame: false,
      isDarkMode: false,
      picture: null,
      shareModal: false,
      title: 'Test Of Times',
      description: 'Test of Times is a fun online game where people can learn more about history through photos. A new photo is added daily where individuals attempt to guess the correct year the photo was taken.'
    }
  },
  // head () {
  //   return {
  //     title: this.title,
  //     meta: [{
  //       hid: 'description',
  //       name: 'description',
  //       content: this.description
  //     }]
  //   }
  // },
  created() {
    // this.$nuxt.$on("closeBuyTheGame", () => this.buyTheGame = false)
    // this.$nuxt.$on("closeHowToPlay", () => this.howToPlay = false)
    // this.$nuxt.$on("buyTheGame", () => this.buyTheGame = true)
    // this.$nuxt.$on("howToPlay", () => this.howToPlay = true)
    // this.$nuxt.$on("toggleMode", this.toggleMode)
    // this.isDarkMode = this.$store.getters.interface.isDarkMode
    
    this.$store.dispatch('getActivePicture').then(() => {
      this.picture = this.$store.getters.picture
      console.log(this.picture)
    })
  },
  methods: {
    toggleMode(isDark) {
      // this.$store.commit("interface/toggleMode", e.target.checked)
      this.$refs.navbar.setMode(isDark)
      this.$refs.picture.setMode(isDark)
      this.$refs.guessingPart.setMode(isDark)
      this.$refs.footer.setMode(isDark)
      this.$refs.howToPlay.setMode(isDark)
      this.$refs.buyTheGame.setMode(isDark)
      if (isDark) {
          document.body.classList.add("dark-background")
      } else {
          document.body.classList.remove("dark-background")
      }
    },
    showError(error) {
      this.error = error
      this.$refs.errorDialog.showError()
    },
    hideError() {
      this.$refs.errorDialog.hideError()
    }
  }
}
</script>
