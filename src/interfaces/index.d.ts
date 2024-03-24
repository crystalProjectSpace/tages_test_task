import { ACTION_TYPES, MATERIALS } from "../constants"

interface ItemPrice {
  old_price: number | null,
  current_price: number,
}

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
  id: string,
  name: string,
  code: string,
  price: ItemPrice,
  image: imgData,
  material: MATERIALS
}
