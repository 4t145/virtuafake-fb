<script setup lang = "ts">
import { Model } from 'virtuafake-api';
import { LiverCardVue } from '../' 
export interface Props {
    livers: Promise<Model.Liver[]> | Model.Liver[]
}
const props = defineProps<Props>()
const livers = await props.livers
</script>

<template>
    <v-sheet class="mx-auto transparent" elevation="8" max-width="1468" color="transparent">
        <v-slide-group class="pa-4">
            <v-slide-group-item v-for="liver in livers" :key="liver.uid" v-slot="{ isSelected, toggle, selectedClass }">
                <Suspense>
                    <LiverCardVue :liver=liver  width="300" class="ma-4"></LiverCardVue>
                </Suspense>
            </v-slide-group-item>
        </v-slide-group>
    </v-sheet>
</template>


<style lang="less" scoped>
.card {
    background-color: transparent;
}
</style>