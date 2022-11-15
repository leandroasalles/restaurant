<template>
  <div class="item">
    <div class="container">
      <img class="item--image" src="../assets/burguer.png">
    </div>
    <div class="content">
      <h2 class="item--name">{{item.name}}</h2>
      <p class="item--description">{{item.description}}</p>
      <p class="item--price">{{item.price}}</p>
    </div>
  </div>
</template>

<script>
export default {
    name: "itemUnit",
    props: {
        item: {}
    }

}
</script>

<style lang="less" scoped>
.item{
  width: 220px;
  height: 290px;
  background: white;
  border-radius: 8px;
  margin: 20px;
  padding: 20px;
  text-align: left;

  &--image{
    width: 127px;
    display: block;
    margin: 20px auto;
  }

  &--name{
    font-size: 18px;
  }

  &--description{
    font-size: 12px;
    color: @dark-grey;
  }

  &--price{
    color: @yellow;
    font-size: 18px;
  }

  @media @tablet {
    display: flex;
    width: 100%;
    height: fit-content;
    margin: 0;
    border: 1px solid @dark-grey;
    margin: 10px auto;
    padding: 20px 10px;

    &--image{
      width: 80px;
      margin: 0;
    }

    &--name{
      margin: 0 0 10px 0;
    }

    &--description{
      margin: 0;
    }

    &--price{
      margin: 0;
      text-align: right;
    }
  }

  .container{
    margin-right: 8px;
  }


}

</style>