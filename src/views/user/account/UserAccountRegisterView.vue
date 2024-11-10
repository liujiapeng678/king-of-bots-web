<template>
    <ContentField>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="register">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password"  type="password" class="form-control" id="password" placeholder="请输入密码">
                    </div>
                    <div class="mb-3">
                        <label for="confirmedPassword" class="form-label">确认密码</label>
                        <input v-model="confirmedPassword"  type="password" class="form-control" id="confirmedPassword" placeholder="请再次输入密码">
                    </div>
                    <div class="error-message">{{ error_message }}</div>
                    <button type="submit" class="btn btn-primary">登录</button>
                </form>
            </div>
        </div>
    </ContentField>
</template>
<script setup>
import ContentField from "@/components/ContentField.vue"
import { ref } from 'vue'
import $ from 'jquery'
import router from "@/router";

const username = ref("")
const password = ref("")
const confirmedPassword = ref("")
const error_message = ref("")
const register = () => {
    error_message.value = ""
    $.ajax({
        url: "http://localhost:3000/user/account/register/",
        type: "post",
        data: {
            username: username.value,
            password: password.value,
            confirmedPassword: confirmedPassword.value,
        },
        success(resp){
                if(resp.error_msg === "success"){
                    router.push("/user/account/login/")
                } else {
                    error_message.value = resp.error_msg
                }
            },
        error(resp){
            error_message.value = resp.error_msg
        }
    })
} 

</script>
<style scoped>
button{
    width: 100%;
}
div.error-message{
    color:red;
}
</style>