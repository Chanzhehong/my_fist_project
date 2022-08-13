<template>
  <div>
    <el-image
      v-for="(item,index) in goods"
      :key="index"
      :src="goods[index].img"
      alt=""
      lazy
    />
  </div>
</template>

<script setup>
const { ref }=require("@vue/reactivity");
import  axios from "axios";
const goods = ref('')

axios.get('/api/saleData').then((res)=>{
  goods.value = res.data.List
  console.log(goods.value);
})
</script>
<style lang="scss" scoped >
div {
    display: flex;
    flex-flow: wrap;
    margin: 0 auto;
    justify-content: center;
    align-content: center;
    .el-image {
      margin: 10px;
      cursor: pointer;
      //   align-items: flex-end;
      //   justify-content: flex-start;
      //   justify-content: space-around;
    }
    }
</style>