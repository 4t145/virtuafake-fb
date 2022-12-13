import { Pagination, Paged, url } from ".";
import { DanmakuEvent } from "bilive-danmaku-json";
import { RustType, Decoder } from "bincode-ts";
import { config, VecU32 } from "../bincode";
export namespace Liveroom {
  export namespace Info {
    const path = ["liveroom", "info"];
    const method = "GET";
    export type Req = {
      uid: number;
    };

    export type Ok = {
      avatar: string;
      username: string;
      title: string;
      watched: number;
      cover: string;
      is_streaming: boolean;
    };

    export type Fail = string;
    export const send = async (req: Req): Promise<Ok> => {
      return (
        await fetch(url(path, req), {
          method,
          headers: {
            // 'Content-Type': 'application/json'
          },
        })
      ).json();
    };
  }

  export namespace Danmaku {
    const path = ["liveroom", "danmaku"];
    const method = "POST";
    export type Req = {
      pagination: Pagination;
      uid?: number;
      roomid: number;
      no_emoticon: boolean;
      no_draw: boolean;
      time_from: number;
      time_to: number;
    };

    export type Ok = Paged<DanmakuEvent>;

    export type Fail = string;
    export const send = async (req: Req): Promise<Ok> => {
      console.log(req);
      return (
        await fetch(url(path), {
          method,
          mode: "cors",
          credentials: "omit",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req),
        })
      ).json();
    };
  }

  export namespace DanmakuHeat {
    const path = ["liveroom", "danmaku-heat"];
    const method = "POST";

    export type Req = {
      roomid: number;
      time_from: number;
      time_to: number;
    };

    export type Ok = Array<number>;

    export type Fail = string;
    export const send = async (req: Req): Promise<Ok> => {
      const buffer = await (
        await fetch(url(path), {
          method,
          mode: "cors",
          credentials: "omit",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req),
        })
      ).arrayBuffer();
      const decoder = new Decoder(config);
      return decoder.load(buffer).decodeAs(VecU32);
    };
  }

  export namespace Watched {
    const path = ["liveroom", "watched"];
    const method = "POST";
    export type Req = {
      roomid: number;
      time_from: number;
      time_to: number;
    };
    export type Ok = Array<number>;

    export type Fail = string;
    export const send = async (req: Req): Promise<Ok> => {
      const buffer = await (
        await fetch(url(path), {
          method,
          mode: "cors",
          credentials: "omit",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req),
        })
      ).arrayBuffer();
      const decoder = new Decoder(config);
      return decoder.load(buffer).decodeAs(VecU32);
    };
  }
}
