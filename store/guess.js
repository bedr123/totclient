const state = () => ({
  firstRow: {
    num: '',
    isSubmited: false,
    coloredCols: []
  },
  secondRow: {
    num: '',
    isSubmited: false,
    coloredCols: []
  },
  thirdRow: {
    num: '',
    isSubmited: false,
    coloredCols: []
  },
  currGuess: {
    num: '',
    row: 'firstRow',
    isGuessed: false
  },
  currGuesses: 0
})

const getters = {
  getNumList (state) {
    return state.numList
  }
}

const mutations = {
  type (state, num) {
    if (state[state.currGuess.row].num.length === 4 && !state[state.currGuess.row].isSubmited) {
      return
    }
    if (state.currGuess.isGuessed) {
      return
    }
    if (state.firstRow.num.length < 4) {
      state.firstRow.num += '' + num
      state.currGuess.num = state.firstRow.num
      state.currGuess.row = 'firstRow'
    } else if (state.secondRow.num.length < 4) {
      state.secondRow.num += '' + num
      state.currGuess.num = state.secondRow.num
      state.currGuess.row = 'secondRow'
    } else if (state.thirdRow.num.length < 4) {
      state.thirdRow.num += '' + num
      state.currGuess.num = state.thirdRow.num
      state.currGuess.row = 'thirdRow'
    } else {
      state.currGuess.num = ''
      state.currGuess.row = ''
      console.log('full')
    }
  },
  deleteNum (state) {
    if (state.currGuess.num.length < 1) {
      return
    }
    if (state[state.currGuess.row].isSubmited) {
      return
    }
    if (state.currGuess.isGuessed) {
      return
    }
    state.currGuess.num = state.currGuess.num.slice(0, -1)
    switch (state.currGuess.row) {
      case 'firstRow':
        state.firstRow.num = state.firstRow.num.slice(0, -1)
        break
      case 'secondRow':
        state.secondRow.num = state.secondRow.num.slice(0, -1)
        break
      case 'thirdRow':
        state.thirdRow.num = state.thirdRow.num.slice(0, -1)
        break
    }
  },
  markRowAsSubmited (state, data) {
    state[data].isSubmited = true
  },
  guessed(state) {
    state.currGuess.isGuessed = true
  },
  setColor(state, data) {
    state[data.row].coloredCols.push(data.icolor)
  },
  addGuess(state) {
    state.currGuesses++
  }
}

const actions = {

}


export default {
  state,
  getters,
  mutations,
  actions
}