import { store } from '@/plugins/vuex'

export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  // if (typeof window !== 'undefined') {
  //   store.commit("SET_TOKEN", localStorage.getItem('token'))
  // }
  if (store.getters.isAuthenticated === false) {
    return navigateTo('/admin/login')
  }
})