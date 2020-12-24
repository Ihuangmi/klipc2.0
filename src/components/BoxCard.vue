<template>
  <div class="top-card">
    <div  class="choose">
    <el-radio-group v-model="platType" @change="choose">
    <el-radio v-for="item in server_type" :key="item" :label="item" >{{item}}</el-radio>
    </el-radio-group>
    </div>
    <el-card v-for="data in cardData" :key="data.id">
      <div class="text">
        <span class="title">{{ data.title }}</span>
        <span class="compared"
          >{{ $t("top_card.compared_yesterday") }} &nbsp;</span>
      </div>
      <div class="numerical_value">
        <div :class="String(data.pl).indexOf('-')<0 ? 'profit' : 'loss'">
          <span>{{ data.value }}</span>
          <svg-icon v-if="String(data.pl).indexOf('-')<0" iconClass="up"></svg-icon>
          <svg-icon v-else iconClass="down"></svg-icon>
        </div>
        <div class="profit-loss">
          <span :class="String(data.pl).indexOf('-')<0 ? 'profit_value' : 'loss_value'">
            <span>{{ data.pl }}</span>
          </span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { indexHead } from "@/api/user";
import common from "../components/websocket/ws";
import store from "@/store";
export default {
  data() {
    return {
      server_type:['MT4','MT5','ALL'],
      platType:'ALL',
      reconnect: true,
      newData: null,
      cardData1: {
        free_margin_to_yesterday: "0",
        free_margin: "0",
        daily_summary_pl_to_yesterday: "0",
        daily_summary_pl: "0",
        float_profit_to_yesterday: "0",
        float_profit: "0",
        equity_to_yesterday: "0",
        equity: "0",
        balance_to_yesterday: "0",
        balance: "0",
      },
    };
  },
  computed: {
    cardData: {
      get() {
        return [
          {
            title: this.$t("top_card.pl_today"),
            id: "daily_summary_pl",
            value: this.cardData1.daily_summary_pl,
            pl: this.cardData1.daily_summary_pl_to_yesterday,
          },
          {
            title: this.$t("top_card.position_pl"),
            id: "float_profit",
            value: this.cardData1.float_profit,
            pl: this.cardData1.float_profit_to_yesterday,
          },
          {
            title: this.$t("top_card.net_worth"),
            id: "equity",
            value: this.cardData1.equity,
            pl: this.cardData1.equity_to_yesterday,
          },
          {
            title: this.$t("top_card.available_margin"),
            id: "free_margin",
            value: this.cardData1.free_margin,
            pl: this.cardData1.free_margin_to_yesterday,
          },
          {
            title: this.$t("top_card.balance"),
            id: "balance",
            value: this.cardData1.balance,
            pl: this.cardData1.balance_to_yesterday,
          },
        ];
      },
    },
  },
  watch:{
  },
  methods: {
    choose(){
      this.ws.close();
      this.getWebsocket()
    },
    getWebsocket() {
      if (!this.reconnect) {
        return;
      }
      common.wsOpen
        .call(
          this,
          `wss://dev.klipc.com.cn/ws/title_message/` +
            this.platType +
            `/?token=` +
            sessionStorage.getItem("user-token"),
          this
        )
        .then((res) => {
          this.ws = res;
          this.ws.onmessage = (evt) => {
            var obj = JSON.parse(evt.data);
                // console.log(`obj=`, obj);
            if (typeof obj === "object") {
              this.cardData1 = obj;
            }
          };
        });
    },
    getWebsocket1() {
      if (!this.reconnect) {
        return;
      }
      common.wsOpen
        .call(
          this,
            `wss://dev.klipc.com.cn/ws/user/notification/` +
            sessionStorage.getItem("user_id") +
            `/?token=` +
            sessionStorage.getItem("user-token"),
          this
        )
        .then((res) => {
          this.ws = res;
          this.ws.onmessage = (evt) => {
            var data = JSON.parse(evt.data);
            if(typeof data === 'object'){
              // console.log(data)
              this.$store.commit("SET_STATUS", data);
            }
          };
        });
    },
    visibilitychange() {
      //检测页面状态
      if (document.visibilityState == "hidden") {
        //页面隐藏
        this.reconnect = false;
        this.ws.close();
      } else {
        //页面显示
        this.reconnect = true;
        this.getWebsocket();
        this.getWebsocket1();
      }
    },
  },
  mounted() {
    this.getWebsocket();
    this.getWebsocket1();
    window.addEventListener("visibilitychange", this.visibilitychange);
  },
  beforeDestroy() {
    this.reconnect = false;
    this.ws.close();
    window.removeEventListener("visibilitychange", this.visibilitychange);
  },
};
</script>

<style lang='scss' scoped>
@import "@/styles/_handle.scss";
$red: rgba(246, 102, 93, 1);
$green: rgba(58, 185, 142, 1);
$title: 24px;
$pl: 12px;
.top-card {
  @include font_color("font_color1");
  width: 100%;
  display: flex;
  .choose{
    height: 80px;
  box-sizing: border-box;
  border: none;
  border-radius: 0;
  box-shadow: none;
  border-right: 4px solid #d8e4f0;
  border-bottom: 4px solid #d8e4f0;
  border-top: 4px solid #d8e4f0;
  @include border_color("border_color1");
  @include background_color("background_color3");
  @include font_color("font_color1");
  width: 80px;
      display: flex;
    padding-left: 15px;
    align-items: center;
  }
  & /deep/ .el-card__body {
    padding: 8px 12px;
  }
}
.el-card {
  flex: 1;
  height: 80px;
  box-sizing: border-box;
  border: none;
  border-radius: 0;
  box-shadow: none;
  border-right: 4px solid #d8e4f0;
  border-bottom: 4px solid #d8e4f0;
  border-top: 4px solid #d8e4f0;
  @include border_color("border_color1");
  @include background_color("background_color3");
  @include font_color("font_color1");
  .el-card__body {
    padding: 8px 12px;
    @include background_color("background_color1");
  }
}
.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  box-shadow: none;
}
.text {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 6px;
}
.compared {
  font-size: 10px;
  color: "#AAADB8";
}
.numerical_value {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  .profit {
    font-size: $title;
    color: $red;
    font-weight: 800;
  }
  .loss {
    font-size: $title;
    color: $green;
    font-weight: 800;
    font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
    font-weight: bold;
  }
  .svg-icon {
    width: 18px;
    height: 18px;
  }
  .profit-loss {
    margin: auto 0;
  }
  .profit_value {
    font-size: $pl;
    color: $red;
    ::before {
      content: "+";
    }
  }
  .loss_value {
    font-size: $pl;
    color: $green;
  }
}
</style>