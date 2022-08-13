<template>
  <div class="market">
    <div class="left_menu">
      <el-row class="tac">
        <el-col>
          <h1 class="mb-2">SWAP</h1>
          <el-menu default-active="2" class="el-menu-vertical-demo">
            <el-sub-menu index="1">
              <template #title>
                <span>版权品</span>
              </template>
              <el-menu-item-group title="元计划">
                <el-menu-item index="1-1" @click="YUAN_R">R</el-menu-item>
                <el-menu-item index="1-2" @click="YUAN_SR">SR</el-menu-item>
                <el-menu-item index="1-3" @click="YUAN_SSR">SSR</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="拓梦者">
                <el-menu-item index="1-4" @click="TUO_R">R</el-menu-item>
                <el-menu-item index="1-5" @click="TUO_SR">SR</el-menu-item>
                <el-menu-item index="1-6" @click="TUO_SSR">SSR</el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="1-4">
                <template #title>item four</template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <span>衍生品</span>
              </template>
              <el-menu-item-group title="元计划">
                <el-menu-item index="2-1">R</el-menu-item>
                <el-menu-item index="2-2">SR</el-menu-item>
                <el-menu-item index="2-3">SSR</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="拓梦者">
                <el-menu-item index="2-4">R</el-menu-item>
                <el-menu-item index="2-5">SR</el-menu-item>
                <el-menu-item index="2-6">SSR</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <span>衍生品</span>
              </template>
              <el-menu-item-group title="元计划">
                <el-menu-item index="3-1">R</el-menu-item>
                <el-menu-item index="3-2">SR</el-menu-item>
                <el-menu-item index="3-3">SSR</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="拓梦者">
                <el-menu-item index="3-4">R</el-menu-item>
                <el-menu-item index="3-5">SR</el-menu-item>
                <el-menu-item index="3-6">SSR</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="market_main">
      <!-- <router-view></router-view> -->
      <div v-for="(item, index) in goods" :key="index" class="image_info">
        <div class="info">
          <el-image :src="goods[index].img" alt="" lazy />
          <div>$:{{ goods[index].amount }}</div>
          <el-button type="primary" @click="buy_good(index)">Buy</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import axios from "axios";
const goods = ref("");
const buyTag = ref(false);
const collection = reactive({
  name: "",
  lvel: "",
});

onMounted(() => {
  getSaleData();
});
const getSaleData = (name, lvel) => {
  axios
    .get("/api/saleData", {
      params: {
        name: name,
        lvel: lvel,
      },
    })
    .then((res) => {
      console.log(res);
      goods.value = res.data.List;
      // console.log(goods.value);
    });
};

const buy = (index) => {
  axios
    .post("/api/buyGood", {
      purchaser: localStorage.getItem("name"),
      name: goods.value[index].name,
      lvel: goods.value[index].lvel,
      category: goods.value[index].category,
      owned: goods.value[index].owned,
      goodName: goods.value[index].img,
      amount: goods.value[index].amount,
      No: goods.value[index].No,
    })
    .then((res) => {
      // console.log(goods.img);
      if (res.data.status === 200) {
        buyTag.value = true;
      }
      console.log(res);
    });
};
const buy_good = (index) => {
  ElMessageBox.confirm("确认购买吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      // console.log(index);
      console.log(goods.value[index].category);
      buy(index);
      if (buyTag.value === true) {
        ElMessage({
          type: "success",
          message: "购买成功",
        });
      } else {
        ElMessage({
          type: "error",
          message: "购买失败",
        });
      }
      getSaleData();
    })
    .catch(() => {});
};
const YUAN_R = () => {
  (collection.name = "YUAN"), (collection.lvel = "R");
  console.log(collection);
  getSaleData(collection.name, collection.lvel);
};

const YUAN_SR = () => {
  (collection.name = "YUAN"), (collection.lvel = "SR");
  console.log(collection);
  getSaleData(collection.name, collection.lvel);
};

const YUAN_SSR = () => {
  (collection.name = "YUAN"), (collection.lvel = "SSR");
  console.log(collection);
  getSaleData(collection.name, collection.lvel);
};

const TUO_R = () => {
  (collection.name = "TUO"), (collection.lvel = "R");
  console.log(collection);
  getSaleData(collection.name, collection.lvel);
};

const TUO_SR = () => {
  (collection.name = "TUO"), (collection.lvel = "SR");
  console.log(collection);
  getSaleData(collection.name, collection.lvel);
};

const TUO_SSR = () => {
  (collection.name = "TUO"), (collection.lvel = "SSR");
  console.log(collection);
  getSaleData(collection.name, collection.lvel);
};
</script>

<style lang="scss" scoped>
.market {
  width: 100%;
  height: 800px;
  display: flex;
}
.left_menu {
  text-align: center;
  border: 1px solid #606266;
  border-radius: 10px;
  width: 200px;
  height: 800px;
  z-index: 1;
}
.market_main {
  width: 1720px;
  //   background-color: aqua;
  display: flex;
  overflow-y: scroll;
  flex-flow: wrap;
  .info {
    // display: flex;
    text-align: center;
    display: inline-block;
    width: 213px;
    height: 280px;
    margin: 10px;
    // border: 1px solid black;
    box-shadow: 1px 2px 2px 1px #888888;
    .el-image {
      width: 213px;
      height: 200px;
      margin-bottom: 10px;
    }
    div {
      margin-bottom: 10px;
    }
  }
}
ul {
  display: block;
}
.image_info {
  // margin: 0 auto;
  margin: auto;
  justify-content: center;
  align-items: center;
}
</style>