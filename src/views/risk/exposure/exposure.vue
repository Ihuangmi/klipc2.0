<template>
  <div id="exposure">
    <!-- <TopSkin :title="$t('risk_exposure.risk_exposure')" /> -->
    <div class="top-title">{{ $t("risk_exposure.risk_exposure") }}</div>
    <div class="tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane name='exposure' :label="$t('risk_exposure.position_exposure')">
          <el-row>
            <div class="header">
              <div class="title">{{ $t("risk_exposure.market") }}</div>
              <div class="select">
                <span>{{ $t("risk_exposure.tablekey1") }}</span>
                <el-select
                  popper-class="account-select"
                  size="mini"
                  v-model="selectKey"
                  @change="getChart"
                  filterable
                  :placeholder="$t('global.placeholder3')"
                >
                  <el-option
                    v-for="v in symbols"
                    :key="v"
                    size="mini"
                    :label="v"
                    :value="v"
                  ></el-option>
                  <!-- <el-option
                    v-if="!symbols.length"
                    size="mini"
                    :label="$t('report.gold')"
                    value="gold.sg"
                  ></el-option> -->
                </el-select>
              </div>
            </div>
            <div class="charts">
              <component
                v-if="activeName==='exposure'"
                :is="Echart"
                :data="chartData"
                :selectKey.sync="selectKey"
              ></component>
            </div>
          </el-row>
          <el-row class="border-b">
            <HeadTitle
              :title="$t('risk_exposure.position_exposure')"
              :hasInput="true"
            >
              <template #inputs>
                <el-input
                  size="mini"
                  :placeholder="$t('global.placeholder4')"
                  prefix-icon="el-icon-search"
                  v-model="searchKey"
                ></el-input>
                  <!-- @change="onSearch" -->
              </template>
            </HeadTitle>
            <!-- <el-scrollbar style="height: 35vh"> -->
            <div class="scrollbar" style="height: 35vh">
              <BaseTable :data="tableData" :col-configs="conConfigs">
                <template #index>
                  <el-table-column type="index" width="40"></el-table-column>
                </template>
                <template #buy="{ colConfig }">
                  <el-table-column v-bind="colConfig">
                    <template #default="{ row }">
                      <el-button
                        v-if="row.type === 'buy'"
                        size="mini"
                        class="buy"
                        >Buy</el-button
                      >
                      <el-button
                        v-else-if="row.type === 'sell'"
                        size="mini"
                        class="sell"
                        >Sell</el-button
                      >
                      <span v-else>--</span>
                    </template>
                  </el-table-column>
                </template>
                <template #pl="{ colConfig }">
                  <el-table-column v-bind="colConfig">
                    <template #default="{ row }">
                      <span v-if="row.pl >= 0" style="color: #f6665d"
                        >{{ (row.pl) }}</span
                      >
                      <span v-else style="color: #3ab98e"
                        >{{ (row.pl) }}</span
                      >
                    </template>
                  </el-table-column>
                </template>
              </BaseTable>
            </div>
            <!-- </el-scrollbar> -->
          </el-row>
          <el-row class="border-b">
            <el-col :span="16" class="border-r">
              <HeadTitle
                :title="$t('risk_exposure.net_exposure')"
                :hasInput="true"
              >
                <template #inputs>
                  <el-input
                    size="mini"
                    :placeholder="$t('global.placeholder4')"
                    prefix-icon="el-icon-search"
                    v-model="searchKey2"
                  ></el-input>
                    <!-- @change="onSearch2" -->
                </template>
              </HeadTitle>
              <!-- <el-scrollbar style="height: 35vh"> -->
              <div class="scrollbar" style="height: 40vh">
                <BaseTable :data="tableData2" :col-configs="conConfigs2" :showSummary="true">
                  <template #index>
                    <el-table-column type="index" width="40"></el-table-column>
                  </template>
                  <template #buy="{ colConfig }">
                    <el-table-column v-bind="colConfig">
                      <template #default="{ row }">
                        <el-button
                          v-if="row.type === 'buy'"
                          size="mini"
                          class="buy"
                          >Buy</el-button
                        >
                        <el-button
                          v-else-if="row.type === 'sell'"
                          size="mini"
                          class="sell"
                          >Sell</el-button
                        >
                        <span v-else>--</span>
                      </template>
                    </el-table-column>
                  </template>
                  <template #pl="{ colConfig }">
                    <el-table-column v-bind="colConfig">
                      <template #default="{ row }">
                        <span v-if="row.profit >= 0" style="color: #f6665d"
                          >{{ (row.profit) }}</span
                        >
                        <span v-else style="color: #3ab98e"
                          >{{ (row.profit) }}</span
                        >
                      </template>
                    </el-table-column>
                  </template>
                </BaseTable>
                <!-- <div v-if="tableData2.length" class="table2">
                  <ul>
                    <li></li>
                    <li>{{ $t("global.total") }}</li>
                    <li></li>
                    <li>{{ total_volume }}</li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li>{{ total_profit_loss }}</li>
                  </ul>
                </div> -->
              </div>
              <!-- </el-scrollbar> -->
            </el-col>
            <el-col :span="8">
              <HeadTitle
                :title="$t('risk_exposure.currency_exposure')"
                :hasInput="true"
              >
                <template #inputs>
                  <el-input
                    size="mini"
                    :placeholder="$t('global.placeholder4')"
                    prefix-icon="el-icon-search"
                    v-model="searchKey3"
                  ></el-input>
                    <!-- @change="onSearch3" -->
                </template>
              </HeadTitle>
              <!-- <el-scrollbar style="height: 35vh" class="table"> -->
              <div class="scrollbar table" style="height: 40vh">
                <el-table :data="tableData3" style="width: 100%" border>
                  <el-table-column type="index" width="40"></el-table-column>
                  <el-table-column
                    prop="symbol"
                    :label="$t('risk_exposure.tablekey1')"
                    width="150"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="contract_size"
                    :label="$t('risk_exposure.key5')"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="usd_cost"
                    :label="$t('risk_exposure.key6')"
                  >
                    <template #default="{ row }">
                      <span
                        v-if="parseFloat(row.usd_cost) > 0"
                        style="color: #f6665d"
                        >{{ row.usd_cost }}</span
                      >
                      <span v-else style="color: #3ab98e">{{
                        row.usd_cost
                      }}</span>
                    </template>
                  </el-table-column>
                </el-table>
                <div v-if="tableData3.length">
                  <ul>
                    <li></li>
                    <li>{{ $t("global.total1") }}</li>
                    <li></li>
                    <li>{{ short_statistics }}</li>
                  </ul>
                  <ul>
                    <li></li>
                    <li>{{ $t("global.total2") }}</li>
                    <li></li>
                    <li>{{ long_statistics }}</li>
                  </ul>
                  <ul>
                    <li></li>
                    <li>{{ $t("global.total") }}</li>
                    <li></li>
                    <li>{{ total }}</li>
                  </ul>
                </div>
              </div>
              <!-- </el-scrollbar> -->
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane
          name='detail'
          :label="$t('risk_exposure.position_details')"
          class="table"
        >
          <!-- <el-scrollbar style="height: 78vh"> -->
          <el-table
            border
            :data="tableData4"
            :row-key="getRowKeys"
            :expand-row-keys="expands"
            @expand-change="expandChange"
          >
          <!-- expand-change: 对某一行展开或者关闭的时候触发 -->
            <template>
              <RiskTable />
            </template>
            <el-table-column
              prop="platform"
              :label="$t('risk_exposure.label1')"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="broker"
              :label="$t('risk_exposure.label2')"
            ></el-table-column>
            <el-table-column
              prop="account_name"
              :label="$t('risk_exposure.label3')"
            >
            </el-table-column>
            <el-table-column
              prop="account_number"
              :label="$t('risk_exposure.label4')"
            >
            </el-table-column>
            <el-table-column
              prop="account_type"
              :label="$t('risk_exposure.label5')"
            >
            </el-table-column>
            <el-table-column prop="equity" :label="$t('risk_exposure.label6')">
            </el-table-column>
          </el-table>
          <!-- <BaseTable
            :data="tableData4"
            :col-configs="reportConfigs"
          ></BaseTable> -->
          <!-- </el-scrollbar> -->
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import BaseTable from "@/components/BaseTable";
import RiskTable from "./components/RiskTable";
import HeadTitle from "@/components/HeadTitle";
import TopSkin from "@/components/TopSkin";
import { getToken } from "@/utils/token";
import common from "@/components/websocket/ws";

