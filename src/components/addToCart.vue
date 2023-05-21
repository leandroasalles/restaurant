<template>
  <div class="add-cart">
    <router-link class="add-cart--go-back" to="/" v-if="isSmallScreens()">Voltar</router-link>
    <itemUnit :item="itemUnit"/>
  </div>
</template>

<script>
import axios from "axios";
import itemUnit from "./itemUnit.vue";
import mixin from '../mixins/mixin.js'

export default {
  data() {
    return {
      itemUnit: {},
      loading: true,
    };
  },
  mixins: [mixin],
  props: [
    'id',
  ],
  name: "addToCart",
  components: {
    itemUnit,
  },
    created() {
      this.getItemsList()
    },

    methods: {
      getItemsList() {
        this.loading = true
        setTimeout(() => {

          axios
            .get(`http://localhost:3000/${this.selectedCategory}/${this.id}`)
            .then((response) => {
              this.itemUnit = response.data;
              this.loading = false
            });
        }, 1000)
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

}
</script>

<style lang="less" scoped>

.add-cart{
  padding: 50px 20px;
  &--go-back{
    font-size: 18px;
    font-weight: 600;
    text-decoration: none;
    color: black;
  }
}

</style>