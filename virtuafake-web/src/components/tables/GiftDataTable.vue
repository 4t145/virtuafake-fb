<script lang="ts" setup>
import { GiftEvent, FansMedal } from "bilive-danmaku-json";
import { ref, VNode, watch } from "vue";
import { useDisplay } from "vuetify";
import DataTable from './DataTable.vue'

export interface Props {
  gifts: Array<GiftEvent>;
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
              <tr v-for="(gift, index) in gifts" :key="index">
                <td>{{ gift.data.gift.gift_name }}x{{gift.data.gift.num}}</td>
                <td>{{ gift.data.user.uname }}</td>
                <td>{{ gift.data.gift.coin_type==='silver'? (`${gift.data.gift.coin_count}银瓜子`) : (gift.data.gift.price ? gift.data.gift.price * gift.data.gift.num : ``) }}</td>
                <td>{{ fansMedalRender(gift.data.fans_medal) }}</td>
                <td>{{ new Date(gift.timestamp).toLocaleString() }}</td>
              </tr>
            </tbody>
        </template>
    </DataTable>
</template>
