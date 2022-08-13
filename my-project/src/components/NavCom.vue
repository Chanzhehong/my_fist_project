<template>
  <div>
    <div class="header_style">
      <div class="left">
        <router-link to="/index">首页</router-link>
        <router-link to="/RecommendCom">推荐</router-link>
        <router-link to="/MarketCom">市场</router-link>
        <router-link to="/">公告</router-link>
      </div>
      <div class="right">
        <router-link to="/MyInfoCom" :plain="true">我的</router-link>
        <el-divider direction="vertical" />
        <router-link to="/LoginCom" v-if="isShow">登录</router-link>
        <router-link to="" v-else @click="Clear">退出</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from "vue";
export default {
  setup() {
    const isShow = ref(false);
    if (localStorage.getItem("name") === null) {
      isShow.value = true;
    } else {
      isShow.value = false;
    }
    function Clear() {
      localStorage.removeItem("name");
      isShow.value = !isShow.value;
      location.reload();
    }

    watch(isShow, (n, o) => {
      console.log(n, o);
    });
    return {
      isShow,
      Clear,
    };
  },
};
</script>
<style lang="scss" scoped>
.header_style {
  line-height: 50px;
  height: 50px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
a {
  /*padding-left: 50px;*/
  padding: 60px;
  cursor: pointer;
}
.header_style a:hover {
  color: #ccc;
}
.header_style .left {
  float: left;
}
.header_style .right {
  float: right;
}
</style>
