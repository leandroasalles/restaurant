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
      state.cartList.push({ ...el, quantity: 1 });
    },
    increaseQuantity(state, index) {
      ++state.cartList[index].quantity;
    },
    decreaseQuantity(state, index) {
      --state.cartList[index].quantity;
    },
    deleteItem(state, index){
      state.cartList.splice(index, 1)
    }
  },
  actions: {
    changeOption(context, id) {
      context.commit("changeOption", id);
    },
    addToCart({ state, commit }, el) {
      const cartItem = state.cartList.find((cartItem) => cartItem.id == el.id);
      const cartItemIndex = state.cartList.findIndex(
        (cartItem) => cartItem.id == el.id
      );

      cartItem
        ? commit("increaseQuantity", cartItemIndex)
        : commit("addToCart", el);
    },
    increaseQuantity({ state, commit }, el) {
      const cartItemIndex = state.cartList.findIndex(
        (cartItem) => cartItem.id == el.id
      );

      commit("increaseQuantity", cartItemIndex);
    },
    decreaseQuantity({ state, commit }, el) {
      const cartItemIndex = state.cartList.findIndex(
        (cartItem) => cartItem.id == el.id
      );
        
      commit("decreaseQuantity", cartItemIndex);

      // state.cartList[cartItemIndex].quantity == 1
      //   ? commit("deleteItem", cartItemIndex)
      //   : commit("decreaseQuantity", cartItemIndex);
    },
  },
  getters: {
    getTotal (state) {
      return state.cartList.reduce( (acc, item) => {
        return acc + (item.price * item.quantity)
      }, 0)
    }
  }
});
