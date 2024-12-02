<template>
  <ContentField style="width: 50%">
    <v-table  height="576px" fixed-header>
      <thead>
      <tr>
        <th class="text-left">排名</th>
        <th class="text-left">玩家</th>
        <th class="text-left">rating</th>
        <th class="text-left">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in users" :key="user.id">
        <td>
          {{index + 1}}
          <v-icon v-if="index < 3">mdi-medal-outline</v-icon>
        </td>
        <td>
          <img :src="user.photo" alt="玩家头像" class="ranklist-user-photo">
          &nbsp;
          <span class="ranklist-user-username">{{ user.username }}</span>
        </td>
        <td>{{user.rating}}</td>
        <td><v-btn >添加好友</v-btn></td>
      </tr>
      </tbody>
    </v-table>
    <ul class="pagination" style="float:right;margin-top:20px">
      <li class="page-item" @click="click_page(current_page - 1)">
        <a class="page-link" href="#" >前一页</a>   <!--href="#"为了让鼠标是手的形状 -->
      </li>
      <li :class="'page-item ' + page.is_active" v-for="page in pages" :key="page.number" @click="click_page(page.number)">
        <a class="page-link" href="#">{{ page.number }}</a>
      </li>
      <li class="page-item" @click="click_page(current_page + 1)">
        <a class="page-link" href="#">后一页</a>
      </li>
    </ul>
  </ContentField>
</template>
<script setup>
import ContentField from "@/components/ContentField.vue"
import {useStore} from "vuex";
import $ from 'jquery'
import {onMounted, ref} from "vue";

const store = useStore()
let current_page = 1
const users = ref([])
let total = 0
const pages = ref([])

const get_page = page => {
  current_page = page
  $.ajax({
    url: "http://localhost:3000/ranklist/getlist/",
    type: "get",
    data: {
      page_no: page,
    },
    headers: {
      Authorization: "Bearer " + store.state.user.token
    },
    success(resp) {
      users.value = resp.users
      total = resp.total
      update_pages()
      console.log(resp)
    },
    error(resp) {
      console.log(resp)
    }
  })
}
const update_pages = () => {
  let max_pages = Math.ceil(total / 20)
  let new_pages = []
  for(let i = current_page - 2; i <= current_page + 2; i++) {
    if(i >= 1 && i <= max_pages){
      new_pages.push({
        number: i,
        is_active: current_page === i ? "active" : ""
      })
    }
  }
  pages.value = new_pages
}
const click_page = (page) => {
  let max_pages = Math.ceil(total / 20)
  if(page >= 1 && page <= max_pages ){
    get_page(page)
  }
}

onMounted(()=>{
  get_page(current_page)
})
</script>

<style scoped>
.ranklist-user-photo {
  width: 2vw;
  border-radius: 50%;
}
.ranklist-user-username {
  font-weight: normal;
  font-size: larger;
  position: relative;
  display: inline-block;
}

.ranklist-user-username:hover {
  cursor: pointer;
}

.ranklist-user-username:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
  /*从哪边出现*/
  height: 2px;
  /*出现时停止时的宽度*/
}

.ranklist-user-username::after {
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