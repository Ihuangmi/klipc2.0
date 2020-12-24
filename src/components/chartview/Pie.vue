
<template>
  <div>
    <div class="echarts my-echarts" ref="pie"></div>
  </div>
</template>

<script>
//引入echarts
import echarts from "echarts";
export default {
  name: "echarts",
  props: {
    chartData: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  methods: {
    drawChart() {
      // initialize  instance
      let myChart = echarts.init(this.$refs.pie);
      let colors = [
        "#AD2935",
        "#4024CA",
        "#5AB3EB",
        "#3AB98E",
        "#FFC760",
      ];
      // draw echart
      myChart.setOption({
        color: colors,
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          icon: "circle", 
          itemWidth: 15, 
          itemHeight: 15, 
          height:'100%',
          right: 80,
          bottom: "center",
          itemGap: 24,
          data: this.chartData
        },
        series: [
          {
            name: "产品盈亏",
            type: "pie",
            center:['30%','50%'],
            radius: ["42%", "58%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: this.list
          }
        ]
      });
      window.onresize = myChart.resize;
    }
  },
  computed: {
    echarts() {
      return "echarts" + Math.random() * 100000;
    }
  },
  mounted: function() {
    this.drawChart();
  }
};
</script>

<style scoped>
.my-echarts {
  width: 100%;
  height: 250px;
  margin: 0 auto;
}
</style>