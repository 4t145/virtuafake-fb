<script lang="ts" setup>
import { DanmakuEvent, FansMedal } from 'bilive-danmaku-json'
import { ref, VNode, watch } from 'vue'
export interface Props {
    danmakus: Array<DanmakuEvent>,
    total: number
    page: number
}
export interface Emits {
    (event: 'update:page', page: number): true
}
const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const page = ref<number>(props.page)
watch(page, (newPage) => {
    emits('update:page', newPage)
})


function fansMedalRender(medal?: FansMedal): VNode | string {
    if (medal) {
        return `${medal.medal_name}[${medal.medal_level}]`
    } else {
        return ''
    }
}
</script>

<template>
    <v-table height="100%">
        <thead>
        <tr>
            <th id="message" class="text-left">
            消息
            </th>
            <th id="user" class="text-left">
            用户名
            </th>
            <th id="medal" class="text-left">
            粉丝牌
            </th>
            <th id="time" class="text-left">
            时间
            </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="danmaku, index in danmakus"
            :key="index"
        >
            <td>{{ danmaku.data.message.tag==='Plain'? danmaku.data.message.data.message : danmaku.data.message.data.alt_message }}</td>
            <td>{{ danmaku.data.user.uname }}</td>
            <td>{{ fansMedalRender(danmaku.data.fans_medal) }}</td>
            <td>{{ (new Date(danmaku.timestamp)).toLocaleString() }}</td>
        </tr>
        </tbody>
    </v-table>
    <v-pagination
      v-model="page"
      :length="total"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>
</template>