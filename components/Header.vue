<template>
    <div ref="navbarCon" class="header-container">
        <a href="" @click.prevent="$emit('stats')" class="cart buythegame"><img src="@/assets/images/bar-chart-2-line.svg" alt=""></a>
        <a ref="text1" href="" @click.prevent="$emit('stats')" class="text-left link buythegame">Statistics</a>
        <div class="logo">
            <a ref="text2" href="/">
                <img src="@/assets/images/TestOfTimesLogo.jpg" alt="">
            </a>
        </div>
            <a href="" @click.prevent="$emit('howToPlay')" class="qmark"><img src="@/assets/images/question-line.svg" alt=""></a>
            <a ref="text3" href="" @click.prevent="$emit('howToPlay')" class="text-right link">How To Play</a>
            <!-- <ColorMode /> -->
    </div>
</template>

<script>
export default {
  name: 'MainHeader',
  methods: {
    setMode(isDark) {
        if (isDark) {
            this.$refs.navbarCon.classList.add("dark-mode")
            this.$refs.text1.classList.add("light-text")
            this.$refs.text2.classList.add("light-text")
            this.$refs.text3.classList.add("light-text")
        } else {
            this.$refs.navbarCon.classList.remove("dark-mode")
            this.$refs.text1.classList.remove("light-text")
            this.$refs.text2.classList.remove("light-text")
            this.$refs.text3.classList.remove("light-text")
        }
    }
  }
}
</script>

<style scoped>
.header-container {
    position: relative;
    width: 100%;
    padding: 0 2rem;
    height: 100px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(255, 255, 255);
    color: #1A120B;
    margin-bottom: 25px;
    border-bottom: 1px solid rgb(211, 211, 211);
    /* border-bottom: #F0DBDB 4px solid; */
}

.logo {
    width: 21.875rem;
}

.logo img {
    width: 100%;
}
/* 
.nav {
    width: 21.875rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
} */

.logo a {
    font-size: 1.5rem;
    text-decoration: none;
    color: #1A120B;
}

.link {
    font-size: 1rem;
    color: #1A120B;
    text-decoration: none;
    font-weight: bold;
}

.link:hover {
    color: #5e5e5e;
}

.cart, .qmark {
    display: none;
}

/* .text-left, .text-right {
	margin-left: 1rem;
} */

.dark-mode {
	background:#242424;
    color: #ffffff;
    border-bottom: 1px solid #676767;
}

.light-text {
    color: white !important;
}

.nav .light-text:hover {
    color: rgb(220, 219, 219) !important;
}

/* .buythegame {
    visibility: hidden;
    pointer-events: none;
} */

@media screen and (max-width: 500px) {
    .nav {
        width: 20rem;
    }
    .text-left, .text-right {
        display: none;
    }
    .cart, .qmark {
        display: block;
    }
}
</style>
