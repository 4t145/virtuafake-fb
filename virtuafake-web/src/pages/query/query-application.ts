export type QueryApplication = {
    name: string,
    icon: string,
    link: string,
}

export const QueryApplicationList: Array<QueryApplication> = [
    {
        name: '热度走势',
        icon: '',
        link: 'mdi-chart-line'
    },
    {
        name: '弹幕查询',
        icon: 'mdi-text',
        link: 'danmaku-query'
    },
]