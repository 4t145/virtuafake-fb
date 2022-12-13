import { url } from ".";
import { Liver as LiverModel } from "../model";
export namespace Liver {
  export namespace StreamingList {
    const path = ["liver", "streaming-list"];
    const method = "GET";
    export type Req = undefined;
    export type Ok = Array<LiverModel>;

    export type Fail = string;
    export const send = async (): Promise<Ok> => {
      return (
        await fetch(url(path), {
          method,
          headers: {
            // 'Content-Type': 'application/json'
          },
        })
      ).json();
    };
  }

  export namespace Feedlist {
    export namespace Liver {
      const path = ["liver", "feedlist", "liver"];
      const method = "GET";
      export type Req = undefined;
      export type Ok = Array<LiverModel>;

      export type Fail = string;
      export const send = async (): Promise<Ok> => {
        return (
          await fetch(url(path), {
            method,
            headers: {
              // 'Content-Type': 'application/json'
            },
          })
        ).json();
      };
    }
  }
}
