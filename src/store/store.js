import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state () {
      return {
        selectedCategory: ""
      }
    },
    mutations: {
      changeOption (state, id) {
        state.selectedCategory = id
      }
    },
    actions: {
        changeOption (context, id) {
          context.commit('changeOption', id)
        }
      }
  })