<template>
  <div class="item-quantity">
    <!-- <trash class="item-quantity--trash" v-if="item.quantity == 1" @click="OnDecreaseQuantityClick"/> -->
    <button
      class="item-quantity--buttons"
      @click="OnDecreaseQuantityClick"
      :disabled="item.quantity == 0"
    >
      -
    </button>
    <span class="item-quantity--quantity">{{ item.quantity }}</span>
    <button class="item-quantity--buttons" @click="OnIncreaseQuantityClick">
      +
    </button>
    <Modal
      class="modal-remove"
      :show="showModal"
      @modal-close="cancelRemove()">
      <h2>Deseja remover o item do carrinho?</h2>
      <div class="modal-remove--btn">
        <button class="secundary-button" @click="cancelRemove()">Cancelar</button>
        <button class="primary-button" @click="deleteItem()">Remover item</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "./Modal.vue";
// import trash from "../assets/icons/trash.svg";
// import { mapActions } from "vuex";

export default {
  name: "QuantityItem",
  data() {
    return {
      showModal: false,
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
    Modal,
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
      ++this.item.quantity;
    },

    OnDecreaseQuantityClick() {
      if (this.useStore) {
        this.$store.dispatch("decreaseQuantity", this.item);
        if (this.item.quantity == 0) {
          this.showModal = true;
        }
        return;
      }
      // eslint-disable-next-line
      --this.item.quantity;
    },

    deleteItem() {
      this.$store.dispatch("deleteItem", this.item);
      this.showModal = false;
    },

    cancelRemove(){
      this.showModal = false;
      this.OnIncreaseQuantityClick()
    }
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

  .modal-remove {
    text-align: center;

  }

  @media @tablet {
    margin: 0;
  }
}
</style>
