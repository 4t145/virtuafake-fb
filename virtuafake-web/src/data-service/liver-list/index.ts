import * as LsCache from "../ls-cache";
import { Model, Api } from "virtuafake-api";
class LiverListService {
  private _liverList: Model.Liver[] = [];
  private _syncing: boolean = false;
  get syncing(): boolean {
    return this._syncing;
  }
  get liverList(): Model.Liver[] {
    if (this._syncing) {
      return [];
    } else {
      return this._liverList;
    }
  }
  /**
   * 从本地储存加载
   */
  static local(): LiverListService {
    const srv = new LiverListService();
    const local = LsCache.get(LsCache.Key.LiverList);
    if (local) {
      srv._liverList = local;
    }
    return srv;
  }

  static remote(): LiverListService {
    const srv = LiverListService.local();
    srv.sync();
    return srv;
  }

  async sync(): Promise<void> {
    this._syncing = true;

    await Api.Liver.Feedlist.Liver.send()
      .then((liverList) => {
        this._liverList = liverList;
        LsCache.set(LsCache.Key.LiverList, liverList);
      })
      .finally(() => (this._syncing = false));
  }
}

export default LiverListService.remote();
