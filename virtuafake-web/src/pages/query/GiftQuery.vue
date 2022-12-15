<script lang="ts" setup>
import { ref, watch } from "vue";
import GiftQueryForm, {
  Form,
} from "../../components/forms/GiftQueryForm.vue";
import { Api } from "virtuafake-api";
import GiftDataTable from "../../components/tables/GiftDataTable.vue";
import QueryLayout from "../../components/layout/QueryLayout.vue";
import { GiftEvent } from "bilive-danmaku-json";

const current_page = ref<number>(1);
const page_count = ref<number>(1);
const gifts = ref<GiftEvent[]>([]);
const form = ref<Form>({
  roomid: 851181,
  paid: false,
  time_from: 0,
  time_to: new Date().getTime(),
});
// let prevRoomid = form.value.roomid;
const query = async () => {
//   if (prevRoomid !== form.value.roomid) {
//     current_page.value = 1;
//     prevRoomid = form.value.roomid
//   }
  await fetchData(form.value, current_page.value);
};
async function fetchData(form: Form, page: number) {
  const resp = await Api.Liveroom.Gift.send({
    pagination: {
      page: Math.max(page - 1, 0),
      total: 0,
      size: 20,
    },
    ...form,
  });
  page_count.value = Math.ceil(resp.pagination.total / resp.pagination.size);
  const data = resp.data.slice().reverse();
  gifts.value = data;
}

watch(current_page, async (newPage) => {
  const formToSend = form.value;
  if (formToSend !== undefined) {
    await fetchData(formToSend, newPage);
  }
});
</script>

<template>
  <QueryLayout v-model:roomid="form.roomid" @query="query">
    <template #form>
      <GiftQueryForm v-model:form="form" />
    </template>
    <template #content>
      <GiftDataTable
        :gifts="gifts"
        v-model:page="current_page"
        :total="page_count"
      />
    </template>
  </QueryLayout>
</template>
