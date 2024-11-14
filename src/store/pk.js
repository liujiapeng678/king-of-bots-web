export default {
  state: {
    status: "开始匹配",   //  表示未匹配,匹配成功表示正在pk
    socket: null,
    opponent_name: "",
    opponent_photo: "",
  },
  getters: {
  },
  mutations: {
    updateSocket(state, socket){
      state.socket = socket
    },
    updateOpponent(state, opponent){
      state.opponent_name = opponent.name
      state.opponent_photo = opponent.photo
    },
    updateStatus(state, status){
      state.status = status
    }
  },
  actions: {
  },
  modules: {
  }
}