<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="description" :content="description"></Meta>
      <Meta hid="og-title" property="og:title" :content="title"></Meta>
      <Meta hid="og-description" property="og:description" :content="description"></Meta>
      <Meta hid="og-image" property="og:image" content="https://testoftimes.com/api/images/tot.png"></Meta>
      <Meta hid="og-url" property="og:url" content="https://testoftimes.com"></Meta>
      <Link rel="apple-touch-icon" sizes="180x180" href="https://testoftimes.com/api/images/apple-touch-icon.png"></Link>
    </Head>
    <ShareModal @closeShareModal="shareModal = false" v-if="shareModal" />
    <Header ref="navbar" @stats="stats = true" @howToPlay="howToPlay = true" />
    <PictureFrame ref="picture" :picture="picture" />
    <GuessingPart @shareModal="shareModal = true" ref="guessingPart" :picture="picture" @showError="showError" @hideError="hideError" />
    <!-- <Footer ref="footer" /> -->
    <Error ref="errorDialog" :error="error" />
    <HowToPlay ref="howToPlay" v-show="howToPlay" @closeHowToPlay="howToPlay = false" />
    <BuyTheGame ref="buyTheGame" v-show="buyTheGame" @closeBuyTheGame="buyTheGame = false" />
    <Stats ref="stats" v-show="stats" @closeStats="stats = false" />
  </div>
</template>

<script>

export default {
  name: "IndexPage",
  data() {
    return {
      stats: false,
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
      if (!localStorage.getItem('testoftimes')) {
        let game = {
          game: {
            id: this.picture.num_of_pic,
            boardState: ['', '', ''],
            currentRowIndex: 0,
            status: 'IN_PROGRESS'
          },
          stats: {
            averageGuesses: 0,
            currentStreak: 0,
            gamesPlayed: 0,
            gamesWon: 0,
            guesses: {
              1: 0,
              2: 0,
              3: 0,
              fail: 0
            },
            hasPlayed: false,
            isOnStreak: false,
            maxStreak: 0,
            winPercentage: 0
          }
        }
        this.$store.commit('updateStats', game.stats)
        localStorage.setItem('testoftimes', JSON.stringify(game))
      } else {
        // let game = JSON.parse(localStorage.getItem('testoftimes'))
        if (localStorage.getItem('testoftimes')) {
          let tempOb = JSON.parse(localStorage.getItem('testoftimes'))
          if (this.picture.num_of_pic != tempOb.game.id) {
            if ((tempOb.game.id + 1) != this.picture.num_of_pic) {
              tempOb.stats.currentStreak = 0
            }
            tempOb.game.id = this.picture.num_of_pic
            tempOb.game.boardState = ['', '', '']
            tempOb.game.status = "IN_PROGRESS"
            tempOb.game.currentRowIndex = 0
          } else {
            let year = '' + this.picture.year
            this.$store.commit('setRows', tempOb.game.boardState)

            setTimeout(() => {
              if (tempOb.game.boardState[0].length == 4) {
                for (let i = 0; i < 4; i++) {
                  this.$refs.guessingPart.$refs.game.changeColor('f' + (i + 1), tempOb.game.boardState[0][i] == year[i] ? 0 : 1)
                }
        
                if (tempOb.game.boardState[1].length == 4) {
                  for (let i = 0; i < 4; i++) {
                    this.$refs.guessingPart.$refs.game.changeColor('s' + (i + 1), tempOb.game.boardState[1][i] == year[i] ? 0 : 1)
                  }
                  
                  if (tempOb.game.boardState[2].length == 4) {
                    for (let i = 0; i < 4; i++) {
                      this.$refs.guessingPart.$refs.game.changeColor('t' + (i + 1), tempOb.game.boardState[2][i] == year[i] ? 0 : 1)
                    }
                  }
                }
              }
            }, 500)
            if (tempOb.game.status != "IN_PROGRESS") {
              this.$store.commit("guessed")
            }
          }
          this.$store.commit('updateStats', tempOb.stats)
    
          localStorage.setItem('testoftimes', JSON.stringify(tempOb))
        }
      }
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
