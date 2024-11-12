<template>
    <div class="container">
        <div class="row">
            <div class="col-3">
                <div class="card" style="margin-top: 20px;">
                    <div class="card-body">
                        <img :src="$store.state.user.photo" alt="个人头像" style="width: 100%;">
                    </div>
                </div>
            </div>
            <div class="col-9">
                <div class="card" style="margin-top: 20px;">
                    <div class="card-header">
                        <span style="font-size: 130%;">我的Bots</span>
                        <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal"
                            data-bs-target="#add-bot-modal">创建Bot</button>
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
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">关闭</button>
                                        <button type="button" class="btn btn-primary" @click="add_bot">创建</button>
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
                                    <th>创建时间</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="bot in bots" :key="bot.id">
                                    <td>{{ bot.botName }}</td>
                                    <td>{{ bot.createTime }}</td>
                                    <td>
                                        <button type="button" class="btn btn-secondary" style="margin-right: 10px;"
                                            data-bs-toggle="modal"
                                            :data-bs-target="'#update-bot-modal' + bot.id">修改</button>
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
                                                            <VAceEditor v-model:value="bot.code"
                                                                @init="editorInit" lang="c_cpp" theme="textmate"
                                                                style="height: 300px" />
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <div class="error-message">{{ new_bot.error_message }}</div>
                                                        <button type="button" class="btn btn-secondary"
                                                            data-bs-dismiss="modal">关闭</button>
                                                        <button type="button" class="btn btn-primary"
                                                            @click="update_bot(bot)">保存修改</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" class="btn btn-danger"
                                            @click="remove_bot(bot)">删除</button>
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
            bots.value = resp
        },
        error(resp) {
            bots.value = resp
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

onMounted(() => {
    refresh_bots()
})
</script>
<style scoped>
div.error-message {
    color: red;
}
</style>