<template>
  <div class="recommend">
    <div class="msg">推荐(仅浏览)</div>
    <div class="part_one">
      <div v-for="(item, index) in recImgs" :key="index" class="recImg">
          <el-image :src="item" alt="" 
          :preview-src-list="recImgs"
          :initial-index="index"
          />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import axios from "axios";
export default {
  setup() {
    const recImgs = ref();
    axios.get("/api/getRecImages").then((res) => {
      // console.log(res);
      recImgs.value = res.data.List.img;
      // console.log(recImgs.value);
    });
    return {
      recImgs,
    };
  },
};
</script>

<style lang="scss" scoped>
.recommend {
  width: 1920px;
  height: 100%;
  margin: 50px auto;
  position: relative;
}
.msg {
  width: 100%;
  height: 50px;
  line-height: 50px;
  position: absolute;
  top: -50px;
  // cursor: pointer;
  text-align: center;
}
.part_one {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
}
.recommend {
  .recImg {
    display: inline;
    // padding: 10px;
    margin: 10px;
    min-width: 100%;
    .el-image {
      border: 1px solid;
      border-radius: 50px;
      // padding: 30px;
      margin: 10px;
      cursor: pointer;
      box-shadow: 1px 2px 2px 1px #888888;
      position: relative;
    }
  }
}
</style>