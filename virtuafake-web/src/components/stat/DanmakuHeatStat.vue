<script lang="ts" setup>
import * as d3 from 'd3'
import { Api } from 'virtuafake-api'
import { empty, max } from 'ramda'
import { padStart, padEnd, windowFilter } from '../../utils'
import { onMounted, watch, ref } from 'vue'
import { computed } from '@vue/reactivity'
export interface Props {
    width?: number,
    height?: number,
    marginLeft?: number
    marginTop?: number
    marginRight?: number
    marginBottom?: number
    query: {
        time_from: number,
        time_to: number,
        roomid: number
    }
}
const props = defineProps<Props>()

const figureId = 'figureId'
// const  = xAxis[1] - xAxis[0]
// const yRange = xAxis[1] - xAxis[0]
const loading = ref<boolean>(true)
const width = props.width ?? 512
const height = props.height ?? 512

const marginLeft = props.marginLeft ?? 30
const marginTop = props.marginTop ?? 30
const marginRight = props.marginRight ?? 30
const marginBottom = props.marginBottom ?? 30

const figLeft = marginLeft
const figTop = marginTop
const figRight = width - marginRight
const figBottom = height - marginBottom

const figWidth = figRight - figLeft;
const figHeight = figBottom - figTop;
let heat: number[] = []

let xAxis: d3.Axis<Date | d3.NumberValue>
let yAxis: d3.Axis<Date | d3.NumberValue>

function getLine(heatArray: number[]) {
    const xRange = [props.query.time_from, props.query.time_to];
    const yRange = [0, heatArray.reduce(max) + 5]
    const xScale = d3.scaleTime().domain(xRange).range([figLeft, figRight])
    xAxis = d3.axisBottom(xScale);
    const yScale = d3.scaleLinear().domain([...yRange].reverse()).range([figTop, figBottom])
    yAxis = d3.axisLeft(yScale);
    const calculateX = ([minute, _]: [number, number]) => {
        return ((minute * 60_000) / (xRange[1] - xRange[0])) * figWidth + figLeft
    }
    const calculateY = ([_, danmaku_count]: [number, number]) => {
        return figBottom - ((danmaku_count) / (yRange[1] - yRange[0])) * figHeight
    }
    const fnLineDrawer = d3.line()
        .defined(() => true)
        .curve(d3.curveLinear)
        .x(calculateX)
        .y(calculateY)
    const data = windowFilter(padEnd(padStart(heatArray, 2, heatArray[0]), 2, heatArray[-1]), 5).map((danmaku_count, index) => [index, danmaku_count] as [number, number])
    return fnLineDrawer(data)
}

const line = ref<string | null>(null)
watch(
    () => props.query,
    async (newValue) => {
        heat = await Api.Liveroom.DanmakuHeat.send(newValue)
        line.value = getLine(heat)
    },
    {
        deep: true
    }
)
watch(line, () => {
    // 没办法，d3自己有问题
    d3.select(`#${figureId} .x-axis`).call(xAxis as any)
    d3.select(`#${figureId} .y-axis`).call(yAxis as any)
})
onMounted(async () => {
    loading.value = true
    heat = await Api.Liveroom.DanmakuHeat.send(props.query)
    line.value = getLine(heat)
    d3.select(`#${figureId} .x-axis`).call(xAxis as any)
    d3.select(`#${figureId} .y-axis`).call(yAxis as any)
    loading.value = false
})

</script>

<template>
    <v-progress-circular indeterminate color="vrpink" v-if="loading">

    </v-progress-circular>
    <svg :id="figureId" :width="width" :height="height" stroke="black" class="heat-stat" v-show="!loading">
        <g class="axis">
            <g class="x-axis" :transform="`translate(0, ${height - marginBottom})`" />
            <g class="y-axis" :transform="`translate(${marginLeft}, 0)`" />
        </g>
        <g stroke="cyan">
            <path :d="line ?? undefined" fill="none" />
        </g>
    </svg>
</template>


<style>
.heat-stat {
    max-width: 100%;
    height: auto;
}
</style>