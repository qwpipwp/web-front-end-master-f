import { createStore } from 'vuex';
import VuexPersist from 'vuex-persist';
import router from '@/router/index.js';
import { userLoginReq } from '@/service/userServ.js'



const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

const store = createStore({
  state() {
    return {
      loggedIn: false,
      username: "",
      role: "",
      jwtToken: "",
      routerName: "",
      list: [],
      closechoose: false,
    }
  },
  mutations: {
    navi(state, data) {
      state.list = data
    },
    setRouterName(state, val) {
      state.routerName = val
    },
    login(state, { username, jwtToken, role }) {
      state.loggedIn = true,
        state.username = username,
        state.jwtToken = jwtToken,
        state.role = role
    },
    logout(state) {
      state.loggedIn = false,
        state.username = "",
        state.jwtToken = "",
        state.list = [],
        state.role = ""
    },
    close(state){
      state.closechoose = true
    }
  },
  actions: {
    login({ commit }, { username, password, role }) {
      return userLoginReq(username, password)
        .then((jwtToken) => {
          commit('login', { username, jwtToken, role })

          if (role == '管理员') {
            router.push('/Homepage/Student')
          }
          else {
            router.push('/Homepage')
          }


        })
    }
  },
  plugins: [vuexLocalStorage.plugin]
});

export { store }