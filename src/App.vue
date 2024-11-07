<template>
    <NavigationBar />
    <router-view></router-view>  <!-- 根据url而变 -->
</template>

<script setup>
import NavigationBar from "./components/NavigationBar.vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
import $ from "jquery"


$.ajax({
  url: "http://localhost:3000/user/account/info/",
  type: "get",
  headers: {
    Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNTg1NDRhOWVhZDE0M2RhYTI3NGMzODU4ZWQzNjU4NCIsInN1YiI6IjIiLCJpc3MiOiJzZyIsImlhdCI6MTczMDg5MDEzNywiZXhwIjoxNzMyMDk5NzM3fQ.l92sNMHcHl6h-o8mveVpP2qXjvX3zn8YtaE3vvCNNGQ"
  },
  success(resp){
    console.log(resp)
  },
  error(resp){
    console.log(resp)
  }
})

</script>

<style>
body {
  background-image: url(./assets/images/background.png);
  background-size: cover;
}
</style>
