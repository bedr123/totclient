<template>
  <div>
    <ShareModal @closeShareModal="shareModal = false" v-if="shareModal" />
    <Header ref="navbar" @stats="stats = true" @howToPlay="howToPlay = true" />
    <div class="picture" v-if="picture">
      <div class="image">
          <img :src="picture.image" alt="">
      </div>
      <div class="year">
          <h2>{{ picture.year }}</h2>
      </div>
      <div class="description">
          <p>{{ picture.description }}</p>
      </div>
    </div>
    <!-- <Footer ref="footer" /> -->
    <Error ref="errorDialog" :error="error" />
    <HowToPlay ref="howToPlay" v-show="howToPlay" @closeHowToPlay="howToPlay = false" />
    <BuyTheGame ref="buyTheGame" v-show="buyTheGame" @closeBuyTheGame="buyTheGame = false" />
    <Stats ref="stats" v-show="stats" @closeStats="stats = false" />
  </div>
</template>

<script>
import Cookie from 'js-cookie'

export default {
  name: "ArchivePage",
  data() {
    return {
      stats: false,
      error: '',
      picture: null,
      howToPlay: false,
      buyTheGame: false,
      shareModal: false,
    }
  },
  created() {
    this.$store.dispatch("getPicture", this.$route.params.id).then((r) => {
      this.picture = r.data
    })
    if (Cookie.get('token')) {
      this.$store.dispatch('getMe')
    }
  },
  methods: {
    showError(error) {
      this.error = error
      this.$refs.errorDialog.showError()
    },
    hideError() {
      this.$refs.errorDialog.hideError()
    }
  }
}
</script>

<style>
.picture {
    padding-top: 60px;
    padding-bottom: 60px;
}

.image img {
    width: 100%;
}

.image {
    width: 90%;
    max-width: 500px;
    margin: 0 auto;
    margin-bottom: 20px;
}

.year {
    text-align: center;
    margin-bottom: 20px;
}

.year h2 {
    font-size: 2rem;
    font-weight: bold;
}

.description {
    width: 90%;
    max-width: 700px;
    margin: 0 auto;
}
</style>