
<template>
  <div>
    <div class="my-echarts" ref="pie"></div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      chart: [],
      key: this.$t("master.key4"),
    };
  },
  mounted() {
    if (this.data.summary.length) {
      this.chart = this.data.summary;
    }
    this.drawChart();
  },
  methods: {
    drawChart() {
      var data = this.data;
      var chart = this.chart;
      var chartData = [];
      var key = this.key;

      chart.forEach((item) => {
        chartData.push({
          value: item.volume,
          name: item.name,
        });
      });
      var myChart = this.$echarts.init(this.$refs.pie);
      var colors = [
        "#AD2935",
        "#FFC760",
        "#3AB98E",
        "#5AB3EB",
        "#4024CA",
        "#5F6472",
      ];
      var option = {
        color: colors,
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
          showDelay: 10, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
          transitionDuration: 0, //防止浏览器抖动
          textStyle: {
            fontSize: 12,
          },
        },
        legend: {
          orient: "vertical",
          icon: "circle",
          x: "40%", //label位置
          // x: "right", //label位置
          y: "15%",
          textStyle: { color: "#8EA4BD" },
          formatter: function (name) {
            if (chart.length > 0) {
              // console.log(chart);
              var total = 0;
              var tarValue = 0;
              var p = 0;
              var pl;
              for (var i = 0, l = chart.length; i < l; i++) {
                total += chart[i].volume;
                if (chart[i].name == name) {
                  tarValue = chart[i].volume;
                  pl = chart[i].value;
                }
              }
              if (total !== 0) {
                p = ((tarValue / total) * 100).toFixed(1);
                return `${name}：$${pl}   ${p}%`;
              } else {
                return `${name}：${pl}   0%`;
              }
            } else {
              return name;
            }
          },
        },
        series: [
          {
            name: this.$t("global.pl_product"),
            type: "pie",
            radius: ["45%", "65%"], //饼图大小
            center: ["22%", "50%"], //饼图位置
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: "center",
              formatter() {
                return `${key}
                
${data.total_volume}`;
              },
              textStyle: {
                fontSize: 12,
                // fontWeight: "bold",
                color: "#3AB98E",
              },
            },
            labelLine: {
              show: false,
            },
            data: chartData, //真实数据
          },
        ],
      };
      // draw echart
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
  },
};
</script>

<style scoped>
.my-echarts {
  width: 100%;
  height: 12rem;
  margin: 0 auto;
}
</style>