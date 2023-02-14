<template>
    <div class="box">
        <div class="overlay">
        </div>
        <div class="container">
            <div @click="$emit('closeShareModal')" class="modal-close">
              <img src="@/assets/images/close-line.svg" alt="" srcset="">
            </div>
            <div class="modal-title">
              <h1>Share Your Result</h1>
            </div>
            <div class="modal-body">
                <a href="#" @click.prevent="facebookShare" class="share facebook"><img class="icon" src="@/assets/images/facebook-fill-light.svg" /></a>
                <a href="#" @click.prevent="twitterShare" class="share twitter"><img class="icon" src="@/assets/images/twitter-fill-light.svg" /></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ShareModal',
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    facebookShare() {
        location.href = "https://www.facebook.com/sharer/sharer.php?u=testoftimes.com&description=fe"
    },
    twitterShare() {
        let tries = this.$store.state.guess.currGuesses
        let newline = "%0A"
        let result = ''
        for (let i = 0; i < tries; i++) {
            let temp = localStorage.getItem('guess' + (i + 1))
                console.log(temp)
            for (let j = 0; j < 4; j++) {
                if (temp[j] == 't') {

                    result = result + '🟩'
                } else {
                    result = result + '🟥'
                }
            }
            result = result + newline
        }
        let text = `Test Of Times 1 ${ tries }/3${ newline }${ result }`
        
        let url = `http://twitter.com/share?text=${ text }&url=https://testoftimes.com&hashtags=testoftimes`
        window.open(url, '_blank');
    }
  }
}
</script>

<style scoped>
.box {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    z-index: 1;
}
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(49, 49, 49, 0.8);
}

.container {
    padding: 15px;
    width: fit-content;
    background-color: white;
    /* border-radius: 0.5em; */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    z-index: 2;
    width: 20rem;
    position: relative;
}

.modal-close {
    align-items: center;
    display: flex;
    justify-content: center;
    position: absolute;
    right: 1rem;
    top: 1rem;
  }

  .modal-close img {
      display: block;
    }

.modal-title {
    margin-bottom: 1.5rem;


  }
  .modal-title h1 {
      font-size: 1.25rem;
      font-weight: 600;
      line-height: normal;
    }

.modal-body {
    display: flex;
}

.modal-body a {
    display: block;
}

.share {
    cursor: pointer;
    padding: .7rem;
    background-color: #013068;
    color: white;
}

.facebook {
    margin-right: .7rem;
}

.icon {
    display: inline;
    width: 1.5rem;
}
</style>
