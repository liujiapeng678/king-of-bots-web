import $ from 'jquery'

export default{
    state: {
        id: "",
        username: "",
        photo: "",
        token: "",
        is_login: false,
    },
    getters: {
    },
    mutations: {
        updateUser(state, user){
            state.id = user.id
            state.username = user.username
            state.photo = user.photo
            state.is_login = user.is_login
        },
        updateToken(state, token){
            state.token = token
        }
    },
    actions: {
        login(context, data){
            $.ajax({
                url: "http://localhost:3000/user/account/token/",
                type: "post",
                data: {
                  username: data.username,
                  password: data.password
                },
                success(resp){  
                  if(resp.error_msg === "success"){
                    context.commit("updateToken", resp.token)
                    data.success()
                  } else {
                    data.error()
                  }
                },
                error(){
                  data.error()
                }
              })
              
        }
    },
    modules: {
    }
}