import {
  getPositionList,
  getNetList,
  getCurrencyList,
  getDetailsList,
  getsymbol,
} from "@/api";

export default {
  components: {
    BaseTable,
    RiskTable,
    HeadTitle,
    TopSkin,
  },
  data() {
    return {
      activeName: 'exposure',
      getRowKeys: (row)=>{ return row.account_number },
      expands: [],
      short_statistics: 0,
      long_statistics: 0,
      total: 0,
      reconnect: true,
      selectKey: "gold", //默认选择黄金
      searchKey: "",
      searchKey2: "",
      searchKey3: "",
      Echart: null,
      chartData: [],
      tableData: [],
      tableData2: [],
      total_volume: 0,
      total_profit_loss: 0,
      tableData3: [],
      tableList: [],
      tableList2: [],
      tableList3: [],
      tableData4: [],
    };
  },
  computed: {
    symbols() {
      var arr = ["gold"];
      this.tableData.forEach((item) => {
        arr.push(item.symbol);
      });
      return [...new Set(arr)];
    },
    conConfigs() {
      return [
        { slot: "index" },
        {
          prop: "symbol",
          label: this.$t("risk_exposure.tablekey1"),
          width: 160,
        },
        {
          prop: "type",
          label: this.$t("risk_exposure.tablekey2"),
          slot: "buy",
          width: 100,
        },
        {
          prop: "lots",
          label: this.$t("risk_exposure.tablekey3"),
        },
        {
          prop: "open_time",
          label: this.$t("risk_exposure.tablekey4"),
          width: 180,
        },
        { prop: "account", label: this.$t("risk_exposure.tablekey5") },
        { prop: "currency_type", label: this.$t("housekeeper.currency_type") },
        {
          prop: "broker",
          label: this.$t("risk_exposure.tablekey7"),
          width: 180,
        },
        {
          prop: "open_price",
          label: this.$t("risk_exposure.tablekey8")+'($)',
          // formatter(row, column, cellValue) {
          //   return "$" + cellValue;
          // },
        },
        { prop: "pl", label: this.$t("risk_exposure.tablekey9")+'($)', slot: "pl" },
      ];
    },
    conConfigs2() {
      return [
        { slot: "index" },
        {
          prop: "symbol",
          label: this.$t("risk_exposure.tablekey1"),
          "min-width": "15%",
        },
        {
          prop: "type",
          label: this.$t("risk_exposure.tablekey2"),
          slot: "buy",
          "min-width": "18%",
        },
        {
          prop: "total_lots",
          label: this.$t("risk_exposure.key1"),
          "min-width": "18%",
        },
        {
          prop: "average_buy",
          label: this.$t("risk_exposure.key2"),
          "min-width": "18%",
        },
        {
          prop: "average_sell",
          label: this.$t("risk_exposure.key22"),
          "min-width": "18%",
        },
        {
          prop: "current_price",
          label: this.$t("risk_exposure.key3")+'($)',
          "min-width": "18%",
        },
        {
          prop: "profit",
          label: this.$t("risk_exposure.key4")+'($)',
          slot: "pl",
          "min-width": "18%",
        },
      ];
    },
    reportConfigs() {
      return [
        { component: RiskTable },
        { prop: "platform", label: this.$t("risk_exposure.label1") },
        { prop: "broker", label: this.$t("risk_exposure.label2") },
        { prop: "account_name", label: this.$t("risk_exposure.label3") },
        { prop: "account_number", label: this.$t("risk_exposure.label4") },
        { prop: "account_type", label: this.$t("risk_exposure.label5") },
        {
          prop: "equity",
          label: this.$t("risk_exposure.label6"),
        },
      ];
    },
  },
  mounted() {
    // this.getList();
    this.getWebsocket();
    this.getChart(this.selectKey);
    this.getWebsocket2();
    window.addEventListener("visibilitychange", this.visibilitychange);
  },
  beforeDestroy() {
    this.reconnect = false;
    this.ws.close();
    this.ws2.close();
    window.removeEventListener("visibilitychange", this.visibilitychange);
  },
  watch: {
    "$i18n.locale": function () {
      this.getChart(this.selectKey);
    },
    searchKey: function(value){
      var newList = [];
      this.tableList.forEach((item) => {
        if (item.symbol.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          newList.push(item);
        }
      });
      this.tableData = newList;
    },
    searchKey2: function(value){
      var newList = [];
      this.tableList2.forEach((item) => {
        if (item.symbol.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          newList.push(item);
        }
      });
      this.tableData2 = newList;
    },
    searchKey3: function(value){
      var newList = [];
      this.tableList3.forEach((item) => {
        if (item.symbol.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          newList.push(item);
        }
      });
      this.tableData3 = newList;
    }
  },
  methods: {
    expandChange(row, rowList) {
      // console.log(`row.account_number=`, row.account_number);
      var that = this
      if (rowList.length) { // 说明展开了
        that.expands = []
        if (row) {
          that.expands.push(row.account_number)// 只展开当前行
        }
      } else { // 说明收起了
        that.expands = []
      }
    },
    visibilitychange() {
      //检测页面状态
      if (document.visibilityState == "hidden") {
        //页面隐藏
        this.reconnect = false;
        this.ws.close();
        this.ws2.close();
      } else {
        //页面显示
        this.reconnect = true;
      }
    },
    getWebsocket() {
      //仓位敞口
      if (!this.reconnect) {
        return;
      }
      var vm = this;
      var token = getToken("user-token");
      var user_id = getToken("user_id");
      var wsUrl = `${process.env.VUE_APP_WS_API}/ws/exposure/${user_id}/?token=${token}`;
      common.wsOpen.call(this, wsUrl, this).then((res) => {
        // console.log(res);
        this.ws = res;
        this.ws.onmessage = (event) => {
          var obj = JSON.parse(event.data);
          // console.log(`event.data=`, event.data);
          // 使用JSON.parse的方法时，该方法的作用是将字符串转换成对象，当参数不为字符串或者为undefined时会报错
          if (typeof obj === "object") {
            var combined_position_exposure = JSON.parse(
              obj.combined_position_exposure
            ); //净敞口
            var currency_exposure = JSON.parse(obj.currency_exposure); //货币敞口
            var individual_position_exposure = JSON.parse(
              obj.individual_position_exposure
            ); //仓位敞口;

            // console.log(`仓位敞口=`, individual_position_exposure)
            // console.log(`净敞口=`, combined_position_exposure)
            // console.log(`货币敞口=`, currency_exposure)

            this.tableData = individual_position_exposure;
            this.tableList = individual_position_exposure;

            this.tableData2 = combined_position_exposure.position_lists;
            this.total_volume = combined_position_exposure.total_volume;
            this.total_profit_loss =
              combined_position_exposure.total_profit_loss;
            this.tableList2 = combined_position_exposure.position_lists;

            this.tableData3 = currency_exposure.currency_exposure;
            this.short_statistics = currency_exposure.short_statistics;
            this.long_statistics = currency_exposure.long_statistics;
            this.total = currency_exposure.total;
            this.tableList3 = currency_exposure.currency_exposure;
          }
        };
      });
    },
    getWebsocket2() {
      //仓位细节
      if (!this.reconnect) {
        return;
      }
      var vm = this;
      var token = getToken("user-token");
      var user_id = getToken("user_id");
      // wss://dev.klipc.com.cn/ws/position/detail/?token=xxxxxxxxxxxxxxxxxxxxxxxx
      var wsUrl = `${process.env.VUE_APP_WS_API}/ws/position/detail/?token=${token}`;
      common.wsOpen.call(this, wsUrl, this).then((res) => {
        // console.log(res);
        this.ws2 = res;
        this.ws2.onmessage = (event) => {
          var obj = JSON.parse(event.data);
          // console.log(`event.data=`, event.data);
          // 使用JSON.parse的方法时，该方法的作用是将字符串转换成对象，当参数不为字符串或者为undefined时会报错
          if (typeof obj === "object") {
            this.tableData4 = obj;
          }
        };
      });
    },
    getChart(symbol) {
      // console.log(symbol)
      getsymbol(symbol).then((res) => {
        this.chartData = res.results[symbol];
        this.$nextTick(() => {
          this.Echart = () => import("./components/PlCurveChart");
        });
      });
    },
    // getList() {
    //   getPositionList().then(
    //     (res) => {
    //       var results = res.results;
    //       this.tableData = results;
    //       this.tableList = results;
    //       // var symbols = [];
    //       // results.forEach((item) => {
    //       //   if (symbols.indexOf(item) < 0) {
    //       //     symbols.push(item.symbol);
    //       //   }
    //       // });
    //       // this.symbols = [...new Set(symbols)]; //数组去重
    //       this.selectKey = this.symbols[0] || "gold.sg";
    //       this.getChart(this.selectKey);
    //     },
    //     (err) => {
    //       console.log(err);
    //       this.selectKey = "gold.sg";
    //       this.getChart("gold.sg"); //默认展示黄金
    //     }
    //   );
    //   getNetList().then(
    //     (res) => {
    //       this.tableData2 = res.results;
    //       this.tableList2 = res.results;
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    //   getCurrencyList().then(
    //     (res) => {
    //       this.tableData3 = res.results;
    //       this.tableList3 = res.results;
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    //   // getDetailsList().then(
    //   //   (res) => {
    //   //     this.tableData4 = res.results;
    //   //   },
    //   //   (err) => {
    //   //     console.log(err);
    //   //   }
    //   // );
    // },
    // onSearch(value) {
    //   // console.log(value);
    //   var newList = [];
    //   this.tableList.forEach((item) => {
    //     if (item.symbol.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
    //       newList.push(item);
    //     }
    //   });
    //   this.tableData = newList;
    // },
    onSearch2(value) {
      // console.log(value);
      var newList = [];
      this.tableList2.forEach((item) => {
        if (item.instrument.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          newList.push(item);
        }
      });
      this.tableData2 = newList;
    },
    onSearch3(value) {
      // console.log(value);
      var newList = [];
      this.tableList3.forEach((item) => {
        if (item.currency.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          newList.push(item);
        }
      });
      this.tableData3 = newList;
    },
  },
};
</script>

<style lang="scss" src="./exposure.scss" scoped>
</style>