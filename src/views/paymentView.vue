<template>
  <div class="payment">
    <div class="payment--content">
      <router-link class="payment--go-back" to="/">← Voltar</router-link>
      <Payment />
    </div>
    <cartList :showButton="showButton" class="payment--cart-list" v-if="isDesktop()" />
  </div>
</template>

<script>
import cartList from "../components/cartList.vue";
import Mixin from "../mixins/mixin.js";
import Payment from "../components/Payment.vue";

export default {
  name: "paymentPage",
  data() {
    return {
      showButton: true,
      path: window.location.pathname,
    };
  },
  components: {
    cartList,
    Payment,
  },
  mixins: [Mixin],
  created() {
    this.onShowButton();
  },
  methods: {
    onShowButton() {
      if (this.path == "/payment") {
        this.showButton = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.payment {
  display: flex;

  &--content {
    padding: 50px;
    flex-grow: 1;

    .payment--go-back {
      font-size: 24px;
      font-weight: 600;
      text-decoration: none;
      color: black;
    }
  }

  @media @smallDesktop {
    &--content {
      padding: 20px;

      .payment--go-back {
        font-size: 18px;
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

  &::-webkit-scrollbar-thumb {
    background-color: @dark-grey;
  }
}
</style>
