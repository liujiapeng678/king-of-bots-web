<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-8">
                <div class="card" style="margin-top: 20px; ">
                    <div class="card-header">
                        <span style="font-size: 130%;">我的好友</span>
                    </div>
                    <div class="card-body">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">头像</th>
                                    <th scope="col">姓名</th>
                                    <th scope="col">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(friend, index) in friends" :key="friend.id">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>
                                        <img :src="friend.photo" alt="好友头像" style="width: 2vw;">
                                    </td>
                                    <td>{{ friend.username }}</td>
                                    <td><button type="button" class="btn btn-secondary ">聊天</button></td>
                                    <td><button type="button" class="btn btn-link">查看详情</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import $ from 'jquery'
import { useStore } from "vuex";

const store = useStore()
const friends = ref([])
const refresh_friends = () => {
    $.ajax({
        url: "http://localhost:3000/friends/getlist/",
        type: "get",
        headers: {
            Authorization: "Bearer " + store.state.user.token
        },
        success(resp) {
            console.log(resp)
            friends.value = resp
        },
    })
    
    console.log(friends)
}


onMounted(() => {
    refresh_friends()
})
</script>
<style></style>