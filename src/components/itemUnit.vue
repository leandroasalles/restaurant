<template>
  <div class="item" @click="addToCart">
    <div class="item--container">
      <img class="item--image" :src="imagePath" />
    </div>
    <div class="item--content">
      <h2 class="item--name">{{ item.name }}</h2>
      <p class="item--description">{{ item.description }}</p>
      <p class="item--price">{{item.price | currency}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "itemUnit",
  filters: {
    currency(value) {
      return `R$ ${value.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    },
  },

  props: {
    item: {},
  },

  computed: {
    imagePath() {
      return require(`../assets/images/${this.item.id}.png`);
    },
  },
  methods: {
    addToCart() {
      this.$store.dispatch("addToCart", this.item);
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  width: 220px;
  height: 290px;
  background: white;
  border-radius: 8px;
  margin: 20px;
  padding: 20px;
  text-align: left;

  &--image {
    width: 127px;
    display: block;
    margin: 20px auto;
  }

  &--name {
    font-size: 18px;
    margin: 8px 0;
  }

  &--description {
    font-size: 12px;
    color: @dark-grey;
    margin: 0;
  }

  &--price {
    color: @yellow;
    font-size: 18px;
    margin: 8px 0;
  }

  @media @tablet {
    display: flex;
    width: 100%;
    height: fit-content;
    margin: 0;
    border: 1px solid @dark-grey;
    margin: 10px auto;
    padding: 20px 10px;
    justify-content: center;

    &--container {
      margin-right: 8px;
      min-width: 80px;
    }

    &--image {
      width: 80px;
      margin: auto 0;
    }

    &--name {
      margin: 0 0 10px 0;
    }

    &--description {
      margin: 0;
    }

    &--price {
      margin: 0;
      text-align: right;
    }
  }
}
</style>
