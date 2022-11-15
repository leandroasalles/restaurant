<template>
  <div class="items-list">
    <itemUnit 
    v-for="item in itemsList" :key="item.id"
    :item = "item"
    />    
  </div>
</template>

<script>
import axios from 'axios';
import itemUnit from './itemUnit.vue'

export default {
    name: "itemsList",
    components:{
      itemUnit
    },
    data(){
      return{
        itemsList: []
      }
    },

    created(){
        axios.get('http://localhost:3000/burguers').then( response => {
            this.itemsList = response.data
        })
    }

}
</script>

<style lang="less" scoped>
.items-list{
  display: flex;

  @media @tablet {
    flex-direction: column;
    margin: 20px;

  }
}

</style>