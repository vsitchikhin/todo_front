import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'notes',
    component: () => import('../views/NotesView.vue')
  },
  {
    path: '/note/:id?',
    name: 'note',
    component: () => import('../views/NoteView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
