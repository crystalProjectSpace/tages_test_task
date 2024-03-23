import { createStore } from 'vuex'
import { storewares } from './storewares'


export const store = createStore({
  modules: {
    storewares,
  }
})
