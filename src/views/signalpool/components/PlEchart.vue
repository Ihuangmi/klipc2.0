<template>
  <div>
    <div class="echarts" ref="pl"></div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  props: {
    data: Array,
  },
  mounted() {
    // console.log(this.data)
    var level;
    if (this.data.length) {
      level = this.data[this.data.length - 1][1];
      // console.log(level);
    }

    var myChart = echarts.init(this.$refs.pl);
    var option = {
      grid: {
        left: "1%",
        right: "1%",
        top: "10%",
        bottom: "10%",
      },
      tooltip: {
        trigger: "axis", // 触发类型
        confine: true, //将 tooltip 框限制在图表的区域内。
        textStyle: {
          fontSize: 12,
        },
        formatter(obj) {
          var value = obj[0].value;
          return (
            "<div>" +
            value[0].substr(0, 10) +
            "<br />" +
            "<div style=''>" +
            "PL :  $" +
            value[1] +
            "</div>" +
            "</div>"
          );
        },
      },
      xAxis: {
        type: "category",
        axisTick: {
          show: false, //隐藏坐标轴的刻度
        },
        axisLine: {
          // X轴及其文字颜色
          lineStyle: {
            color: "red",
            width: 1,
            type: "dashed",
          },
        },
        // show: false,
      },
      yAxis: {
        show: false,
      },
      dataset: {
        // dimensions: ["date", "pl"],
        source: this.data,
      },
      series: [
        {
          type: "line",
          label: {
            show: false,
          },
          smooth: true,
          symbol: "none",
          color: "red",

          lineStyle: {
            width: 1, //线条宽度
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(255,000,000,0.4)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(255,000,000,0.08)", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
            // opacity: 0.3,
            origin: "start",
          },
        },
      ],
    };
    var option2 = {
      grid: {
        left: "1%",
        right: "1%",
        top: "10%",
        bottom: "10%",
      },
      tooltip: {
        trigger: "axis", // 触发类型
        confine: true, //将 tooltip 框限制在图表的区域内。
        textStyle: {
          fontSize: 12,
        },
        formatter(obj) {
          var value = obj[0].value;
          return (
            "<div>" +
            value[0].substr(0, 10) +
            "<br />" +
            "<div style=''>" +
            "PL :  $" +
            value[1] +
            "</div>" +
            "</div>"
          );
        },
      },
      xAxis: {
        type: "category",
        axisTick: {
          show: false, //隐藏坐标轴的刻度
        },
        axisLine: {
          // X轴及其文字颜色
          lineStyle: {
            color: "green",
            width: 1,
            type: "dashed",
          },
        },
        // show: false,
      },
      yAxis: {
        show: false,
      },
      dataset: {
        // dimensions: ["date", "pl"],
        source: this.data,
      },
      series: [
        {
          type: "line",
          label: {
            show: false,
          },
          smooth: true,
          symbol: "none",
          color: "green",

          lineStyle: {
            width: 1, //线条宽度
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(000,219,055,0.4)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(000,219,055,0.05)", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
            // opacity: 0.3,
            origin: "start",
          },
        },
      ],
    };
    if (level > 0) {
      myChart.setOption(option);
    } else {
      myChart.setOption(option2);
    }
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  },
};
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 70px;
}
</style>