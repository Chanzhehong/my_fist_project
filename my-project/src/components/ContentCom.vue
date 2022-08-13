<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in Content_data" :key="index">
        <img :src="item" alt="" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import axios from "axios";
export default {
  setup() {
    let Content_data = ref();
    axios.get("/api/getContentInages").then(res => {
      Content_data.value = res.data.List.img;
      // console.log(Content_data.value);
    });
    return {
      Content_data,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 50px;
  img {
    border: 1px solid red;
    border-radius: 50px;
  }
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  width: 400px;
  height: 400px;
  margin: 50px auto;
}
</style>