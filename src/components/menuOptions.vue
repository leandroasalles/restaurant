<template>
  <div class="menu">
    <ul>
      <li
        v-for="item in options"
        :key="item.id"
        @click="categoryClick(item.id)"
        :class="{ ative: isActive(item.id) }"
      >
        <component :is="item.icon" />
        <p>{{ item.label }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import pizza from "../assets/icons/pizza.svg";
import drinks from "../assets/icons/drinks.svg";
import deserts from "../assets/icons/deserts.svg";
import combo from "../assets/icons/combo.svg";
import burguer from "../assets/icons/food.svg";
import store from "../store/store.js";

export default {
  name: "menuOptions",
  components: {
    pizza,
    drinks,
    deserts,
    combo,
    burguer,
    store,
  },
  data() {
    return {
      options: [
        { label: "Pizza", icon: "pizza", id: "pizza" },
        { label: "Bebidas", icon: "drinks", id: "drinks" },
        { label: "Sobremesas", icon: "deserts", id: "deserts" },
        { label: "Combos", icon: "combo", id: "combo" },
        { label: "Burguers", icon: "burguer", id: "burguers" },
      ],
      selectedCategory: "",
    };
  },

  mounted() {
    this.categoryClick("pizza");
  },

  methods: {
    categoryClick(id) {
      this.selectedCategory = id;
      this.$store.dispatch("changeOption", id);
    },
    isActive(id) {
      return this.selectedCategory === id;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.menu {
  height: 100vh;
  width: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;

  ul {
    list-style: none;
    padding: 0;
    width: 100%;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100px;
      border-radius: 8px;
      cursor: pointer;

      p {
        margin-bottom: 0;
        font-size: 14px;
        color: @dark-grey;
        font-weight: 600;
      }

      svg {
        path {
          fill: @dark-grey;
        }
      }

      &.ative {
        background: @yellow;

        p {
          color: black;
        }

        svg {
          path {
            fill: black;
          }
        }
      }
    }
  }

  @media @tablet {
    width: 100%;
    height: fit-content;

    ul {
      display: flex;
      margin: 20px;
      overflow: scroll;
      justify-content: center;

      li {
        min-width: 100px;
      }
    }
  }

  @media @smartphone {
    ul {
      justify-content: initial;
    }
  }
}
</style>
