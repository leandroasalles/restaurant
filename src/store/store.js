import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state() {
    return {
      selectedCategory: "",
      cartList: [],
    };
  },
  mutations: {
    changeOption(state, id) {
      state.selectedCategory = id;
    },

    addToCart(state, el) {
      state.cartList.push({ ...el, quantity: el?.quantity || 1 });
    },

    increaseQuantity(state, { index, quantity }) {
      state.cartList[index].quantity += quantity;
    },

    decreaseQuantity(state, index) {
      --state.cartList[index].quantity;
    },

    deleteItem(state, index) {
      state.cartList.splice(index, 1);
    },

    saveObservation(state, {index, observation}){
      state.cartList[index].observation = observation
    }
  },
  actions: {
    changeOption(context, id) {
      context.commit("changeOption", id);
    },

    addToCart({ state, commit }, el) {
      const cartItem = state.cartList.find((cartItem) => cartItem.id == el.id);

      if (!cartItem) {
        commit("addToCart", el);
        return;
      }

      const cartItemIndex = state.cartList.findIndex((cartItem) => cartItem.id == el.id);
      commit("increaseQuantity", { index: cartItemIndex, quantity: el?.quantity || 1 });
    },

    increaseQuantity({ state, commit }, el) {
      const cartItemIndex = state.cartList.findIndex((cartItem) => cartItem.id == el.id);

      commit("increaseQuantity", { index: cartItemIndex, quantity: 1 });
    },

    decreaseQuantity({ state, commit }, el) {
      const cartItemIndex = state.cartList.findIndex((cartItem) => cartItem.id == el.id);

      commit("decreaseQuantity", cartItemIndex);
    },

    deleteItem({ state, commit }, el) {
      const cartItemIndex = state.cartList.findIndex((cartItem) => cartItem.id == el.id);
      commit("deleteItem", cartItemIndex);
    },

    saveObservation({ state, commit }, el){
      const cartItemIndex = state.cartList.findIndex((cartItem) => cartItem.id == el.id);
      commit("saveObservation", {
        index: cartItemIndex,
        observation: el.observation
      });
    }
  },
  getters: {
    getTotal(state) {
      return state.cartList.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
    },
  },
});
