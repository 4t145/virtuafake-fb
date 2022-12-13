<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Api } from 'virtuafake-api'
import moment from 'moment'
import RoomPicker from '../input/RoomPicker.vue';
export type Form = Api.Liveroom.DanmakuHeat.Req;
export interface Emits {
  (event:'update:form', form: Form): true
}
export interface Props {
  form: Form
}
const props = defineProps<Props>()
const time_from = ref<string>(moment(props.form.time_from).format("YYYY-MM-DDTHH:mm"))
const time_to = ref<string>((moment(props.form.time_to).format("YYYY-MM-DDTHH:mm")))
watch(time_from, (newTimeFrom) => {
    time_to.value = moment(newTimeFrom).add(1, 'hour').format("YYYY-MM-DDTHH:mm")
})
watch(time_to, (newTimeTo) => {
    time_from.value = moment(newTimeTo).subtract(1, 'hour').format("YYYY-MM-DDTHH:mm")
})
const emits = defineEmits<Emits>()
const form = ref(props.form)
function getForm(): Form {
  const emitForm = form.value
  if (time_from.value !== undefined) {
    emitForm.time_from = new Date(time_from.value).getTime()
  }
  if (time_to.value !== undefined) {
    emitForm.time_to = new Date(time_to.value).getTime()
  }
  return emitForm
}
watch([form, time_from, time_to], () => {
  const newForm = getForm()
  emits('update:form', newForm)
}, {
  deep: true
})
</script>

<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
            <RoomPicker v-model:roomid="form.roomid" hide-details></RoomPicker>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" sm="12" xs="12">
          <v-text-field v-model="time_from" type="datetime-local" label="开始时间"></v-text-field>
        </v-col>
        <v-col md="6" sm="12" xs="12">
          <v-text-field v-model="time_to" type="datetime-local" label="结束时间"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>