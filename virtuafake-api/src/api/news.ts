import { url } from "."
import { News as NewsModel } from "../model"
export namespace News {
    export namespace Latest {
        const path = ['news', 'latest']
        const method = 'GET'
        export type Req = void
        export type Ok = Array<NewsModel>

        export type Fail = string;
        export const send = async (): Promise<Ok> => {
            return (await fetch(url(path), {
                method,
                headers: {
                    // 'Content-Type': 'application/json'
                },
            })).json()
        }
        export const sendMock = async (): Promise<Ok> => {
            return [
                {
                    tags: ['标签1', 'tag2', '标签3'],
                    group: 'announcement',
                    time: Date.now(),
                    author: ['作者1', '作者2'],
                    title: 'virtuafake企划创立宣告',
                    id: 1
                },
                {
                    tags: ['标签1', 'tag2', '标签3'],
                    group: 'announcement',
                    time: Date.now(),
                    author: ['作者1', '作者2'],
                    title: '最甜甜甜的mytk6000关注啦',
                    id: 22222

                },
            ]
        }
    }
}