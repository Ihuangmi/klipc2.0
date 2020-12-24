<template>
  <div id="dash">
    <!-- <TopSkin :title="$t('menu.my_assets')" /> -->
    <div class="top-title">{{$t('menu.my_assets')}}</div>
    <el-row>
      <el-col :span="17">
        <!-- accounts linked -->
        <div class="link_account">
          <head-title
            :title="$t('my_assets.link_account')"
            :has-icon="true"
            :has-input="true"
          >
            <template #inputs>
              <div class="labels">{{ $t("my_assets.platform_type") }}</div>
              <el-select
                popper-class="account-select"
                size="mini"
                v-model="account.platform_type"
                :placeholder="$t('global.placeholder1')"
                @change="onSearchAccount"
              >
                <el-option
                  v-for="e in [
                    { label: $t('my_assets.all'), value: '' },
                    { label: 'MT4', value: 'MT4' },
                    { label: 'MT5', value: 'MT5' },
                  ]"
                  :key="e.label"
                  size="mini"
                  :label="e.label"
                  :value="e.value"
                ></el-option>
              </el-select>
              <el-input
                size="mini"
                :placeholder="$t('global.placeholder5')"
                prefix-icon="el-icon-search"
                v-model="account.account_number_or_platform_server"
                @change="onSearchAccount"
              ></el-input>
            </template>
            <template #icons>
              <svg-icon
                iconClass="user"
                @click.native="dialogVisible = true"
              ></svg-icon>
              <svg-icon iconClass="door"></svg-icon>
            </template>
          </head-title>
          <div class="account-table">
            <!-- <el-scrollbar style="height: 28rem"> -->
            <div class="scrollbar" style="height: 28rem">
              <BaseTable
                :data="tableData"
                :col-configs="accountsConfigs"
                :isLoad="isLoad1"
              >
                <template #worth="{ colConfig }">
                  <el-table-column v-bind="colConfig" align="right">
                    <template #default="{ row }">
                      <span v-if="String(row.equity).indexOf('-') < 0" style="color: #f6665d"
                        >{{ row.equity }}</span
                      >
                      <span v-else style="color: #3ab98e"
                        >{{ row.equity }}</span
                      >
                    </template>
                    <!-- <template #default="{ row }">
                      <span v-if="row.equity >= 0" style="color: #f6665d"
                        >{{ dataFormats(row.equity)}}</span
                      >
                      <span v-else style="color: #3ab98e"
                        >-{{ dataFormats(-row.equity) }}</span
                      >
                    </template> -->
                  </el-table-column>
                </template>
                <template #totalpl="{ colConfig }">
                  <el-table-column v-bind="colConfig">
                    <template #default="{ row }">
                      <span v-if="String(row.total_profit_loss).indexOf('-') < 0" style="color: #f6665d"
                        >{{ row.total_profit_loss }}</span
                      >
                      <span v-else style="color: #3ab98e"
                        >{{ row.total_profit_loss }}</span
                      >
                    </template>
                    <!-- <template #default="{ row }">
                      <span
                        v-if="row.total_profit_loss >= 0"
                        style="color: #f6665d"
                        >{{ dataFormats(row.total_profit_loss) }}</span
                      >
                      <span
                        v-else
                        style="color: #3ab98e"
                        >-{{
                          dataFormats(-row.total_profit_loss)
                        }}</span
                      >
                    </template> -->
                  </el-table-column>
                </template>
              </BaseTable>
              <div class="to-link">
              <el-button @click="toLinkAccount"
                >{{ $t("my_assets.link_account") }}</el-button
              >
              </div>
            </div>
            <!-- </el-scrollbar> -->
          </div>
          <el-dialog
            :title="$t('my_assets.show')"
            :visible.sync="dialogVisible"
            :show-close="false"
          >
            <div class="dialog-body">
              <div class="filter">
                <div class="label">{{ $t("my_assets.classification") }}</div>
                <el-select
                  popper-class="account-select"
                  size="mini"
                  v-model="dialogSelectKey"
                  :placeholder="$t('global.placeholder3')"
                >
                  <el-option
                    v-for="e in [
                    { label: $t('my_assets.all'), value: null },
                    { label: 'MT4', value: 'MT4' },
                    { label: 'MT5', value: 'MT5' },
                  ]"
                    :key="e.label"
                    size="mini"
                    :label="e.label"
                    :value="e.value"
                  ></el-option>
                </el-select>
                <el-input
                  size="mini"
                  :placeholder="$t('global.placeholder6')"
                  prefix-icon="el-icon-search"
                  v-model="dialogInputKey"
                  @change="onDialogSearch"
                ></el-input>
              </div>
              <div class="dialog-table">
                <!-- <el-scrollbar style="height: 21rem"> -->
                <div class="scrollbar" style="height: 21rem">
                  <BaseTable
                    :data="allTableData"
                    :col-configs="dialogConfigs"
                    @selection-change="changeSelectRows"
                  >
                    <template #index>
                      <el-table-column
                        type="index"
                        width="40"
                      ></el-table-column>
                    </template>
                  </BaseTable>
                </div>
                <!-- </el-scrollbar> -->
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">{{
                $t("global.cancel")
              }}</el-button>
              <el-button @click="onSelectComplete">{{
                $t("global.sure")
              }}</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
      <el-col :span="7">
        <!-- echarts -->
        <div class="border-b chart">
          <head-title :title="$t('my_assets.pl_amount')" :has-icon="true">
            <template #icons>
              <svg-icon
                iconClass="fullscreen"
                @click.native="chartVisible = true"
              ></svg-icon>
            </template>
          </head-title>
          <div v-if="chart" class="echart_tab">
            <el-tabs v-model="activeName" @tab-click="switchTab">
              <el-tab-pane
                v-for="tab in tabItems"
                :key="tab.name"
                :label="tab.label"
                :name="tab.name"
              >
                <component
                  v-if="activeName === tab.name"
                  :is="Echart"
                  :data="chartObj"
                ></component>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div v-else class="nodata" style="height: 180px">
            {{ $t("global.nodata") }}
          </div>
          <el-dialog :visible.sync="chartVisible" :show-close="false">
            <component
              v-if="chartVisible"
              :is="largeEchart"
              :data="chartObj"
            ></component>
          </el-dialog>
        </div>
        <!-- 环图 echarts -->
        <div>
          <head-title :title="$t('my_assets.pl_product')"></head-title>
          <component
            v-if="chartData && chartData.summary && chartData.summary.length"
            :is="PieEchart"
            :data="chartData"
          ></component>
          <div v-else class="nodata">{{ $t("global.nodata") }}</div>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="17">
        <div class="bottom-left">
          <div class="left-box">
            <head-title :title="$t('my_assets.summary_position')"></head-title>
            <div class="table-box">
              <!-- 持仓汇总 -->
              <!-- <el-scrollbar style="height: 29rem"> -->
                <div class="scrollbar" style="height: 29rem">
                <BaseTable
                  :data="tableData2"
                  :col-configs="summaryConfigs"
                  :isLoad="isLoad3"
                >
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
                  <template #profit="{ colConfig }">
                    <el-table-column v-bind="colConfig">
                      <!-- <template #default="{ row }">
                        <span v-if="row.profit >= 0" style="color: #f6665d"
                          >${{ row.profit.toFixed(2) }}</span
                        >
                        <span v-else style="color: #3ab98e"
                          >-${{ Math.abs(row.profit).toFixed(2) }}</span
                        >
                      </template> -->
                      <template #default="{ row }">
                        <span v-if="row.profit >= 0" style="color: #f6665d"
                          >{{ dataFormats(row.profit) }}</span
                        >
                        <span v-else style="color: #3ab98e"
                          >-{{ dataFormats(-row.profit) }}</span
                        >
                      </template>
                    </el-table-column>
                  </template>
                </BaseTable>
                </div>
              <!-- </el-scrollbar> -->
            </div>
          </div>
          <div class="middle-box">
            <!--平仓盈亏 -->
            <div class="subscript">
              <head-title
                :title="$t('my_assets.subscription_pl')"
                :has-input="true"
              >
                <template #inputs>
                  <Pagination
                    :total="count"
                    :page.sync="currentPage"
                    :layout="layout"
                    :pagers="5"
                    @pagination="getSubList"
                  />
                  <!-- <svg-icon iconClass="more"></svg-icon> -->
                  <!-- @click.native="dialogVisible=true" -->
                </template>
              </head-title>
              <!-- <el-scrollbar style="height: 12.3rem"> -->
                <!-- <div class="scrollbar" style="height: 12.3rem"> -->
                <BaseTable
                  :data="tableData3"
                  :col-configs="plConfigs"
                  :isLoad="isLoad4"
                  :height="200"
                >
                  <template #profit="{ colConfig }">
                    <el-table-column v-bind="colConfig">
                      <template #default="{ row }">
                        <span v-if="row.close_profit >= 0" style="color: #f6665d"
                          >{{ dataFormats(row.close_profit) }}</span
                        >
                        <span
                          v-else
                          style="color: #3ab98e"
                          >-{{ dataFormats(-row.close_profit) }}</span
                        >
                    </template>
                    </el-table-column>
                  </template>
                </BaseTable>
                <!-- </div> -->
              <!-- </el-scrollbar> -->
            </div>
            <!--热点信号-->
            <div>
              <head-title :title="$t('my_assets.hot_signal')"></head-title>
              <SignalCard :data="signalData" @deleteUser="deleteUser" />
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <!--消息-->
        <div>
          <head-title :title="$t('my_assets.message')" :hasInput="true">
            <template #inputs>
              <el-input
                size="mini"
                :placeholder="$t('global.placeholder4')"
                prefix-icon="el-icon-search"
                v-model="msgKey"
                @change="searchMsg"
              ></el-input>
            </template>
          </head-title>
          <div class="messages">
            <el-tabs v-model="activeName2" @tab-click="switchTab2">
              <el-tab-pane
                v-for="tab in msgItems"
                :key="tab.name"
                :label="tab.label"
                :name="tab.name"
              >
                <MessageBox :data="msgs" />
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getPlChartData,
  getPplChartData,
  getAllLinksList,
  getlinksList,
  getFilterList,
  getSummaryList,
  getSubscriptionList,
  getHotSignal,
  getMessage,
  deleteUser,
} from "@/api";
import BaseTable from "@/components/BaseTable";
import HeadTitle from "@/components/HeadTitle";
import TopSkin from "@/components/TopSkin";
import MessageBox from "./components/MessageBox";
import SignalCard from "./components/SignalCard";
import Tabs from "./components/Tabs";
import Pagination from "@/components/Pagination";
import { dataFormat } from "@/utils"

