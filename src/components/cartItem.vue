<template>
  <div class="item">
    <quantity class="item--quantity" :item="item" />
    <div class="item--img-container">
      <div class="item--img">
        <img :src="imagePath" />
      </div>
    </div>
    <div class="item--content">
      <div class="item--name">
        {{ item.name }}
      </div>
      <div class="item--observation-text">
        {{ item.observation }}
      </div>
      <a class="item--observation" @click="addObservation()">Adicionar observação</a>
    </div>
    <div class="item--price">
      {{ item.price | currency }}
    </div>
    <modal class="observation-modal" :show="showModal" @modal-close="showModal = false">
      <h2>Adicionar observação</h2>
      <textarea v-model="item.observation" rows="8"></textarea>
      <button class="secundary-button" @click="cancelObservation()">Cancelar</button>
      <button class="primary-button" @click="saveObservation()">Salvar observação</button>
    </modal>
  </div>
</template>

<script>
import quantity from "../components/quantity.vue";
import modal from "./Modal.vue";

export default {
  name: "cartItem",
  data() {
    return {
      showModal: false,
    };
  },
  components: {
    quantity,
    modal,
  },
  props: {
    item: {},
  },
  methods: {
    addObservation() {
      this.showModal = true;
    },
    cancelObservation() {
      this.showModal = false;
    },
    saveObservation(){
      this.$store.dispatch('saveObservation', this.item)
      this.showModal = false;
    },
  },
  computed: {
    imagePath() {
      return require(`../assets/images/${this.item.id}.png`);
    },
  },
  filters: {
    currency(value) {
      return `R$ ${value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })}`;
    },
  },
};
</script>

<style scoped lang="less">
.item {
  display: flex;
  align-items: center;
  border-bottom: solid 1px @light-grey;
  padding: 20px 5px;

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

  &--content {
    flex-grow: 1;
    padding: 0 20px;
  }

  &--name {
    font-weight: 600;
    font-size: 18px;
  }

  &--observation-text {
    font-weight: 500;
    font-size: 12px;
    color: @dark-grey;
  }

  &--observation {
    font-weight: 500;
    font-size: 12px;
    color: @dark-grey;
    text-decoration: underline;
    cursor: pointer;
  }

  &--price {
    font-weight: 600;
    font-size: 18px;
    color: @yellow;
  }

  @media @tablet {
    flex-wrap: wrap;

    &--img {
      order: 1;
    }

    &--content {
      order: 2;
    }

    &--quantity {
      order: 3;
      padding: 0;
      width: 80px;
      justify-content: center;
    }

    &--price {
      order: 4;
      padding: 0 20px;
    }
  }

  .observation-modal {
    text-align: center;

    textarea {
      width: 100%;
      resize: none;
    }
  }
}
</style>
