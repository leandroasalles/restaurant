<template>
  <div class="cart">
    <h2>Seu pedido</h2>
    <cartItem v-for="item in cartList" :key="item.id" :item="item"/>
  </div>
</template>

<script>
import cartItem from "./cartItem.vue";

export default {
  name: "cartList",
  components: {
    cartItem,
  },
  computed: {
    cartList: {
      get() {
        return this.$store.state.cartList;
      },
    },
  },
};
</script>

<style scoped lang="less">
.cart {
  width: 643px;
  min-width: 643px;
  background: white;
  padding: 50px;
}
</style>