export default {
  components: {
    BaseTable,
    HeadTitle,
    TopSkin,
    MessageBox,
    SignalCard,
    Tabs,
    Pagination,
  },
  data() {
    return {
      layout: "total, prev, pager, next",
      pagers: 4,
      count: 0,
      currentPage: 1,
      chartVisible: false,
      isLoad1: true,
      isLoad3: true,
      isLoad4: true,
      dialogVisible: false,
      account: {
        platform_type: ''
      },
      // selectKey: "MT4",
      // inputKey: "",
      dialogSelectKey: "",
      dialogInputKey: "",
      tableConfig: {
        border: true,
        height: 500,
      },
      Echart: null,
      largeEchart: null,
      PieEchart: null,
      chartObj: null,
      chartData: null,
      signalData: [],
      msgs: [],
      activeName: "7",
      activeName2: "all",
      msgKey: "",
      tableData: [],
      allTableData: [],
      tableData2: [],
      tableData3: [],
    };
  },
  computed: {
    chart() {
      if (
        this.chartObj &&
        this.chartObj.close_profit &&
        this.chartObj.time &&
        this.chartObj.today_profit &&
        this.chartObj.total_profit &&
        this.chartObj.close_profit.length &&
        this.chartObj.time.length &&
        this.chartObj.today_profit.length &&
        this.chartObj.total_profit.length
      ) {
        return true;
      } else {
        return false;
      }
    },
    accountsConfigs() {
      return [
        {
          prop: "platform",
          label: this.$t("my_assets.platform_type"),
          // width: 75,
          "min-width": "6%",
        },
        {
          prop: "platform_server",
          label: this.$t("my_assets.server"),
          // width: 160,
          "min-width": "17%",
        },
        {
          prop: "account_number",
          label: this.$t("my_assets.account"),
          // width: 90,
          "min-width": "9%",
        },
        {
          prop: "account_name",
          label: this.$t("my_assets.username"),
          // width: 90,
          "min-width": "10%",
        },
        {
          prop: "balance",
          label: this.$t("my_assets.balance")+'($)',
          "min-width": "9%",
          // width: 100,
          align: "right",
          // formatter(row, column, cellValue) {
          //   if (cellValue) return cellValue.toFixed(2);
          //   else return cellValue
          // },
        },
        {
          prop: "equity",
          label: this.$t("my_assets.net_worth")+'($)',
          slot: "worth",
          // width: 100,
          "min-width": "9%",
          // "show-overflow-tooltip":true,
        },
        {
          prop: "total_profit_loss",
          label: this.$t("my_assets.total_pl")+'($)',
          slot: "totalpl",
          align: "right",
          // width: 100,
          "min-width": "8%",
        },
        {
          prop: "traditional_calculate_roi",
          label: this.$t("my_assets.pl"),
          // width: 70,
          "min-width": "7%",
          // formatter(row, column, cellValue) {
          //   if (cellValue) return cellValue + "%";
          // },
        },
        {
          prop: "seven_days_roi",
          label: this.$t("my_assets.seven_days"),
          // width: 70,
          "min-width": "7%",
          // formatter(row, column, cellValue) {
          //   if (cellValue!==null) return cellValue + "%";
          // },
        },
        {
          prop: "thirty_days_roi",
          label: this.$t("my_assets.thirty_days"),
          // width: 70,
          "min-width": "8%",
          // formatter(row, column, cellValue) {
          //   if (cellValue) return cellValue + "%";
          // },
        },
        {
          prop: "account_nick_name",
          label: this.$t("my_assets.nickname"),
          // width: 75,
          "min-width": "7%",
        },
      ];
    },
    summaryConfigs() {
      return [
        { prop: "symbol", label: this.$t("my_assets.key11"), 'min-width': '25%' },
        {
          prop: "volume",
          label: this.$t("my_assets.key12"),
          formatter(row, column, cellValue) {
            if (cellValue) return cellValue.toFixed(2);
          },
          // align: 'right',
          'min-width': '20%'
        },
        { prop: "type", label: this.$t("my_assets.key13"), slot: "buy",
          align: 'center','min-width': '25%' },
        {
          prop: "profit",
          label: this.$t("my_assets.key14")+'($)',
          slot: "profit",
          align: 'right',
          'min-width': '25%'
        },
      ];
    },
    plConfigs() {
      return [
        {
          prop: "record_date",
          label: this.$t("my_assets.key21"),
          "min-width": "25%",
        },
        {
          prop: "account_number",
          label: this.$t("my_assets.key22"),
          "min-width": "25%",
        },
        {
          prop: "account_nick_name",
          label: this.$t("my_assets.key23"),
          "min-width": "25%",
        },
        {
          prop: "close_profit",
          label: this.$t("my_assets.key24")+'($)',
          slot: "profit",
          align: 'right',
          "min-width": "25%",
        },
      ];
    },
    tradingConfigs() {
      return [
        { prop: "date", label: this.$t("my_assets.key21") },
        { prop: "name", label: this.$t("my_assets.key32") },
        { prop: "address", label: this.$t("my_assets.key33") },
        { prop: "trend", label: this.$t("my_assets.key34") },
      ];
    },
    dialogConfigs() {
      return [
        { type: "selection" },
        { slot: "index" },
        { prop: "platform", label: this.$t("my_assets.key41") },
        { prop: "account_nick_name", label: this.$t("my_assets.key42") },
      ];
    },
    tabItems() {
      return [
        { label: this.$t("my_assets.week"), name: "7" },
        { label: this.$t("my_assets.month"), name: "30" },
        { label: this.$t("my_assets.season"), name: "90" },
        { label: this.$t("my_assets.half_year"), name: "182" },
        { label: this.$t("my_assets.year"), name: "365" },
      ];
    },
    msgItems() {
      return [
        {
          name: "all",
          label: this.$t("my_assets.all"),
        },
        {
          name: "financial_message",
          label: this.$t("my_assets.funds"),
        },
        {
          name: "login_and_logout_message",
          label: this.$t("my_assets.loginmsg"),
        },
        {
          name: "transaction_message",
          label: this.$t("my_assets.trans"),
        },
      ];
    },
  },
  mounted() {
    this.getList();
    this.getHotSignal(); //热点信号
    this.getChartData({ days: 7 }); //echart
    this.getPieChart(); //pie
    this.getMsg({message_type: this.activeName2}); //message
    this.getlinkList();
    this.getSubList();
  },
  watch: {
    "$i18n.locale": function () {
      this.getPieChart(); //pie
      this.getMsg({message_type: this.activeName2}); //message
      this.$nextTick(() => {
        this.Echart = () => import("./components/PlAmountChart");
        this.largeEchart = () => import("./components/dialogChart");
        // this.PieEchart = () => import("@/components/PieEchart");
      });
    },
  },
  methods: {
    dataFormats(number){
      return dataFormat(number)
    },
    // getUserId() {
    //   getUserId().then((res) => {
    //     var user_id = res.results.user_id;
    //     sessionStorage.setItem("user_id", user_id);
    //   });
    // },
    toLinkAccount() {
      this.$router.push({
        path: "/dashboard/link-account",
      });
    },
    getChartData(obj) {
      getPlChartData(obj).then((res) => {
        this.chartObj = res.results;
        this.$nextTick(() => {
          this.Echart = () => import("./components/PlAmountChart");
          this.largeEchart = () => import("./components/dialogChart");
        });
      });
    },
    getMsg(obj) {
      getMessage(obj).then((res) => {
        this.msgs = res.results;
      });
    },
    getlinkList(obj) {
      getlinksList(obj).then(
        (res) => {
          this.tableData = res;
          this.isLoad1 = false;
        },
        (err) => {
          this.isLoad1 = false;
        }
      );
    },
    getSubList() {
      getSubscriptionList({ page: this.currentPage }).then(
        (res) => {
          this.tableData3 = res.results;
          this.count = res.count;
          this.isLoad4 = false;
        },
        (err) => {
          this.isLoad4 = false;
        }
      );
    },
    getHotSignal() {
      getHotSignal().then((res) => {
        this.signalData = res.results;
      });
    },
    getPieChart() {
      getPplChartData().then((res) => {
        this.chartData = res.results;
        this.$nextTick(() => {
          this.PieEchart = () => import("@/components/PieEchart");
        });
      });
    },
    getList() {
      getAllLinksList().then((res) => {
        this.allTableData = res;
      });
      getSummaryList().then(
        (res) => {
          this.tableData2 = res.results;
          this.isLoad3 = false;
          // this.tableData2 = res.data; //mock
        },
        (err) => {
          this.isLoad3 = false;
        }
      );
    },
    switchTab(tab) {
      // console.log(tab.name);
      this.getChartData({ days: Number(tab.name) });
    },
    switchTab2(tab) {
      // console.log(tab.name);
      // console.log(this.activeName2)
      this.msgKey = null;
      this.getMsg({ message_type: tab.name });
    },
    searchMsg(value) {
      // console.log(value);
      this.getMsg({ search: value });
    },
    onSearchAccount(){
      this.getlinkList(this.account);
    },
    onDialogSearch(value) {
      console.log(value);
    },
    onSelectComplete() {
      // console.log(this.showAccounts);
      this.dialogVisible = false;

      var str1 = this.showAccounts.join("','");
      var str = "['".concat(str1).concat("']");

      var obj = {
        is_display: true,
        accounts: str,
      };
      getFilterList(obj).then((res) => {
        // console.log(res);
        this.getlinkList();
      });
    },
    changeSelectRows(selectRows) {
      // console.log(selectRows);
      var arr = [];
      selectRows.forEach((item) => {
        arr.push(item.id);
      });
      this.showAccounts = arr;
    },
    deleteUser(id) {
      // console.log(id);
      deleteUser({ favor_user_id: id }).then((res) => {
        this.$message.success(this.$t("global.completed"));
        this.getHotSignal();
      });
    },
  },
};
</script>

<style lang="scss" src='./my-assets.scss' scoped>
</style>