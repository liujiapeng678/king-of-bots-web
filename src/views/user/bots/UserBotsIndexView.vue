<template>
    <div class="container">
        <div class="row">
            <div class="col-3">
                <div class="card" style="margin-top: 20px;">
                    <div class="card-header">
                        <img :src="$store.state.user.photo" alt="个人头像" style="width: 100%;">
                    </div>
                    <div class="card-body">
                        <span>{{ signature }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor"
                            class="bi bi-pencil-square float-end change-signature" viewBox="0 0 16 16" @click="update_signature">
                            <path
                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="col-9">
                <div class="card" style="margin-top: 20px;">
                    <div class="card-header">
                        <span style="font-size: 130%;">我的Bots</span>
                        <span :style="'margin-left: 31vw; color: ' + default_sort_color + ';'" class="sort"
                            @click="default_sort">默认排序</span>
                        <span :style="'padding-left: 1vw; color: ' + rating_sort_color + ';'" class="sort"
                            @click="rating_sort">按天梯分排序 </span>
                        <span :style="'color: ' + up_color + ';'">↑</span>
                        <span :style="'color: ' + down_color + ';'">↓</span>
                        <v-btn data-bs-toggle="modal" elevation="24"
                               data-bs-target="#add-bot-modal" class="float-end">创建Bot</v-btn>
                        <!--通过id控制模态框-->
                        <!--modal-->
                        <div class="modal fade" id="add-bot-modal" tabindex="-1">
                            <div class="modal-dialog modal-xl">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5">创建Bot</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="mb-3">
                                            <label for="bot-name" class="form-label">名称</label>
                                            <input v-model="new_bot.name" type="text" class="form-control" id="bot-name"
                                                placeholder="请输入bot名称">
                                        </div>
                                        <div class="mb-3">
                                            <label for="bot-description" class="form-label">描述</label>
                                            <textarea v-model="new_bot.description" class="form-control"
                                                id="bot-description" rows="3" placeholder="请输入bot简介"></textarea>
                                        </div>
                                        <div class="mb-3">
                                            <label for="bot-code" class="form-label">代码</label>
                                            <VAceEditor v-model:value="new_bot.code" @init="editorInit" lang="c_cpp"
                                                theme="textmate" style="height: 300px" />
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <div class="error-message">{{ new_bot.error_message }}</div>
                                      <v-btn data-bs-dismiss="modal">关闭</v-btn>
                                      <v-btn @click="add_bot">创建</v-btn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--Bots列表-->
                    <div class="card-body">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>名称</th>
                                    <th>天梯分</th>
                                    <th>创建时间</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="bot in sorted_bots" :key="bot.id">
                                    <td>{{ bot.botName }}</td>
                                    <td>{{ bot.rating }}</td>
                                    <td>{{ bot.createTime }}</td>
                                    <td>
                                        <v-btn data-bs-toggle="modal"
                                               :data-bs-target="'#update-bot-modal' + bot.id" style="margin-right: 10px;">修改</v-btn>
                                        <!--修改的模态框-->
                                        <div class="modal fade" :id="'update-bot-modal' + bot.id" tabindex="-1">
                                            <div class="modal-dialog modal-xl">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5">修改Bot</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="mb-3">
                                                            <label for="bot-name" class="form-label">名称</label>
                                                            <input v-model="bot.botName" type="text"
                                                                class="form-control" id="bot-name"
                                                                placeholder="请输入bot名称">
                                                        </div>
                                                        <div class="mb-3">
                                                            <label for="bot-description" class="form-label">描述</label>
                                                            <textarea v-model="bot.description" class="form-control"
                                                                id="bot-description" rows="3"
                                                                placeholder="请输入bot简介"></textarea>
                                                        </div>
                                                        <div class="mb-3">
                                                            <label for="bot-code" class="form-label">代码</label>
                                                            <VAceEditor v-model:value="bot.code" @init="editorInit"
                                                                lang="c_cpp" theme="textmate" style="height: 300px" />
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <div class="error-message">{{ new_bot.error_message }}</div>
                                                        <v-btn data-bs-dismiss="modal">关闭</v-btn>
                                                        <v-btn @click="update_bot(bot)">保存修改</v-btn>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <v-btn data-bs-toggle="modal" :data-bs-target="'#remove-bot-modal' + bot.id">删除</v-btn>
                                        <!--删除的模态框-->
                                        <div class="modal fade" :id="'remove-bot-modal' + bot.id" tabindex="-1">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5">删除Bot</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="mb-3">
                                                            确认删除
                                                            <span style="color: red;">{{ bot.botName }}</span>
                                                            吗？
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <v-btn data-bs-dismiss="modal">取消</v-btn>
                                                        <v-btn @click="remove_bot(bot)">确认</v-btn>
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
import { useStore } from 'vuex';
import $ from 'jquery'
import { ref, onMounted, reactive } from 'vue'
import { Modal } from 'bootstrap/dist/js/bootstrap';
import { VAceEditor } from 'vue3-ace-editor';
import ace from 'ace-builds';

ace.config.set(
    "basePath",
    "https://cdn.jsdelivr.net/npm/ace-builds@" + require('ace-builds').version + "/src-noconflict/")

const store = useStore()
const bots = ref([])
const refresh_bots = () => {
    $.ajax({
        url: "http://localhost:3000/user/bot/getlist/",
        type: "get",
        headers: {
            Authorization: "Bearer " + store.state.user.token
        },
        success(resp) {
            bots.value = JSON.parse(JSON.stringify(resp))
            sorted_bots.value = JSON.parse(JSON.stringify(resp))
        },
        error(resp) {
            bots.value = JSON.parse(JSON.stringify(resp))
            sorted_bots.value = JSON.parse(JSON.stringify(resp))
        }
    })
}


const new_bot = reactive({
    name: "",
    description: "",
    code: "",
    error_message: ""
})
const add_bot = () => {
    new_bot.error_message = ""
    $.ajax({
        url: "http://localhost:3000/user/bot/add/",
        type: "post",
        headers: {
            Authorization: "Bearer " + store.state.user.token
        },
        data: {
            botName: new_bot.name,
            description: new_bot.description,
            code: new_bot.code,
        },
        success(resp) {
            if (resp.error_msg === "success") {
                new_bot.name = ""
                new_bot.description = ""
                new_bot.code = ""
                Modal.getInstance("#add-bot-modal").hide()   //  使用提供的api关闭模态框
                refresh_bots()
            } else {
                new_bot.error_message = resp.error_msg
            }
        },
    })
}


const remove_bot = (bot) => {
    $.ajax({
        url: "http://localhost:3000/user/bot/remove/",
        type: "post",
        headers: {
            Authorization: "Bearer " + store.state.user.token
        },
        data: {
            id: bot.id
        },
        success(resp) {
            if (resp.error_msg === "success") {
                Modal.getInstance("#remove-bot-modal" + bot.id).hide()
                refresh_bots()
            }
        }
    })
}


const update_bot = (bot) => {
    new_bot.error_message = ""
    $.ajax({
        url: "http://localhost:3000/user/bot/update/",
        type: "post",
        headers: {
            Authorization: "Bearer " + store.state.user.token
        },
        data: {
            id: bot.id,
            botName: bot.botName,
            description: bot.description,
            code: bot.code,
        },
        success(resp) {
            if (resp.error_msg === "success") {
                Modal.getInstance("#update-bot-modal" + bot.id).hide()
                refresh_bots()
            } else {
                new_bot.error_message = resp.error_msg
            }
        },
    })
}

//   排序
const sorted_bots = ref([])
const default_sort_color = ref("black")
const rating_sort_color = ref("gray")
const up_color = ref("gray")
const down_color = ref("gray")
const default_sort = () => {
    if (default_sort_color.value === "gray") {
        default_sort_color.value = "black"
        rating_sort_color.value = "gray"
        up_color.value = "gray"
        down_color.value = "gray"
    }
    sorted_bots.value = JSON.parse(JSON.stringify(bots.value))
}
const rating_sort = () => {
    if (default_sort_color.value === "black") {
        rating_sort_color.value = "black"
        up_color.value = "black"
        default_sort_color.value = "gray"
    } else {
        [up_color.value, down_color.value] = [down_color.value, up_color.value]
    }
    if (up_color.value === "black") {
        sorted_bots.value.sort((a, b) => b.rating - a.rating)
    } else {
        sorted_bots.value.sort((a, b) => a.rating - b.rating)
    }
}

// 个性签名

const signature = ref("")
const get_signature = () => {
    $.ajax({
        url: "http://localhost:3000/user/bot/getsignature/",
        type: "get",
        headers: {
            Authorization: "Bearer " + store.state.user.token
        },
        success(resp) {
            signature.value = resp.signature
        },
    })
}
const update_signature = () => {
    alert("谁允许你改的")
} 

onMounted(() => {
    refresh_bots()
    get_signature()
})
</script>
<style scoped>
div.error-message {
    color: red;
}

.sort:hover {
    cursor: pointer;
    user-select: none;
}
.change-signature:hover{
    color: blue;
    cursor: pointer;
    user-select: none;
}
</style>