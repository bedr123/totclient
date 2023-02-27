<template>
    <div ref="overlay" class="overlay">
        <div class="modal">
            <img class="close" src="@/assets/images/close-line.svg" @click="$emit('closeStats')" alt="">
            <div class="title">
                <h3>Statistics</h3>
            </div>
            <div class="text">
                <div class="upper-stats">
                    <div class="stats">
                        <h3>{{ stats ? stats.gamesPlayed : 0 }}</h3>
                        <p>Played</p>
                    </div>
                    <div class="stats">
                        <h3>{{ stats ? stats.winPercentage : 0 }}</h3>
                        <p>Win %</p>
                    </div>
                    <div class="stats">
                        <h3>{{ stats ? stats.currentStreak : 0 }}</h3>
                        <p>Current Streak</p>
                    </div>
                    <div class="stats">
                        <h3>{{ stats ? stats.maxStreak : 0 }}</h3>
                        <p>Max Streak</p>
                    </div>
                </div>
            </div>
            <div class="lower-stats">
                <h3>Guess Distribution</h3>
                <div class="guess-distribution">
                    <div class="guess">
                        <div class="row">1</div><div :class="`dist ${ stats ? stats.guesses[1] > 0 ? 'full' : 'empty' : 'empty' }`">{{ stats ? stats.guesses[1] : 0 }}</div>
                    </div>
                    <div class="guess">
                        <div class="row">2</div><div :class="`dist ${ stats ? stats.guesses[2] > 0 ? 'full' : 'empty' : 'empty' }`">{{ stats ? stats.guesses[2] : 0 }}</div>
                    </div>
                    <div class="guess">
                        <div class="row">3</div><div :class="`dist ${ stats ? stats.guesses[3] > 0 ? 'full' : 'empty' : 'empty' }`">{{ stats ? stats.guesses[3] : 0 }}</div>
                    </div>
                    <div class="guess">
                        <div class="row">X</div><div :class="`dist ${ stats ? stats.guesses.fail > 0 ? 'fail' : 'empty' : 'empty' }`">{{ stats ? stats.guesses.fail : 0 }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Stats',
  data() {
    return {
        isDarkMode: false,
        stats: null
    }
  },
  computed: {
    stats() {
        return this.$store.state.guess.stats
    }
    // statsfr() {
    //     return process.client ? (JSON.parse(localStorage.getItem('testoftimes')).stats.guesses[1] > 0) ? 'full' : 'empty' : 'empty'
    // },
    // statssr() {
    //     return process.client ? (2 > 0) ? 'full' : 'empty' : 'emptyd'

    // },
    // statstr() {
    //     return process.client ? (JSON.parse(localStorage.getItem('testoftimes')).stats.guesses[3] > 0) ? 'full' : 'empty' : 'empty'

    // }
  },
  methods: {
    setMode(isDark) {
        this.isDarkMode = isDark
        if (isDark) {
            this.$refs.overlay.classList.add("dark-mode")
        } else {
            this.$refs.overlay.classList.remove("dark-mode")
        }
    }
  }
}
</script>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(49, 49, 49, 0.8);
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 90%;
    max-width: 500px;
    height: fit-content;
    transform: translate(-50%, -50%);
    background-color: rgb(255, 255, 255);
    padding: 3.5rem;
    overflow-y: auto;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    border: #013068 solid 4px;
}

.close {
    position: absolute;
    top: 20px; 
    right: 20px;
    width: 24px;
    cursor: pointer;
    transition: all 200ms ease-out;
}

.close:hover {
    transform: scale(1.2);
}

.title {
    text-align: left;
    margin: 0 auto;
    margin-bottom: 20px;
    font-size: 1.25rem;
    font-weight: bold;
}

.upper-stats {
    display: flex;
    justify-content: space-between;
}

.stats h3, .stats p {
    text-align: center;
}

.stats h3 {
    font-size: 2rem;
    font-weight: bold;
}

.stats p {
    font-size: 0.9rem;
}

.lower-stats h3 {
    margin-bottom: 0.75rem;
    text-align: center;
}

.guess {
    display: flex;
    align-items: center;
    font-size: 1rem;
    margin-bottom: 2px;
}

.guess .row {
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    float: left;
}

.dist {
    color: white
}

.full {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 2rem);
    height: 2rem;
    background-color: #3BB143;
}

.fail {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 2rem);
    height: 2rem;
    background-color: #c4003b;
}

.empty {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    background-color: gray;
}

.text p {
    margin-bottom: 20px;
    text-align: left;
}

.text p:first-child {
    text-align: left;
}

.example {
    font-weight: bold;
    margin-bottom: 0.938rem;
}

.example-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.example-text {
    width: 200px;
}

.example-text:last-child {
    /* padding-top: 0.625rem; */
}

.example-img {
    width: 9.375rem;
}

.example-img img {
    width: 100%;
}

@media screen and (max-width: 522px) {
    .example-text {
        width: 140px;
    }
}

</style>
