<template>
    <div class="container game-container" ref="game">
        <div class="box">
            <div ref="f1" :class="`input i1 ${ getFirstRow[0] ? 'filled' : '' } ${ isDarkMode ? 'dark-mode' : '' }`">
                {{ getFirstRow[0] ? getFirstRow[0] : '' }}
            </div>
            <div ref="f2" :class="`input i2 ${ getFirstRow[1] ? 'filled' : '' } ${ isDarkMode ? 'dark-mode' : '' }`">
                {{ getFirstRow[1] ? getFirstRow[1] : '' }}
            </div>
            <div ref="f3" :class="`input i3 ${ getFirstRow[2] ? 'filled' : '' } ${ isDarkMode ? 'dark-mode' : '' }`">
                {{ getFirstRow[2] ? getFirstRow[2] : '' }}
            </div>
            <div ref="f4" :class="`input i4 ${ getFirstRow[3] ? 'filled' : '' } ${ isDarkMode ? 'dark-mode' : '' }`">
                {{ getFirstRow[3] ? getFirstRow[3] : '' }}
            </div>
        </div>
        <div class="box">
            <div ref="s1" :class="`input i1 ${ getSecondRow[0] ? 'filled' : '' } ${ isDarkMode ? 'dark-mode' : '' }`">
                {{ getSecondRow[0] ? getSecondRow[0] : '' }}
            </div>
            <div ref="s2" :class="`input i2 ${ getSecondRow[1] ? 'filled' : '' } ${ isDarkMode ? 'dark-mode' : '' }`">
                {{ getSecondRow[1] ? getSecondRow[1] : '' }}
            </div>
            <div ref="s3" :class="`input i3 ${ getSecondRow[2] ? 'filled' : '' } ${ isDarkMode ? 'dark-mode' : '' }`">
                {{ getSecondRow[2] ? getSecondRow[2] : '' }}
            </div>
            <div ref="s4" :class="`input i4 ${ getSecondRow[3] ? 'filled' : '' } ${ isDarkMode ? 'dark-mode' : '' }`">
                {{ getSecondRow[3] ? getSecondRow[3] : '' }}
            </div>
        </div>
        <div class="box">
            <div ref="t1" :class="`input i1 ${ getThirdRow[0] ? 'filled' : '' } ${ isDarkMode ? 'dark-mode' : '' }`">
                {{ getThirdRow[0] ? getThirdRow[0] : '' }}
            </div>
            <div ref="t2" :class="`input i2 ${ getThirdRow[1] ? 'filled' : '' } ${ isDarkMode ? 'dark-mode' : '' }`">
                {{ getThirdRow[1] ? getThirdRow[1] : '' }}
            </div>
            <div ref="t3" :class="`input i3 ${ getThirdRow[2] ? 'filled' : '' } ${ isDarkMode ? 'dark-mode' : '' }`">
                {{ getThirdRow[2] ? getThirdRow[2] : '' }}
            </div>
            <div ref="t4" :class="`input i4 ${ getThirdRow[3] ? 'filled' : '' } ${ isDarkMode ? 'dark-mode' : '' }`">
                {{ getThirdRow[3] ? getThirdRow[3] : '' }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'MainGame',
  data () {
    return {
      firstRow: '',
      secondRow: '',
      thirdRow: '',
      isDarkMode: false,
      elems: {}
    }
  },
  props: ['picture'],
  computed: {
    getFirstRow () {
      return this.$store.state.guess.firstRow.num
    },
    getSecondRow () {
      return this.$store.state.guess.secondRow.num
    },
    getThirdRow () {
      return this.$store.state.guess.thirdRow.num
    }
  },
  mounted () {
    if (localStorage.getItem('testoftimes')) {
      let tempOb = JSON.parse(localStorage.getItem('testoftimes'))
      this.$store.commit('setRows', tempOb.game.boardState)

      // this.$store.dispatch('getActivePicture').then(() => {
      // let year = '' + this.$store.getters.picture.year
      // if (tempOb.game.boardState[0].length == 4) {
      //   for (let i = 0; i < 4; i++) {
      //     this.changeColor('f' + (i + 1), tempOb.game.boardState[0][0] == year[0] ? 1 : 0)
      //   }

      //   if (tempOb.game.boardState[1].length == 4) {
      //     for (let i = 0; i < 4; i++) {
      //       this.changeColor('s' + (i + 1), tempOb.game.boardState[1][i] == year[i] ? 1 : 0)
      //     }
          
      //     if (tempOb.game.boardState[2].length == 4) {
      //       for (let i = 0; i < 4; i++) {
      //         this.changeColor('t' + (i + 1), tempOb.game.boardState[2][i] == year[i] ? 1 : 0)
      //       }
      //     }
      //   }

      //   localStorage.setItem('testoftimes', JSON.stringify(tempOb))
      // }
    // })

    }
    this.firstRow = this.$store.state.guess.firstRow
    this.secondRow = this.$store.state.guess.secondRow
    this.thirdRow = this.$store.state.guess.thirdRow
  },
  methods: {
    changeColor (field, guess) {
      switch (guess) {
        case 0:
          this.$refs[field].classList.add('green')
          break
        case 1:
          this.$refs[field].classList.add('red')
          break
      }
    },
    addClass(name) {
      document.querySelector(".game-container").classList.add(name)
    },
    setMode(isDark) {
      this.isDarkMode = isDark
        // let field = null
        // for (let i = 0; i < 3; i++) {
        //   switch (i) {
        //     case 0:
        //       field = 'f'
        //       break
        //     case 1:
        //       field = 's'
        //       break
        //     case 2:
        //       field = 't'
        //       break
        //   }
        //   for (let j = 0; j < 4; j++) {
        //     field = field.substring(0, 1)
        //     field += (j + 1)
        //     if (isDark) {
        //       this.$refs[field].classList.add("dark-mode")
        //     } else {
        //       this.$refs[field].classList.remove("dark-mode")
        //     }
        //   }
        // }
    }
  }
}
</script>

<style scoped>
.container {
    width: 90%;
    max-width: fit-content;
    margin: 0 auto;
    margin-bottom: 20px;
}

.box {
    width: 100%;
    display: flex;
    justify-content: center;
}

.input {
    width: 50px;
    height: 50px;
    border: 2px solid #c0c0c0;
    font-size: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3px 0;
    color: #323232;
    transition: all 400ms ease-out;
}

.i1, .i2, .i3 {
    margin-right: 4px;
}

.filled {
    border: 2px solid black;
}

.dark-mode {
    border: 2px solid #888888;
    color: #ffffff;
}

.filled.dark-mode {
  border: 2px solid white;
}

.green {
    background-color: #3BB143;
    border: 2px solid #3BB143 !important;
    color: white;
}

.red {
    background-color: #c4003b;
    border: 2px solid #c4003b !important;
    color: white;
}

.unvisible {
    display: none;
}

/* @media screen and (max-width: 423px) {
  .input {
    width: 30px;
    height: 30px;
    margin: 2px 2px;
  }
} */

</style>
