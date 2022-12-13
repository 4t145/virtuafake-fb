import { Config, Decoder, RustType } from "bincode-ts";
const { u32, Vec } = RustType
export const config = new Config()

export const decoder = new Decoder(config);
export const encoder = new Decoder(config);
export const VecU32 = Vec(u32);