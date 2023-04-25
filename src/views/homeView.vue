<template>
  <div class="homeView">
     <router-link to="/cart" class="cart-icon" v-if="isSmallScreens()">
      <cartIcon />
    </router-link>
    <menuOptions />
    <itemsList />
    <cart v-if="isDesktop()"/>
    
  </div>
</template>

<script>
import menuOptions from '../components/menuOptions.vue'
import itemsList from '../components/itemsList.vue'
import cart from '../components/cartList.vue'
import Mixin from '../mixins/mixin.js'
import cartIcon from '../assets/icons/cartIcon.svg'

export default {
    name: "homeView",
    components:{
        menuOptions,
        itemsList,
        cart,
        cartIcon,
    },
    mixins: [Mixin],

}
</script>

<style lang="less" scoped>
.homeView{
    display: flex;

    .cart-icon{
      background: @pink;
      height: 42px;
      width: 42px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px 20px 20px auto;
    }

    @media @tablet {
      flex-direction: column;
    }  
}

</style>