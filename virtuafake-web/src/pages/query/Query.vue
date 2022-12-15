<script lang="ts" setup>
import ApplicationCard from '../../components/ApplicationCard.vue';
import LiverRoomStat from './LiverRoomStat.vue';

</script>

<template>
    <v-container class="d-flex flex-column align-content-center align-self-center align-center ma-6">
        <v-grid>
            <v-row>
                <v-col>
                    <ApplicationCard icon="mdi-text" description="查询房间弹幕" :title="'弹幕查询'" :size="128" :href="'#/query/danmaku'"></ApplicationCard>
                </v-col>
                <v-col>
                    <ApplicationCard icon="mdi-chart-line" description="信息统计" :title="'信息统计'" :size="128" :href="'#/query/liver-room-stat'"></ApplicationCard>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <ApplicationCard icon="mdi-comment-text-outline" description="SC查询" title='SC查询' :size="128" href="#/query/superchat"></ApplicationCard>
                </v-col>
                <v-col>
                    <ApplicationCard icon="mdi-gift" description="礼物查询" title="礼物查询" :size="128" href="#/query/gift"></ApplicationCard>
                </v-col> 
            </v-row>
            <v-row>
                <v-col>
                    <ApplicationCard icon="mdi-dots-horizontal" description="进入房间记录" title="进入房间" :size="128" href="#/wip"></ApplicationCard>
                </v-col> 
                <v-col>
                    <ApplicationCard icon="mdi-dots-horizontal" description="礼物舰长SC" title='礼物综合' :size="128" href="#/wip"></ApplicationCard>
                </v-col>
            </v-row>
        </v-grid>
    </v-container>
</template>

