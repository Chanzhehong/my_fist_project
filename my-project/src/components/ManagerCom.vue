<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px" background-color="#545c64">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
          height="500px"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1">
            <el-icon><House /></el-icon>
            <span @click="goIndex">首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon></el-icon>
            <span>文档</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><Goods /></el-icon>
            <span>上架数据</span>
          </el-menu-item>
          <el-menu-item index="5">
            <el-icon><setting /></el-icon>
            <span>图表</span>
          </el-menu-item>
          <el-menu-item index="6">
            <el-icon><Edit /></el-icon>
            <span>日志</span>
          </el-menu-item>
          <el-menu-item index="7">
            <el-icon><Goods /></el-icon>
            <span>图片数据</span>
          </el-menu-item>
          <el-menu-item index="8">
            <el-icon><setting /></el-icon>
            <span>上架数据</span>
          </el-menu-item>
          <el-menu-item index="9">
            <el-icon><ElementPlus /></el-icon>
            <span>上架数据</span>
          </el-menu-item>
          <el-menu-item index="10">
            <el-icon><setting /></el-icon>
            <span>上架数据</span>
          </el-menu-item>
          <el-menu-item index="11">
            <el-icon><setting /></el-icon>
            <span>上架数据</span>
          </el-menu-item>
          <el-menu-item index="12">
            <el-icon><setting /></el-icon>
            <span>上架数据</span>
          </el-menu-item>
          <el-menu-item index="13">
            <el-icon><setting /></el-icon>
            <span>上架数据</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup name="ManagerCom">
import router from "@/router";
const goIndex = () =>{
    router.replace('/ManIndex')
}
// import { ref, reactive, onMounted } from "vue";
import {
  Menu as Setting,
  ElementPlus,
  House,
  User,
  Goods,
} from "@element-plus/icons-vue";
// import * as echarts from "echarts";

// const chartDom = ref();
// let myChart = null;
// const option = reactive({
//   title: { text: "", left: "center", top: "center" },
//   series: [
//     {
//       type: "pie",
//       radius: ["40%", "70%"],
//       data: [
//         {
//           value: 335,
//           name: "男",
//         },
//         {
//           value: 234,
//           name: "女",
//         },
//         {
//           value: 1548,
//           name: "其它",
//         },
//       ],
//     },
//   ],
// });

// onMounted(() => {
//   myChart = echarts.init(chartDom.value);
//   myChart.setOption(option, true);
// });
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
.demo {
  width: 250px;
  height: 200px;
}
</style>