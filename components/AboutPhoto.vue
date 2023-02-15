<template>
    <div ref="aboutPhoto" class="container about-photo-container">
        <!-- <img src="@/assets/images/livada naljepnica.jpg" alt=""> -->
        <!-- <h1>{{ year }}</h1> -->
        <div class="box">
            <div ref="s1" class="input i1 green">
                {{ year[0] }}
            </div>
            <div ref="s2" class="input i2 green">
                {{ year[1] }}
            </div>
            <div ref="s3" class="input i3 green">
                {{ year[2] }}
            </div>
            <div ref="s4" class="input i4 green">
                {{ year[3] }}
            </div>
        </div>
        <p>
            {{ description }}
        </p>
        <a ref="link" target="_blank" :href="link">Learn More</a>
        <button @click="share" class="share">Share Result <img src="@/assets/images/share-fill.svg" /></button>
    </div>
</template>

<script>
export default {
  name: 'AboutPhoto',
  props: ['picture'],
  computed: {
    year() {
        return this.picture ? '' + this.picture.year : ''
    },
    description() {
        return this.picture ? this.picture.description : ''
    },
    link() {
        return this.picture ? this.picture.link : ''
    }
  },
  methods: {
    addClass(name) {
        document.querySelector(".about-photo-container").classList.add(name)
    },
    setMode(isDark) {
        if (isDark) {
            this.$refs.aboutPhoto.classList.add("dark-mode")
            this.$refs.link.classList.add("dark-mode")
        } else {
            this.$refs.aboutPhoto.classList.remove("dark-mode")
            this.$refs.link.classList.remove("dark-mode")
        }
    },
    share() {
        let tries = this.$store.state.guess.currGuesses
        let numOfPic = this.picture.num_of_pic
        let stats = tries
        if (localStorage.getItem('guess' + tries) != 'tttt') {
            stats = 'X'
        }
        if (navigator.share) {
            let newline = "\n"
            let result = ''
            for (let i = 0; i < tries; i++) {
                let temp = localStorage.getItem('guess' + (i + 1))
                for (let j = 0; j < 4; j++) {
                    if (temp[j] == 't') {

                        result = result + '🟩'
                    } else {
                        result = result + '🟥'
                    }
                }
                result = result + newline
            }
            navigator.share({
                title: 'Test Of Times',
                text: `Test Of Times #${ numOfPic } (${ stats }/3) ${ newline }${ result }`,
                url: 'https://testoftimes.com'
            })
        } else {
            let newline = "\n"
            let result = ''
            for (let i = 0; i < tries; i++) {
                let temp = localStorage.getItem('guess' + (i + 1))
                for (let j = 0; j < 4; j++) {
                    if (temp[j] == 't') {

                        result = result + '🟩'
                    } else {
                        result = result + '🟥'
                    }
                }
                result = result + newline
            }
            navigator.clipboard.writeText(`Test Of Times #${ numOfPic } (${ stats }/3) ${ newline }${ result } https://testoftimes.com`)
            this.$emit("showError", "Copied to clipboard")
            setTimeout(() => {
              this.$emit("hideError")
            }, 2000)
        }
    }
  }
}
</script>

<style scoped>
.container {
    pointer-events: none;
    opacity: 0;
    top: 0;
    position: absolute;
    max-width: 28.438rem;
    width: 100% !important;
    height: 100% !important;
    margin: 0 auto !important;
    transition: all 1000ms ease-out;
    /* max-width: 1000px;
    margin: 0 auto;
    margin-bottom: 20px; */
}

h1 {
    font-weight: bold;
    font-size: 1.75rem;
    text-align: center;
    margin-bottom: 10px;
}

p {
    font-size: 1rem;
    text-align: left;
    margin-top: 10px;
    margin-bottom: 5px;
}

img {
    display: block;
    width: 40%;
    margin: 0 auto;
    padding: 2px;
    margin-bottom: 5px;
}

a {
    font-size: .9rem;
    color: rgb(29, 52, 255);
    text-decoration: underline;
    text-align: left;
    display: block;
    margin-bottom: 5px;
}

a:hover {
    color: rgb(90, 106, 255);
}

.box {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
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

.i1, .i2, .i3, .i4 {
    margin-right: 4px;
}

.share {
    /* display: flex; */
    padding: 10px 0;
    width: 100%;
    font-size: 1rem;
    color: white;
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


.green {
    background-color: #3BB143;
    border: 2px solid #3BB143 !important;
    color: white;
}

.visible {
    pointer-events: all;
    position: static;
    opacity: 1;
}

/* .dark-mode {
    color: white;
}

.dark-mode a {
    color: rgb(191, 191, 191)
}
.dark-mode a:hover {
    color: white
} */
</style>
