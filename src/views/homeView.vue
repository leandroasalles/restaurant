<template>
  <div class="homeView">
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

export default {
    name: "homeView",
    components:{
        menuOptions,
        itemsList,
        cart,
    },
    mixins: [Mixin],

}
</script>

<style lang="less" scoped>
.homeView{
    display: flex;

    @media @tablet {
      flex-direction: column;
    }  
}

</style>