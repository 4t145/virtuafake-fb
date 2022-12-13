<script setup lang="ts">
import { Model } from "virtuafake-api";
import { watch, ref, computed } from "vue";
import liverListService from "../../data-service/liver-list";
export interface Props {
  roomid: number;
}
export interface Emits {
  (event: "update:roomid", roomid: number): true;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const roomid = ref(props.roomid);
type LiverOption = {
  value: number;
  name: string;
  avatar: string;
  color: string;
};
const items = liverListService.liverList.map((liver) => {
  return <LiverOption>{
    value: liver.uid,
  };
});
watch(
  roomid,
  (newRoomId) => {
    console.log(newRoomId);
    emit("update:roomid", newRoomId);
  },
  {
    deep: true,
  }
);
const loading = ref(false);
const liverList = ref(liverListService.liverList);
watch(
  () => liverListService.syncing,
  (syncing) => {
    loading.value = syncing;
    liverList.value = liverListService.liverList;
  }
);
</script>
<template>
  <v-autocomplete
    v-model="roomid"
    :multiple="false"
    :items="liverList"
    item-value="roomid"
    item-title="remark"
    :loading="loading"
    label="直播间"
    clearable
    v-bind="$attrs"
  >
    <template v-slot:item="{ item, index, props }">
      <v-list-item v-bind="props">
        <v-list-item-subtitle
          v-text="liverList[index].roomid"
        ></v-list-item-subtitle>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>
