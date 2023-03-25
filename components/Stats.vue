<template>
    <div ref="overlay" class="overlay">
        <div class="modal">
            <img class="close" src="@/assets/images/close-line.svg" @click="$emit('closeStats')" alt="">
            <div class="login" v-if="!isAuthenticated">
                <!-- <button @click="googleLogin">Login Using Google</button>
                <button @click="facebookLogin">Login Using Facebook</button> -->
                <FacebookButton @facebookLogin="facebookLogin" />
                <GoogleButton @googleLogin="googleLogin" />
            </div>
            <div class="login" v-else>
                <LogoutButton @logout="logout" />
                <!-- <button @click="logout">Logout</button> -->
            </div>
            <div class="overall-stats">
                <div class="title">
                    <h3>Overall Statistics</h3>
                </div>
                <div class="text">
                    <div class="upper-stats">
                        <div class="stats">
                            <h3>{{ (isAuthenticated) ? authStats.overall_played : stats ? stats.gamesPlayed : 0 }}</h3>
                            <p>Played</p>
                        </div>
                        <div class="stats">
                            <h3>{{ (isAuthenticated) ? authStats.overall_win_percentage : stats ? stats.winPercentage : 0 }}</h3>
                            <p>Win %</p>
                        </div>
                        <div class="stats">
                            <h3>{{ (isAuthenticated) ? authStats.overall_current_streak : stats ? stats.currentStreak : 0 }}</h3>
                            <p>Current Streak</p>
                        </div>
                        <div class="stats">
                            <h3>{{ (isAuthenticated) ? authStats.overall_max_streak : stats ? stats.maxStreak : 0 }}</h3>
                            <p>Max Streak</p>
                        </div>
                    </div>
                </div>
                <!-- <div class="lower-stats">
                    <h3>Guess Distribution</h3>
                    <div class="guess-distribution">
                        <div class="guess">
                            <div class="row">1</div><div :class="`dist ${ (isAuthenticated) ? authStats.overall_guess_ditribution[1] > 0 ? 'full' : 'empty' : stats ? stats.overall.guesses[1] > 0 ? 'full' : 'empty' : 'empty' }`">{{ (isAuthenticated) ? authStats.overall_guess_ditribution[1] : stats ? stats.overall.guesses[1] : 0 }}</div>
                        </div>
                        <div class="guess">
                            <div class="row">2</div><div :class="`dist ${ (isAuthenticated) ? authStats.overall_guess_ditribution[2] > 0 ? 'full' : 'empty' : stats ? stats.overall.guesses[2] > 0 ? 'full' : 'empty' : 'empty' }`">{{ (isAuthenticated) ? authStats.overall_guess_ditribution[2] : stats ? stats.overall.guesses[2] : 0 }}</div>
                        </div>
                        <div class="guess">
                            <div class="row">3</div><div :class="`dist ${ (isAuthenticated) ? authStats.overall_guess_ditribution[3] > 0 ? 'full' : 'empty' : stats ? stats.overall.guesses[3] > 0 ? 'full' : 'empty' : 'empty' }`">{{ (isAuthenticated) ? authStats.overall_guess_ditribution[3] : stats ? stats.overall.guesses[3] : 0 }}</div>
                        </div>
                        <div class="guess">
                            <div class="row">X</div><div :class="`dist ${ (isAuthenticated) ? authStats.overall_guess_ditribution.fail > 0 ? 'fail' : 'empty' : stats ? stats.overall.guesses.fail > 0 ? 'fail' : 'empty' : 'empty' }`">{{ (isAuthenticated) ? authStats.overall_guess_ditribution.fail : stats ? stats.overall.guesses.fail : 0 }}</div>
                        </div>
                    </div>
                </div> -->
                <!-- <button @click="shareOverallStats" class="share">Share Overall Stats <img src="@/assets/images/share-fill.svg" /></button> -->
            </div>
            <div class="leaderboard">
                <h3>Leaderboard</h3>
                <!-- <div class="monthly-leaderboard">
                    <div class="places">
                        <div>1st</div>
                        <div>John</div>
                        <div>5 streaks in a row</div>
                    </div>
                    <div class="places">
                        <div>2nd</div>
                        <div>John</div>
                        <div>4 streaks in a row</div>
                    </div>
                    <div class="places">
                        <div>2rd</div>
                        <div>John</div>
                        <div>3 streaks in a row</div>
                    </div>
                    <div class="places">
                        <div>4th</div>
                        <div>John</div>
                        <div>2 streaks in a row</div>
                    </div>
                    <div class="places">
                        <div>5th</div>
                        <div>John</div>
                        <div>2 streaks in a row</div>
                    </div>
                </div> -->

                <table>
                  <!-- <tr>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Country</th>
                  </tr> -->
                  <tr v-for="(player, i) in leaderboard" :class="`${ user ? player.id == user.id ? 'you' : '' : '' }`">
                    <td>{{ i + 1 }}{{ i + 1 == 1 ? 'st' : i + 1 == 2 ? 'nd' : 'th' }}</td>
                    <td>{{ player.name.length > 18 ? player.name.substr(0, 18) + '...' : player.name }}</td>
                    <td>Streak of {{ player.statistics.overall_current_streak }}</td>
                  </tr>
                  <!-- <tr>
                    <td>2nd</td>
                    <td>Maria Anders</td>
                    <td>Streak of 5</td>
                  </tr>
                  <tr>
                    <td>3rd</td>
                    <td>Maria Anders</td>
                    <td>Streak of 4</td>
                  </tr>
                  <tr>
                    <td>4th</td>
                    <td>Maria Anders</td>
                    <td>Streak of 3</td>
                  </tr>
                  <tr>
                    <td>5th</td>
                    <td>Maria Anders</td>
                    <td>Streak of 2</td>
                  </tr> -->
                </table>
                <button @click="shareLeaderboard" class="share">Share Leaderboard <img src="@/assets/images/share-fill.svg" /></button>

            </div>
            <div class="crowns">
                <h3>My Crowns</h3>
                <div class="my-crowns" ref="crowns" v-if="isAuthenticated">
                    <div v-if="wonThreeInARow">
                        &#128293;
                    </div>
                    <div v-if="playedWholeLastMonth">
                        &#128197;
                    </div>
                    <div v-if="topFive">
                        &#129351;
                    </div>
                    <div v-if="lostFiveInARow">
                        &#10052;
                    </div>
                </div>
                <div class="my-crowns" v-else>
                    Login to earn crowns.
                </div>
                <div class="crowns-legend">
                    <div class="fire">
                        <div class="legend-crown">
                            &#128293;
                        </div>
                         3 wins in a row
                    </div>
                    <div class="calendar">
                        <div class="legend-crown">
                            &#128197;
                        </div>
                         Played each day of the last month
                    </div>
                    <div class="top-player">
                        <div class="legend-crown">
                            &#129351;
                        </div>
                         Top 5 player
                    </div>
                    <div class="lost-in-a-row">
                        <div class="legend-crown">
                            &#10052;
                        </div>
                         Lost 5 in a row
                    </div>
                </div>
                <button @click="shareCrowns" class="share">Share Crowns <img src="@/assets/images/share-fill.svg" /></button>

            </div>
        </div>
    </div>
