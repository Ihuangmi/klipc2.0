
<template>
  <div>
    <div class="my-echarts" ref="pie"></div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  data() {
    return {
      total_volume: 140.44,
      summary: [
        { name: "Energy", value: -139.32 },
        { name: "Foreign", value: 3.11 },
        { name: "Precious", value: -654.61 },
      ],
    };
  },
  methods: {
    drawChart() {
      // console.log(this.data);
      let summary = this.summary;
      let myChart = this.$echarts.init(this.$refs.pie);
      let colors = ["#AD2935", "#FFC760", "#3AB98E", "#5AB3EB", "#4024CA"];
      // draw echart
      myChart.setOption({
        color: colors,
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
          showDelay: 10, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
        },
        legend: {
          // orient: "vertical",
          icon: "circle",
          x: "50%", //label位置
          y: "20%",
          textStyle: { color: "#5F6472" },
          formatter(name) {
            let data = summary;
            let total = 0;
            let tarValue = 0;
            for (let i = 0, l = data.length; i < l; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                tarValue = data[i].value;
              }
            }
            let p = ((tarValue / total) * 100).toFixed(2);
            return `${name}：${tarValue}     ${p}%`;
          },
          // data: list,
        },
        series: [
          {
            name: this.$t("global.pl_product"),
            type: "pie",
            radius: ["40%", "60%"], //饼图大小
            center: ["22%", "50%"], //饼图位置
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                // fontSize: "20",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            // data: this.data.summary,//真实数据
            data: summary,
          },
        ],
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
  },
  mounted: function () {
    this.drawChart();
  },
};
</script>

<style scoped>
.my-echarts {
  width: 100%;
  height: 14rem;
  margin: 0 auto;
}
</style>