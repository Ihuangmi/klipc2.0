<template>
  <div>
    <!-- 我的资产/盈亏金额 -->
    <div class="my-echarts" ref="chart"></div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  props: {
    data: Object,
  },
  mounted() {
    // console.log(this.data)
    var xAxisArr = [];
    this.data.time &&
      this.data.time.forEach((item) => {
        xAxisArr.push(item.substr(2, 8));
        // xAxisArr.push(item.substr(0, 10));
      });
    var profit = [];
    var loss = [];
    this.data.today_profit &&
      this.data.today_profit.forEach((item) => {
        if (item < 0) {
          loss.push(item);
          profit.push(0);
        } else {
          loss.push(0);
          profit.push(item);
        }
      });
    let myChart = echarts.init(this.$refs.chart);
    myChart.setOption({
      // grid: {
      //   left: "10%",
      //   right: "10%",
      //   top: "10%",
      //   bottom: "10%",
      // },
      xAxis: {
        type: "category",
        data: xAxisArr,
        // boundaryGap: true,
        // minInterval: 1,
        axisTick: {
          show: false, //隐藏坐标轴的刻度
          // interval: 2,
        },
        axisLabel: {
          // interval: 10
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#AAADB8",
            width: 0.5,
            type: "solid",
            opacity: 0.8,
          },
        },
        axisLine: {
          // X轴及其文字颜色
          show: false,
          lineStyle: {
            fontSize: "10px",
            color: "#AAADB8",
          },
        },
      },
      yAxis: [
        {
          type: "value",
          // name: "每日盈亏",
          name: this.$t("my_assets.daily_pl")+'($)',
          splitNumber: 2,
          axisTick: {
            show: false, //隐藏坐标轴的刻度
          },
          min: function (value) {
            var temp = Math.abs(value.min) - Math.abs(value.max);
            var a = temp > 0 ? Math.abs(value.min) : Math.abs(value.max)
            return -parseInt(a+20);
          },
          max: function (value) {
            var temp = Math.abs(value.min) - Math.abs(value.max);
            var a = temp > 0 ? Math.abs(value.min) : Math.abs(value.max)
            return parseInt(a+20);
          },
          splitLine: {
            // show: false,
            lineStyle: {
              color: "#AAADB8",
              width: 0.5,
              type: "solid",
              opacity: 0.8,
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              fontSize: "10px",
              color: "#AAADB8", // y轴及其文字颜色
            },
          },
        },
        {
          type: "value",
          // name: "盈亏金额",
          name: this.$t("my_assets.pl_amount")+'($)',
          splitNumber: 2, //坐标轴的分割段数
          axisTick: {
            show: false, //隐藏坐标轴的刻度
          },
          min: function (value) {
            return parseInt(value.min - 20);
          },
          max: function (value) {
            return parseInt(value.max + 20);
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#AAADB8",
              width: 0.5,
              type: "solid",
              opacity: 0.8,
            },
          },
          axisLine: {
            show: false,
            // onZero: true,
            lineStyle: {
              fontSize: "10px",
              color: "#AAADB8", // y轴及其文字颜色
            },
          },
        },
      ],
      series: [
        {
          // name: "盈利",
          name: this.$t("global.profit"),
          type: "bar",
          barMaxWidth: "10px",
          data: profit,
          yAxisIndex: 0,
          itemStyle: {
            color: "#F6665D",
          },
        },
        {
          // name: "亏损",
          name: this.$t("global.loss"),
          type: "bar",
          barMaxWidth: "10px",
          data: loss,
          yAxisIndex: 0,
          itemStyle: {
            color: "#3AB98E",
          },
        },
        {
          // name: "平仓盈亏",
          name: this.$t("strategy.order_pl"),
          type: "line",
          showSymbol: false, //是否显示拐点
          symbolSize: 1, //拐点圆的大小
          smooth: true, //true 为平滑曲线，false为直线
          // data: [6, 10, -300, 13, 160, 18],
          data: this.data.close_profit,
          yAxisIndex: 1,
          color: "#FFA700",
          lineStyle: {
            width: 1,
          },
        },
        {
          // name: "总盈亏",
          name: this.$t("my_assets.total_pl"),
          type: "line",
          showSymbol: false,
          symbolSize: 1,
          smooth: true,
          // data: [199, 20, 36, 10, -100, 20],
          data: this.data.total_profit,
          yAxisIndex: 1,
          color: "#3280FE",
          lineStyle: {
            width: 1,
          },
        },
      ],

      // 配置提示信息：
      tooltip: {
        trigger: "axis", // 触发类型
        confine: true, //将 tooltip 框限制在图表的区域内。
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
            // name: "盈利",
            name: this.$t("global.profit"),
            textStyle: { color: "#F6665D" },
            icon: "none",
          },
          {
            // name: "亏损",
            name: this.$t("global.loss"),
            textStyle: { color: "#3AB98E" },
            icon: "none",
          },
          {
            // name: "平仓盈亏",
            name: this.$t("strategy.order_pl"),
            textStyle: { color: "#FFA700" },
            icon: "none",
          },
          {
            // name: "总盈亏",
            name: this.$t("my_assets.total_pl"),
            textStyle: { color: "#3280FE" },
            icon: "none",
          },
        ],
      },
    });
    // window.onresize = myChart.resize;
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  },
};
</script>
<style scoped>
.my-echarts {
  width: 100%;
  height: 380px;
  margin: 0 auto;
}
</style>