</template>

<script>
import { googleTokenLogin } from "vue3-google-login"

export default {
  name: 'Stats',
  data() {
    return {
        isDarkMode: false,
        stats: null
    }
  },
  computed: {
    authStats() {
        return this.$store.getters.user.statistics
    },
    isAuthenticated() {
        return this.$store.getters.user ? true : false
    },
    stats() {
        return this.$store.state.guess.stats
    },
    leaderboard() {
        return this.$store.getters.leaderboard
    },
    wonThreeInARow() {
        return (this.isAuthenticated) ? this.authStats.overall_current_streak > 2 ? true : false : this.stats ? this.stats.currentStreak > 2 ? true : false : false
    },
    lostFiveInARow() {
        return (this.isAuthenticated) ? this.authStats.overall_lost_in_a_row > 4 ? true : false : this.stats ? this.stats.lostInARow > 4 ? true : false : false
    },
    topFive() {
        return this.$store.getters.leaderboard ? this.user ? this.$store.getters.leaderboard.some(user =>  user.id == this.$store.getters.user.id ) : false : false
    },
    user() {
        return this.$store.getters.user
    },
    playedWholeLastMonth() {
        return this.user ? this.user.statistics.overall_played_last_month : this.stats ? this.stats.played_last_month : false
    }
  },
  mounted() {
    this.$store.dispatch('getLeaderboard')
  },
  methods: {
    // shareOverallStats() {
    //     let stats = null
    //     if (this.$store.getters.user) {
    //         stats = this.$store.getters.user.statistics
    //     } else {
    //         stats = JSON.parse(localStorage.getItem('testoftimes')).stats.overall
    //     }

    //     let newline = "\n"
    //     let text = null
    //     if (this.$store.getters.user) {
    //         text = `Overall Stats ${ newline }Games Played: ${ stats.overall_played } ${ newline }Win Percentage: ${ stats.overall_win_percentage } ${ newline }Current Streak: ${ stats.overall_current_streak } ${ newline }Max Streak: ${ stats.overall_max_streak } ${ newline }`
    //     } else {
    //         text = `Overall Stats ${ newline }Games Played: ${ stats.gamesPlayed } ${ newline }Win Percentage: ${ stats.winPercentage } ${ newline }Current Streak: ${ stats.currentStreak } ${ newline }Max Streak: ${ stats.maxStreak } ${ newline }`
    //     }
    //     if (navigator.share) {
    //         navigator.share({
    //             title: 'Test Of Times',
    //             text: text,
    //             url: 'https://testoftimes.com'
    //         })
    //     } else {
    //         navigator.clipboard.writeText(text)
    //         this.$emit("showError", "Copied to clipboard")
    //         setTimeout(() => {
    //           this.$emit("hideError")
    //         }, 2000)
    //     }
    // },
    // shareMonthlyStats() {
    //     let stats = null
    //     if (this.$store.getters.user) {
    //         stats = this.$store.getters.user.statistics
    //     } else {
    //         stats = JSON.parse(localStorage.getItem('testoftimes')).stats.monthly
    //     }

    //     let newline = "\n"
    //     let text = null
    //     if (this.$store.getters.user) {
    //         text = `Monthly Stats ${ newline }Games Played: ${ stats.monthly_played } ${ newline }Win Percentage: ${ stats.monthly_win_percentage } ${ newline }Current Streak: ${ stats.monthly_current_streak } ${ newline }Max Streak: ${ stats.monthly_max_streak } ${ newline }`
    //     } else {
    //         text = `Monthly Stats ${ newline }Games Played: ${ stats.gamesPlayed } ${ newline }Win Percentage: ${ stats.winPercentage } ${ newline }Current Streak: ${ stats.currentStreak } ${ newline }Max Streak: ${ stats.maxStreak } ${ newline }`
    //     }
    //     if (navigator.share) {
    //         navigator.share({
    //             title: 'Test Of Times',
    //             text: text,
    //             url: 'https://testoftimes.com'
    //         })
    //     } else {
    //         navigator.clipboard.writeText(text)
    //         this.$emit("showError", "Copied to clipboard")
    //         setTimeout(() => {
    //           this.$emit("hideError")
    //         }, 2000)
    //     }
    // },
    shareLeaderboard() {
        let newline = "\n"
        let text = null
        text = `Leaderboard ${ newline }1st ${ this.leaderboard[0].name } ${ this.user ? this.leaderboard[0].id == this.user.id ? '(me)' : '' : '' }${ newline }2nd ${ this.leaderboard[1].name } ${ this.user ? this.leaderboard[1].id == this.user.id ? '(me)' : '' : '' }${ newline }3rd ${ this.leaderboard[2].name } ${ this.user ? this.leaderboard[2].id == this.user.id ? '(me)' : '' : '' }${ newline }4th ${ this.leaderboard[3].name } ${ this.user ? this.leaderboard[3].id == this.user.id ? '(me)' : '' : '' }${ newline }5th ${ this.leaderboard[4].name } ${ this.user ? this.leaderboard[4].id == this.user.id ? '(me)' : '' : '' }${ newline }#testoftimes`
        if (navigator.share) {
            navigator.share({
                title: 'Test Of Times',
                text: text,
                url: 'https://testoftimes.com'
            })
        } else {
            navigator.clipboard.writeText(text)
            this.$emit("showError", "Copied to clipboard")
            setTimeout(() => {
              this.$emit("hideError")
            }, 2000)
        }
    },
    shareCrowns() {
        let newline = "\n"
        let text = null
        let crownNodes = this.$refs.crowns.querySelectorAll('div')
        let crowns = []
        crownNodes.forEach((crownNode) => {
            crowns.push(crownNode.textContent)
        })

        let crownString = ''
        for(let i = 0; i < crowns.length; i++) {
            crownString += crowns[i] + ' '
        }

        text = `My Crowns ${ newline }${ crownString }${ newline }#testoftimes`
        if (navigator.share) {
            navigator.share({
                title: 'Test Of Times',
                text: text,
                url: 'https://testoftimes.com'
            })
        } else {
            navigator.clipboard.writeText(text)
            this.$emit("showError", "Copied to clipboard")
            setTimeout(() => {
              this.$emit("hideError")
            }, 2000)
        }
    },
    googleLogin() {
      googleTokenLogin().then((response) => {
        console.log("Handle the response", response)
        this.$store.dispatch('googleLogin', { token: response.access_token, stats: JSON.parse(localStorage.getItem('testoftimes')).stats })
      })
    },
    logout() {
        this.$store.dispatch('userLogout').then(() => {
            let game = JSON.parse(localStorage.getItem('testoftimes'))
            let stats = {
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
                  winPercentage: 0
                }
              
              game.stats = stats
            this.$store.commit('updateStats', game.stats)
            localStorage.setItem('testoftimes', JSON.stringify(game))
        })
    },
    facebookLogin() {
        // window.FB.getLoginStatus(function (response) {
        //     console.log(response)
        //   })
        let store = this.$store
        window.FB.login(function (response) {
            store.dispatch('facebookLogin', { token: response.authResponse.accessToken, stats: JSON.parse(localStorage.getItem('testoftimes')).stats })
        })
    },

    
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
    max-height: 85vh;
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
    text-align: center;
    margin: 0 auto;
    margin-bottom: 10px;
    font-size: 1rem;
    font-weight: bold;
}

.upper-stats {
    display: flex;
    justify-content: space-between;
}

.stats h3, .stats p {
    text-align: center !important;
}

.stats h3 {
    font-size: 1.5rem;
    font-weight: bold;
}

.stats p {
    font-size: 0.8rem;
}

.lower-stats h3 {
    margin-bottom: 0.75rem;
    text-align: center;
}

.guess {
    display: flex;
    align-items: center;
    font-size: .8rem;
    margin-bottom: 2px;
}

.guess .row {
    width: 1.5rem;
    height: 1.5rem;
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
    width: calc(100% - 1.5rem);
    height: 1.5rem;
    background-color: #3BB143;
}

.fail {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 1.5rem);
    height: 1.5rem;
    background-color: #c4003b;
}

