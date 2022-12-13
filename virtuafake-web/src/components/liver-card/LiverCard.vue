<script setup lang = "ts">
import { Api, Model } from 'virtuafake-api';
import { invertColor } from '../../utils';

export interface Props {
    liver: Model.Liver
}
const props = defineProps<Props>();
const {
    avatar,
    username,
    title,
    watched,
    cover,
    is_streaming
} = await Api.Liveroom.Info.send({ uid: props.liver.uid });
const fontColor = invertColor(props.liver.color, true);
</script>

<template>
    <v-card :color="liver.color" :style="{'color': fontColor}">
        <v-img :src="cover" cover class="text-white" crossorigin = "anonymous">
        </v-img>
        <v-card-title>
            {{title}}
        </v-card-title>
        <v-card-actions>
            <v-list-item >
                <template v-slot:prepend>
                    <v-avatar :image="avatar"></v-avatar>
                </template>
                <v-list-item-title >{{username}}</v-list-item-title>
                <v-list-item-subtitle >
                    <v-icon :color="fontColor">
                        mdi-eye
                    </v-icon>
                    {{watched}}
                </v-list-item-subtitle>
            </v-list-item>
        </v-card-actions>
    </v-card>
</template>

