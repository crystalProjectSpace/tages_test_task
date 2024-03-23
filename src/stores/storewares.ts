import type { GetterTree, MutationTree, ActionTree } from 'vuex'
import type { ItemMaterial, WareItem } from '../interfaces'
import { ITEMS_PATH, MATERIALS_PATH } from '@/constants'

class State {
  items: WareItem[] = []

  materials: ItemMaterial[] = []

  loading = false
}

const mutations = <MutationTree<State>>{
  setItems(state: State, items: WareItem[]) {
    state.items = items
  },
  setMaterials(state: State, materials: ItemMaterial[]) {
    state.materials = materials
  },
  setLoading(state:State, loadState: boolean) {
    state.loading = loadState
  }
 }

const actions = <ActionTree<State, unknown>>{
  async acquireItemList({commit}) {
    commit('setLoading', true)
    try {
      const listRaw = await fetch(ITEMS_PATH)
      const list = await listRaw.json()
      commit('setItems', list)
    } catch(e) {
      console.error(e)
    } finally {
      commit('setLoading', false)
    }
  },
  async acquireMaterialsList({ commit }) {
    try {
      const listRaw = await fetch(MATERIALS_PATH)
      const list = await listRaw.json()
      commit('setMaterials', list)
    } catch(e) {
      console.error(e)
    }
  },
}

const getters = <GetterTree<State, unknown>>{
  loading: state => state.loading,
  items: state => state.items,
  materials: state => state.materials,
  itemCount: state => state.items.length,
}

export const storewares = {
  namespaced: true,
  state: new State(),
  mutations,
  actions,
  getters,
}
