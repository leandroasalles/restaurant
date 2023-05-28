<template>
  <div class="item-quantity">
    <!-- <trash class="item-quantity--trash" v-if="item.quantity == 1" @click="OnDecreaseQuantityClick"/> -->
    <button class="item-quantity--buttons" @click="OnDecreaseQuantityClick" :disabled="item.quantity == 0"> - </button>
    <span class="item-quantity--quantity">{{ item.quantity }}</span>
    <button class="item-quantity--buttons" @click="OnIncreaseQuantityClick"> + </button>
  </div>
</template>

<script>
// import trash from "../assets/icons/trash.svg";
// import { mapActions } from "vuex";

export default {
  name: "QuantityItem",
  data() {
    return {
      
    };
  },
  props: {
    item: {},
    useStore: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    // trash,
  },
  methods: {
    // ...mapActions(['increaseQuantity', 'decreaseQuantity']),

    OnIncreaseQuantityClick() {
      if (this.useStore) {
        this.$store.dispatch("increaseQuantity", this.item);
        return;
      }
      // eslint-disable-next-line
      ++this.item.quantity
    },

    OnDecreaseQuantityClick(){
      if(this.useStore){
        this.$store.dispatch("decreaseQuantity", this.item);
        return
      }
      // eslint-disable-next-line
      --this.item.quantity
    },

    // OnIncreaseQuantityClick(){
    //   console.log(this.mutableItem)
    //   console.log(this.useStore)
    //   console.log(this.item.quantity)
    //   if(this.useStore){
    //     this.increaseQuantity(this.item.id)
    //     return
    //   }
    //   // ++this.mutableItem.quantity
    // },

    // OnDecreaseQuantityClick() {
    //   if (this.useStore) {
    //     this.decreaseQuantity(this.item.id);
    //     return;
    //   }

    // --this.mutableItem.quantity
    // },
  },
};
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

  @media @tablet {
    margin: 0;
  }
}
</style>
