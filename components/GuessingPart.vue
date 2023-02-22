<template>
    <div class="main-container">
        <div ref="gn" class="gn-container">
            <Game ref="game" />
            <Numbers ref="numbers" @guessYear="guessYear" />
        </div> 
        <AboutPhoto @showError="e => $emit('showError', e)" @hideError="$emit('hideError')" @shareModal="$emit('shareModal')" :picture="picture" class="about-photo" ref="aboutPhoto" />
    </div>
</template>

<script>
export default {
    name: "GuessingPart",
    data() {
        return {
            won: false
        }
    },
    props: ['picture'],
    mounted() {
        // this.$nuxt.$on("guessYear", this.guessYear);
    },
    methods: {
      guessYear() {
        var currentDate = new Date();
        const currGuess = {...this.$store.state.guess.currGuess}
        this.$store.commit('reset')
        const year = '' + this.$store.getters.picture.year;
        if (currGuess.isGuessed) {
          return
        }
        if (!currGuess.num || currGuess.num.length < 4) {
        //   this.error = "Not enough numbers."
          this.$emit("showError", "Not enough numbers.")
          setTimeout(() => {
            this.$emit("hideError")
          }, 2000)
          return
        }
        if (parseInt(currGuess.num) > currentDate.getFullYear() || parseInt(currGuess.num) < 1000) {
        //   this.error = "Year isn't valid"
          this.$emit("showError", "Year isn't valid")
          setTimeout(() => {
            this.$emit("hideError")
          }, 2000)
          return
        }
        this.$store.commit("addGuess")
        localStorage.setItem('guess' + this.$store.state.guess.currGuesses, '')
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            if (parseInt(year[i]) === parseInt(currGuess.num[i])) {
              this.$refs.game.changeColor(currGuess.row[0] + (i + 1), 0)
              this.$store.commit("setColor", { row: currGuess.row, icolor: 0 })
              localStorage.setItem('guess' + this.$store.state.guess.currGuesses, localStorage.getItem('guess' + this.$store.state.guess.currGuesses) + 't')

            }
            else {
              this.$refs.game.changeColor(currGuess.row[0] + (i + 1), 1)
              this.$store.commit("setColor", { row: currGuess.row, icolor: 1 })
              localStorage.setItem('guess' + this.$store.state.guess.currGuesses, localStorage.getItem('guess' + this.$store.state.guess.currGuesses) + 'f')
            }
          }, 600 * (i + 1))
        }
        this.$store.commit('markRowAsSubmited', currGuess.row);
        if (currGuess.num === year) {
          setTimeout(() => {
            this.endTheGame()
            this.$store.commit("guessed")
          }, 4 * 600 + 1000)
        } else {
            if (this.$store.state.guess.currGuesses == 3) {
                setTimeout(() => {
                  this.endTheGame()
                }, 4 * 600 + 1000)
            }
        }
        console.log(currGuess)
        let tempOb = JSON.parse(localStorage.getItem('testoftimes'))
        if (currGuess.row == 'firstRow') {
          tempOb.game.currentRowIndex = 0
          tempOb.game.boardState[0] = currGuess.num
        } else if (currGuess.row == 'secondRow') {
          tempOb.game.currentRowIndex = 1
          tempOb.game.boardState[1] = currGuess.num

        } else {
          tempOb.game.currentRowIndex = 2
          tempOb.game.boardState[2] = currGuess.num

        }

        if (currGuess.num == year) {
          tempOb.game.status = 'WON'
          tempOb.stats.gamesPlayed++
          tempOb.stats.gamesWon++
          tempOb.stats.guesses[tempOb.game.currentRowIndex + 1]++
          tempOb.stats.currentStreak++
          tempOb.stats.hasPlayed = true
          tempOb.stats.isOnStreak = true
          tempOb.stats.maxStreak = tempOb.stats.currentStreak > tempOb.stats.maxStreak ? tempOb.stats.currentStreak : tempOb.stats.maxStreak
          tempOb.stats.winPercentage = parseInt((tempOb.stats.gamesWon / tempOb.stats.gamesPlayed) * 100)
          let sum = 0
          let counter = 0
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < tempOb.stats.guesses[i]; j++) {
              sum += i
              counter++
            }
          }
          tempOb.stats.averageGuesses = parseInt(sum / counter)

        } else if (currGuess.num != year && tempOb.game.currentRowIndex == 2) {
          tempOb.game.status = "LOST"
          tempOb.stats.gamesPlayed++
          tempOb.stats.guesses.fail++
          tempOb.stats.currentStreak = 0
          tempOb.stats.hasPlayed = true
          tempOb.stats.isOnStreak = false
          tempOb.stats.winPercentage = parseInt((tempOb.stats.gamesWon / tempOb.stats.gamesPlayed) * 100)
        }
        this.$store.commit('updateStats', tempOb.stats)

        localStorage.setItem('testoftimes', JSON.stringify(tempOb))
      },
      endTheGame() {
        this.$refs.aboutPhoto.$refs.aboutPhoto.classList.add("visible")
        this.$refs.gn.classList.add("unvisible")
      },
      setMode(isDark) {
        this.$refs.game.setMode(isDark)
        this.$refs.numbers.setMode(isDark)
        this.$refs.aboutPhoto.setMode(isDark)
      }
    }
}
</script>

<style>
.main-container {
    max-width: 28.438rem;
    margin: 0 auto;
    position: relative;
    /* border: 2px solid rgb(0, 0, 0); */
}

.gn-container {
    /* transition: all 1000ms ease-out; */
}

.unvisible {
    pointer-events: none;
    opacity: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

@media screen and (max-width: 624px) {
  .main-container {
    max-width: none;
    width: 100%;
  }
}
</style>