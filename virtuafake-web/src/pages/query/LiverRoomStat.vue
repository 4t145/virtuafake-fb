<script setup lang="ts">
import { ref, watch } from 'vue';
import DanmakuHeatStat, { Props as DanmakuHeatStatPros} from '../../components/stat/DanmakuHeatStat.vue'
import RoomPicker from '../../components/input/RoomPicker.vue'
import LiverRoomStatForm from '../../components/forms/LiverRoomStatForm.vue'
import moment from 'moment';
const now = new Date().getTime()
const roomid = ref(851181)
const time_from = ref(now - 60_000 * 61)
const time_to = ref(now - 60_000)
const form = ref<DanmakuHeatStatPros['query']>({
    time_from: time_from.value,
    time_to: time_to.value,
    roomid: roomid.value
})
const showDialog = ref<boolean>(false)
function query() {

}

</script>

<template>
    <v-container class="d-flex flex-column align-content-space-between align-center ma-6">
        <div class="pa-4 d-flex flex-row align-content-center align-center w-100">
            <RoomPicker v-model:roomid="form.roomid" variant="underlined" hide-details></RoomPicker>
            <v-dialog v-model="showDialog" persistent max-width="768px">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" append-icon="mdi-filter" variant="flat">
                        过滤
                    </v-btn>
                    <v-btn color="primary" append-icon="mdi-magnify" variant="flat" @click="query">搜索</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="text-h5">查询条件</span>
                    </v-card-title>
                    <v-card-text>
                        <LiverRoomStatForm v-model:form="form"></LiverRoomStatForm>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="showDialog = false">
                            确定
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
        <v-grid>
            <v-row>
                <v-col>
                    <v-card :width="640">
                        <template v-slot:title>
                            弹幕密度（五分钟窗口平均）
                        </template>
                        <template v-slot:text>
                            <Suspense>
                                <DanmakuHeatStat :query="form" :width="512" :height="256" />
                            </Suspense>
                        </template>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                </v-col>
                <v-col>
                </v-col>
            </v-row>
        </v-grid>

    </v-container>
</template>