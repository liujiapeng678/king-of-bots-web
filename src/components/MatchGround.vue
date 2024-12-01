<template>
    <div class="matchground">
       <div class="row">
        <div class="col-4">
            <div class="user-photo">
                <img :src="$store.state.user.photo" alt="用户头像">
            </div>
            <div class="user-name">
                {{ $store.state.user.username }}
            </div>
        </div>
         <div class="col-4" style="display: flex;justify-content: center;align-items: center;">
           <img src="http://liujiapeng.tj.cn:8080/wp-content/uploads/2024/11/vs.png" style="width: 10vw;" alt="vs图片">
         </div>
        <div class="col-4">
            <div class="user-photo">
                <img :src="$store.state.pk.opponent_photo" alt="对手头像">
            </div>
            <div class="user-name">
                {{ $store.state.pk.opponent_name }}
            </div>
        </div>
        <div class="col-4" style="margin-top: 14vh; display: flex;justify-content: flex-end;padding-right: 0;">
            <v-btn @click="switch_status" class="custom-btn-left">
                <v-icon>mdi-sword-cross</v-icon>&nbsp;
                <span v-if="$store.state.pk.status === '匹配中(再次点击取消)'" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {{ $store.state.pk.status }}
            </v-btn>
        </div>
         <div class="col-4" style="padding-left: 0.5px;padding-right:0.5px;">
           <v-select
               label="选择出战人员"
               :items="items"
               variant="solo"
               rounded="0"
               style="margin-top: 14vh;"
               v-model="$store.state.pk.selected_bot"
               :readonly="is_readonly"
           >
             <template v-slot:append-item>
               <v-divider class="mb-2"></v-divider>
               <v-list-item
                   :subtitle="subtitle"
                   :title="title"
                   disabled
               >
                 <template v-slot:prepend>
                   <v-avatar color="primary" icon="mdi-robot-confused-outline"></v-avatar>
                 </template>
               </v-list-item>
             </template>
           </v-select>
         </div>
         <div class="col-4" style="margin-top: 14vh; display: flex;justify-content: flex-start;padding-left: 0;">
           <v-btn @click="switch_status" class="custom-btn-right">
             <span v-if="$store.state.pk.status === '匹配中(再次点击取消)'" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
             {{ $store.state.pk.status }}
             &nbsp;<v-icon>mdi-sword-cross</v-icon>
           </v-btn>
         </div>
       </div>
    </div>
</template>
<script setup>
import { useStore } from 'vuex';
import {onMounted, ref} from "vue";
import $ from "jquery";

const store = useStore()
const switch_status = () => {
    if(store.state.pk.status === "开始匹配"){
        is_readonly.value = true;
        store.commit("updateStatus", "匹配中(再次点击取消)")
        store.state.pk.socket.send(JSON.stringify({
            event: "start-match",
            bot_id: store.state.pk.selected_bot
        }))
    } else if(store.state.pk.status === "匹配中(再次点击取消)") {
        is_readonly.value = false;
        store.commit("updateStatus", "开始匹配")
        store.state.pk.socket.send(JSON.stringify({
            event: "stop-match"
        }))
    }
}

const is_readonly = ref(false)
const items = ref([{title: "亲自上阵", value: -1}])
const bots = ref([])
const refresh_items = () => {
  $.ajax({
    url: "http://localhost:3000/user/bot/getlist/",
    type: "get",
    headers: {
      Authorization: "Bearer " + store.state.user.token
    },
    success(resp) {
      bots.value = resp
      for(let bot of bots.value){
        const new_item = {title: bot.botName, value: bot.id}
        items.value.push(new_item)
      }
    },
    error(resp) {
      bots.value = resp
      for(let bot of bots.value){
        const new_item = {title: bot.botName, value: bot.id}
        items.value.push(new_item)
      }
    }
  })
}
const title = '还没有bot？'
const subtitle = '去个人中心创建你的第一个机器人！'

onMounted(()=>{
  refresh_items()
})
</script>
<style scoped>
div.matchground{
   width: 60vw;
   height: 70vh;
   margin: 40px auto;
   background: rgba(50, 50, 50, 0.5);
}
div.user-photo{
    text-align: center;
    margin-top: 10vh;
}
div.user-photo > img{
    border-radius: 50%;
    width: 20vh;
}
div.user-name{
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    color: white;
    margin-top: 2vh;
}
.custom-btn-left{
  /* 左上角圆角 */
  /* 左下角圆角 */
  /* 右上角方角 */
  /* 右下角方角 */
  border-radius: 20px 0 0 20px;
  height: 56px;
  min-height: 56px;
  font-size: 18px;
}
.custom-btn-right{
  border-radius: 0 20px 20px 0;
  height: 56px;
  min-height: 56px;
  font-size: 18px;
}
</style>