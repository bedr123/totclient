import axios from "axios";

const state = () => ({
    /* User */
    userName: 'kemao',
    userEmail: 'kemo@gmail.com',
    userAvatar: null,
    token: null,
    user: null,

    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,

    /* Sample data (commonly used) */
    clients: [
      { id: 19, avatar: "https://avatars.dicebear.com/v2/gridy/Howell-Hand.svg", login: "percy64", name: "Howell Hand", company: "Kiehn-Green", city: "Emelyside", progress: 70, created: "Mar 3, 2021" },
      { id: 11, avatar: "https://avatars.dicebear.com/v2/gridy/Hope-Howe.svg", login: "dare.concepcion", name: "Hope Howe", company: "Nolan Inc", city: "Paristown", progress: 68, created: "Dec 1, 2021" }, 
      { id: 32, avatar: "https://avatars.dicebear.com/v2/gridy/Nelson-Jerde.svg", login: "geovanni.kessler", name: "Nelson Jerde", company: "Nitzsche LLC", city: "Jailynbury", progress: 49, created: "May 18, 2021"},
      { id: 22, avatar: "https://avatars.dicebear.com/v2/gridy/Kim-Weimann.svg", login: "macejkovic.dashawn", name: "Kim Weimann", company: "Brown-Lueilwitz", city: "New Emie", progress: 38, created: "May 4, 2021" }
    ],
    history: [
      { amount: 375.53, name: "Home Loan Account", date: "3 days ago", type: "deposit", business: "Turcotte" },
      { amount: 470.26, name: "Savings Account", date: "3 days ago", type: "payment", business: "Murazik - Graham" }, 
      { amount: 971.34, name: "Checking Account", date: "5 days ago", type: "invoice", business: "Fahey - Keebler" }, 
      { amount: 374.63, name: "Auto Loan Account", date: "7 days ago", type: "withdrawal", business: "Collier - Hintz" }
    ]
  })

const mutations = {
  SET_TOKEN(state, data) {
    state.token = data
    localStorage.setItem('token', data)
  },
  SET_USER(state, data) {
    state.user = data
  }
}
const actions = {
  setUser(state, payload) {
    if (payload.name) {
      state.userName = payload.name;
    }
    if (payload.email) {
      state.userEmail = payload.email;
    }
    if (payload.avatar) {
      state.userAvatar = payload.avatar;
    }
  },
  fetch(sampleDataKey) {
    axios
      .get(`data-sources/${sampleDataKey}.json`)
      .then((r) => {
        if (r.data && r.data.data) {
          state[sampleDataKey] = r.data.data;
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  },
  async login(state, data) {
    try {
      const res = await axios.post("/api/login", data)
      state.commit("SET_TOKEN", res.data.token)
      state.commit("SET_USER", res.data.user)
      return
    } catch(e) {
      throw e
    }
  },
  logout(state) {
    state.commit("SET_TOKEN", null)
    state.commit("SET_USER", null)
  }
}

const getters = {
  isAuthenticated(state) {
    return state.token ? true : false
  }
}

export default {
    state,
    actions,
    mutations,
    getters
}