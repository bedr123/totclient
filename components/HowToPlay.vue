<template>
    <div ref="overlay" class="overlay">
        <div class="modal">
            <img class="close" src="@/assets/images/close-line.svg" @click="$emit('closeHowToPlay')" alt="">
            <div class="title">
                <h3>How To Play</h3>
            </div>
            <div class="text">
                <p>Guess the year of the photo in 3 attempts.</p>
                <p>The colors of the tiles will change based on how close your guess was to the correct year.</p>
                <p>Examples</p>
                <div class="example">
                    <div class="example-box">
                        <div class="example-img">
                            <img src="@/assets/images/tile1.jpeg" alt="">
                        </div>
                        <div class="example-text">
                            <p>Correct Century | Incorrect Decade & Year</p>
                        </div>
                    </div>
                    <div class="example-box">
                        <div class="example-img">
                            <img src="@/assets/images/tile2.jpeg" alt="">
                        </div>
                        <div class="example-text">
                            <p>Correct Century & Decade | Incorrect Year</p>
                        </div>
                    </div>
                    <div class="example-box">
                        <div class="example-img">
                            <img src="@/assets/images/tile3.jpeg" alt="">
                        </div>
                        <div class="example-text">
                            <p>Correct Year & Puzzle Answer</p>
                        </div>
                    </div>
                </div>
                <p>A new photo is posted at 6am EST each day. Come back daily to learn more about history through photos and share your favorite photos with friends and family.</p>
                <p>Feedback or Inquiries?<br>Call or Text 978-846-2138</p>
                <div class="socials">
                    <a href="https://www.instagram.com/test_of_times/" target="_blank" class="instagram">
                        <img ref="instagram" src="@/assets/images/instagram-line.svg" alt="">
                    </a>
                    <a href="https://www.facebook.com/TestOfTimes1/" target="_blank" class="facebook">
                        <img ref="facebook" src="@/assets/images/facebook-fill.svg" alt="">
                    </a>
                    <a href="https://twitter.com/Test_Of_Times" target="_blank" class="twitter">
                        <img ref="twitter" src="@/assets/images/twitter-fill.svg" alt="">
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HowToPlay',
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
    padding: 2.5rem;
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

.title h3 {
    font-family: 'Tilt Warp', cursive;
}

ul {
    list-style-type: disc;
    margin-bottom: 20px;
}

ul li {
    font-family: 'Tilt Warp', cursive;
}

.text p {
    margin-bottom: 20px;
    text-align: left;
    font-family: 'Tilt Warp', cursive;
}

.text p:first-child {
    text-align: left;
}

.example {
    /* font-weight: bold; */
    margin-bottom: 0.938rem;
}

.example-box {
}

.example-text {
    margin-top: 10px;
    /* width: 200px; */
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

.socials {
    /* max-width: 125px; */
    /* width: 95%; */
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* margin-bottom: 20px; */
}

.socials img {
    max-width: none;
    width: 1.75rem;
    transition: all 300ms ease-out;
}

.facebook, .twitter {
    margin-left: 1rem;
}

.socials img:hover {
    margin-top: -10px;

}

@media screen and (max-width: 522px) {
    .example-text {
        /* width: 140px; */
    }
    img {
        /* width: 26px; */
    }
    /* html {
        font-size: 21px !important;
    } */

    .modal {
        /* height: fit-content; */
    }
}

/* 
.email-signup {
    text-align: left;
}

.email-signup a {
    text-decoration: none;
    font-weight: bold;
    color: rgb(51, 51, 227);
}

.email-signup a:hover {
    color: rgb(94, 94, 255);
} */

/* .dark-mode.overlay {
    background-color: rgba(255, 255, 255, 0.3);
}

.dark-mode .modal {
	background-color:#242424;
    box-shadow: 0px 0px 15px rgb(47, 47, 47);
}

.dark-mode .title, .dark-mode .text {
    color: white;
}

.dark-mode .email-signup a {
    color: rgb(131, 131, 255);
}

.dark-mode .email-signup a:hover {
    color: rgb(83, 83, 255);
} */
</style>
