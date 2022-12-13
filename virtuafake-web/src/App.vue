<template>
  <v-app class="view">
    <router-view class="side-nav" name="nav"></router-view>
    <router-view class="window"></router-view>
    <v-main>
    </v-main>
  </v-app>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { LiverCardVue, LiverCardPanelVue } from './components/liver-card'
import { Model, Api } from 'virtuafake-api'

export default defineComponent({
  name: 'App',
  components: { LiverCardVue, LiverCardPanelVue },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {

  },
  created() {
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