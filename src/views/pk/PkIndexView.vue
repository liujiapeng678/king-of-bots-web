<template>
  <div class="container" v-if="goToPlayGround">
    <div class="row">
      <div class="col-4" style="margin-top:45px;">
        <div class="card">
          <div class="card-header">
            我方：{{$store.state.pk.me}}
          </div>
          <div class="card-body">
            对话框
          </div>
        </div>
      </div>
      <div class="col-8">
        <PlayGround />
      </div>
    </div>
  </div>
    <MatchGround v-if="!goToPlayGround" />
    <ResultBoard v-if="$store.state.pk.loser !== 'none'" :message="goToPlayGround" @set_goToPlayGround="set_goToPlayGround"/>
</template>
<script setup>
import PlayGround from '@/components/PlayGround.vue'
import MatchGround from '@/components/MatchGround.vue';
import ResultBoard from "@/components/ResultBoard.vue";
import { onMounted, onUnmounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const socketUrl = `ws://localhost:3000/websocket/${store.state.user.token}/`
let socket = null
const goToPlayGround = ref(false)
const set_goToPlayGround = (new_goToPlayGround) => {
  goToPlayGround.value = new_goToPlayGround
}

onMounted(()=>{
    socket = new WebSocket(socketUrl)
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
            store.commit("updateGame", data.game)
            store.commit("updateMe", data.me)
            setTimeout(()=>{
                goToPlayGround.value = true
            }, 2000)
        } else if(data.event === "move"){
            const game = store.state.pk.game_object
            const [snakeA, snakeB] = game.snakes
            snakeA.set_direction(data.a_move)
            snakeB.set_direction(data.b_move)
        } else if(data.event === "result"){
          const game = store.state.pk.game_object
          const [snakeA, snakeB] = game.snakes
          if(data.loser === "all" || data.loser === "A"){
            snakeA.status = "die"
          }
          if(data.loser === "all" || data.loser === "B"){
            snakeB.status = "die"
          }
          store.commit("updateLoser", data.loser)
        }
    }
    socket.onclose = () => {
        console.log("与服务器连接断开")
    }
})
onUnmounted(()=>{
    socket.close()
    goToPlayGround.value = false
    store.commit("updateStatus", "开始匹配")
    store.commit("updateSocket", null)
    store.commit("updateOpponent", {
      name:"我的对手",
      photo:"https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png"
    })
})
</script>
<style scoped>

</style>
