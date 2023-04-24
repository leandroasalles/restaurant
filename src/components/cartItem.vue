<template>
  <div class="item">
    <div class="item--quantity">
      <button class="buttons" @click="decreaseQuantity" :disabled='item.quantity == 1'>-</button>
      <span class="quantity">{{item.quantity}}</span>
      <button class="buttons" @click="increaseQuantity">+</button>
    </div>
    <div class="item--img-container">
      <div class="item--img">
        <img :src="imagePath" />
      </div>
    </div>
    <div class="item--content">
      <div class="item--name">
        {{ item.name }}
      </div>
      <a class="item--observation">Adicionar observação</a>
    </div>
    <div class="item--price">
      {{ item.price | currency }}
    </div>
  </div>
</template>

<script>
export default {
  name: "cartItem",
  props: {
    item: {},
  },
  computed: {
    imagePath() {
      return require(`../assets/images/${this.item.id}.png`);
    },
  },
  filters: {
    currency(value) {
      return `R$ ${value.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      })}`;
    },
  },
  methods:{
    increaseQuantity(){
      this.$store.dispatch("increaseQuantity", this.item)
    },
    decreaseQuantity(){
      this.$store.dispatch("decreaseQuantity", this.item)
    }
  }
};
</script>

<style scoped lang="less">
.item {
  display: flex;
  border-bottom: solid 1px @light-grey;
  padding: 20px 0;

  &--quantity{
    display: flex;
    align-items: center;
    padding-right: 37px;

    .buttons{
      font-weight: 600;
      font-size: 18px;
      cursor: pointer;
      background: none;
      border: 0;
    }
    .quantity{
      font-weight: 500;
      font-size: 18px;
      color: @yellow;
      width: 28px;
      text-align: center;
    }
  }

  &--img-container {
    width: 80px;
    height: 65px;
    background: @light-yellow;
    border-radius: 8px;
    display: flex;
    align-items: center;
  }

  &--img {
    width: 65px;
    display: block;
    margin: 0 auto;

    img {
      width: 100%;
    }
  }

  &--content{
    flex-grow: 1;
    padding: 0 20px;
  }

  &--name {
    font-weight: 600;
    font-size: 18px;
  }

  &--observation {
    font-weight: 500;
    font-size: 12px;
    color: @dark-grey;
    text-decoration: underline;
  }

  &--price {
    font-weight: 600;
    font-size: 18px;
    color: @yellow;
  }
}
</style>
