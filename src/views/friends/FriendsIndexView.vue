<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-8">
                <div class="card" style="margin-top: 20px; ">
                    <div class="card-header">
                        <span style="font-size: 130%;">好友列表</span>
                    </div>
                    <div class="card-body">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(friend, index) in friends" :key="friend.id">
                                    <th scope="row" style="width: 3vw;">{{ index + 1 }}</th>
                                    <td style="width: 5vw;">
                                        <img :src="friend.photo" alt="好友头像" style="width: 3.5vw; border-radius: 50%;">
                                    </td>
                                    <td>
                                        <div class="friend-name">{{ friend.username }}</div>
                                        <div style="font-size: small;">{{ friend.signature }}</div>
                                    </td>
                                    <td style="width: 4vw; padding-right: 0%;"><button type="button"
                                            class="btn btn-light btn-outline-dark" style="margin-top: 11px;">聊天</button>
                                    </td>
                                    <td style="width: 5vw;">
                                        <button type="button" class="btn btn-outline-dark btn-light"
                                            style="margin-top: 11px;" data-bs-toggle="modal"
                                            :data-bs-target="'#delete-friend-modal' + friend.id">删除</button>
                                        <!--删除的模态框-->
                                        <div class="modal fade" :id="'delete-friend-modal' + friend.id" tabindex="-1">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5">删除好友</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="mb-3">
                                                            确认删除
                                                            <span style="color: red;">{{ friend.username }}</span>
                                                            吗？
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary"
                                                            data-bs-dismiss="modal">取消</button>
                                                        <button type="button" class="btn btn-danger"
                                                            @click="delete_friend(friend.id)">确认</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
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
import { Modal } from 'bootstrap/dist/js/bootstrap';
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
const delete_friend = (friend_id) => {
    $.ajax({
        url: "http://localhost:3000/friends/remove/",
        type: "post",
        data: {
            friendId: friend_id
        },
        headers: {
            Authorization: "Bearer " + store.state.user.token
        },
        success(resp) {
            if (resp.error_msg === "success") {
                Modal.getInstance("#remove-friend-modal" + friend_id).hide()
                alert("删除成功")
                refresh_friends()
            }
        },
    })
}

onMounted(() => {
    refresh_friends()
})
</script>
<style scoped>
.friend-name {
    font-weight: bold;
    font-size: larger;
    position: relative;
    display: inline-block;
}

.friend-name:hover {
    cursor: pointer;
}

.friend-name:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
    /*从哪边出现*/
    height: 2px;
    /*出现时停止时的宽度*/
}

.friend-name::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #000000;
    /* 横线的颜色 */
    transform-origin: bottom right;
    /*消失的时候向那边消失*/
    transition: transform 0.1s ease-out;
}
</style>