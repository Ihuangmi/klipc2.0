<template>
  <div id="master">
    <!-- <TopCard /> -->
    <div class="title">
      <div class="tabs2">
        <el-tabs v-model="activeName" @tab-click="onSwitchTab">
          <el-tab-pane
            v-for="item in masterInfo.accounts"
            :key="item.id"
            :name="item.id"
            :label="item.account_nick_name"
          ></el-tab-pane>
          <!-- <el-tab-pane v-for="v in 30" :key="v" :name="'strategy_two'+v" :label="$t('master.strategy_two')"></el-tab-pane> -->
        </el-tabs>
      </div>
      <TopSkin />
    </div>
    <!-- 跟单弹窗 -->
    <!-- <Dialog
      :visible.sync="dialogVisible"
      :data="followInfo"
      @submit="onFollow"
    /> -->
    <div class="content">
      <!-- 高手信息 -->
      <div class="master_info">
        <div class="avatar">
          <img :src="masterInfo.avatar" class="image" />
        </div>
        <div class="info">
          <div class="name">
            <div class="username">{{ masterInfo.nick_name }}</div>
            <svg-icon
              v-show="masterInfo.vip_type === 1"
              iconClass="basic"
            ></svg-icon>
            <svg-icon
              v-show="masterInfo.vip_type === 2"
              iconClass="vip"
            ></svg-icon>
            <svg-icon
              v-show="masterInfo.vip_type === 3"
              iconClass="svip"
            ></svg-icon>
          </div>
          <div class="user">
            <svg-icon iconClass="flag"></svg-icon>
            <span>{{ masterInfo.country }}</span>
            <svg-icon iconClass="hot"></svg-icon>
            <span>{{ masterInfo.heat }}</span>
          </div>
        </div>
        <div class="ccc">
          <ul>
            <li class="key">{{ $t("master.rate") }}</li>
            <li class="value">
              {{ accountInfo.account_index.traditional_calculate_roi }}
            </li>
          </ul>
          <ul>
            <li class="key">{{ $t("master.worth") }}</li>
            <li class="value">${{ accountInfo.account_index.equity }}</li>
          </ul>
          <ul>
            <li class="key">{{ $t("master.cost") }}</li>
            <li class="value">${{ accountInfo.subscribe_fee }}</li>
          </ul>
          <ul>
            <li class="key">{{ $t("master.maxdd") }}</li>
            <li class="value">{{ accountInfo.account_index.max_dd }}</li>
          </ul>
          <ul>
            <li class="key">{{ $t("master.cycle") }}</li>
            <li class="value">
              {{ accountInfo.period }} {{ $t("signalpool.day") }}
            </li>
          </ul>
          <ul>
            <li class="key">{{ $t("master.des") }}</li>
            <li class="value">{{ accountInfo.account_description }}</li>
          </ul>
        </div>
        <div class="operate">
          <!-- <el-popover placement="left" popper-class="share-box">
            <el-input class="inviteCode" id="inviteCode" v-model="short_url">
              <el-button slot="append" icon="el-icon-document" class="copy" @click="copyUrl"></el-button>
            </el-input>
            <div slot="reference">
              <div class="share">
                <i class="el-icon-share" style="font-size: 14px;color: #AAADB8;margin-right: 5px"></i>分享
              </div>
            </div>
          </el-popover>
          <div class="collect">
            <svg-icon v-if="is_favor_user" @click.native="cancalCollect" iconClass="star"></svg-icon>
            <svg-icon v-else @click.native="onCollect" iconClass="star0"></svg-icon>
            <span v-if="is_favor_user">{{$t('master.collection')}}</span>
            <span v-else>{{$t('master.collect')}}</span>
          </div> -->
          <div @click="toLogin" class="follow">去登录</div>
        </div>
      </div>
      <el-row>
        <el-col :span="17">
          <div class="left">
            <!-- echart -->
            <div class="echart">
              <div class="echart_tab">
                <el-tabs v-model="activeDay" @tab-click="switchChartTab">
                  <el-tab-pane
                    v-for="(tab, index) in tabItems"
                    :key="index"
                    :label="tab.label"
                    :name="tab.value"
                  >
                    <component
                      v-if="activeDay === tab.value"
                      :is="Echart"
                      :data="chartData"
                    ></component>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
            <!-- 月收益率 -->
            <div class="rate_table">
              <el-scrollbar style="height: 112px">
                <base-table :data="tableData2" :col-configs="conConfigs2">
                  <template
                    v-for="item in conConfigs2"
                    #[item.slot]="{ colConfig }"
                  >
                    <el-table-column
                      v-bind="colConfig"
                      :key="item.prop"
                      width="77"
                    >
                      <template #default="{ row }">
                        <span
                          v-if="parseInt(row[item.prop]) > 0"
                          v-html="row[item.prop]"
                          style="color: #f6665d"
                        ></span>
                        <span
                          v-else-if="parseInt(row[item.prop]) < 0"
                          v-html="row[item.prop]"
                          style="color: #3ab98e"
                        ></span>
                        <span v-else>-</span>
                      </template>
                    </el-table-column>
                  </template>
                </base-table>
              </el-scrollbar>
            </div>
            <!-- 衡量指标 -->
            <div class="header">{{ $t("master.metrics") }}</div>
            <BaseTable :data="tableData3" :col-configs="conConfigs3" />
            <BaseTable :data="tableData3" :col-configs="conConfigs4" />
          </div>
        </el-col>
        <el-col :span="7">
          <div class="right">
            <div class="top">
              <div class="header">{{ $t("master.strategy") }}</div>
              <div class="list">
                <ul>
                  <li>
                    <div class="key">{{ $t("master.key3") }}</div>
                    <div class="value">
                      {{ accountInfo.account_index.equity }}
                    </div>
                  </li>
                  <li>
                    <div class="key">{{ $t("master.maxdd") }}</div>
                    <div class="value">
                      {{ accountInfo.account_index.max_dd }}
                    </div>
                  </li>
                  <li>
                    <div class="key">{{ $t("strategy.total") }}</div>
                    <div class="value">
                      {{ accountInfo.account_index.profit }}
                    </div>
                  </li>
                  <li>
                    <div class="key">{{ $t("master.key9") }}</div>
                    <div class="value">
                      {{ accountInfo.account_index.total_lots_traded }}
                    </div>
                  </li>
                  <li>
                    <div class="key">{{ $t("master.key10") }}</div>
                    <div class="value">
                      {{ accountInfo.account_index.ratio_pl_initial_equity }}
                    </div>
                  </li>
                  <li>
                    <div class="key">{{ $t("master.key11") }}</div>
                    <div class="value">
                      {{ accountInfo.account_index.traditional_calculate_roi }}
                    </div>
                  </li>
                  <li>
                    <div class="key">{{ $t("master.cycle") }}</div>
                    <div class="value">{{ accountInfo.period }}</div>
                  </li>
                </ul>
              </div>
              <div class="account">
                <!-- <span style="margin-right: 30px">***</span> -->
                <span style="margin-right: 30px">{{platform}}</span>
                <!-- <span>***</span> -->
                <span>{{nickName}}</span>
              </div>
              <el-scrollbar style="height: 175px">
                <BaseTable :data="tableData" :col-configs="conConfigs" />
              </el-scrollbar>
            </div>
            <div class="echart2">
              <div class="header">{{ $t("global.pl_product") }}</div>
              <component :is="PieEchart" :data="pieData"></component>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 平仓订单明细 -->
      <!-- <el-row>
        <div class="header">{{$t('master.order_details')}}</div>

        <Pagination
          :total="listQuery.total"
          :page.sync="listQuery.page"
          @pagination="getDetailList"
        />
        <el-scrollbar style="height: 19.3rem">
          <base-table :data="tableData5" :col-configs="detailConfigs">
            <template #index>
              <el-table-column type="index" width="40"></el-table-column>
            </template>
            <template #buy="{colConfig}">
              <el-table-column v-bind="colConfig">
                <template #default="{row}">
                  <img v-if="row.trade_type==='buy'" src="@/assets/images/buy.png" class="buy" />
                  <img v-if="row.trade_type==='sell'" src="@/assets/images/sell.png" class="buy" />
                </template>
              </el-table-column>
            </template>
            <template #pl="{colConfig}">
              <el-table-column v-bind="colConfig">
                <template #default="{row}">
                  <span v-if="row.profit>=0" style="color: #F6665D">${{row.profit}}</span>
                  <span v-else style="color: #3AB98E">-${{Math.abs(row.profit)}}</span>
                </template>
              </el-table-column>
            </template>
          </base-table>
        </el-scrollbar>
      </el-row> -->
    </div>
  </div>
