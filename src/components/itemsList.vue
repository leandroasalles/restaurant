<template>
  <div class="items-list">
    <div class="items-list--loading" v-if="loading">
      <loading />
    </div>
    <div class="items-list--items" v-else>
      <itemUnit v-for="item in itemsList" :key="item.id" :item="item"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import itemUnit from "./itemUnit.vue";
import loading from "./loadingPage.vue"

export default {
  name: "itemsList",
  components: {
    itemUnit,
    loading,
  },
  data() {
    return {
      itemsList: [],
      loading: true,
    };
  },

  methods: {
    getItemsList() {
      this.loading = true
      setTimeout(() => {

        axios
          .get(`http://localhost:3000/${this.selectedCategory}`)
          .then((response) => {
            this.itemsList = response.data;
            this.loading = false
          });
      },3000)
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
.items-list {
  width: 100%;
  display: flex;
  flex-direction: column;

  &--loading{
    
    margin: auto;
  }

  &--items {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    height: fit-content;

    @media @tablet {
      flex-direction: column;
      margin: 20px;
    }
  }
}
</style>
