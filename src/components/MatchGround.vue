<template>
    <div class="matchground">
       <div class="row">
        <div class="col-6">
            <div class="user-photo">
                <img :src="$store.state.user.photo" alt="用户头像">
            </div>
            <div class="user-name">
                {{ $store.state.user.username }}
            </div>
        </div>
        <div class="col-6">
            <div class="user-photo">
                <img :src="$store.state.pk.opponent_photo" alt="对手头像">
            </div>
            <div class="user-name">
                {{ $store.state.pk.opponent_name }}
            </div>
        </div>
        <div class="col-12" style="text-align: center; margin-top: 15vh;">
            <v-btn @click="switch_status" size="x-large" rounded="xl" elevation="24">
                <span v-if="$store.state.pk.status === '匹配中(再次点击取消)'" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {{ $store.state.pk.status }}
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
</style>