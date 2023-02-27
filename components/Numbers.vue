<template>
    <div ref="numbers" class="container numbers-container">
        <div class="kb">
          <div class="numbers">
              <div class="number" v-for="number in numbers" :key="number" @click="type(number)" :ref="`num${ number }`">{{ number }}</div>
          </div>
          <div ref="delete" class="erase-btn" @click="deleteNum">
              <img src="@/assets/images/delete-back-2-line.svg" alt="">
          </div>
        </div>
        <div ref="enter" @click="$emit('guessYear')" class="enter-btn">
            <div>ENTER</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'NumbersKeyboard',
  data () {
    return {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      isDarkMode: false
    }
  },
  methods: {
    type (num) {
      this.$store.commit('type', num)
    },
    deleteNum () {
      this.$store.commit('deleteNum')
    },
    addClass(name) {
      document.querySelector(".numbers-container").classList.add(name)
    }
  }
}
</script>

<style scoped>
.container {
    width: 100%;
    max-width: fit-content;
    margin: 0 auto;
    font-size: 1.5rem;
    color: #1A120B;
}

.kb {
    display: flex;
}

.numbers {
    display: flex;
}

.number {
    padding: 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: white;
    margin-right: 1px;
    background-color: #013068;
    transition: all 200ms ease-out;
}
.enter-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 10px;
    font-size: .75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 900;
    cursor: pointer;
    color: white;
    margin-top: 1px;  
    background-color: #013068;
    transition: all 200ms ease-out;
}

.erase-btn {
    padding: 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 2px solid #ffffff; */
    cursor: pointer;
    color: white;
    background-color: #013068;
    transition: all 200ms ease-out;
}

.erase-btn img {
  width: 1.25rem;
  height: 1.25rem;
}

.number:hover, .enter-btn:hover, .erase-btn:hover {
    background-color: #234875;
}

.unvisible {
    display: none;
}

@media screen and (max-width: 624px) {
  .number {
    padding: 10px 10px;
  }
  .enter-btn {
    padding: 10px 10px;
    font-size: .75rem;
  }

  .erase-btn {
    padding: 10px 10px;
  }

}

@media screen and (max-width: 395px) {
  .number {
    padding: 10px 9px;
  }
  .enter-btn {
    padding: 10px 9px;
    font-size: .75rem;
  }

  .erase-btn {
    padding: 10px 9px;
  }
}

@media screen and (max-width: 323px) {
  /* .container {
    flex-direction: column;
  } */

  /* .enter-btn {
    padding: 0;
    width: 40px;
    height: 25px;
    margin: 0 auto;
    margin-bottom: 1px;
  }

  .erase-btn {
    padding: 0;
    width: 30px;
    height: 25px;
    margin: 0 auto;
    margin-top: 1px;
  } */
}
</style>
