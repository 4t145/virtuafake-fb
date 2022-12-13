<script lang="ts" setup>
export interface Props {
    icon: string,
    title: string,
    description: string,
    size: number
    href?: string
    color?: string
}
const props = defineProps<Props>()
const color = props.color ?? 'vrpink'
</script>

<template>
    <v-btn :width="size" :height="size" :rounded="'xl'" :elevation="12" :href="href">
        <div class="d-flex flex-column align-content-center align-self-center align-center ma-6">
            <v-icon aria-label="My Account" role="img" aria-hidden="false" :size="0.5*props.size" :color="color">{{props.icon}}</v-icon>
            <span class="font-weight-black">{{title}}</span>
        </div>
    </v-btn>
</template>

<style scoped>
</style>