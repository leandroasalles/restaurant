<template>
  <div class="cart">
    <router-link class="cart--go-back" to="/" v-if="isSmallScreens()">← Voltar</router-link>
    <h2 class="cart--tittle">Seu pedido</h2>

    <div class="cart--content">
      <p v-if="hasNoItem">Seu carrinho ainda está vazio!</p>
      <cartItem v-for="item in cartList" :key="item.id" :item="item" />
    </div>

    <div class="cart--total" v-if="!hasNoItem">
      <span class="cart--total-tittle">Total: </span>
      <span class="cart--total-price">{{ getTotal | currency }}</span>
    </div>

    <div class="cart--final" v-if="this.cartList.length && this.showButton">
      <router-link tag="button" class="primary-button payment-button" to="/payment"
        >Finalizar pedido</router-link
      >
    </div>
  </div>
</template>

<script>
import cartItem from "./cartItem.vue";
import Mixin from "../mixins/mixin.js";
import { mapGetters } from "vuex";

export default {
  name: "cartList",
  filters: {
    currency(value) {
      return `R$ ${value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })}`;
    },
  },
  data() {
    return {};
  },
  props: {
    showButton: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    cartItem,
  },
  mixins: [Mixin],
  computed: {
    cartList: {
      get() {
        return this.$store.state.cartList;
      },
    },
    hasNoItem() {
      return !this.cartList.length;
    },

    ...mapGetters(["getTotal"]),
  },
};
</script>

<style scoped lang="less">
.cart {
  width: 643px;
  min-width: 643px;
  background: white;
  padding: 50px;
  display: flex;
  flex-direction: column;
  height: 100vh;

  &--tittle {
    min-height: 30px;
  }

  &--go-back {
    text-decoration: none;
    color: black;
  }

  &--content {
    flex-grow: 1;
    overflow: auto;
  }

  &--total {
    text-align: right;
    margin-top: 38px;
    min-height: 25px;

    &-tittle {
      margin-right: 20px;
      font-weight: 600;
      font-size: 18px;
      min-height: 30px;
    }

    &-price {
      color: @yellow;
      font-weight: 600;
      font-size: 18px;
    }
  }

  &--final {
    text-align: center;
    min-height: 90px;
    .payment-button {
      width: 400px;
      padding: 15px 0;
    }
  }

  @media (max-width: 480px) {
    padding: 30px;
    width: 100%;
    min-width: unset;

    &--final {
      .payment-button {
        width: 100%;
        margin: 10px 0;
      }
    }
  }
}

* {
  &::-webkit-scrollbar {
    width: 5px;
    background-color: @light-grey;
    padding: 9px;
  }

  &::-webkit-scrollbar-thumb{
    background-color: @dark-grey;
  }
}
</style>
