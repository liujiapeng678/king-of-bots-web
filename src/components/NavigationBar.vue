<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark"> <!-- dark控制黑色的导航栏 -->
        <div class="container"> <!-- 控制到两边的间距container-fluid-->
            <!-- <a class="navbar-brand" href="/">King Of Bots</a> a标签换成router link标签，点击切换不刷新 -->
            <img src="http://liujiapeng.tj.cn:8080/wp-content/uploads/2024/11/favicon.png" style="width: 2vw">
            &nbsp;&nbsp;
            <router-link class="navbar-brand" :to="'/'">King Of Bots</router-link>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <!-- <a class="nav-link" aria-current="page" href="/pk/">对战</a> 使用active聚焦 -->
                        <router-link :class="route_path === '/pk/' ? 'nav-link active active-under-line' : 'nav-link'"
                            :to="'/pk/'">
                          对战
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <!-- <a class="nav-link" href="/record/">对局列表</a> -->
                        <router-link :class="route_path === '/record/' ? 'nav-link active active-under-line' : 'nav-link'"
                            :to="'/record/'">
                          对局列表
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :class="route_path === '/ranklist/' ? 'nav-link active active-under-line' : 'nav-link'"
                            :to="'/ranklist/'">
                          排行榜
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :class="route_path === '/friends/' ? 'nav-link active active-under-line' : 'nav-link'"
                            :to="'/friends/'">
                          我的好友
                        </router-link>
                    </li>
                </ul>
              <ul class="navbar-nav" v-if="$store.state.user.is_login">
                <v-menu transition="scale-transition" open-on-hover>
                  <template v-slot:activator="{ props }">
                    <img v-bind="props" :src="$store.state.user.photo" alt="个人头像" class="personal-avatar">
                  </template>
                  <v-list>
                    <div style="text-align: center;font-style: italic;font-weight: bolder;">{{$store.state.user.username }}</div>
                    <v-list-item>
                      <v-btn variant="text">
                        <router-link class="nav-link" :to="'/user/bots/'">个人中心</router-link>
                      </v-btn>
                    </v-list-item>
                    <v-list-item>
                      <v-btn variant="text" @click="logout">
                        退出
                      </v-btn>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </ul>
              <ul class="navbar-nav" v-else>
                <li :class="route_path === '/user/account/login/' ? 'nav-item active' : 'nav-item'">
                  <router-link class="nav-link" :to="'/user/account/login/'" role="button">
                    登录
                  </router-link>
                </li>
                <li :class="route_path === '/user/account/register/' ? 'nav-item active' : 'nav-item'">
                  <router-link class="nav-link" :to="'/user/account/register/'" role="button">
                    注册
                  </router-link>
                </li>
              </ul>
            </div>
        </div>
    </nav>
</template>
<script setup>
import {useRoute} from 'vue-router'
import {computed} from 'vue'
import {useStore} from 'vuex';

const route = useRoute()
const route_path = computed(() => route.path)
const store = useStore()

const logout = () => {
  store.dispatch("logout")
  location.reload()
}

</script>
<style scoped>
.active-under-line {
  position: relative; /* 确保 :after 伪元素相对于这个元素定位 */
  padding: 10px 20px;
}

.active-under-line::after {
  content: ''; /* 必须设置，否则 :after 不会显示 */
  position: absolute;
  bottom: 0;
  left: 10%;
  width: 80%; /* 横线宽度 */
  height: 2px; /* 横线高度 */
  background-color: white; /* 横线颜色 */
}
.personal-avatar{
  width: 2.5vw; border-radius: 50%;
}
.personal-avatar:hover{
  cursor: pointer;
}
.nav-item{
  color: gray;
}
.active{
  color: #c8c9c7;
}
</style>