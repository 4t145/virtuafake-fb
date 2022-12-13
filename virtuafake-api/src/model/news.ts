export type News = {
    tags: string[],
    group: NewsGroup,
    time: EpochTimeStamp,
    title: string,
    id: number,
    author: string[]
    brief?: string
    cover?: string,
}

export type NewsGroup = 'show' | 'project' | 'announcement'