<template>
  <div>
    <!-- 盈亏曲线 -->
    <div class="my-echarts" ref="chart"></div>
  </div>
</template>
<script>
import { getToken } from "@/utils/token";
import common from "@/components/websocket/ws";
import InitWebSocket from "@/utils/websocket";

export default {
  props: {
    data: Array,
    selectKey: String,
  },
  data() {
    return {
      reconnect: true,
      ws: null,
    };
  },
  beforeDestroy() {
    this.ws.onclose();
  },
  mounted() {
    // window.addEventListener("visibilitychange", this.visibilitychange);
    // console.log(this.data);
    var vm = this;
    var myChart = this.$echarts.init(this.$refs.chart);

    var option = {
      tooltip: {
        trigger: "axis",
        confine: true, //将 tooltip 框限制在图表的区域内。
        axisPointer: {
          type: "cross",
        },
        textStyle: {
          fontSize: 12,
        },
      },
      legend: {
        data: [
          {
            name: this.$t("risk_exposure.purchase"),
            // name: "买入价格",
            textStyle: { color: "#F6665D" },
            icon: "none",
          },
          {
            name: this.$t("risk_exposure.sell"),
            // name: "卖出价格",
            textStyle: { color: "#3AB98E" },
            icon: "none",
          },
        ],
        x: "center",
        y: 15,
      },
      grid: {
        left: "6%",
        right: "5%",
        bottom: "15%",
      },
      xAxis: {
        type: "category",
        // data: data0.categoryData,
        scale: true,
        boundaryGap: false, //从贴着y轴开始
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
      },
      yAxis: {
        scale: true,
        // axisLabel: {
        //   //坐标轴刻度label
        //   formatter: "${value}",
        // },
          nameTextStyle: {
            align: "right",
          },
        name: this.$t("risk_exposure.price")+'($)', //
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
          // show: false,
          lineStyle: {
            fontSize: "10px",
            color: "#AAADB8", // y轴及其文字颜色
          },
        },
      },
      dataset: {
        dimensions: ["ask", "bid", "symbol", "time"],
        source: this.data,
      },
      series: [
        {
          // name: "买入价格",
          name: this.$t("risk_exposure.purchase"),
          type: "line",
          encode: {
            x: "time",
            y: "bid",
          },
          color: "#F6665D",
          showSymbol: false, //是否显示拐点
          smooth: true,
          lineStyle: {
            width: 1, //线条宽度
          },
        },
        {
          // name: "卖出价格",
          name: this.$t("risk_exposure.sell"),
          type: "line",
          encode: {
            x: "time",
            y: "ask",
          },
          color: "#3AB98E",
          showSymbol: false, //是否显示拐点
          smooth: true,
          lineStyle: {
            width: 1, //线条宽度
          },
        },
      ],
    };

    myChart.setOption(option);
    var token = getToken("user-token");
    this.ws = new InitWebSocket(
      `${process.env.VUE_APP_WS_API}/ws/quotes/${this.selectKey}/?token=${token}`
    );
    this.ws.onmessage = (data) => {
      // console.log(data);
      if (typeof data === "object") {
        if (data.time !== vm.data[vm.data.length - 1].time) {
          vm.data.push(data);
          vm.data.shift();
          myChart.setOption(option);
        }
      }
    };

    // if (!this.reconnect) {
    //   return;
    // }
    // var token = getToken("user-token");
    // var wsUrl = `${process.env.VUE_APP_WS_API}/ws/quotes/${this.selectKey}/?token=${token}`;
    // // var wsUrl = `ws://dev.klipc.com.cn/ws/quotes/gold.sg/?token=${token}`;
    // common.wsOpen.call(this, wsUrl, this).then((res) => {
    //   // console.log(res);
    //   this.ws = res;
    //   this.ws.onmessage = (event) => {
    //     var obj = JSON.parse(event.data);
    //     // console.log(obj);
    //     // console.log(typeof obj);
    //     if (typeof obj === "object") {
    //       // console.log(obj);
    //       if (obj.time !== vm.data[vm.data.length - 1].time) {
    //         vm.data.push(obj);
    //         vm.data.shift();
    //         myChart.setOption(option);
    //       }
    //     }
    //   };
    // });
    window.onresize = function () {
      myChart.resize();
    };
  },
  methods: {
    // visibilitychange() {
    //   //检测页面状态
    //   if (document.visibilityState == "hidden") {
    //     //页面隐藏
    //     this.reconnect = false;
    //     this.ws.close();
    //   } else {
    //     //页面显示
    //     this.reconnect = true;
    //   }
    // },
  },
  // beforeDestroy() {
  //   this.reconnect = false;
  //   this.ws.close();
  //   window.removeEventListener("visibilitychange", this.visibilitychange);
  // },
};
</script>
<style scoped>
.my-echarts {
  width: 100%;
  height: 373px;
  margin: 0 auto;
}
</style>