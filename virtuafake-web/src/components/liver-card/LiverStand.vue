<script lang="ts" setup>
import { Model } from 'virtuafake-api';

export interface Props {
    name: string
    liver?: Model.Liver,
    standImage: string
}
const props = defineProps<Props>()
</script>

<template>
    <div class="d-flex flex-column align-center justify-center py-5">
        <div>
            <v-img :src="props.standImage" width="200"></v-img>
        </div>
        <div class="font-weight-medium text-h5 pa-6">
            {{props.name}}
        </div>
    </div>
</template>

<style>
</style>