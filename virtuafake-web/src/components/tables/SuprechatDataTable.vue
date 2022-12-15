<script lang="ts" setup>
import { SuperChatEvent, FansMedal } from "bilive-danmaku-json";
import { ref, VNode, watch } from "vue";
import { useDisplay } from "vuetify";
import DataTable from './DataTable.vue'

export interface Props {
  superchats: Array<SuperChatEvent>;
  total: number;
  page: number;
}
export interface Emits {
  (event: "update:page", page: number): true;
}
const { mobile } = useDisplay();
const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const page = ref<number>(props.page);
watch(page, (newPage) => {
  emits("update:page", newPage);
});

function fansMedalRender(medal?: FansMedal): VNode | string {
  if (medal) {
    return `${medal.medal_name}[${medal.medal_level}]`;
  } else {
    return "";
  }
}
</script>

<template>
    <DataTable :total="total" v-model:page="page">
        <template #table>
            <thead>
              <tr>
                <th id="message" class="text-left">消息</th>
                <th id="medal" class="text-left">金额</th>
                <th id="user" class="text-left">用户名</th>
                <th id="medal" class="text-left">粉丝牌</th>
                <th id="time" class="text-left">时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(superchat, index) in superchats" :key="index">
                <td>{{ superchat.data.message }}</td>
                <td>{{ superchat.data.price }}</td>
                <td>{{ superchat.data.user.uname }}</td>
                <td>{{ fansMedalRender(superchat.data.fans_medal) }}</td>
                <td>{{ new Date(superchat.timestamp).toLocaleString() }}</td>
              </tr>
            </tbody>
        </template>
    </DataTable>
</template>
