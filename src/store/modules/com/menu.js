const state = {
  drawer: false,
  gradient: 'rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)',
  items: [
    { title: '메인', icon: 'mdi-home', to: { name: 'Home' } },
    {
      title: '시스템관리',
      icon: 'mdi-cog-outline',
      items: [
        { title: 'DATA 관리', icon: 'mdi-database', to: { name: 'Data' } },
        { title: '사용자관리', icon: 'mdi-account-settings', to: { name: 'User' } },
        { title: '조직관리', icon: 'mdi-domain', to: { name: 'Organization' } }
      ]
    },
    {
      title: '기본정보',
      icon: 'mdi-information-outline',
      items: [
        { title: '품목제원', icon: 'mdi-cart', to: { name: 'Part' } },
        { title: '일련번호', icon: 'mdi-tools', to: { name: 'Serial' } },
        { title: '항공기 현황', icon: 'mdi-airplane', to: { name: 'Aircraft' } },
        { title: '호기별 장착현황', icon: 'mdi-sitemap', to: { name: 'Bom' } }
      ]
    },
    {
      title: '항공기관리',
      icon: 'mdi-airplane',
      items: [
        { title: '결함관리', icon: 'mdi-beaker-question-outline', to: { name: 'Defect' } },
        { title: '정비관리', icon: 'mdi-tools', to: { name: 'Maint' } }
      ]
    },
    { title: '테이블', icon: 'mdi-table', to: { name: 'Table' } },
    // { title: '로그인', icon: 'mdi-login', to: '/login' },
    { title: '상품목록', icon: 'mdi-reproduction', to: { name: 'Product' } }
  ]
}
const getters = {
  getDrawer: state => state.drawer
}
const mutations = {
  setDrawer (state, data) {
    state.drawer = data
  }
}
const actions = {
  toggleDrawer ({ commit }, value) {
    commit('setDrawer', value)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
