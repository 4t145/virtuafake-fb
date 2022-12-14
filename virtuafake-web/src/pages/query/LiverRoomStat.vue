<script setup lang="ts">
import { ref } from "vue";
import DanmakuHeatStat, {
  Props as DanmakuHeatStatPros,
} from "../../components/stat/DanmakuHeatStat.vue";
import LiverRoomStatForm from "../../components/forms/LiverRoomStatForm.vue";
import QueryLayout from "../../components/layout/QueryLayout.vue";
const now = new Date().getTime();
const roomid = ref(851181);
const time_from = ref(now - 60_000 * 61);
const time_to = ref(now - 60_000);
const form = ref<DanmakuHeatStatPros["query"]>({
  time_from: time_from.value,
  time_to: time_to.value,
  roomid: roomid.value,
});
const showDialog = ref<boolean>(false);
function query() {}
</script>

<template>
  <QueryLayout @query="query">
    <template #form>
        <LiverRoomStatForm v-model:form="form"></LiverRoomStatForm>
    </template>
    <template #content>
      <v-row>
        <v-col>
          <v-card :width="640">
            <template v-slot:title> 弹幕密度（五分钟窗口平均） </template>
            <template v-slot:text>
              <Suspense>
                <DanmakuHeatStat :query="form" :width="512" :height="256" />
              </Suspense>
            </template>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col> </v-col>
        <v-col> </v-col>
      </v-row>
    </template>
  </QueryLayout>
</template>
