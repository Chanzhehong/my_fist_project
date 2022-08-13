<template>
  <div>
    <div class="block text-center">
      <el-carousel height="300px">
        <el-carousel-item v-for="item in banner_data" :key="item">
          <h3 class="small justify-center" text="2xl">
            <img :src="item" alt="" />
          </h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <ContentCom></ContentCom>
  </div>
</template>
<script>
import ContentCom from "./ContentCom.vue";
import axios from "axios";
import { ref } from "@vue/reactivity";
export default {
  setup() {
    const banner_data = ref();
    axios.get("/api/getBannerImages").then(res => {
      console.log(res);
      banner_data.value=res.data.List.img
      console.log(banner_data.value);
    });
    return {
      banner_data,
    };
  },
  components: {
    ContentCom,
  },
};
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.ss {
  float: left;
  display: block;
  border: 1px solid snow;
  margin: 50px;
  background-color: aliceblue;
}
</style>