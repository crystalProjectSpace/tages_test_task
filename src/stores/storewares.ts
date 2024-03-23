import type { GetterTree, MutationTree, ActionTree } from 'vuex'
import type { ItemAction, ItemMaterial, WareItem } from '../interfaces'
import { ACTION_TYPES } from '../constants'

class State {
  items: WareItem[] = []

  materials: ItemMaterial[] = []
  
  checkedItemIds: number[] = []

  selectedItemIds: number[] = []

  loading = false
}

const mutations = <MutationTree<State>>{
  setItems(state: State, items: WareItem[]) {
    state.items = items
  },
  setMaterials(state: State, materials: ItemMaterial[]) {
    state.materials = materials
  },
  [ACTION_TYPES.CHECK](state:State, id: number) {
    const isChecked = state.checkedItemIds.includes(id)
    state.checkedItemIds = isChecked
      ? state.checkedItemIds.filter(itemId => itemId !== id)
      : [...state.checkedItemIds, id]
  },
  [ACTION_TYPES.SELECT](state:State, id: number) {
    const isSelected = state.selectedItemIds.includes(id)
    state.selectedItemIds = isSelected
      ? state.selectedItemIds.filter(itemId => itemId !== id)
      : [...state.selectedItemIds, id]
  },
  setLoading(state:State, loadState: boolean) {
    state.loading = loadState
  }
 }

const actions = <ActionTree<State, unknown>>{
  async acquireItemList({commit}) {
    commit('setLoading', true)
    try {
      const listRaw = await fetch('/items.json')
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
      const listRaw = await fetch('/materials.json')
      const list = await listRaw.json()
      commit('setMaterials', list)
    } catch(e) {
      console.error(e)
    }
  },
  toggleItemAction({ commit}, operation: ItemAction) {
    const { id, action } = operation
    commit(action, id)
  },
  clearSelected({commit}) {
    commit(ACTION_TYPES.SELECT, [])
  },
  clearChecked({commit}) {
    commit(ACTION_TYPES.CHECK, [])
  }
}

const getters = <GetterTree<State, unknown>>{
  items: state => state.items,
  materials: state => state.materials,
  itemCount: state => state.items.length,
  checkedItems: ({items, checkedItemIds }) => items.filter(i => checkedItemIds.includes(i)),
  selectedItems: ({items, selectedItemIds }) => items.filter(i => selectedItemIds.includes(i)),
}

export const storewares = {
  namespaced: true,
  state: new State(),
  mutations,
  actions,
  getters,
}
