<script lang="ts" setup>
import { ref, watch } from "vue";
import { useDisplay } from "vuetify";
export interface Props {
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
</script>

<template>
  <v-div class="h-100 d-flex flex-column">
    <v-table
      fixed-header
      :density="mobile ? 'compact' : 'default'"
      class="flex-grow-1 flex-shirink-1 h-100 overflow-y-auto"
    >
      <slot name="table"> </slot>
    </v-table>
    <v-pagination
      v-model="page"
      :length="total"
      show-first-last-page
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      :size="mobile ? 'small' : 'default'"
      class="flex-grow-1 flex-shirink-0"
    ></v-pagination>
  </v-div>
</template>