</template>
<script>
import TopCard from "@/components/TopCard";
import BaseTable from "@/components/BaseTable";
import Dialog from "./components/DialogBox";
import Pagination from "@/components/Pagination";
import TopSkin from "@/components/TopSkin";
import { getToken, setToken } from "@/utils/token";

import {
  getMasterInfo,
  getAccountInfo,
  // getUserAccount,
  // followUp,
  getMonthRate,
  // getMetrics,
  // getDetailLists,
  getEcharts,
  getPieData,
  // addCollect,
  // delCollect,
  getProductList,
} from "@/api/master-share.js";

export default {
  components: { TopCard, BaseTable, Dialog, Pagination, TopSkin },
  props: {
    masterId: String,
    lang: String,
  },
  data() {
    return {
      is_favor_user: false,
      dialogVisible: false,
      shareVisible: false,
      // short_url: "",
      listQuery: {
        total: 0,
        page: 1,
      },
      masterInfo: {},
      accountInfo: {
        //高手账号信息
        account_index: {},
      },
      followInfo: null,
      activeName: "",
      activeDay: "30",
      Echart: null,
      PieEchart: null,
      chartData: {},
      pieData: [],
      nickName: "",
      platform: "",
      tableData: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
    };
  },
  computed: {
    accountNumber() {
      if (this.accountInfo.account_number)
        return "***" + this.accountInfo.account_number.toString().slice(2);
      else return null;
    },
    list() {
      return [
        { key: this.$t("master.key1") },
        { key: this.$t("master.key2") },
        { key: this.$t("master.key3") },
        { key: this.$t("master.key4") },
        { key: this.$t("master.key5") },
        { key: this.$t("master.key6") },
        { key: this.$t("master.key7") },
        { key: this.$t("master.key8") },
      ];
    },
    formConfigs() {
      return [
        { label: this.$t("master.enable"), value: "input1" },
        { label: this.$t("master.enable1"), value: "input2" },
        { label: this.$t("master.enable2"), value: "input3" },
        { label: this.$t("master.enable3"), value: "input4" },
        { label: this.$t("master.enable4"), value: "input5" },
        { label: this.$t("master.enable5"), value: "input6" },
        { label: this.$t("master.enable6"), value: "input7" },
        { label: this.$t("master.enable7"), value: "input8" },
      ];
    },
    tabItems() {
      return [
        { label: this.$t("master.month"), value: "30", name: "month" },
        { label: this.$t("master.season"), value: "90", name: "season" },
        { label: this.$t("master.half_year"), value: "180", name: "half_year" },
        { label: this.$t("master.year1"), value: "365", name: "year1" },
        { label: this.$t("master.year2"), value: "730", name: "year2" },
        { label: this.$t("master.year3"), value: "1095", name: "year3" },
      ];
    },
    conConfigs() {
      return [
        { prop: "symbol", label: this.$t("master.product"), width: 85 },
        { prop: "point_diff", label: this.$t("master.spread"), width: 65 },
        {
          prop: "contract_size",
          label: this.$t("master.contract"),
        },
        { prop: "leverage", label: this.$t("master.leverage"), width: 80 },
        { prop: "burst_ratio", label: this.$t("master.breakout"), width: 85 },
      ];
    },
    conConfigs2() {
      return [
        { prop: "year", label: this.$t("master.rate_return") },
        { prop: "1", label: this.$t("master.Jan"), slot: "Jan" },
        { prop: "2", label: this.$t("master.Feb"), slot: "Feb" },
        { prop: "3", label: this.$t("master.Mar"), slot: "Mar" },
        { prop: "4", label: this.$t("master.Apr"), slot: "Apr" },
        { prop: "5", label: this.$t("master.May"), slot: "May" },
        { prop: "6", label: this.$t("master.Jun"), slot: "Jun" },
        { prop: "7", label: this.$t("master.Jul"), slot: "Jul" },
        { prop: "8", label: this.$t("master.Aug"), slot: "Aug" },
        { prop: "9", label: this.$t("master.Sep"), slot: "Sep" },
        { prop: "10", label: this.$t("master.Oct"), slot: "Oct" },
        { prop: "11", label: this.$t("master.Nov"), slot: "Nov" },
        { prop: "12", label: this.$t("master.Dec"), slot: "Dec" },
      ];
    },
    conConfigs3() {
      return [
        {
          prop: "profit_trade_avg_holding_time",
          label: this.$t("master.duration1"),
          width: 245
        },
        { prop: "avg_profit_1lot", label: this.$t("master.profit") },
        { prop: "max_profit", label: this.$t("master.max_profit") },
        { prop: "daily_avg_lots", label: this.$t("master.ave_lot") },
        { prop: "ratio_profit_loss", label: this.$t("master.pl_ratio") },
      ];
    },
    conConfigs4() {
      return [
        {
          prop: "loss_trade_avg_holding_time",
          label: this.$t("master.duration2"),
          width: 245
        },
        { prop: "avg_loss_1lot", label: this.$t("master.loss") },
        { prop: "max_loss_1lot", label: this.$t("master.max_loss") },
        { prop: "avg_lots_per_order", label: this.$t("master.ave_lot2") },
        {
          prop: "avg_monthly_return_3months",
          label: this.$t("master.ave_yield"),
        },
      ];
    },
    detailConfigs() {
      return [
        { slot: "index" },
        { prop: "platform_server", label: this.$t("report.key2"), width: 200 },
        { prop: "account_number", label: this.$t("report.key3") },
        {
          prop: "trade_type",
          label: this.$t("report.key5"),
          slot: "buy",
          width: 80,
        },
        { prop: "volume", label: this.$t("report.key6"), width: 100 },
        { prop: "open_time", label: this.$t("report.key8"), width: 180 },
        {
          prop: "open_price",
          label: this.$t("report.key10"),
          formatter(row, column, cellValue) {
            return "$" + cellValue;
          },
        },
        { prop: "close_time", label: this.$t("report.key9"), width: 180 },
        {
          prop: "close_price",
          label: this.$t("report.key11"),
          formatter(row, column, cellValue) {
            return "$" + cellValue;
          },
        },
        {
          prop: "commission",
          label: this.$t("report.key16"),
          formatter(row, column, cellValue) {
            if (cellValue && cellValue !== 0) return "$" + cellValue;
            else return cellValue;
          },
        },
        {
          prop: "swap",
          label: this.$t("report.key14"),
          formatter(row, column, cellValue) {
            if (cellValue && cellValue !== 0) return "$" + cellValue;
            else return cellValue;
          },
        },
        { prop: "profit", label: this.$t("report.key15"), slot: "pl" },
      ];
    },
  },
  mounted() {
    // var url = window.location.href;
    // var herf = url.replace(/master/, "share_page");
    // this.short_url = `${herf}?source=${Date.now()}`;
    this.getList();
    var lang = this.$route.query.lang;
    this.$i18n.locale = lang;
    setToken("LANG", lang);
  },
  watch: {
    "$i18n.locale": function () {
      this.getPieData(this.activeName); //pie
      this.$nextTick(() => {
        this.Echart = () => import("./components/PlCurveChart");
        // this.PieEchart = () => import("@/components/PieEchart");
      });
    },
  },
  methods: {
    toLogin(){
      this.$router.push('/login')
    },
    // getQuery() {
    //   var source = this.$route.query.source;
    //   console.log(this.$route.query);
    // },
    // onCollect() {
    //   addCollect({ fav_user_id: this.masterId }).then((res) => {
    //     this.is_favor_user = true;
    //     // this.getList();
    //   });
    // },
    // cancalCollect() {
    //   delCollect({ favor_user_id: this.masterId }).then((res) => {
    //     this.is_favor_user = false;
    //     // this.getList();
    //   });
    // },
    getList() {
if(document.body.clientHeight>document.body.clientWidth){
      // window.location.href='https://m.klipc.com/master'
      window.location.href='https://m.klipc.com/#/master?id='+this.masterId
    }
      getMasterInfo(this.masterId).then((res) => {
        this.masterInfo = res;
        if (res.accounts.length) {
          this.activeName = res.accounts[0].id;
          this.is_favor_user = res.is_favor_user;
          this.getAccountInfo(this.activeName);
          this.getMonthRate(this.activeName);
          // this.getDetailList();
          this.getProductList(this.activeName);
        }
      });
    },
    // 高手账号信息
    getAccountInfo() {
      getAccountInfo(this.activeName).then((res) => {
        this.accountInfo = res;
        this.getChartData(30); //chart
        this.getPieData(this.activeName); //pie
        var arr = [];
        arr.push(res.account_index);
        this.tableData3 = arr; // 衡量指标data
      });
    },
    getProductList(id) {
      getProductList(id).then((res) => {
        this.tableData = res.results.data;
        this.platform = res.results.platform;
        this.nickName = res.results.account_nick_name;
      });
    },
    getMonthRate(id) {
      getMonthRate(id).then((res) => {
        this.tableData2 = res.results;
      });
    },
    getChartData(days) {
      var obj = {
        account: this.accountInfo.id,
        days: parseInt(days),
      };
      getEcharts(obj).then((res) => {
        this.chartData = res.results;
        this.$nextTick(() => {
          this.Echart = () => import("./components/PlCurveChart");
        });
      });
    },
    getPieData(id) {
      getPieData(id).then((res) => {
        this.pieData = res.results;
        this.$nextTick(() => {
          this.PieEchart = () => import("@/components/PieEchart");
        });
      });
    },
    // getDetailList() {
    //   var obj = {
    //     account: this.activeName,
    //     page: this.listQuery.page,
    //   };
    //   getDetailLists(obj).then((res) => {
    //     this.tableData5 = res.results;
    //     this.listQuery.total = res.count;
    //   });
    // },
    // 切换账号
    onSwitchTab(tab) {
      this.activeDay = "30";
      this.getAccountInfo(this.activeName);
      this.getMonthRate(this.activeName);
      // this.getDetailList();
      this.getProductList(this.activeName);
    },
    switchChartTab(tab) {
      var days = parseInt(tab.name);
      this.getChartData(days);
    },
    // copyUrl() {
    //   var oInput = document.createElement("input");
    //   oInput.value = this.short_url;
    //   document.body.appendChild(oInput);
    //   oInput.select(); // 选择对象
    //   document.execCommand("Copy"); // 执行浏览器复制命令
    //   oInput.className = "oInput";
    //   oInput.style.display = "none";
    //   this.$message({
    //     message: "复制成功!",
    //     type: "success",
    //   });
    // },
    // toFollow() {
    //   this.dialogVisible = true;
    //   getUserAccount(this.activeName).then((res) => {
    //     this.followInfo = res.results;
    //   });
    // },
    // onFollow(data) {
    //   followUp(data).then((res) => {
    //     if (res.status === 0) {
    //       this.dialogVisible = false;
    //       this.$message.success("跟单成功");
    //     } else {
    //       this.$message.error(res.msg);
    //     }
    //   });
    // },
  },
};
</script>

<style lang="scss" src="./master.scss" scoped>
</style>
<style lang="scss" scoped>
#master {
  border-top: 4px solid #d7e4f2;
  border-left: 4px solid #d7e4f2;
}
</style>