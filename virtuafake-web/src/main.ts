import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import 'vuetify/styles'
import { createRouter, createWebHashHistory } from 'vue-router'
import { Api } from 'virtuafake-api'
import { NavVue } from './nav'
import { HomeVue, CalendarVue } from './pages'
import DanmakuQuery from './pages/query/DanmakuQuery.vue' 
import LiverRoomStat from './pages/query/LiverRoomStat.vue'
import QueryVue from './pages/query/Query.vue'
// dev
Api.setBaseUrl('http://localhost:7777')
// product
// Api.setBaseUrl('https://114.115.163.153:7777')

loadFonts()

const routes = [
  { path: '/', component: App },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      components: {
        default: HomeVue,
        nav: NavVue
      }
    },
    {
      path: '/home', 
      components: {
        default: HomeVue,
        nav: NavVue
      }
    },
    {
      path: '/calendar', 
      components: {
        default: CalendarVue,
        nav: NavVue
      }
    },
    {
      path: '/query',
      components: {
        default: QueryVue,
        nav: NavVue
      }
    },
    {
      path: '/query/danmaku-query',
      components: {
        default: DanmakuQuery,
        nav: NavVue
      }
    },
    {
      path: '/query/liver-room-stat',
      components: {
        default: LiverRoomStat,
        nav: NavVue
      }
    }
  ]
})

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
