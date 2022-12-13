export type Resp<T, F> = {
    ok: true,
    data: T
} | {
    ok: false,
    data: F
}

export type Pagination = {
    page: number,
    total: number,
    size: number
}

export type Paged<T> = {
    pagination: Pagination,
    data: Array<T>
}
let apiBase = 'http://114.115.163.153:7777'

export function setBaseUrl(url: string) {
    apiBase = url
}
export function url(path: string[], query?: Record<string, any>): string {
    const basePart = [apiBase, ...path].join('/')
    if (query === undefined) {
        return basePart
    } else {
        const queryPart = new URLSearchParams(query)
        return basePart.concat('?', queryPart.toString())
    }
}

export * from './liveroom'
export * from './liver'
export * from './news'