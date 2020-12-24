<template>
  <div>
    <div class="my-echarts" ref="chart"></div>
  </div>
</template>
<script>
export default {
  props: {
    data: Array,
  },
  mounted() {
    // console.log(this.data);

    let myChart = this.$echarts.init(this.$refs.chart);
    var option = {
      grid: {
        left: "14%",
        right: 80,
        top: 70,
        bottom: 50,
      },
      title: {
        text: this.$t("signalpool.chart"),
        top: 10,
        left: 8,
        textStyle: {
          fontSize: 12,
          fontWeight: 800,
          color: "#E7EEF8", // 主标题文字颜色
        },
      },
      tooltip: {
        trigger: "axis", // 触发类型
        axisPointer: {
          type: "cross", //默认为line，line直线，cross十字准星，shadow阴影
          crossStyle: {
            color: "#5F6472",
            width: 1,
          },
        },
        textStyle: {
          fontSize: 12,
        },
        borderRadius: 4, // 提示边框圆角，单位px，默认为4
        borderWidth: 0, // 提示边框线宽，单位px，默认为0（无边框）
        padding: 5, // 提示内边距，单位px，默认各方向内边距为5，
      },
      dataset: {
        dimensions: [
          "balance", //余额
          // "balance_report", //出入金
          "balance_report_negative",
          "balance_report_positive",
          "equity", //净值
          "record_date", //日期
          // "today_profit", //今日盈亏
          "today_profit_negative",
          "today_profit_positive",
        ],
        source: this.data,
      },
      xAxis: {
        type: "category",
        axisTick: {
          show: false, //隐藏坐标轴的刻度
        },
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
          // X轴及其文字颜色
          show: true,
          lineStyle: {
            fontSize: "10px",
            color: "#AAADB8",
          },
        },
      },
      series: [
        {
          name: this.$t("signalpool.net_worth"), //净值
          type: "line",
          visualMap: false,
          encode: {
            x: "record_date",
            y: "equity",
          },
          yAxisIndex: 0, //映射到左边的y轴
          color: "#3AD12E",
          showSymbol: false, //是否显示拐点
          symbolSize: 1, //拐点圆的大小
          lineStyle: {
            width: 1, //线条宽度
          },
          smooth: true, //true 为平滑曲线，false为直线
        },
        {
          name: this.$t("signalpool.balance"), //余额
          type: "line",
          visualMap: false,
          encode: {
            x: "record_date",
            y: "balance",
          },
          yAxisIndex: 0, //映射到左边的y轴
          color: "#3280FE",
          showSymbol: false, //是否显示拐点
          symbolSize: 1, //拐点圆的大小
          lineStyle: {
            width: 1, //线条宽度
          },
          smooth: true, //true 为平滑曲线，false为直线
        },
        {
          // name: "出金",
          name: this.$t("global.withdrawal"),
          type: "bar",
          visualMap: false,
          barMaxWidth: "10px",
          encode: {
            x: "record_date",
            y: "balance_report_negative",
          },
          yAxisIndex: 2,
          itemStyle: {
            color: "#FF7D00",
          },
        },
        {
          // name: "入金",
          name: this.$t("global.deposit"),
          type: "bar",
          visualMap: false,
          barMaxWidth: "10px",
          encode: {
            x: "record_date",
            y: "balance_report_positive",
          },
          yAxisIndex: 2,
          itemStyle: {
            color: "#9013FE",
          },
        },
        {
          // name: "盈利",
          name: this.$t("global.profit"),
          type: "bar",
          barMaxWidth: "10px",
          encode: {
            x: "record_date",
            y: "today_profit_positive",
          },
          yAxisIndex: 1,
          itemStyle: {
            color: "#F6665D",
          },
        },
        {
          // name: "亏损",
          name: this.$t("global.loss"),
          type: "bar",
          barMaxWidth: "10px",
          encode: {
            x: "record_date",
            y: "today_profit_negative",
          },
          yAxisIndex: 1,
          itemStyle: {
            color: "#3AB98E",
          },
        },
      ],
      yAxis: [
        {
          position: "left",
          offset: 75,
          splitNumber: 5,
          min: function (value) {
            return parseInt(value.min - 20);
          },
          max: function (value) {
            return parseInt(value.max + 20);
          },
          type: "value",
          name: this.$t("signalpool.n_b") + "($)", //净值/余额
          axisTick: {
            show: false, //隐藏坐标轴的刻度
          },
          nameTextStyle: {
            align: "right",
          },
          // axisLabel: {
          //   //坐标轴刻度label
          //   // show: false,
          //   // margin: 55,
          //   // align: "left",
          //   formatter: "${value}",
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
          boundaryGap: [0, "50%"],
          position: "left",
          splitNumber: 5,
          // minInterval: 1,
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
          type: "value",
          name: this.$t("my_assets.pl1") + "($)", //今日盈亏
          axisTick: {
            show: false, //隐藏坐标轴的刻度
          },
          nameTextStyle: {
            align: "right",
          },
          // axisLabel: {
          //   formatter: "${value}",
          //   //坐标轴刻度label
          //   // formatter(value) {
          //   //   if (value < 0) {
          //   //     return `-$${Math.abs(value)}`;
          //   //   } else return `$${Math.abs(value)}`;
          //   // },
          // },
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
        {
          boundaryGap: [0, "50%"],
          position: "right",
          splitNumber: 5,
          // min: function (value) {
          //   return parseInt(value.min - 20);
          // },
          max: function (value) {
            return parseInt(value.max + 20);
          },
          type: "value",
          name: this.$t("signalpool.w_p") + "($)", //出入金
          axisTick: {
            show: false, //隐藏坐标轴的刻度
          },
          // nameTextStyle: {
          //   align: "left",
          // },
          // axisLabel: {
          //   //坐标轴刻度label
          //   formatter: "${value}",
          //   // formatter(value) {
          //   //   if (value < 0) {
          //   //     return `-$${Math.abs(value)}`;
          //   //   } else return `$${Math.abs(value)}`;
          //   // },
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
            show: true,
            lineStyle: {
              fontSize: "10px",
              color: "#AAADB8", // y轴及其文字颜色
            },
          },
        },
      ],
      legend: {
        data: [
          {
            name: this.$t("signalpool.net_worth"),
            textStyle: { color: "#3AD12E" },
            icon: "none",
          },
          {
            name: this.$t("signalpool.balance"),
            textStyle: { color: "#3280FE" },
            icon: "none",
          },
          {
            name: this.$t("global.withdrawal"),
            // name: "出金",
            textStyle: { color: "#FF7D00" },
            icon: "none",
          },
          {
            name: this.$t("global.deposit"),
            // name: "入金",
            textStyle: { color: "#9013FE" },
            icon: "none",
          },
          {
            name: this.$t("global.profit"),
            // name: "盈利",
            textStyle: { color: "#F6665D" },
            icon: "none",
          },
          {
            name: this.$t("global.loss"),
            // name: "亏损",
            textStyle: { color: "#3AB98E" },
            icon: "none",
          },
        ],
        x: 200,
        y: 10,
      },
    };
    myChart.setOption(option);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  },
};
</script>
<style scoped>
.my-echarts {
  width: 100%;
  height: 406px;
  margin: 0 auto;
}
</style>