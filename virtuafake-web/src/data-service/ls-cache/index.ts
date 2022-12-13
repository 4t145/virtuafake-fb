import { Model } from "virtuafake-api";

export enum Key {
  LiverList = "LiverList",
}

type LsCacheType = {
  [Key.LiverList]: Array<Model.Liver>;
};

export function get<Key extends keyof LsCacheType>(
  key: Key
): LsCacheType[Key] | undefined {
  const str = localStorage.getItem(key);
  if (str) {
    return JSON.parse(str);
  }
}

export function set<Key extends keyof LsCacheType>(
  key: Key,
  value: LsCacheType[Key]
) {
  localStorage.setItem(key, JSON.stringify(value));
}
