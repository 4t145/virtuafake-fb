<template>
  <div id="view">
    <div>
      <v-navigation-drawer border="none" :rail="menuRail" @focusout.stop="menuRail=true" color="transparent" id="side-nav" >
        <v-list-item nav class="white-font">
          <v-img src="https://vrp.live/assets/logo.e5d9af20.png" height="48px"></v-img>
          <template v-slot:append>
            <v-btn variant="text" :icon="menuRail?'mdi-chevron-right':'mdi-chevron-left'" @click.stop="menuRail=!menuRail"></v-btn>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list density="compact" nav v-model:selected="currentPage">
          <v-list-item v-for="menuItem in menuList" :prepend-icon="menuItem.icon" :title="menuItem.title"
            :value="menuItem.value" active-color="vrpink"
            class="white-font"
            >
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
    <v-window :show-arrows="false" id="window" v-model="windowIndex" direction="vertical" @wheel="handleWheelEvent" >
      <v-window-item class="window-page" id="home-window" key="home">
        <div class="links-and-lang">
        </div>
        <v-footer class="liver-card-panel">
          <Suspense>
            <LiverCardPanelVue :livers="streamingLivers"></LiverCardPanelVue>
          </Suspense>
        </v-footer>
      </v-window-item>
      <v-window-item class="window-page" key="calendar" >
        <v-sheet height="100%" color="vrgreen">
          <v-card>日程表</v-card>
        </v-sheet>
      </v-window-item>
    </v-window>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { LiverCardVue, LiverCardPanelVue } from './liver-card'
import  bilbiliIcon  from '../assets/bilibili.svg'
import { Model, Api } from 'virtuafake-api'

export default defineComponent({
  name: 'HelloWorld',
  components: { LiverCardVue, LiverCardPanelVue },
  data() {
    const menuList = [
      {
        icon: 'mdi-home',
        title: '主页',
        value: 'home'
      },
      {
        icon: 'mdi-calendar',
        title: '日程表',
        value: 'calendar'
      },
      {
        icon: 'mdi-newspaper',
        title: '新闻',
        value: 'news'
      },
      {
        icon: 'mdi-account',
        title: '成员',
        value: 'member'
      },
      {
        icon: 'mdi-music',
        title: '音乐',
        value: 'music'
      },
      {
        icon: 'mdi-gift',
        title: '周边',
        value: 'goods'
      },
      {
        icon: 'mdi-download',
        title: '下载',
        value: 'download'
      },
      {
        icon: 'mdi-information',
        title: '关于我们',
        value: 'about'
      },
    ]
    return {
      icons: {
        bilbiliIcon
      },
      menuRail: false,
      menuList,
      currentPage: [menuList[0].value]
    }
  },
  computed: {
    windowIndex(): number {
      return this.menuList.findIndex(page => page.value === this.currentPage[0])
    },
    async streamingLivers(): Promise<Array<Model.Liver>> {
      return Api.Liver.StreamingList.send()
    }
     
  },
  methods: {
    handleWheelEvent(evt: WheelEvent) {
      const currentIndex = this.windowIndex
      if (evt.deltaY>1 && currentIndex < this.menuList.length-1) {
        this.currentPage = [this.menuList[currentIndex + 1].value]
      } else if (evt.deltaY<1 && currentIndex > 0){
        this.currentPage = [this.menuList[currentIndex - 1].value]
      }
    }
  }
})
</script>

<style lang="less" scoped>
#view {
  height: 100%;
  width: 100%;
  display: block;

  #side-nav {
    left: 0;
    position: fixed;
    pointer-events: none;
    border: none;
    .white-font {
      font-style: bold;
      color: white;
    }
    // background: transparent;
  }

  #window {
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;

    .window-page {
      height: 100%;
      width: 100%;
      background: var(--v-theme-vrgreen);
      .links-and-lang {
        position: fixed;
        right: 0
      }
    }

    #home-window {
      background-image: url(../assets/mytk-bg.jpg);
      background-size: cover;

      .liver-card-panel {
        width: 100%;
        position: absolute;
        display: flex;
        align-content: center;
        justify-content: center;
        bottom: 0;
        background: transparent;
      }
    }
  }
}
</style>