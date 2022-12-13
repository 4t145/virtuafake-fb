<script lang="ts" setup>
import { ref, watch } from 'vue';
import DanmakuQueryForm, { Form } from '../../components/forms/DanmakuQueryForm.vue';
import { Api } from 'virtuafake-api'
import DanmakuDataTable from '../../components/tables/DanmakuDataTable.vue';
import { DanmakuEvent } from 'bilive-danmaku-json';
import RoomPicker from '../../components/input/RoomPicker.vue'

const current_page = ref<number>(1)
const page_count = ref<number>(1)
const danmakus = ref<DanmakuEvent[]>([])
const form = ref<Form>({
    roomid: 851181,
    no_emoticon: false,
    no_draw: false,
    time_from: 0,
    time_to: (new Date()).getTime()
})
const query = async () => {
    await fetchData(form.value, current_page.value)
}
const showDialog = ref<boolean>(false)
async function fetchData(form: Form, page: number) {
    const resp = await Api.Liveroom.Danmaku.send({
        pagination: {
            page: Math.max(page - 1, 0),
            total: 0,
            size: 20,
        },
        ...form
    })
    current_page.value = resp.pagination.page + 1
    page_count.value = Math.ceil(resp.pagination.total / resp.pagination.size)
    danmakus.value = resp.data
}

watch(current_page, async (newPage) => {
    const formToSend = form.value
    if (formToSend !== undefined) {
        await fetchData(formToSend, newPage)
    }
})
</script>

<template>
    <v-container class="d-flex flex-column h-100">
        <div class="pa-4 d-flex flex-row align-content-center align-center">
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
                        <DanmakuQueryForm v-model:form="form"></DanmakuQueryForm>
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

        <v-card class="h-100">
            <DanmakuDataTable :danmakus="danmakus" v-model:page="current_page" :total="page_count">
            </DanmakuDataTable>
        </v-card>
    </v-container>
</template>