<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Api } from 'virtuafake-api'
import moment from 'moment'
export type Form = Omit<Api.Liveroom.Gift.Req, 'pagination'>;
export interface Emits {
  (event:'update:form', form: Form): true
}
export interface Props {
  form: Form
}
const props = defineProps<Props>()
const time_from = ref<string>(moment(props.form.time_from).format("YYYY-MM-DDTHH:mm"))
const time_to = ref<string>((moment(props.form.time_to).format("YYYY-MM-DDTHH:mm")))
// const form = ref<Form>()
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
  if (typeof emitForm.uid !== 'number') {
    delete emitForm.uid
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
          <v-text-field v-model="form.roomid" label="房间id" type="number" required></v-text-field>
        </v-col>
      </v-row>
      <v-row> 
        <v-col cols="12">
          <v-text-field v-model="form.uid" label="用户uid" type="number" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" sm="12" xs="12">
          <v-text-field v-model="time_from" type="datetime-local" label="开始时间"></v-text-field>
        </v-col>
        <v-col md="6" sm="12" xs="12">
          <v-text-field v-model="time_to" type="datetime-local" label="结束时间"></v-text-field>
        </v-col>
        <v-col md="3" sm="6" xs="12">
          <v-switch label="仅付费礼物" color="vrpink" v-model="form.paid"></v-switch>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>