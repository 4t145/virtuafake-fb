export type LiverGroup = {
    tag: 'project'
    gen: number
} | {
    tag: 'tsuki'
} | {
    tag: 'star'
} | {
    tag: 'link'
}

export type Liver = {
    remark: string,
    uid: number,
    roomid: number,
    group: LiverGroup,
    color: string
}