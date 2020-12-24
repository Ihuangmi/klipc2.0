<template>
  <div>
    <div class="my-echarts" ref="chart"></div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    axis: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    // console.log(this.axis);
    var key1 = this.$t("analysis.trading_volume");
    var key2 = this.$t("analysis.circle_size");
    var key3 = this.$t("analysis.risk_Level");
    var key4 = this.$t("analysis.light");
    var key5 = this.$t("signalpool.high_risk");
    var key6 = this.$t("signalpool.low_risk");
    var nameObj = {
      rate2: this.$t("signalpool.retracement_rate"), //回撤率
      rate3: this.$t("master.rate"), //投资回报率
      rate4: this.$t("master.key10"), //均值回报率
    };
    var codeObj = {
      rate2: 11,
      rate3: 13,
      rate4: 12,
    };

    var xName = this.axis.xaxis;
    var yName = this.axis.yaxis;

    var myChart = this.$echarts.init(this.$refs.chart);
    var schema2 = [
      "user_id",
      "avatar",
      "nick_name",
      "country",
      "is_myself",
      "user_labels",
      "hot",
      "has_follow_password",
      "subscribe_fee",
      "platform_server",
      "period",
      "max_draw_down",
      "ratio_pl_initial_equity",
      "traditional_calculate_roi",
      "equity",
      "risk_level",
      "trading_volume",
    ];
    var schema = [
      { index: 0, title: "用户id" },
      { index: 1, title: "头像" },
      { index: 2, title: "昵称" },
      { index: 3, title: "国家" },
      { index: 4, title: "是否自己主页" },
      { index: 5, title: "用户标签" },
      { index: 6, title: "热度" },
      { index: 7, title: "是否有跟单密码" },
      { index: 8, title: this.$t("signalpool.key10") },
      { index: 9, title: this.$t("strategy.key6") },
      { index: 10, title: this.$t("master.cycle") },
      { index: 11, title: this.$t("master.maxdd") },
      { index: 12, title: this.$t("master.key10") },
      { index: 13, title: this.$t("master.rate") },
      { index: 14, title: this.$t("master.worth") },
      { index: 15, title: this.$t("signalpool.risk") },
      { index: 16, title: this.$t("analysis.trading_volume") },
    ];
    var data = [
      [
        "user_id",
        "avatar",
        "nick_name",
        "country",
        "is_myself",
        "user_labels",
        "hot",
        "has_follow_password",
        "subscribe_fee",
        "platform_server",
        "period",
        "max_draw_down",
        "ratio_pl_initial_equity",
        "traditional_calculate_roi",
        "equity",
        "risk_level",
        "trading_volume",
      ],
      [
        76,
        "avatar",
        "k站之王1",
        "china",
        false,
        "labels",
        23,
        false,
        10,
        "FairTradingGlobal-Asia1",
        180,
        25.3,
        85.22,
        63.21,
        1500,
        1,
        50,
      ],
      [
        77,
        "avatar",
        "k站之王2",
        "china",
        false,
        "labels",
        27,
        false,
        1,
        "FairTradingGlobal-Asia2",
        200,
        36.3,
        76.22,
        53.21,
        3500,
        2,
        139,
      ],
      [
        78,
        "avatar",
        "k站之王3",
        "china",
        false,
        "labels",
        37,
        false,
        100,
        "FairTradingGlobal-Asia3",
        220,
        47.3,
        66.22,
        83.21,
        2500,
        3,
        500,
      ],
    ];

    var option = {
      // color: ["#FF7D00", "#dd4444", "#fec42c"],
      grid: {
        left: "8%",
        right: "15%",
        top: "15%",
        bottom: "10%",
      },
      tooltip: {
        padding: 10,
        confine: true,
        formatter: function (obj) {
          var value = obj.value;
          var risk;
          if(value[15]>1){
            risk = key5;
          } else {
            risk = key6;
          }
          return (
            '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 14px;padding-bottom: 7px;margin-bottom: 7px;">' +
            '<img style="width:36px;height:36px;margin-right: 12px" src="' +
            value[1] +
            '">' +
            value[2] +
            // value[5] +
            "</div>" +
            '<div style="font-size: 12px">' +
            schema[9].title +
            "：" +
            value[9] +
            "<br>" +
            schema[8].title +
            "：" +
            value[8] +
            "<br>" +
            schema[10].title +
            "：" +
            value[10] +
            "<br>" +
            schema[11].title +
            "：" +
            value[11] +
            "%" +
            "<br>" +
            schema[12].title +
            "：" +
            value[12] +
            "%" +
            "<br>" +
            schema[13].title +
            "：" +
            value[13] +
            "%" +
            "<br>" +
            schema[14].title +
            "：" +
            value[14].toLocaleString() +
            "<br>" +
            schema[15].title +
            "：" +
            risk +
            "<br>" +
            schema[16].title +
            "：" +
            value[16] +
            "<br>" +
            "</div>"
          );
        },
      },
      xAxis: {
        type: "value",
        name: nameObj[xName] || this.$t("master.rate"),
        nameTextStyle: {
          color: "#AAADB8",
          fontSize: 12,
        },
        axisTick: {
          show: false, //隐藏坐标轴的刻度
        },
        axisLabel: {
          //坐标轴刻度label
          formatter: "{value}%",
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#AAADB8",
            width: 0.3,
            type: "dotted",
            opacity: 0.8,
          },
        },
        axisLine: {
          onZero: false, //使x轴位于最下侧
          // X轴及其文字颜色
          // show: false,
          lineStyle: {
            color: "#AAADB8",
          },
        },
      },
      yAxis: {
        type: "value",
        name: nameObj[yName] || this.$t("signalpool.retracement_rate"),
        // position:'left',
        scale: true,
        nameTextStyle: {
          color: "#AAADB8",
          fontSize: 12,
        },
        axisTick: {
          show: false, //隐藏坐标轴的刻度
        },
        axisLabel: {
          //坐标轴刻度label
          formatter: "{value}%",
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#AAADB8",
            width: 0.3,
            type: "dotted",
            opacity: 0.8,
          },
        },
        axisLine: {
          onZero: false, //使y轴位于最左侧
          // 轴及其文字颜色
          // show: false,
          lineStyle: {
            fontSize: "10px",
            color: "#AAADB8",
          },
        },
      },
      visualMap: [
        {
          left: "right",
          // top: "6%",
          bottom: "45%",
          dimension: 16, //交易量
          min: 0,
          max: 500,
          itemWidth: 20,
          itemHeight: 120,
          calculable: true,
          precision: 0.1,
          text: [
            `${key1}
(${key2})`,
          ],
          // textGap: 30,
          textStyle: {
            color: "#5F6472",
          },
          inRange: {
            symbolSize: [10, 40],
          },
          outOfRange: {
            symbolSize: [10, 40],
            color: ["#444"],
          },
          controller: {
            inRange: {
              color: ["#fd6257"],
            },
            outOfRange: {
              color: ["#444"],
            },
          },
        },
        {
          left: "right",
          bottom: "5%",
          dimension: 15, //风险等级
          min: 0,
          max: 3,
          itemWidth: 15,
          itemHeight: 120,
          precision: 0.1,
          text: [
            `${key3}
(${key4})`,
          ],
          // textGap: 30,
          textStyle: {
            color: "#5F6472",
          },
          inRange: {
            color: ["#0A79F5", "#fd6257"],
            // color: ["#fd6257"],
            // colorLightness: [0.7, 0.4],
          },
          outOfRange: {
            color: ["rgba(255,255,255,.2)"],
          },
          controller: {
            inRange: {
              color: ["#0A79F5", "#fd6257"],
              // color: ["#fd6257"],
            },
            outOfRange: {
              color: ["#444"],
            },
          },
        },
      ],
      series: [
        {
          name: "高手",
          type: "scatter",
          encode: {
            x: codeObj[xName] || 11,
            y: codeObj[yName] || 13,
            // x: 11,
            // y: 11,
          },
          data: this.data,
        },
      ],
    };

    myChart.setOption(option);

    window.addEventListener("resize", () => {
      myChart.resize();
    });

    myChart.on("click", (params) => {
      var id = params.value[0];
      this.$router.push({
        path: `/signalpool/master/${id}`,
      });
    });
  },
};
</script>
<style lang="scss" scoped>
.my-echarts {
  width: 100%;
  height: 500px;
  //   background-color: rgb(138, 125, 125);
}
</style>