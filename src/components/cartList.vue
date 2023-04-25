<template>
  <div class="cart">
    <router-link class="cart--go-back" to="/" v-if="isSmallScreens()">Voltar</router-link>
    <h2 class="cart--tittle">Seu pedido</h2>
    <p v-if="hasNoItem">Seu carrinho ainda está vazio!</p>
    <cartItem v-for="item in cartList" :key="item.id" :item="item"/>
    <div class="cart--total" v-if="!hasNoItem">
      <span class="cart--total-tittle">Total: </span>
      <span class="cart--total-price">{{getTotal | currency}}</span>
    </div>
  </div>
</template>

<script>
import cartItem from "./cartItem.vue";
import Mixin from "../mixins/mixin.js";
import { mapGetters } from 'vuex';

export default {
  name: "cartList",
    filters: {
    currency(value) {
      return `R$ ${value.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
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
      hasNoItem(){
        return !this.cartList.length
      },

    ...mapGetters([
      'getTotal',
    ]),
    
  },
};
</script>

<style scoped lang="less">
.cart {
  width: 643px;
  min-width: 643px;
  background: white;
  padding: 50px;

  &--go-back{
    text-decoration: none;
    color: black;
  }

  &--total{
    text-align: right;
    margin-top: 38px;

    &-tittle{
      margin-right: 20px;
      font-weight: 600;
      font-size: 18px;
    }

    &-price{
      color: @yellow;
      font-weight: 600;
      font-size: 18px;
    }
  }

  @media (max-width:480px){
      padding: 30px;
      width: 100%;
      min-width: unset;
  }

  
}
</style>
