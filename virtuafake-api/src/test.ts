import { Api } from './'

Api.setBaseUrl('http://api.vrp.4t145.com')

async function main() {
    let resp = await Api.Liveroom.Info.send({uid: 59275});
    console.log(resp)
    // if (resp.ok) {
    //     console.log('成功', resp)
    // } else {
    //     console.log('请求失败', resp)
    // }

}

setTimeout(main, 1000)