<template>
  <div>
    <!-- 盈亏曲线 -->
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
        left: 60,
        right: 80,
        top: 70,
        bottom: 50,
      },
      title: {
        text: this.$t("analysis.yield_curve"),
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
              opacity: 1,
            },
          },
        axisLine: {
          // X轴及其文字颜色
          lineStyle: {
            fontSize: "10px",
            color: "#AAADB8",
          },
        },
        boundaryGap: false,//从贴着y轴开始
      },
      yAxis: [
        {
          type: "value",
          name: this.$t("analysis.income")+'($)',
          axisTick: {
            show: false, //隐藏坐标轴的刻度
          },
          nameTextStyle: {
            align: "right",
          },
          // min: function (value) {
          //   return parseInt(value.min - 20);
          // },
          // max: function (value) {
          //   return parseInt(value.max + 20);
          // },
          // axisLabel: {//坐标轴刻度label
          //   formatter: '${value}'
          // },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#AAADB8",
              width: 0.3,
              type: "solid",
              opacity: 1,
            },
          },
          axisLine: {
            lineStyle: {
              fontSize: "10px",
              color: "#AAADB8", // y轴及其文字颜色
            },
          },
        },
        {
          type: "value",
          name: this.$t("analysis.trading_volume")+ '(' +this.$t('strategy.lot')+')',
          axisTick: {
            show: false, //隐藏坐标轴的刻度
          },
          nameTextStyle: {
            align: "left",
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              fontSize: "10px",
              color: "#AAADB8", // y轴及其文字颜色
            },
          },
        },
      ],
      dataset: {
        dimensions: ["close_profit", "record_date", "volume"],
        source: this.data,
      },
      series: [
        {
          name: this.$t("analysis.income"),
          type: "line",
          // data: [8,12,10,3,12,15,11],
          encode: {
            x: 1,
            y: 0,
          },
          yAxisIndex: 0,
          color: "#F6665D",
          showSymbol: false, //是否显示拐点
          symbolSize: 1, //拐点圆的大小
          lineStyle: {
            width: 1, //线条宽度
          },
          smooth: true, //true 为平滑曲线，false为直线
          // areaStyle: {
          //   normal: {
          //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //       { offset: 0, color: "#F6665D" },
          //       { offset: 1, color: "#ffffff" },
          //     ]),
          //   },
          // },
        },
        {
          name: this.$t("analysis.trading_volume"),
          type: "bar",
          barWidth: "10px",
          // data: [10,20,15,5,20,15,10],
          encode: {
            x: 1,
            y: 2,
          },
          yAxisIndex: 1,
          color: "#3280FE",
          showSymbol: false, //是否显示拐点
          symbolSize: 1, //拐点圆的大小
          lineStyle: {
            width: 1,
          },
          smooth: true, //true 为平滑曲线，false为直线
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
            name: this.$t("analysis.income"),
            textStyle: { color: "#F6665D" },
            icon: "none",
          },
          {
            name: this.$t("analysis.trading_volume"),
            textStyle: { color: "#3280FE" },
            icon: "none",
          },
        ],
        x: 110,
        y: 10,
      },
    });
    window.addEventListener('resize', ()=>{
      myChart.resize()
    })
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