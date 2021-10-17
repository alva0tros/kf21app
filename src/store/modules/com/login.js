import router from '@/router/index'
// import axios from 'axios'

const state = {
  userInfo: null,
  allUsers: [
    { id: 1, name: '1', user: '1', email: '1@gmail.com', password: '1' },
    { id: 2, name: '2', user: '2', email: '2@gmail.com', password: '2' }
  ],
  isLogin: false,
  isLoginError: false
}
const mutations = {
  // 로그인이 성공했을 때
  loginSuccess (state, payload) {
    state.isLogin = true
    state.isLoginError = false
    state.userInfo = payload
  },
  // 로그인이 실패했을 때
  loginError (state) {
    state.isLogin = false
    state.isLoginError = true
  },
  logout (state) {
    state.isLogin = false
    state.isLoginError = false
    state.userInfo = null
  }
}
const actions = {
  // 로그인 시도
  login ({ state, commit }, loginObj) {
  // login ({ commit }, loginObj) {
  //   axios
  //     .post('https://reqres.in/api/login', {
  //       email: loginObj.user,
  //       password: loginObj.password
  //     })
  //     .then(res => {
  //       const token = res.data.token
  //       const config = {
  //         headers: {
  //           'access-token': token
  //         }
  //       }
  //       axios
  //         .get('https://reqres.in/api/users/2', config)
  //         .then(response => {
  //           const userInfo = {
  //             id: response.data.data.id,
  //             first_name: response.data.data.first_name,
  //             last_name: response.data.data.last_name,
  //             avatar: response.data.data.avatar
  //           }
  //           commit('loginSuccess', userInfo)
  //           router.push({ name: 'Home' })
  //         })
  //         .catch(() => {
  //           commit('loginError')
  //         })
  //     })
  //     .catch(() => {
  //       commit('loginError')
  //     })
    let selected = null
    state.allUsers.forEach(u => {
      if (u.user === loginObj.user) selected = u
    })
    if (selected === null || selected.password !== loginObj.password) {
      commit('loginError')
    } else {
      commit('loginSuccess', selected)
      router.push({ name: 'Home' })
    }
  },
  logout ({ commit }) {
    commit('logout')
    router.push({ name: 'Login' })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
