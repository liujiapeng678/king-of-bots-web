<template>
    <PlayGround v-if="goToPlayGround" />
    <MatchGround v-if="!goToPlayGround" />
</template>
<script setup>
import PlayGround from '@/components/PlayGround.vue'
import MatchGround from '@/components/MatchGround.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const socketUrl = `ws://localhost:3000/websocket/${store.state.user.token}/`
let socket = null
const goToPlayGround = ref(false)


onMounted(()=>{
    socket = new WebSocket(socketUrl)
    store.commit("updateOpponent", {
        name: "我的对手",
        photo: "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png"
    })
    socket.onopen = () => {
        console.log("与服务器建立连接")
        store.commit("updateSocket", socket)
    }
    socket.onmessage = message => {
        const data = JSON.parse(message.data)
        if(data.event === "match-found"){
            store.commit("updateOpponent", {
                name: data.opponent_name,
                photo: data.opponent_photo
            })
            store.commit("updateStatus", "匹配成功")
            store.commit("updateGameMap", data.game_map)
            setTimeout(()=>{
                goToPlayGround.value = true
            }, 2000)
        }
        console.log(data)
    }
    socket.onclose = () => {
        console.log("与服务器连接断开")
    }
})
onUnmounted(()=>{
    socket.close()
    goToPlayGround.value = false
    store.commit("updateStatus", "开始匹配")
})
</script>
<style scoped>

</style>
