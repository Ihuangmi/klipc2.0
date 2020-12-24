<template>
  <div>
    <div class="my-echarts" ref="chart"></div>
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
    let myChart = echarts.init(this.$refs.chart);
    myChart.setOption({
      grid: {
        // left: 60,
        right: 80,
        top: 70,
        bottom: 50,
      },
      title: {
        text: this.$t("analysis.statistics_curve"),
        top: 10,
        left: 10,
        textStyle: {
          fontSize: 12,
          fontWeight: 800,
          color: "#5F6472", // 主标题文字颜色
        },
      },
      xAxis: {
        type: "category",
        axisTick: {
          show: false, //隐藏坐标轴的刻度
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#AAADB8",
            width: 0.3,
            type: "solid",
            opacity: 0.8,
          },
        },
        axisLine: {
          // X轴及其文字颜色
          // show: false,
          lineStyle: {
            fontSize: "10px",
            color: "#AAADB8",
          },
        },
        // boundaryGap: false,
      },
      yAxis: [
        {
          type: "value",
          name: this.$t("my_assets.net_worth")+'($)',
          axisTick: {
            show: false, //隐藏坐标轴的刻度
          },
          nameTextStyle: {
            align: "right",
          },
          // axisLabel: {//坐标轴刻度label
          //   formatter: '${value}'
          // },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#AAADB8",
              width: 0.3,
              type: "solid",
              opacity: 0.8,
            },
          },
          axisLine: {
            // show: false,
            lineStyle: {
              fontSize: "10px",
              color: "#AAADB8", // y轴及其文字颜色
            },
          },
        },
        {
          type: "value",
          name: this.$t("signalpool.w_p")+'($)',
          axisTick: {
            show: false, //隐藏坐标轴的刻度
          },
          nameTextStyle: {
            align: "left",
          },
          min: function (value) {
            var temp = Math.abs(value.min) - Math.abs(value.max);
            var a = temp > 0 ? Math.abs(value.min) : Math.abs(value.max)
            return -parseInt(a+200);
          },
          max: function (value) {
            var temp = Math.abs(value.min) - Math.abs(value.max);
            var a = temp > 0 ? Math.abs(value.min) : Math.abs(value.max)
            return parseInt(a+200);
          },
          splitLine: {
            // show: false,
            lineStyle: {
              color: "#AAADB8",
              width: 0.3,
              type: "solid",
              opacity: 0.8,
            },
          },
          axisLine: {
            // show: false,
            lineStyle: {
              fontSize: "10px",
              color: "#AAADB8", // y轴及其文字颜色
            },
          },
        },
      ],
      dataset: {
        dimensions: [ "balance_report", "equity", "record_date"],
        source: this.data,
      },
      series: [
        {
          name: this.$t("my_assets.net_worth"),
          type: "line",
          // data: [108, 120, 109, 118, 150, 133],
          encode: {
            x: 'record_date',
            y: 'equity',
          },
          yAxisIndex: 0, //映射到左边的y轴
          color: "#0DBC82",
          showSymbol: false, //是否显示拐点
          symbolSize: 1, //拐点圆的大小
          lineStyle: {
            width: 1, //线条宽度
          },
          smooth: true, //true 为平滑曲线，false为直线
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
                  color: "rgba(55, 164, 132, 0.2)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(55, 164, 132, 0.2)", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
        {
          name: this.$t("signalpool.w_p"),
          type: "bar",
          encode: {
            x: 'record_date',
            y: 'balance_report',
          },
          yAxisIndex: 1,
          barMaxWidth: "10px",
          smooth: true, //true 为平滑曲线，false为直线
          itemStyle: {
            normal: {
              color: function (params) {
                // console.log(`params=`, params)
                if (params.data < 0) {
                  return "#3AB98E";
                } else {
                  return "#F6665D";
                }
              },
            },
          },
        },
      ],

      // 配置提示信息：
      tooltip: {
        trigger: "axis", // 触发类型
        transitionDuration: 0, //防止浏览器抖动
        axisPointer: {
          //坐标轴指示器，坐标轴触发有效，
          type: "cross", //默认为line，line直线，cross十字准星，shadow阴影
          crossStyle: {
            color: "#5F6472",
            width: 1,
          },
        },
        textStyle: {
          // color: "#262626",
          fontSize: 12,
        },
        // backgroundColor: "#F4F1F4", // 提示背景颜色，默认为透明度为0.7的黑色
        borderRadius: 4, // 提示边框圆角，单位px，默认为4
        borderWidth: 0, // 提示边框线宽，单位px，默认为0（无边框）
        padding: 5, // 提示内边距，单位px，默认各方向内边距为5，
      },
      legend: {
        data: [
          {
            name: this.$t("my_assets.net_worth"),
            textStyle: { color: "#0DBC82" },
            icon: "none",
          },
          {
            name: this.$t("signalpool.w_p"),
            textStyle: { color: "#F6665D" },
            icon: "none",
          },
          {
            name: this.$t("signalpool.withdrawal"),
            textStyle: { color: "#FF7D00" },
            icon: "none",
          },
          {
            name: this.$t("signalpool.payment"),
            textStyle: { color: "#9013FE" },
            icon: "none",
          },
        ],
        x: 110,
        y: 10,
      },
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
  height: 353px;
  margin: 0 auto;
}
</style>