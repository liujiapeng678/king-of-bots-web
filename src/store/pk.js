export default {
  state: {
    status: "开始匹配",   //  表示未匹配,匹配成功表示正在pk

    socket: null,

    opponent_name: "我的对手",
    opponent_photo: "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png",

    map: null,
    a_id: 0,
    a_sx: 0,
    a_sy: 0,
    b_id: 0,
    b_sx: 0,
    b_sy: 0,

    game_object: null,
  },
  getters: {
  },
  mutations: {
    updateStatus(state, status){
      state.status = status
    },

    updateSocket(state, socket){
      state.socket = socket
    },

    updateOpponent(state, opponent){
      state.opponent_name = opponent.name
      state.opponent_photo = opponent.photo
    },

    updateGame(state, game){
      state.map = game.map
      state.a_id = game.a_id
      state.a_sx = game.a_sx
      state.a_sy = game.a_sy
      state.b_id = game.b_id
      state.b_sx = game.b_sx
      state.b_sy = game.b_sy
    },
    updateGameObject(state, game_object){
      state.game_object = game_object
    }
  },
  actions: {
  },
  modules: {
  }
}