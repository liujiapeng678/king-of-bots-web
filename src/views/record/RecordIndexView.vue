<template>
    <ContentField>
      <v-table  height="576px" fixed-header>
        <thead>
          <tr>
            <th class="text-left">序号</th>
            <th class="text-left">玩家A</th>
            <th class="text-left">玩家B</th>
            <th class="text-left">对战结果</th>
            <th class="text-left">对战时间</th>
            <th class="text-left">操作</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="record in records" :key="record.record.id">
          <td>{{total - record.record.id + 1}}</td>
          <td>
            <img :src="record.a_photo" alt="玩家A头像" class="record-user-photo">
            &nbsp;
            <span class="record-user-username">{{ record.a_username }}</span>
          </td>
          <td>
            <img :src="record.b_photo" alt="玩家B头像" class="record-user-photo">
            &nbsp;
            <span class="record-user-username">{{ record.b_username }}</span>
          </td>
          <td v-if="record.result === 'A胜'" class="a-win">{{record.result}}</td>
          <td v-if="record.result === 'B胜'" class="b-win">{{record.result}}</td>
          <td v-if="record.result === '平局'" class="draw">{{record.result}}</td>
          <td>{{record.record.createTime}}</td>
          <td><v-btn >查看录像</v-btn></td>
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
const records = ref([])
let total = 0
const pages = ref([])

const get_page = page => {
  current_page = page
  $.ajax({
    url: "http://localhost:3000/record/getlist/",
    type: "get",
    data: {
      page_no: page,
    },
    headers: {
      Authorization: "Bearer " + store.state.user.token
    },
    success(resp) {
      records.value = resp.records
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
.record-user-photo {
  width: 2vw;
  border-radius: 50%;
}
.record-user-username {
  font-weight: normal;
  font-size: larger;
  position: relative;
  display: inline-block;
}

.record-user-username:hover {
  cursor: pointer;
}

.record-user-username:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
  /*从哪边出现*/
  height: 2px;
  /*出现时停止时的宽度*/
}

.record-user-username::after {
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
.a-win{
  color: blue;
}
.b-win{
  color: red;
}
.draw{
  color: cyan;
 }
</style>