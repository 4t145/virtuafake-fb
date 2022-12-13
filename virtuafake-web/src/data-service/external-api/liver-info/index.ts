import { GlobalException } from "../../../exception";

const base_url = new URL("https://api.bilibili.com/x/space/acc/info")

export namespace LiverInfo {
    export const get = async (param: { mid: string }): Promise<LiverInfo> => {
        const url = `${base_url}?mid=${param.mid}&jsonp=jsonp`;
        const resp = await fetch(url, {
            headers: {
                'Sec-Fetch-Site':
                    'cross-site'
            }
        });
        if (resp.ok) {
            return await resp.json() as LiverInfo
        } else {
            throw new GlobalException('net error')
        }
    }
}

export type LiverInfo = {
    mid: number,
    name: string,
    sex: '男' | '女' | '保密',
    face: string,
    sign: string,
    level: string,
    live_room: {
        url: string,
        title: string,
        cover: string,
        liveStatus: 1 | 0,
        roomStatus: 1 | 0
    }
    watched_show: {
        switch: boolean,
        num: 693,
    }
}