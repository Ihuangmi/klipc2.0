<template>
  <div>
    <div class="top-card" v-if="flag">
      <el-card>
        <div class="title">{{$t("top_card.pl_today")}}</div>
        <div class="numerical_value">
          <div :class="cardData.msg.daily_sum_pnl_to_yesterday >= 0 ? 'profit': 'loss'">
            <span>{{cardData.msg.daily_sum_pnl}}</span>
            <svg-icon
              v-if="parseFloat(cardData.msg.daily_sum_pnl_to_yesterday) >= 0"
              iconClass="up"
            ></svg-icon>
            <svg-icon v-else iconClass="down"></svg-icon>
          </div>
          <div class="profit-loss">
            <span>{{$t('top_card.compared_yesterday')}} &nbsp;</span>
            <span
              :class="cardData.msg.daily_sum_pnl_to_yesterday >= 0 ? 'profit_value': 'loss_value'"
            >
              <span>{{cardData.msg.daily_sum_pnl_to_yesterday}}</span>
            </span>
          </div>
        </div>
      </el-card>
      <el-card>
        <div class="title">{{$t("top_card.position_pl")}}</div>
        <div class="numerical_value">
          <div :class="cardData.msg.float_profit_to_yesterday >= 0 ? 'profit': 'loss'">
            <span>{{cardData.msg.float_profit}}</span>
            <svg-icon v-if="parseFloat(cardData.msg.float_profit_to_yesterday) >= 0" iconClass="up"></svg-icon>
            <svg-icon v-else iconClass="down"></svg-icon>
          </div>
          <div class="profit-loss">
            <span>{{$t('top_card.compared_yesterday')}} &nbsp;</span>
            <span
              :class="cardData.msg.float_profit_to_yesterday >= 0 ? 'profit_value': 'loss_value'"
            >
              <span>{{cardData.msg.float_profit_to_yesterday}}</span>
            </span>
          </div>
        </div>
      </el-card>
      <el-card>
        <div class="title">{{$t("top_card.net_worth")}}</div>
        <div class="numerical_value">
          <div :class="cardData.msg.equity_to_yesterday >= 0 ? 'profit': 'loss'">
            <span>{{cardData.msg.equity}}</span>
            <svg-icon v-if="parseFloat(cardData.msg.equity_to_yesterday) >= 0" iconClass="up"></svg-icon>
            <svg-icon v-else iconClass="down"></svg-icon>
          </div>
          <div class="profit-loss">
            <span>{{$t('top_card.compared_yesterday')}} &nbsp;</span>
            <span :class="cardData.msg.equity_to_yesterday >= 0 ? 'profit_value': 'loss_value'">
              <span>{{cardData.msg.equity_to_yesterday}}</span>
            </span>
          </div>
        </div>
      </el-card>
      <el-card>
        <div class="title">{{$t("top_card.available_margin")}}</div>
        <div class="numerical_value">
          <div :class="cardData.msg.free_margin_to_yesterday >= 0 ? 'profit': 'loss'">
            <span>{{cardData.msg.free_margin}}</span>
            <svg-icon v-if="parseFloat(cardData.msg.free_margin_to_yesterday) >= 0" iconClass="up"></svg-icon>
            <svg-icon v-else iconClass="down"></svg-icon>
          </div>
          <div class="profit-loss">
            <span>{{$t('top_card.compared_yesterday')}} &nbsp;</span>
            <span
              :class="cardData.msg.free_margin_to_yesterday >= 0 ? 'profit_value': 'loss_value'"
            >
              <span>{{cardData.msg.free_margin_to_yesterday}}</span>
            </span>
          </div>
        </div>
      </el-card>
      <el-card>
        <div class="title">{{$t("top_card.balance")}}</div>
        <div class="numerical_value">
          <div :class="cardData.msg.balance_to_yesterday >= 0 ? 'profit': 'loss'">
            <span>{{cardData.msg.balance}}</span>
            <svg-icon v-if="parseFloat(cardData.msg.balance_to_yesterday) >= 0" iconClass="up"></svg-icon>
            <svg-icon v-else iconClass="down"></svg-icon>
          </div>
          <div class="profit-loss">
            <span>{{$t('top_card.compared_yesterday')}} &nbsp;</span>
            <span :class="cardData.msg.balance_to_yesterday >= 0 ? 'profit_value': 'loss_value'">
              <span>{{cardData.msg.balance_to_yesterday}}</span>
            </span>
          </div>
        </div>
      </el-card>
    </div>
    <div class="top-card" v-if="!flag">
      <el-card>
        <div class="title">{{$t("top_card.pl_today")}}</div>
        <div class="numerical_value">
          <div :class="cardData1.daily_sum_pnl_to_yesterday >= 0 ? 'profit': 'loss'">
            <span>{{cardData1.daily_sum_pnl}}</span>
            <svg-icon v-if="parseFloat(cardData1.daily_sum_pnl_to_yesterday) >= 0" iconClass="up"></svg-icon>
            <svg-icon v-else iconClass="down"></svg-icon>
          </div>
          <div class="profit-loss">
            <span>{{$t('top_card.compared_yesterday')}} &nbsp;</span>
            <span :class="cardData1.daily_sum_pnl_to_yesterday >= 0 ? 'profit_value': 'loss_value'">
              <span>{{cardData1.daily_sum_pnl_to_yesterday}}</span>
            </span>
          </div>
        </div>
      </el-card>
      <el-card>
        <div class="title">{{$t("top_card.position_pl")}}</div>
        <div class="numerical_value">
          <div :class="cardData1.float_profit_to_yesterday >= 0 ? 'profit': 'loss'">
            <span>{{cardData1.float_profit}}</span>
            <svg-icon v-if="parseFloat(cardData1.float_profit_to_yesterday) >= 0" iconClass="up"></svg-icon>
            <svg-icon v-else iconClass="down"></svg-icon>
          </div>
          <div class="profit-loss">
            <span>{{$t('top_card.compared_yesterday')}} &nbsp;</span>
            <span :class="cardData1.float_profit_to_yesterday >= 0 ? 'profit_value': 'loss_value'">
              <span>{{cardData1.float_profit_to_yesterday}}</span>
            </span>
          </div>
        </div>
      </el-card>
      <el-card>
        <div class="title">{{$t("top_card.net_worth")}}</div>
        <div class="numerical_value">
          <div :class="cardData1.equity_to_yesterday >= 0 ? 'profit': 'loss'">
            <span>{{cardData1.equity}}</span>
            <svg-icon v-if="parseFloat(cardData1.equity_to_yesterday) >= 0" iconClass="up"></svg-icon>
            <svg-icon v-else iconClass="down"></svg-icon>
          </div>
          <div class="profit-loss">
            <span>{{$t('top_card.compared_yesterday')}} &nbsp;</span>
            <span :class="cardData1.equity_to_yesterday >= 0 ? 'profit_value': 'loss_value'">
              <span>{{cardData1.equity_to_yesterday}}</span>
            </span>
          </div>
        </div>
      </el-card>
      <el-card>
        <div class="title">{{$t("top_card.available_margin")}}</div>
        <div class="numerical_value">
          <div :class="cardData1.free_margin_to_yesterday >= 0 ? 'profit': 'loss'">
            <span>{{cardData1.free_margin}}</span>
            <svg-icon v-if="parseFloat(cardData1.free_margin_to_yesterday) >= 0" iconClass="up"></svg-icon>
            <svg-icon v-else iconClass="down"></svg-icon>
          </div>
          <div class="profit-loss">
            <span>{{$t('top_card.compared_yesterday')}} &nbsp;</span>
            <span :class="cardData1.free_margin_to_yesterday >= 0 ? 'profit_value': 'loss_value'">
              <span>{{cardData1.free_margin_to_yesterday}}</span>
            </span>
          </div>
        </div>
      </el-card>
      <el-card>
        <div class="title">{{$t("top_card.balance")}}</div>
        <div class="numerical_value">
          <div :class="cardData1.balance_to_yesterday >= 0 ? 'profit': 'loss'">
            <span>{{cardData1.balance}}</span>
            <svg-icon v-if="parseFloat(cardData1.balance_to_yesterday) >= 0" iconClass="up"></svg-icon>
            <svg-icon v-else iconClass="down"></svg-icon>
          </div>
          <div class="profit-loss">
            <span>{{$t('top_card.compared_yesterday')}} &nbsp;</span>
            <span :class="cardData1.balance_to_yesterday >= 0 ? 'profit_value': 'loss_value'">
              <span>{{cardData1.balance_to_yesterday}}</span>
            </span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
