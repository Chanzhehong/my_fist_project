<template>
  <el-container>
    <el-header>
      <nav-com></nav-com>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer>
      <footer-com></footer-com>
    </el-footer>
  </el-container>
</template>

<script>
// @ is an alias to /src
import NavCom from "../components/NavCom";
import FooterCom from "../components/FooterCom.vue"

export default {
  name: "HomeView",
  components: {
    NavCom,
    FooterCom
  },
};
</script>

<style scoped>
.el-main{
  padding: 0;
  overflow: hidden;
}
.el-header{
  padding: 0;
  height: 50px;
}
.el-footer{
  margin-top: -24px;
}
</style>
