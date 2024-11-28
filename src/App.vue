<template>
    <NavigationBar />
    <router-view></router-view>  <!-- 根据url而变 -->
</template>

<script setup>
import NavigationBar from "./components/NavigationBar.vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
import "@mdi/font/css/materialdesignicons.min.css"


</script>

<style>
body {
  background-image: url(./assets/images/background.png);
  background-size: cover;
}
</style>
