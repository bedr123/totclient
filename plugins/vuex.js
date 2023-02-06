import { createStore } from "vuex";
import guess from "@/store/guess.js"
import main from "@/store/main.js"
import style from "@/store/style.js"
import picture from "@/store/picture.js"

export const store = createStore({
  namespaced: true,
  modules: {
    guess: guess,
    main: main,
    style: style,
    picture: picture
  }
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
  // Install the store instance as a plugin

});