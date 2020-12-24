<template>
  <div>
    <div class="echarts my-echarts" ref="category"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "echarts",
  props: {
    chartData: {
      type: Object,
      default: () => [],
    },
    timeArr: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    drawChart() {
            var series=[];
            var titleArr=[]
   for(let i in this.chartData){
       series.push({
           name:i,
          type: "line",
            showSymbol: false,
            stack: "策略曲线",
            symbol: "circle",
            smooth: true,
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 1, //设置线条粗细
                },
              },
            },
            lineStyle: {
              width: 1,
            },
           data: this.chartData[i]
       });
  titleArr.push(i)
 }
//  console.log(series)
 console.log(this.chartData)
      // initialize  instance
      let myChart = echarts.init(this.$refs.category);
      let colors = ["#AD2935", "#4024CA", "#5AB3EB", "#3AB98E", "#FFC760"];
      // draw echart
      myChart.setOption({
        color: colors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
              crossStyle: {
            color: "#5F6472",
            width: 1,
          },
          },
        },
        title: {
        text: this.$t('strategy.chart1'),
        top: 10,
        left: 10,
        textStyle: {
          fontSize: 12,
          fontWeight: 400,
          color: "#AAADB8", // 主标题文字颜色
        },
      },
        // legend: {
        //    textStyle: { color: "#5F6472" },
        //   // name:'策略曲线',
        //   color: colors,
        //   data: titleArr,
        //   icon: "none",
        //   left: 70,
        //   top: 10,
        //   itemGap: 12,
        // },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            textStyle: {
              color: "#AAADB8", //坐标的字体颜色
            },
          },
          dataRange:{
            itemGap: 10, 
          },
           axisTick: {
            show: false, //隐藏坐标轴的刻度
          },
          axisLine: {
            // show: false, //隐藏坐标轴
              lineStyle: {
            fontSize: "10px",
            color: "#AAADB8",
          },
          },
          boundaryGap: false,
          splitLine: {
            show: true,
               lineStyle: {
            color: "#AAADB8",
            width: 0.3,
            type: "solid",
            opacity: 0.8,
          },
          },
          data: this.timeArr,
        },
        yAxis: {
          type: "value",
            splitNumber : 3,
          axisLabel: {
            interval: 30,
            textStyle: {
              color: "#AAADB8", //坐标的字体颜色
            },
          },
          axisTick: {
            show: false, //隐藏坐标轴的刻度
          },
         axisLine: {
            // show: false,
            lineStyle: {
              fontSize: "10px",
              color: "#AAADB8", // y轴及其文字颜色
            },
          },

          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: "#AAADB8",
              width: 0.3,
              type: "solid",
              opacity: 0.8,
            },
          },
        },
        series:series,
        // series: [
        //   {
        //     name: "策略1",
        //     type: "line",
        //     showSymbol: false,
        //     stack: "总量",
        //     symbol: "circle",
            
        //     smooth: true,
        //     data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90],
        //     itemStyle: {
        //       normal: {
        //         lineStyle: {
        //           width: 1, //设置线条粗细
        //         },
        //       },
        //     },
        //     lineStyle: {
        //       width: 1,
        //     },
        //   },
        //   {
        //     name: "策略2",
        //     showSymbol: false,
        //     type: "line",
        //     stack: "总量",
        //     symbol: "circle",
        //     smooth: true,
        //     data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290],
        //     itemStyle: {
        //       normal: {
        //         lineStyle: {
        //           width: 1, //设置线条粗细
        //         },
        //       },
        //     },
        //   },
        //   {
        //     name: "策略3",
        //     showSymbol: false,
        //     type: "line",
        //     stack: "总量",
        //     symbol: "circle",
        //     smooth: true,
        //     data: [310, 220, 182, 191, 234, 290, 220, 182, 191, 234, 290, 330],
        //     itemStyle: {
        //       normal: {
        //         lineStyle: {
        //           width: 1, //设置线条粗细
        //         },
        //       },
        //     },
        //   },
        // ],
      },true);
      // window.onresize = myChart.resize;
        window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
  },
  computed: {
    echarts() {
      return "echarts" + Math.random() * 100000;
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
  height: 230px;
  margin: 0 auto;
}
</style>