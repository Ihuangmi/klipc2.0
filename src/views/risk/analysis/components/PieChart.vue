
<template>
  <div>
    <div class="my-echarts" ref="pie"></div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    var chartData = [];

    this.data.forEach((item) => {
      chartData.push({
        value: item.volume,
        name: item.name,
      });
    });
    let myChart = this.$echarts.init(this.$refs.pie);
    myChart.setOption({
      title: {
        text: this.$t("analysis.trading_products"),
        top: 10,
        left: 10,
        textStyle: {
          fontSize: 12,
          fontWeight: 800,
          color: "#5F6472", // 主标题文字颜色
        },
      },
      color: ["#AD2935", "#FFC760", "#3AB98E", "#4CC8FC", "#5AB3EB", "#4024CA"],
      legend: {
        icon: "circle",
        // x: "15%",
        // y: "15%",
        left: '10%',
        right: '10%',
        top: '15%',
        textStyle: { color: "#8EA4BD" },
      },
      tooltip: {
        trigger: "item",
        showDelay: 10, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
        transitionDuration: 0, //防止浏览器抖动
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        textStyle: {
          fontSize: 12,
        },
      },
      series: [
        {
          type: "pie",
          radius: "50%", //饼图大小
          center: ["50%", "65%"], //饼图位置
          label: {
            show: false,
          },
          data: chartData,
        },
      ],
    });
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  },
};
</script>

<style scoped>
.my-echarts {
  width: 100%;
  height: 323px;
  margin: 0 auto;
}
</style>