<template>
  <div>
    <div class="pic" ref="chart"></div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import * as echarts from "echarts";
let chart = ref(null);
let myChart = reactive({});
let option = {
  xAxis: {
    data: ["A", "B", "C", "D", "E"],
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 23, 19],
      type: "line",
      areaStyle: {},
    },
    {
      data: [25, 14, 23, 305, 10],
      type: "line",
      areaStyle: {
        color: "#ff0",
        opacity: 0.5,
      },
    },
  ],
};
const init = () => {
  myChart = echarts.init(chart.value);
  myChart.setOption(option);
  window.onresize = ()=>{
    myChart.resize();
  }
};
onMounted(() => {
    init();
});
</script>

<style lang="scss" scoped>
.pic{
    width: 600px;
    height: 400px;
}
</style>