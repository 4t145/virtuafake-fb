<script lang="ts" setup>
export interface Props {
    width?: string | number,
    height?: string | number,
    backgroundImg?: string
}
const props = defineProps<Props>()
</script>

<template>
    <div class="outline" :style="{width: props.width, height: props.height}">
        <div class="gradient">
            <div class="name text-h3">
                七海nana7mi
            </div>
        </div>
    </div>
</template>

<style>

.outline {
    clip-path: polygon(0% 0%, 100% 0%, 75% 100%, 0% 100%);
    background-color: aqua;
    height: 25%;
    width: 62%vw;
}
.gradient {
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #dfd445, #00000000);
}
.name {
    padding-top: 16px;
    padding-left: 16px;
}

.outline:hover {
    transform: scale(1.2);
}
</style>