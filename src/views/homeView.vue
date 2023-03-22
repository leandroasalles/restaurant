<template>
  <div class="homeView">
    <menuOptions />
    <itemsList />
    
  </div>
</template>

<script>
import menuOptions from '../components/menuOptions.vue'
import itemsList from '../components/itemsList.vue'

export default {
    name: "homeView",
    components:{
        menuOptions,
        itemsList,
    }

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