import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import 'vuetify/styles'
import { createRouter, createWebHashHistory } from 'vue-router'
import { Api } from 'virtuafake-api'
import { NavVue } from './nav'
import { HomeVue, CalendarVue } from './pages'
import Wip from './pages/Wip.vue' 
import DanmakuQuery from './pages/query/DanmakuQuery.vue' 
import LiverRoomStat from './pages/query/LiverRoomStat.vue'
import SuperchatQuery from './pages/query/SuperchatQuery.vue'
import QueryVue from './pages/query/Query.vue'
import GiftQuery from './pages/query/GiftQuery.vue'
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
      path: '/wip',
      components: {
        default: Wip,
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
      path: '/query/danmaku',
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
    },
    {
      path: '/query/superchat',
      components: {
        default: SuperchatQuery,
        nav: NavVue
      }
    }
    ,
    {
      path: '/query/gift',
      components: {
        default: GiftQuery,
        nav: NavVue
      }
    }
  ]
})

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
