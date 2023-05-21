<template>
    <div class="item-quantity">
        <trash class="item-quantity--trash" v-if="item.quantity == 1" @click="decreaseQuantity()" />
        <button class="item-quantity--buttons" @click="decreaseQuantity" v-else>-</button>
        <span class="item-quantity--quantity">{{ item.quantity }}</span>
        <button class="item-quantity--buttons" @click="increaseQuantity">+</button>
    </div>
</template>

<script>
import trash from "../assets/icons/trash.svg"

export default {
    name: "QuantityItem",
    props: {
        item: {}
    },
    components: {
        trash,
    },
    methods:{
    increaseQuantity(){
      this.$store.dispatch("increaseQuantity", this.item)
    },
    decreaseQuantity(){
      this.$store.dispatch("decreaseQuantity", this.item)
    }
  }
}

</script>

<style lang="less" scoped>
.item-quantity {
    display: flex;
    align-items: center;
    margin-right: 20px;

    &--trash {
        width: 20px;
        height: 20px;
        cursor: pointer;

    }

    &--buttons {
        font-weight: 600;
        font-size: 18px;
        cursor: pointer;
        background: none;
        border: 0;
    }

    &--quantity {
        font-weight: 500;
        font-size: 18px;
        color: @yellow;
        width: 28px;
        text-align: center;
    }
}
</style>