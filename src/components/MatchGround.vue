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
        <div class="col-5" style="margin-top: 14vh; display: flex;justify-content: flex-end;padding-right: 0;">
            <v-btn @click="switch_status" class="custom-btn-left">
                <v-icon>mdi-sword-cross</v-icon>&nbsp;
                <span v-if="$store.state.pk.status === '匹配中(再次点击取消)'" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {{ $store.state.pk.status }}
            </v-btn>
        </div>
         <div class="col-2" style="padding-left: 1px;padding-right:1px;">
           <v-select
               clearable
               label="选择出战人员"
               :items="[]"
               variant="solo"
               rounded="0"
               style="margin-top: 14vh;"
           ></v-select>
         </div>
         <div class="col-5" style="margin-top: 14vh; display: flex;justify-content: flex-start;padding-left: 0;">
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

const store = useStore()
const switch_status = () => {
    if(store.state.pk.status === "开始匹配"){
        store.commit("updateStatus", "匹配中(再次点击取消)")
        store.state.pk.socket.send(JSON.stringify({
            event: "start-match"
        }))
    } else if(store.state.pk.status === "匹配中(再次点击取消)") {
        store.commit("updateStatus", "开始匹配")
        store.state.pk.socket.send(JSON.stringify({
            event: "stop-match"
        }))
    }
}

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