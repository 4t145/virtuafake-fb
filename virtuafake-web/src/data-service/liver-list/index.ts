import * as LsCache from "../ls-cache";
import { Model, Api } from "virtuafake-api";
class LiverListService {
  private _liverList: Promise<Model.Liver[]> = Promise.reject();
  private _syncing: boolean = false;
  get syncing(): boolean {
    return this._syncing;
  }
  get liverList(): Promise<Model.Liver[]> {
    return this._liverList
  }
  /**
   * 从本地储存加载
   */
  static local(): LiverListService {
    const srv = new LiverListService();
    const local = LsCache.get(LsCache.Key.LiverList);
    if (local) {
      srv._liverList = Promise.resolve(local);
    }
    return srv;
  }

  static remote(): LiverListService {
    const srv = LiverListService.local();
    srv.sync();
    return srv;
  }

  sync(): void {
    this._syncing = true;
    this._liverList = Api.Liver.Feedlist.Liver.send()
      .then((liverList) => {
        LsCache.set(LsCache.Key.LiverList, liverList);
        return liverList;
      })
      .finally(() => (this._syncing = false));
  }
}

export default LiverListService.remote();
