<template>
  <div class="add-cart">
    <router-link class="add-cart--go-back" to="/" v-if="isSmallScreens()"
      >Voltar</router-link
    >
    <item :item="item" />
    <div class="add-cart--container">
      <div class="add-cart--container-quantity">
        <span>Quantidade: </span>
        <quantity 
        :useStore=false
        :item="item" 
        />
      </div>
      <p>Observações:</p>
      <textarea class="add-cart--container-observations" rows="10"></textarea>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import item from "./itemUnit.vue";
import mixin from "../mixins/mixin.js";
import quantity from "../components/quantity.vue";

export default {
  data() {
    return {
      item: {},
      loading: true,
    };
  },
  mixins: [mixin],
  props: ["id"],
  name: "addToCart",
  components: {
    item,
    quantity,
  },
  created() {
    this.getItemsList();
  },

  methods: {
    getItemsList() {
      this.loading = true;

      axios
        .get(`http://localhost:3000/${this.selectedCategory}/${this.id}`)
        .then((response) => {
          this.item = {quantity: 1, ...response.data};
          this.loading = false;
        });
    },
  },

  computed: {
    selectedCategory: {
      get() {
        return this.$store.state.selectedCategory;
      },
    },
  },

  watch: {
    selectedCategory() {
      this.getItemsList();
    },
  },
};
</script>

<style lang="less" scoped>
.add-cart {
  padding: 50px 20px;

  &--go-back {
    font-size: 18px;
    font-weight: 600;
    text-decoration: none;
    color: black;
  }

  &--container {
    font-weight: 600;
    font-size: 16px;

    &-quantity {
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      border: 1px solid @light-grey;
      border-radius: 8px;
    }

    &-observations {
      width: 100%;
      border: 1px solid @light-grey;
      border-radius: 8px;
      padding: 10px;
    }

    textarea:focus {
      outline: 0;
    }
  }
}
</style>
