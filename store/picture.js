import axios from 'axios'

const state = () => ({
    picture: null,
    pictures: null
})

const getters = {
    picture(state) {
        return state.picture
    },
    pictures(state) {
        return state.pictures
    }
}

const mutations = {
    SET_PICTURE(state, data) {
        state.picture = data
    },
    SET_PICTURES(state, data) {
        state.pictures = data
        state.pictures.data = state.pictures.data.map((picture) => {
            picture.is_current = picture.is_current == 1 ? true : false
            return picture
        })
    }
}

const actions = {
    async getActivePicture(state) {
        const data = await axios.get("/api/pictures/active")
        state.commit("SET_PICTURE", data.data);
    },
    async getAllPictures(state) {
        try {
            console.log(3434)
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`
            const res = await axios.get("/api/pictures")
            state.commit("SET_PICTURES", res.data)
            console.log(res.data)
        } catch(e) {
            console.log(e)
        }
    },
    async createPicture(_, data) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`
        try {
            const res = await axios.post("/api/pictures", data)
            console.log(res)
            return
        } catch(e) {
            console.log(e)
        }
    },
    deletePicture(state, id) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`
        axios.delete("/api/pictures/" + id).then((res) => {
            // console.log(state)
            state.commit("SET_PICTURES", res.data)
        }).catch((e) => {
            console.log(e)
        })
    },
    async getPicture(_, id) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`
        return axios.get("/api/pictures/" + id)
        // .then(() => {
        //     //return res.data
        // }).catch((e) => {
        //     throw e
        // })
    },
    async editPicture(_, data) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`
        try {
            const res = await axios.post("/api/pictures/" + data.id, data.picture)
            console.log(res)
            return
        } catch(e) {
            console.log(e)
        }
    },
    activatePicture(state, id) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`
        axios.patch("/api/pictures/" + id).then((res) => {
            state.commit("SET_PICTURES", res.data)
        }).catch((e) => {
            console.log(e)
        })
    }
}


export default {
  state,
  getters,
  mutations,
  actions
}