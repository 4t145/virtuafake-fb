

<script lang="ts" setup>
    import { Api } from "virtuafake-api";
    const newsList = await Api.News.Latest.sendMock()
    function getTime(utc: number) {
        const date = new Date(utc)
        return date.toLocaleDateString()
    }
</script>

<template>
    <v-list lines="one" style="{background: transparent}">
        <v-list-item
            link
            density="comfortable"
            v-for="news, index in newsList"
            :key="index"
            :title="news.title"
            :href="`/news/${news.id}`"
            
        >
            <template #subtitle>
                <span class="d-sm-inline-flex">
                    <span class="ma-2">
                        {{getTime(news.time)}}
                    </span>
                    <span v-for="tag, index in news.author" :key="index" label size="small" class="ma-2">{{tag}}</span>
                </span>
            </template>
        </v-list-item>
    </v-list>
</template>

<style>

</style>