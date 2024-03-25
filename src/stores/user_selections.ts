import type { GetterTree, MutationTree, ActionTree } from 'vuex'
import type { ItemAction } from '../interfaces'
import { ACTION_TYPES, USER_SELECTION_KEY, SORT_DIR, MATERIALS } from '../constants'
import { arraify, arrayMergeExclude, createUUID } from '../utils'

class State {
  userId: string = ''

  checkedItemIds: number[] = []

  selectedItemIds: number[] = []

  activeSort: SORT_DIR = SORT_DIR.DESC

  activeFilter: MATERIALS = MATERIALS.ALL
}

const mutations = <MutationTree<State>>{
  [ACTION_TYPES.CHECK](state:State, id: number | number[]) {
    const ids = arraify(id)
    state.checkedItemIds = arrayMergeExclude(state.checkedItemIds, ids) as number[]
  },
  [ACTION_TYPES.SELECT](state:State, id: number | number[]) {
    const ids = arraify(id)
    state.selectedItemIds = arrayMergeExclude(state.selectedItemIds, ids) as number[]
  },
  setUserId(state: State, id: string) {
    state.userId = id
  },
  setSort(state: State, sortDir: SORT_DIR) {
    state.activeSort = sortDir
  },
  setFilter(state: State, filter: MATERIALS) {
    state.activeFilter = filter
  }
 }

const actions = <ActionTree<State, unknown>>{
  toggleItemAction({ commit }, operation: ItemAction) {
    const { id, action } = operation
    commit(action, id)
  },
  clearSelected({ commit }) {
    commit(ACTION_TYPES.SELECT, [])
  },
  clearChecked({ commit }) {
    commit(ACTION_TYPES.CHECK, [])
  },
  selectionToLS({ getters }) {
    window.localStorage.removeItem(USER_SELECTION_KEY)
    const { serializedUserData } = getters
    window.localStorage.setItem(USER_SELECTION_KEY, serializedUserData)
  },
  restoreFromLS({ commit, dispatch }) {
    const serializedSelection = window.localStorage.getItem(USER_SELECTION_KEY)
    if (serializedSelection) {
      const parsedSeletecion = JSON.parse(serializedSelection)
      const { userId, checkedItemIds, selectedItemIds, activeSort, activeFilter } = parsedSeletecion
      commit(ACTION_TYPES.SELECT, selectedItemIds)
      commit(ACTION_TYPES.CHECK, checkedItemIds)
      commit('setUserId', userId)
      commit('setSort', activeSort)
      commit('setFilter', activeFilter)
    } else {
      const uuid = createUUID()
      commit('setUserId', uuid)
      dispatch('resetFilters')
    }
  },
  updateFilters({ commit }, filterData: { sort?: SORT_DIR, filter?: MATERIALS }) {
    const { sort, filter } = filterData
    if(sort) commit('setSort', sort)
    if(filter) commit('setFilter', filter)
  },
  resetFilters({ commit }) {
    commit('setSort', SORT_DIR.DESC)
    commit('setFilter', MATERIALS.ALL)
  }
}

const getters = <GetterTree<State, unknown>>{
  checkedItemIds: state => state.checkedItemIds,
  selectedItemIds: state => state.selectedItemIds,
  activeSort: state => state.activeSort,
  activeFilter: state => state.activeFilter,
  serializedUserData: state => JSON.stringify(state),
}

export const user_selections = {
  namespaced: true,
  state: new State(),
  mutations,
  actions,
  getters,
}
