<template>
  <div class="result-board">
    <div class="result-board-text" v-if="$store.state.pk.loser === 'all'">
      Draw!
    </div>
    <div class="result-board-text" v-else-if="$store.state.pk.loser === 'A' && $store.state.pk.me === '红'">
      You Win!
    </div>
    <div class="result-board-text" v-else-if="$store.state.pk.loser === 'B' && $store.state.pk.me === '蓝'">
      You Win!
    </div>
    <div class="result-board-text" v-else>
      You Lose!
    </div>
    <div class="result-board-btn">
      <v-btn size="x-large" elevation="12" @click="fire_again">
        再来一局!
      </v-btn>
      &nbsp;
      <v-btn size="x-large" elevation="12" @click="go_back">
        返回
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "vuex";

const props = defineProps({
  goToPlayGround: Boolean
});
const emit = defineEmits(["set_goToPlayGround"]);
const store = useStore();
const fire_again = () => {
  emit("set_goToPlayGround", props.goToPlayGround)
  store.commit("updateLoser", "none")
  store.commit("updateOpponent", {
    name:"我的对手",
    photo:"https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png"
  })
  store.commit("updateStatus", "匹配中(再次点击取消)")
  store.state.pk.socket.send(JSON.stringify({
    event: "start-match"
  }))
}
const go_back = () => {
  emit("set_goToPlayGround", props.goToPlayGround)
  store.commit("updateLoser", "none")
  store.commit("updateOpponent", {
    name:"我的对手",
    photo:"https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png"
  })
  store.commit("updateStatus", "开始匹配")
}
</script>

<style scoped>
.result-board{
  height: 30vh;
  width: 30vw;
  background-color: rgba(50, 50, 50, 0.5);
  position: absolute;
  top: 30vh;
  left: 35vw;
}
.result-board-text{
  text-align: center;
  color: white;
  font-size: 50px;
  font-weight: 600;
  font-style: italic;
  padding-top: 5vh;
}
.result-board-btn{
  text-align: center;
  padding-top: 7vh;
}
</style>