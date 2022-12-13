<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import { ref, VNode, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useGamepad, mapGamepadToXbox360Controller } from '@vueuse/core'
import { VListItem } from 'vuetify/components'
const { isSupported, gamepads, onConnected, onDisconnected } = useGamepad()

const gamepad = computed(
    () => gamepads.value[0]
);
const controller = mapGamepadToXbox360Controller(gamepad)
const menuRail = ref(true)

const menuList = [
    {
        icon: 'mdi-home',
        title: '主页',
        value: '/home',
        ref: ref<VListItem>()
    },
    // {
    //     icon: 'mdi-calendar',
    //     title: '日程表',
    //     value: '/calendar',
    //     ref: ref<VListItem>()
    // },
    // {
    //     icon: 'mdi-newspaper',
    //     title: '新闻',
    //     value: '/news',
    //     ref: ref<VListItem>()

    // },
    // {
    //     icon: 'mdi-account',
    //     title: '成员',
    //     value: '/member',
    //     ref: ref<VListItem>()
    // },
    {
        icon: 'mdi-magnify',
        title: '查询',
        value: '/query',
        ref: ref<VListItem>()
    },
    // {
    //     icon: 'mdi-gift',
    //     title: '周边',
    //     value: '/goods',
    //     ref: ref<VListItem>()
    // },
    // {
    //     icon: 'mdi-download',
    //     title: '下载',
    //     value: '/download',
    //     ref: ref<VListItem>()
    // },
    // {
    //     icon: 'mdi-information',
    //     title: '关于我们',
    //     value: '/about',
    //     ref: ref<VListItem>()
    // }
]
const router = useRouter()
const currentPage = computed(
    () => {
        const path = router.currentRoute.value.path
        if (menuList.map(l => l.value).includes(path)) {
            return [path]
        } else {
            return [menuList[0].value]
        }
    }
)
let focusIndex = ref()
watch(
    () => controller.value?.start.pressed,
    (pressed) => {
        if (pressed) {
            menuRail.value = !menuRail.value
        }
    }
)

watch(
    () => controller.value?.dpad.down.pressed,
    (pressed) => {
        if (pressed && !menuRail.value ) {
            if (focusIndex.value < menuList.length-1) {
                focusIndex.value += 1
            } else {
                focusIndex.value = 0
            }
        }
    }
)

watch(
    () => controller.value?.dpad.up.pressed,
    (pressed) => {
        if (pressed && !menuRail.value ) {
            if (focusIndex.value > 0) {
                focusIndex.value -= 1
            } else {
                focusIndex.value = menuList.length-1
            }
        }
    }
)

watch(
    () => controller.value?.buttons.a.pressed,
    (pressed) => {
        if (pressed) {
            router.push(menuList[focusIndex.value].value)
        }
    }
)

watch(
    menuRail,
    (newValue) => {
        if (newValue) {
            focusIndex.value = undefined
        } else {
            focusIndex.value = 0
        }
    }
)
</script>

<template>
    <v-navigation-drawer border="none" :rail="menuRail" @focusout.stop="menuRail = true" color="transparent"
        id="side-nav">
        <v-list-item nav class="unfocus">
            <v-img src="https://vrp.live/assets/logo.e5d9af20.png" height="48px"></v-img>
            <template v-slot:append>
                <v-btn variant="text" :icon="menuRail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
                    @click.stop="menuRail = !menuRail"></v-btn>
            </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list density="compact" nav :selected="currentPage" style="color: white">
            <v-list-item 
                v-for="menuItem, index in menuList" 
                :prepend-icon="menuItem.icon" 
                :title="menuItem.title"
                :value="menuItem.value" active-color="vrpink" :class="[index===focusIndex?'focus':'unfocus']"
                @click="router.push(menuItem.value)"
                :key="index"
            >
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style>
.unfocus {
    color: white;
    text-shadow: 1px 1px 4px grey;
}
.focus {
    transform: scale(1.1);
    color: rgb(var(--v-theme-vrpink));
    text-shadow: 1px 1px 4px grey;
    /* background-color: #8080804f; */
}
</style>