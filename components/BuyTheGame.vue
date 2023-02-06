<template>
    <div ref="overlay" class="overlay">
        <div class="modal">
            <img src="@/assets/images/close-line.svg" @click="$emit('closeBuyTheGame')" alt="">
            <div class="title">
                <h3>Buy The Game</h3>
            </div>
            <div class="text">
                <p>Enjoy playing Test Of Time everyday?</p>
                <p>Now you can play the extended version with family and friends! With this virtual trivia game, you will have hours of fun competing against each-other whether it be at home, at the bar or in the classroom.</p>
                <a href="">Buy Now On Etsy</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'BuyTheGame',
  data() {
    return {
        isDarkMode: false
    }
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
    background-color: rgba(89, 89, 89, 0.5);
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 90%;
    max-width: 500px;
    height: 85vh;
    transform: translate(-50%, -50%);
    background-color: rgb(255, 255, 255);
    padding: 40px;
    overflow-y: auto;
    box-shadow: 0px 0px 15px rgb(84, 84, 84);
}

.modal img {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    transition: all 200ms ease-out;
}

.modal img:hover {
    transform: scale(1.2);
}

.title {
    text-align: left;
    margin: 0 auto;
    margin-bottom: 20px;
    font-size: 1.25rem;
    font-weight: bold;
}

.text p {
    margin-bottom: 20px;
    text-align: left;
}

.text p:first-child {
    text-align: left;
}

.text a {
    color: rgb(51, 51, 227);
    text-decoration: none;
    font-weight: bold;
}

.text a:hover {
    color: rgb(94, 94, 255);
}

.dark-mode.overlay {
    background-color: rgba(255, 255, 255, 0.3);
}

.dark-mode .modal {
	background-color:#242424;
    box-shadow: 0px 0px 15px rgb(47, 47, 47);
}

.dark-mode .title, .dark-mode .text {
    color: white;
}

.dark-mode .text a {
    color: rgb(131, 131, 255);
}

.dark-mode .text a:hover {
    color: rgb(83, 83, 255);
}
</style>
