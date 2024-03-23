import { ACTION_TYPES, MATERIALS } from "../constants"

export interface ItemAction {
  id: number,
  action: ACTION_TYPES,
}
  
interface imgData {
  url: string
}
  
export interface ItemMaterial {
  name: string,
  id: MATERIALS,
}
  
export interface WareItem {
  id: number,
  name: string,
  code: string,
  price: Record<string, number>,
  image: imgData,
  material: MATERIALS
}

declare module "vuex" {
  export * from "vuex/types/index.d.ts";
  export * from "vuex/types/helpers.d.ts";
  export * from "vuex/types/logger.d.ts";
  export * from "vuex/types/vue.d.ts";
}