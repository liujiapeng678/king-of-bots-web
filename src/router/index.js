import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView from '@/views/pk/PkIndexView.vue'
import NotFoundIndexView from '@/views/error/NotFoundIndexView.vue'
import RankListIndexView from '@/views/ranklist/RankListIndexView.vue'
import RecordIndexView from '@/views/record/RecordIndexView.vue'
import UserBotsIndexView from '@/views/user/bots/UserBotsIndexView.vue'
import UserAccountLoginView from '@/views/user/account/UserAccountLoginView.vue'
import UserAccountRegisterView from '@/views/user/account/UserAccountRegisterView.vue'

const routes = [
  {
    path: "/",
    redirect: "/pk/"
  },
  {
    path: "/pk/",
    component: PkIndexView,
  },
  {
    path: "/record/",
    component: RecordIndexView,
  },
  {
    path: "/ranklist/",
    component: RankListIndexView,
  },
  {
    path: "/user/bots/",
    component: UserBotsIndexView,
  },
  {
    path: "/user/account/login/",
    component: UserAccountLoginView
  },
  {
    path: "/user/account/register",
    component: UserAccountRegisterView
  },
  {
    path: "/404/",
    component: NotFoundIndexView,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404/"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
