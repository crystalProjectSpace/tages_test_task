import { createStore } from 'vuex'
import { storewares } from './storewares'
import { user_selections } from './user_selections'

export const store = createStore({
  modules: {
    storewares,
    user_selections,
  }
})
