<template>
  <div class="info">
    <div>
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </div>
    <div>{{ info.name }}</div>
    <div>{{ date }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
const date = ref();
const info = reactive({
  name: localStorage.getItem("name"),
});
function showTime() {
  var time = new Date();

  // 年月日
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var day = time.getDate();

  // 时分秒
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();

  // 实时显示
  date.value =
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}
onMounted(() => {
  setInterval(() => {
    showTime();
    // console.log(date.value);
  }, 100);
});
</script>

<style lang="scss" scoped>
.info {
  width: 400px;
  height: 80px;
  //   line-height: 80px;
  text-align: center;
  background-color: #303133;
  display: flex;
  justify-content: space-around;
//   align-content: center;
  div {
    align-self:center;
    color: #fafafa;
    display: inline;
  }
}
.info:hover {
  width: 410px;
  height: 90px;
  box-shadow: 1px 1px 3px 3px #888888;
}
</style>