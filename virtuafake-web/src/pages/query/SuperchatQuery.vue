<script lang="ts" setup>
import { ref, watch } from "vue";
import SuperChatForm, {
  Form,
} from "../../components/forms/SuperchatQueryForm.vue";
import { Api } from "virtuafake-api";
import SuperChatDataTable from "../../components/tables/SuprechatDataTable.vue";
import QueryLayout from "../../components/layout/QueryLayout.vue";
import { SuperChatEvent } from "bilive-danmaku-json";

const current_page = ref<number>(1);
const page_count = ref<number>(1);
const superchats = ref<SuperChatEvent[]>([]);
const form = ref<Form>({
  roomid: 851181,
  time_from: 0,
  time_to: new Date().getTime(),
});
const query = async () => {
  await fetchData(form.value, current_page.value);
};
async function fetchData(form: Form, page: number) {
  const resp = await Api.Liveroom.Superchat.send({
    pagination: {
      page: Math.max(page - 1, 0),
      total: 0,
      size: 20,
    },
    ...form,
  });
  current_page.value = resp.pagination.page + 1;
  page_count.value = Math.ceil(resp.pagination.total / resp.pagination.size);
  const data = resp.data.slice().reverse();
  superchats.value = data;
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
      <SuperChatForm v-model:form="form"/>
    </template>
    <template #content>
      <SuperChatDataTable
        :superchats="superchats"
        v-model:page="current_page"
        :total="page_count"
      />
    </template>
  </QueryLayout>
</template>