// import { indexHead } from "@/api/user";
import common from "../components/websocket/ws";
import store from "@/store";
export default {
  props: {
    apiurl: {
      type: String,
    },
    userid: {
      type: Number,
    },
  },
  data() {
    return {
      reconnect: true,
      flag: false,
      cardData: {
        msg: {
          free_margin_to_yesterday: "",
          free_margin: "",
          daily_sum_pnl_to_yesterday: "",
          daily_sum_pnl: "",
          float_profit_to_yesterday: "",
          float_profit: "",
          equity_to_yesterday: "",
          equity: "",
          balance_to_yesterday: "",
          balance: "",
        },
      },
      cardData1: {
        free_margin_to_yesterday: "",
        free_margin: "",
        daily_sum_pnl_to_yesterday: "",
        daily_sum_pnl: "",
        float_profit_to_yesterday: "",
        float_profit: "",
        equity_to_yesterday: "",
        equity: "",
        balance_to_yesterday: "",
        balance: "",
      },
    };
  },
  // computed: {
  //   cardData() {
  //     return [
  //       {
  //         title: this.$t("top_card.pl_today"),
  //         value: this.cardList.daily_sum_pnl,
  //         pl: "0.36",
  //       },
  //       {
  //         title: this.$t("top_card.position_pl"),
  //         value: 6346.53,
  //         pl: "-0.36",
  //       },
  //       {
  //         title: this.$t("top_card.net_worth"),
  //         value: 3346.53,
  //         pl: "0.36",
  //       },
  //       {
  //         title: this.$t("top_card.available_margin"),
  //         value: 3656.53,
  //         pl: "-0.36",
  //       },
  //       {
  //         title: this.$t("top_card.balance"),
  //         value: 3646.53,
  //         pl: "-0.36",
  //       },
  //     ];
  //   },
  // },
  methods: {
    getData1() {
      //获取数据
      if (!this.reconnect) {
        return;
      }
      common.wsOpen
        .call(
          this,
          `${process.env.VUE_APP_WS}/ws/user/notification/` +
            this.userid +
            `/?token=` +
            sessionStorage.getItem("user-token"),
          this
        )
        .then((res) => {
          this.ws = res;
          this.ws.onmessage = (evt) => {
            var obj = JSON.parse(evt.data);
            if (typeof obj === "object") {
              this.cardData = obj;
              this.flag = true;

              if(obj.type==='msg'){//关联账号消息
                this.$store.commit("SET_STATUS", 201)
              }
            }
            // this.cardData = JSON.parse(evt.data);
            // this.flag = true;
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
        this.getData1();
      }
    },
  },
  created() {
      this.getData1();
  },
  mounted() {
    window.addEventListener("visibilitychange", this.visibilitychange);
    // this.getData1();
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
.title {
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 6px;
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