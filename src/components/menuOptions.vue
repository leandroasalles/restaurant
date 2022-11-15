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
import burguer from "../assets/icons/food.svg";
import fries from "../assets/icons/fries.svg";
import iceCream from "../assets/icons/iceCream.svg";
import pizza from "../assets/icons/pizza.svg";
import smothie from "../assets/icons/smothie.svg";
import home from '../components/views/homeView.vue'

export default {
  name: "menuOptions",
  components: {
    burguer,
    fries,
    iceCream,
    pizza,
    smothie,
    home,
  },
  data() {
    return {
      options: [
        { label: "Pizza", icon: "pizza", id: "Pizza" },
        { label: "Bebidas", icon: "smothie", id: "Smothie" },
        { label: "Sobremesas", icon: "iceCream", id: "Ice Cream" },
        { label: "Combos", icon: "fries", id: "Fries" },
        { label: "Burguers", icon: "burguer", id: "Burguer" },
      ],
      selectedCategory: "Pizza",
    };
  },
  methods: {
    categoryClick(id) {
      this.selectedCategory = id;
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
      
      p{
        margin-bottom: 0;
        font-size: 14px;
        color: @dark-grey;
      }

      svg{
        path{
          fill: @dark-grey;
        }
      }

      &.ative {
        background: @yellow;

        p{
          color: black;
        }

        svg{
          path{
            fill: black;
          }
        }
      }
    }
  }

  @media @tablet {
    width: 100%;
    height: fit-content;

    ul{
      display: flex;
      margin: 20px;
      overflow: scroll;
      justify-content: center;

      li{
        min-width: 79px;
      }
    }
  }

  @media @smartphone {
    ul{
      justify-content: initial;
    }
    
  }
}
</style>
