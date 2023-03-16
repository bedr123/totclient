import { store } from '@/plugins/vuex'
import Cookie from 'js-cookie'

export default defineNuxtRouteMiddleware((to, from) => {
  if (Cookie.get('token')) {
    store.commit("SET_TOKEN", Cookie.get('token'))
  }
  if (Cookie.get("user")) {
    store.commit("SET_USER", JSON.parse(Cookie.get("user")))
  }

  setTimeout(() => {
    if (store.getters.isAuthenticated === false || store.getters.isAdmin === false) {
      location.replace('/admin/login')
    }
  },50)
})