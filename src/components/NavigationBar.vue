<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark"> <!-- dark控制黑色的导航栏 -->
        <div class="container"> <!-- 控制到两边的间距container-fluid-->
            <!-- <a class="navbar-brand" href="/">King Of Bots</a> a标签换成router link标签，点击切换不刷新 -->
            <router-link class="navbar-brand" :to="'/'">King Of Bots</router-link>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <!-- <a class="nav-link" aria-current="page" href="/pk/">对战</a> 使用active聚焦 -->
                        <router-link :class="route_path == '/pk/' ? 'nav-link active' : 'nav-link'"
                            :to="'/pk/'">对战</router-link>
                    </li>
                    <li class="nav-item">
                        <!-- <a class="nav-link" href="/record/">对局列表</a> -->
                        <router-link :class="route_path == '/record/' ? 'nav-link active' : 'nav-link'"
                            :to="'/record/'">对局列表</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :class="route_path == '/ranklist/' ? 'nav-link active' : 'nav-link'"
                            :to="'/ranklist/'">排行榜</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav" v-if="$store.state.user.is_login">
                    <li class="nav-item dropdown">
                        <a :class="route_path == '/user/bots/' ? 'nav-link dropdown-toggle active' : 'nav-link dropdown-toggle'"
                            data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">{{
                            $store.state.user.username }}</a>
                        <ul class="dropdown-menu">
                            <li><router-link class="dropdown-item" :to="'/user/bots/'">个人中心</router-link></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" @click="logout">退出</a></li>
                        </ul>
                    </li>
                </ul>
                <ul class="navbar-nav" v-else>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="'/user/account/login/'" role="button">
                            登录
                        </router-link>
                    </li>
                    <li class="nav-item">
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
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex';

const route = useRoute()
const route_path = computed(() => route.path)
const store = useStore()

const logout = () => {
    store.dispatch("logout")
    location.reload()
}

</script>
<style scoped></style>