<template>
  <div id="view">
    <v-window :show-arrows="false" id="window" v-model="viewIndex" direction="vertical" @wheel="handleWheelEvent">
      <v-window-item class="window-page" id="home-window" key="home">
        <div class="links-and-lang">
        </div>
        <v-footer class="liver-card-panel">
          <Suspense>
            <LiverCardPanelVue :livers="streamingLivers"></LiverCardPanelVue>
          </Suspense>
        </v-footer>
      </v-window-item>
      <!-- <v-window-item class="window-page" key="board">
        <v-sheet height="100%" color="white" class="d-lg-flex flex-lg-column justify-center align-center">
          <v-card class="h-75 w-75" color="transparent">
            <v-card-title class="text-center justify-center py-6">
              <h1 class="font-weight-bold text-h2">公告</h1>
            </v-card-title>
            <v-card-text>
              <Suspense>
                <BoardVue></BoardVue>
              </Suspense>
            </v-card-text>
            <template #text>
            </template>
          </v-card>
        </v-sheet>
      </v-window-item> -->
      <v-window-item class="window-page" key="intro">
        <v-sheet height="100%">
          <v-img :aspect-ratio="16 / 9" :src="introBg" cover height="100%">
            <v-card class="d-lg-flex flex-lg-column justify-start align-start pl-12"
              style="color: white; background: linear-gradient(to bottom, #000000ff, #00000000); height: 100%;">
              <v-card-title class="text-start font-weight-bold text-h2 justify-center py-6 mt-12">
                VirtuaReal 是什么？
              </v-card-title>
              <v-card-text class="text-start font-weight-medium text-h4 justify-start py-6">
                <v-divider thickness="12" color="vrpink"></v-divider>
                <p class="py-6">
                  VirtuaReal 是国内最具影响力的原创虚拟艺人企划
                </p>
                <p class="py-6">
                  虚拟艺人日常通过直播、短视频、演出等方式活跃在 bilibili 等平台，

                </p>
                <p class="py-6">
                  凭借多元化的表演方式提供丰富多彩的娱乐内容，
                </p>
                <p class="py-6">
                  是陪伴粉丝们一起成长的新时代偶像
                </p>
              </v-card-text>
            </v-card>
          </v-img>
        </v-sheet>
      </v-window-item>
      <v-window-item class="window-page" key="members">
        <v-sheet height="100%" color="vrgreen">
          <v-card class="d-lg-flex flex-lg-column justify-start align-start pl-12"
            style="color: black; background: white; height: 100%; width:100%">
            <v-card-title class="text-start font-weight-bold text-h2 justify-center py-6 mt-12">
              受瞩目的成员
            </v-card-title>
            <v-card-text class="d-lg-flex justify-center align-center w-100" >
              <v-container>
                <v-row justify="center">
                  <v-col>
                    这一面，还没有想好怎么做
                  </v-col>
                  <v-col>
                    <LiverStandVue :stand-image="Stand.Nanami" name="七海"></LiverStandVue>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-window-item>
      <v-window-item class="window-page" key="join">
        <v-sheet height="100%" color="vrgreen">
          <v-img :aspect-ratio="16 / 9" :src="joinBg" cover height="100%" class="d-lg-flex">
            <v-card style="color: white; background: #00000077; height: 100%;">
              <v-card-text style="height:100%">
                <div class="text-center d-lg-flex flex-lg-column justify-center align-center py-6" style="height:100%">
                  <h1 class="text-center font-weight-bold text-h2 justify-center py-6 mt-12">
                    前往魔法般的世界
                  </h1>
                  <v-btn variant="outlined" flat size="x-large">
                    立即应募
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-img>
        </v-sheet>
      </v-window-item>
    </v-window>
  </div>
</template>
  
<script lang='ts'>
import { defineComponent, ref, watch } from 'vue'
import { LiverCardVue, LiverCardPanelVue, LiverStandVue, LiverBannerVue } from '../components/liver-card'
import { Model, Api } from 'virtuafake-api'
import { equals } from 'ramda'
import { BoardVue } from '../components/board'
import introBg from '../assets/bg-intro.jpg'
import joinBg from '../assets/bg-join.jpg'
import { Stand } from '../assets'
import { computed } from '@vue/reactivity'
import { useGamepad, mapGamepadToXbox360Controller,   } from '@vueuse/core'
export default defineComponent({
  name: 'HelloWorld',
  components: { LiverCardVue, LiverCardPanelVue, LiverStandVue, BoardVue, LiverBannerVue },
  data() {
    return {
      introBg,
      joinBg,
      Stand,
    }
  },
  computed: {
    viewIndex(): number {
      const index = this.views.map(v => v.id).findIndex(equals(this.currentViewId))
      return index
    },
    async streamingLivers(): Promise<Array<Model.Liver>> {
      return Api.Liver.StreamingList.send()
    },
    controller() {
    },
  },
  methods: {

  },
  setup() {
    const { isSupported, gamepads, onConnected, onDisconnected} = useGamepad()
    const currentViewIndex = ref(0)
    const views = [
        {
          id: 'main'
        },
        {
          id: 'intro'
        },
        {
          id: 'members'
        },
        {
          id: 'join'
        }
    ];
    const currentViewId = computed(
      () => views[currentViewIndex.value].id
    )
    const gamepad = computed(
      () => gamepads.value[0]
    )
    const controller = mapGamepadToXbox360Controller(gamepad)
    function nextView() {
      if (currentViewIndex.value < views.length - 1) {
        currentViewIndex.value += 1
      }
    }
    function prevView() {
      if (currentViewIndex.value > 0) {
        currentViewIndex.value -= 1
      }
    }
    function handleWheelEvent(evt: WheelEvent) {
      if (evt.deltaY > 1 ) {
        nextView()
      } else if (evt.deltaY < 1) {
        prevView()
      }
    }
    watch(
      () => controller.value?.bumper.right.pressed,
      ( pressed ) => {
        if (pressed) {
          nextView()
        }
      }
    )
    watch(
      () => controller.value?.bumper.left.pressed,
      ( pressed ) => {
        if (pressed) {
          prevView()
        }
      }
    )
    return {
      views,
      currentViewIndex,
      currentViewId,
      isSupported,
      controller,
      gamepad,
      gamepads,
      nextView,
      prevView,
      handleWheelEvent
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