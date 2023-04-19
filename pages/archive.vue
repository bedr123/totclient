<template>
  <div>
    <ShareModal @closeShareModal="shareModal = false" v-if="shareModal" />
    <Header ref="navbar" @stats="stats = true" @howToPlay="howToPlay = true" />
    <PhotoArchive :archive="archive" @changePage="(page) => changePage(page)" />
    <!-- <Footer ref="footer" /> -->
    <Error ref="errorDialog" :error="error" />
    <HowToPlay ref="howToPlay" v-show="howToPlay" @closeHowToPlay="howToPlay = false" />
    <BuyTheGame ref="buyTheGame" v-show="buyTheGame" @closeBuyTheGame="buyTheGame = false" />
    <Stats ref="stats" v-show="stats" @closeStats="stats = false" />
  </div>
</template>

<script>
import Cookie from 'js-cookie'

export default {
  name: "ArchivePage",
  data() {
    return {
      stats: false,
      error: '',
      archive: [],
      howToPlay: false,
      buyTheGame: false,
      picture: null,
      shareModal: false,
    }
  },
  created() {
    this.$store.dispatch("getArchive", this.$route.query.page ? this.$route.query.page : 1).then(() => {
      this.archive = this.$store.getters.archive
      console.log(this.archive)
    })
    if (Cookie.get('token')) {
      this.$store.dispatch('getMe')
    }
    this.$store.dispatch('getActivePicture').then(() => {
      this.picture = this.$store.getters.picture
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
              lostInARow: 0,
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
              winPercentage: 0,
              playedThisMonth: false,
              playedLastMonth: false
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
              tempOb.statscurrentStreak = 0
              tempOb.stats.playedThisMonth = false
            }
            tempOb.game.id = this.picture.num_of_pic
            tempOb.game.boardState = ['', '', '']
            tempOb.game.status = "IN_PROGRESS"
            tempOb.game.currentRowIndex = 0
            var currentDate = new Date();

            if (currentDate.getDate() == 1) {
              if (tempOb.stats.playedThisMonth) {
                tempOb.stats.playedThisMonth = false
                tempOb.stats.playedLastMonth = true
              }
              // tempOb.stats.monthly = {
              //   averageGuesses: 0,
              //   currentStreak: 10,
              //   lostInARow: 0,
              //   gamesPlayed: 0,
              //   gamesWon: 0,
              //   guesses: {
              //     1: 0,
              //     2: 0,
              //     3: 0,
              //     fail: 0
              //   },
              //   hasPlayed: false,
              //   isOnStreak: false,
              //   maxStreak: 0,
              //   winPercentage: 0
              // }
              // if (Cookie.get('user')) {
              //   this.$store.dispatch('resetMonthlyStats')
              // }
            }
          } else {
            let year = '' + this.picture.year
            this.$store.commit('setRows', tempOb.game.boardState)

            if (tempOb.game.status != "IN_PROGRESS") {
              this.$store.commit("guessed")
            }
          }
          if (Cookie.get('user')) {
            let tempUser = JSON.parse(Cookie.get('user'))
            tempOb.stats.averageGuesses = tempUser.statistics.overall_average_guesses
            tempOb.stats.gamesWon = tempUser.statistics.overall_games_won
            tempOb.stats.gamesPlayed = tempUser.statistics.overall_played
            tempOb.stats.currentStreak = tempUser.statistics.overall_current_streak
            tempOb.stats.lostInARow = tempUser.statistics.overall_lost_in_a_row
            tempOb.stats.maxStreak = tempUser.statistics.overall_max_streak
            tempOb.stats.winPercentage = tempUser.statistics.overall_win_percentage
            tempOb.stats.guesses = tempUser.statistics.overall_guess_ditribution
          }
          this.$store.commit('updateStats', tempOb.stats)
    
          localStorage.setItem('testoftimes', JSON.stringify(tempOb))
        }
      }
    })
  },
  methods: {
    showError(error) {
      this.error = error
      this.$refs.errorDialog.showError()
    },
    hideError() {
      this.$refs.errorDialog.hideError()
    },
    changePage(page) {
      location.href = '/archive?page=' + page
    }
  }
}
</script>  