.empty {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.5rem;
    height: 1.5rem;
    background-color: gray;
}

.text p {
    margin-bottom: 20px;
    text-align: left;
}

.text p:first-child {
    text-align: left;
}

.share {
    /* display: flex; */
    display: block;
    padding: 8px 16px;
    margin: 0 auto;
    margin-top: 15px;
    /* width: 50%; */
    font-size: .9rem;
    color: white;
    font-family: 'Tilt Warp', cursive;
    background-color: #013068;
    transition: all 300ms ease-out;
}

.share img {
    display: inline;
    width: 1.3rem;
}

.share:hover {
    background-color: #234875;
}

.overall-stats {
    margin-bottom: 30px;
}

.login {
    text-align: center;
    padding: 0.625rem;
    border: 4px solid #234875;
    margin-bottom: 30px;
}

table tr {
    display: table-row !important;
    border-bottom-width: 0px !important;
}

table tr td {
    display: table-cell !important;
    border-left-width: 1px !important;
    border-top-width: 0px !important;
    border-right-width: 0px !important;
    border-bottom-width: 0px !important;
    padding: 0.75rem !important;
    text-align: left !important;
    vertical-align: middle !important;
    overflow: hidden;
    white-space: nowrap;
    font-size: 1rem;
}

.you {
    border-left: #013068 4px solid;
}

.leaderboard {
    margin-bottom: 30px;
}

.crowns h3, .leaderboard h3 {
    text-align: center;
    margin-bottom: 10px;
    font-size: 1rem;
    font-weight: bold;
}

.my-crowns {
    text-align: center;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
}

.my-crowns div {
    font-size: 1.5rem;
    margin: 0 0.2rem;
}

.crowns-legend {
    /* display: flex;
    justify-content: space-between; */
}

.fire, .calendar, .top-player, .lost-in-a-row  {
    margin-top: 10px;
}

.legend-crown {
    display: inline-block;
    width: 1.2rem;
    text-align: center;
}

.places {
    display: flex;

}

.places div:not(:last-child) {
    border-right: 3px solid #234875;
}

</style>
