<template>
  <div id="report">
    <!-- <TopSkin :title="$t('report.report')" /> -->
    <div class="top-title">{{$t('report.report')}}</div>
    <div class="content">
      <!-- <div class="header">
        <div class="title">{{$t('report.report')}}</div>
        <div class="setting">
          <el-button icon="el-icon-s-tools" @click="toRebateSet">
            <span>{{$t('report.setting')}}</span>
          </el-button>
        </div>
      </div>-->
      <!-- dialog start ************************** -->
      <el-dialog
        :title="$t('report.setting')"
        :visible.sync="dialogVisible"
        :show-close="false"
      >
        <el-scrollbar style="height: 370px">
          <div class="dialog-body">
            <div class="filter">
              <div class="label">{{ $t("report.account") }}</div>
              <el-select
                popper-class="account-select"
                size="mini"
                v-model="account"
                :placeholder="$t('global.placeholder1')"
                @change="getRebateSet"
              >
                <el-option
                  v-for="v in myAccounts"
                  :key="v.id"
                  :label="v.account_number"
                  :value="v.id"
                ></el-option>
              </el-select>
            </div>
            <div class="text">{{ $t("report.text") }}</div>
            <div class="radio">
              <span>{{ $t("report.return") }}</span>
              <el-radio v-model="setType" label="independent">{{
                $t("report.setting2")
              }}</el-radio>
              <el-radio v-model="setType" label="unified">{{
                $t("report.setting1")
              }}</el-radio>
              <div v-show="setType === 'unified'" class="set_value">
                <div style="margin-right: 8px">
                  {{ $t("master.set_value") }}
                </div>
                <el-input
                  v-model="rebate_rate"
                  :placeholder="$t('global.placeholder2')"
                ></el-input>
              </div>
            </div>
            <div class="tabs">
              <el-tabs v-model="product_type" @tab-click="getRebateSet">
                <el-tab-pane
                  v-for="tab in tabItems"
                  :key="tab.name"
                  :label="tab.label"
                  :name="tab.name"
                ></el-tab-pane>
              </el-tabs>
            </div>
            <div class="settings">
              <div class="head">
                <div>{{ $t("report.product") }}</div>
                <div>{{ $t("report.value") }}</div>
              </div>
              <ul>
                <li v-for="(v, i) in symbols" :key="v.symbol">
                  <div class="product">
                    <span>{{ i + 1 }}</span>
                    <span>{{ v.symbol }}</span>
                  </div>
                  <div class="input">
                    <el-input
                      v-model="v.rebate_rate"
                      :placeholder="$t('global.placeholder2')"
                    ></el-input>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-scrollbar>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">{{
            $t("global.cancel")
          }}</el-button>
          <el-button @click="onSetRebate">{{ $t("global.sure") }}</el-button>
        </div>
      </el-dialog>
      <!-- dialog end ************************** -->
      <div class="filter-box">
        <div>
          <div class="select">
            <span>{{ $t("report.value1") }}</span>
            <el-select
              popper-class="account-select"
              size="mini"
              :placeholder="$t('global.placeholder3')"
              v-model="queryList.platform_type"
              @change="changePlatform"
            >
              <el-option size="mini" label="全部" value=""></el-option>
              <el-option size="mini" label="MT4" value="MT4"></el-option>
              <el-option size="mini" label="MT5" value="MT5"></el-option>
            </el-select>

            <span>{{ $t("report.value2") }}</span>
            <el-select
              class="multiple"
              popper-class="account-select"
              size="mini"
              multiple
              collapse-tags
              v-model="accounts"
              slot="prepend"
              :placeholder="$t('global.placeholder3')"
            >
              <el-option
                v-for="v in myAccounts"
                :key="v.id"
                :label="v.account_number"
                :value="v.id"
              ></el-option>
            </el-select>

            <span>{{ $t("report.value3") }}</span>
            <el-select
              popper-class="account-select"
              size="mini"
              v-model="queryList.report_type"
              slot="prepend"
              :placeholder="$t('global.placeholder3')"
            >
              <el-option
                v-for="v in reportTypes"
                :key="v.value"
                :label="v.label"
                :value="v.value"
              ></el-option>
              <!-- <el-option label="1" :value="1"></el-option> -->
            </el-select>
            <DatePicker :period.sync="period" />
          </div>
        </div>
        <div class="search-btn">
          <el-button type="primary" @click="getFilterList">{{
            $t("report.search")
          }}</el-button>
        </div>
      </div>
      <HeadTitle :title="$t('report.value14')" :hasInput="true" :hasIcon="true">
        <template #inputs>
          <el-input
            size="mini"
            :placeholder="$t('global.placeholder4')"
            prefix-icon="el-icon-search"
            v-model="searchKey"
            @change="onSearch"
          ></el-input>
            <!-- headeData  headers -->
          <div class="header_data">
            <div v-for="item in headeObj" :key="item.title">
              <div v-if="item.value!==undefined" class="header_item">
                <span class="text">{{ item.title }}</span>
                <span :class="item.value < 0 ? 'number_down' : 'number_up'">{{
                  item.value
                }}</span>
                <svg-icon
                  :iconClass="item.value < 0 ? 'down' : 'up'"
                ></svg-icon>
              </div>
            </div>
          </div>
        </template>
        <template #icons>
          <div class="setting">
            <el-button icon="el-icon-s-tools" @click="toRebateSet">
              <span>{{ $t("report.setting") }}</span>
            </el-button>
          </div>
          <div class="load-btn">
            <el-button @click="getList('True')" icon="el-icon-download">
              <span>{{ $t("report.download") }}</span>
            </el-button>
          </div>
        </template>
      </HeadTitle>

      <!-- <el-scrollbar style="height: 71vh"> -->
        <base-table
          v-if="queryList.report_type === 1"
          :data="tableData"
          :col-configs="reportConfigs"
        >
          <template #index>
            <el-table-column type="index" width="40"></el-table-column>
          </template>
          <template #buy="{ colConfig }">
            <el-table-column v-bind="colConfig">
              <template #default="{ row }">
                <el-button
                  size="mini"
                  :class="row.trade_type === 'buy' ? 'buy' : 'sell'"
                  >{{ row.trade_type === 'buy' ? 'Buy' : 'Sell' }}</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template #pl="{ colConfig }">
            <el-table-column v-bind="colConfig">
              <template #default="{ row }">
                <span v-if="(row.profit).indexOf('-') < 0" style="color: #f6665d"
                  >{{ row.profit }}</span
                >
                <span v-else style="color: #3ab98e"
                  >{{ row.profit }}</span
                >
              </template>
            </el-table-column>
          </template>
        </base-table>
        <BaseTable
          v-else-if="queryList.report_type === 2"
          :data="tableData"
          :col-configs="reportConfigs2"
        >
          <template #index>
            <el-table-column type="index" width="40"></el-table-column>
          </template>
        </BaseTable>
        <BaseTable
          v-else-if="queryList.report_type === 3"
          :data="tableData"
          :col-configs="reportConfigs3"
        >
          <template #index>
            <el-table-column type="index" width="40"></el-table-column>
          </template>
          <template #pl="{ colConfig }">
            <el-table-column v-bind="colConfig">
              <template #default="{ row }">
                <span v-if="(row.profit).indexOf('-') < 0" style="color: #f6665d"
                  >{{ row.profit }}</span
                >
                <span v-else style="color: #3ab98e"
                  >{{ row.profit }}</span
                >
              </template>
            </el-table-column>
          </template>
        </BaseTable>
        <BaseTable
          v-else-if="queryList.report_type === 4"
          :data="tableData"
          :col-configs="reportConfigs4"
        >
          <template #index>
            <el-table-column type="index" width="40"></el-table-column>
          </template>
        </BaseTable>
        <BaseTable
          v-else-if="queryList.report_type === 5"
          :data="tableData"
          :col-configs="reportConfigs5"
        >
          <template #index>
            <el-table-column type="index" width="40"></el-table-column>
          </template>
          <template #buy="{ colConfig }">
            <el-table-column v-bind="colConfig">
              <template #default="{ row }">
                <el-button
                  size="mini"
                  :class="row.trade_type === 'buy' ? 'buy' : 'sell'"
                  >{{ row.trade_type === 'buy' ? 'Buy' : 'Sell' }}</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template #pl="{ colConfig }">
            <el-table-column v-bind="colConfig">
              <template #default="{ row }">
                <span v-if="(row.profit).indexOf('-') < 0" style="color: #f6665d"
                  >{{ row.profit }}</span
                >
                <span v-else style="color: #3ab98e"
                  >{{ row.profit }}</span
                >
              </template>
            </el-table-column>
          </template>
        </BaseTable>
        <BaseTable
          v-else-if="queryList.report_type === 6"
          :data="tableData"
          :col-configs="reportConfigs6"
        >
          <template #index>
            <el-table-column type="index" width="40"></el-table-column>
          </template>
        </BaseTable>
        <BaseTable
          v-else-if="queryList.report_type === 7"
          :data="tableData"
          :col-configs="reportConfigs7"
        >
          <template #index>
            <el-table-column type="index" width="40"></el-table-column>
          </template>
        </BaseTable>
        <BaseTable
          v-else-if="queryList.report_type === 8"
          :data="tableData"
          :col-configs="reportConfigs8"
        >
          <template #index>
            <el-table-column type="index" width="40"></el-table-column>
          </template>
        </BaseTable>
      <!-- </el-scrollbar> -->
    </div>
  </div>
</template>
<script>
import HeadTitle from "@/components/HeadTitle";
import BaseTable from "@/components/BaseTable";
import DatePicker from "@/components/DatePicker";
import Tabs from "./components/Tabs";
import { Message } from "element-ui";
import { debounce } from "@/utils";
import TopSkin from "@/components/TopSkin";
import axios from "axios";
import { getToken } from '@/utils/token'

import {
  getAccountsList,
  getFilterLists,
  getRebateSetting,
  updateRebateSet,
} from "@/api";

export default {
  components: {
    HeadTitle,
    BaseTable,
    DatePicker,
    Tabs,
    TopSkin,
  },
  data() {
    return {
      queryList: {
        platform_type: "MT4",
        report_type: 1,
      },
      period: [],
      headeData: {},
      accounts: [],
      start_day: "",
      end_day: "",
      myAccounts: [],
      symbols: [],
      rebate_rate: 0.01,
      setType: "independent",
      account: "",
      product_type: "0",
      dialogVisible: false,
      searchKey: "",
      tableData: [],
    };
  },
  computed: {
    headeObj() {
      return [
        { title: this.$t("report.title1"), value: this.headeData.swap_sum },
        {
          title: this.$t("report.title2"),
          value: this.headeData.commission_sum,
        },
        { title: this.$t("report.title3"), value: this.headeData.profit_sum },
        { title: this.$t("report.title4"), value: this.headeData.volume_sum },
        { title: this.$t("report.title5"), value: this.headeData.close_volume },
        {
          title: this.$t("report.title6"),
          value: this.headeData.closed_profit,
        },
        { title: this.$t("report.title7"), value: this.headeData.float_profit },
        { title: this.$t("report.title8"), value: this.headeData.float_volume },
        { title: this.$t("report.title9"), value: this.headeData.swap },
        { title: this.$t("report.title10"), value: this.headeData.amount_sum },
        { title: this.$t("report.title11"), value: this.headeData.rebate },
        { title: this.$t("report.title12"), value: this.headeData.rebate_sum },
      ];
    },
    reportTypes() {
      return [
        { label: this.$t("report.tdclosedtrades"), value: 1 },
        { label: this.$t("report.tdsummary"), value: 2 },
        { label: this.$t("report.tdploninstruments"), value: 3 },
        { label: this.$t("report.tddepositwithdraw"), value: 4 },
        { label: this.$t("report.ibclosedtrades"), value: 5 },
        { label: this.$t("report.ibsummary"), value: 6 },
        { label: this.$t("report.ibrebateinstruments"), value: 7 },
        { label: this.$t("report.ibdepositwithdraw"), value: 8 },
      ];
    },
    reportConfigs() {
      return [
        { slot: "index" },
        { prop: "platform_server", label: this.$t("report.key2"), "min-width": "10%"},
        { prop: "account_number", label: this.$t("report.key3"), "min-width": "6%" },
        { prop: "ticket", label: this.$t("report.key4"), "min-width": "6%" },
        {
          prop: "trade_type",
          label: this.$t("report.key5"),
          slot: "buy",
          "min-width": "6%"
        },
        { prop: "volume", label: this.$t("report.key6"), "min-width": "6%"},
        { prop: "symbol", label: this.$t("report.key7"), "min-width": "6%" },
        { prop: "open_time", label: this.$t("report.key8"), "min-width": "10%" },
        { prop: "close_time", label: this.$t("report.key9"), "min-width": "10%" },
        {
          prop: "open_price",
          label: this.$t("report.key10"),
          "min-width": "6%",
          formatter(row, column, cellValue) {
            return "$" + cellValue;
          },
        },
        {
          prop: "close_price",
          label: this.$t("report.key11"),
          "min-width": "6%",
          formatter(row, column, cellValue) {
            return "$" + cellValue;
          },
        },
        { prop: "take_profit", label: this.$t("report.key12"), "min-width": "4%" },
        { prop: "stop_loss", label: this.$t("report.key13"), "min-width": "4%" },
        { prop: "swap", label: this.$t("report.key14"), "min-width": "6%"},
        { prop: "commission", label: this.$t("my_assets.key32"), "min-width": "6%"},
        {
          prop: "profit",
          label: this.$t("report.key15")+'($)',
          "min-width": "5%",
          slot: "pl",
        },
      ];
    },
    reportConfigs2() {
      return [
        { slot: "index" },
        { prop: "acct", label: this.$t("report.acct") },
        { prop: "product_type", label: this.$t("report.type") },
        { prop: "server_name", label: this.$t("report.broker"), width: 230 },
        { prop: "float_volume", label: this.$t("report.positionvolume") },
        { prop: "float_profit", label: this.$t("report.floatingpl") },
        {
          prop: "close_volume",
          label: this.$t("report.closedtradesvolume"),
        },
        { prop: "close_profit", label: this.$t("report.closedtradespl") },
        { prop: "swap", label: this.$t("report.key14") },
      ];
    },
    reportConfigs3() {
      return [
        { slot: "index" },
        { prop: "acct", label: this.$t("report.acct") },
        { prop: "commission", label: this.$t("my_assets.key32") },
        { prop: "server_name", label: this.$t("report.broker"), width: 230 },
        { prop: "symbol", label: this.$t("report.key7") },
        { prop: "volume", label: this.$t("report.key6") },
        {
          prop: "profit",
          label: this.$t("report.key15"),
          slot: "pl",
        },
        { prop: "swap", label: this.$t("report.key14") },
      ];
    },
    reportConfigs4() {
      return [
        { slot: "index" },
        { prop: "platform_server", label: this.$t("report.key2") },
        { prop: "account_number", label: this.$t("report.key3") },
        { prop: "date", label: this.$t("report.date") },
        {
          prop: "deposit_or_withdrawal",
          label: this.$t("report.depositorwithdrawal"),
        },
        { prop: "amount", label: this.$t("report.amount") },
      ];
    },
    reportConfigs5() {
      return [
        { slot: "index" },
        { prop: "platform_server", label: this.$t("report.key2"), "min-width": "10%" },
        { prop: "account_number", label: this.$t("report.key3"),"min-width": "6%" },
        { prop: "ticket", label: this.$t("report.key4"),"min-width": "6%" },
        {
          prop: "trade_type",
          label: this.$t("report.key5"),
          slot: "buy",
          "min-width": "6%"
        },
        { prop: "volume", label: this.$t("report.key6"),"min-width": "6%" },
        { prop: "symbol", label: this.$t("report.key7"),"min-width": "6%" },
        { prop: "open_time", label: this.$t("report.key8"), "min-width": "10%" },
        { prop: "close_time", label: this.$t("report.key9"), "min-width": "10%" },
        {
          prop: "open_price",
          label: this.$t("report.key10"),
          "min-width": "6%",
          formatter(row, column, cellValue) {
            return "$" + cellValue;
          },
        },
        {
          prop: "close_price",
          label: this.$t("report.key11"),
          "min-width": "6%",
          formatter(row, column, cellValue) {
            return "$" + cellValue;
          },
        },
        { prop: "commission", label: this.$t("my_assets.key32"),"min-width": "6%" },
        { prop: "swap", label: this.$t("report.key14"),"min-width": "6%" },
        {
          prop: "profit",
          label: this.$t("report.key15"),
          "min-width": "6%",
          slot: "pl",
        },
        { prop: "rebate", label: this.$t("report.rebate"),"min-width": "6%" },
      ];
    },
    reportConfigs6() {
      return [
        { slot: "index" },
        { prop: "acct", label: this.$t("report.acct") },
        { prop: "product_type", label: this.$t("report.type") },
        { prop: "server_name", label: this.$t("report.broker"),width: 230 },
        { prop: "float_volume", label: this.$t("report.positionvolume") },
        { prop: "float_profit", label: this.$t("report.floatingpl") },
        {
          prop: "close_volume",
          label: this.$t("report.closedtradesvolume"),
          width: 220,
        },
        { prop: "close_profit", label: this.$t("report.closedtradespl") },
        { prop: "swap", label: this.$t("report.key14") },
      ];
    },
    reportConfigs7() {
      return [
        { slot: "index" },
        { prop: "acct", label: this.$t("report.acct") },
        { prop: "server_name", label: this.$t("report.broker"),width: 230 },
        { prop: "symbol", label: this.$t("report.key7") },
        { prop: "volume", label: this.$t("report.key6") },
        { prop: "commission", label: this.$t("my_assets.key32") },
        { prop: "rebate", label: this.$t("report.rebate") },
      ];
    },
    reportConfigs8() {
      return [
        { slot: "index" },
        { prop: "platform_server", label: this.$t("report.key2") },
        { prop: "account_number", label: this.$t("report.key3") },
        { prop: "date", label: this.$t("report.date") },
        {
          prop: "deposit_or_withdrawal",
          label: this.$t("report.depositorwithdrawal"),
        },
        { prop: "amount", label: this.$t("report.amount") },
      ];
    },
    headers() {
      return [
        { key: this.$t("report.title1"), value: -36.09 },
        { key: this.$t("report.title2"), value: 36.09 },
        { key: this.$t("report.title3"), value: -21.09 },
        { key: this.$t("report.title4"), value: 36.09 },
      ];
    },
    tabItems() {
      return [
        { name: "0", label: this.$t("report.exchange") },
        { name: "1", label: this.$t("report.fund") },
        { name: "2", label: this.$t("report.metals") },
        { name: "3", label: this.$t("report.energy") },
        { name: "4", label: this.$t("report.us_stocks") },
        { name: "5", label: this.$t("report.virtual") },
        // { name: "gold", label: this.$t("report.gold") },
        // { name: "silver", label: this.$t("report.silver") },
        // { name: "crude", label: this.$t("report.crude") },
      ];
    },
  },
  mounted() {
    this.getAccounts();
  },
  watch: {
    "$i18n.locale": function (){
      this.getFilterList()
    },
    "queryList.report_type": function () {
      this.tableData = [];
    },
  },
  methods: {
    onSetRebate() {
      var obj = {
        account: this.account,
        rebate_settings: this.symbols,
      };
      if (this.setType === "unified") {
        obj.rebate_settings.forEach((item) => {
          item.rebate_rate = this.rebate_rate;
        });
      }
      updateRebateSet(obj).then((res) => {
        this.dialogVisible = false;
        this.$message({
          message: "设置成功!",
          type: "success",
        });
      });
    },
    getRebateSet() {
      var obj = {
        account: this.account,
        product_type: parseInt(this.product_type),
      };
      getRebateSetting(obj).then((res) => {
        this.symbols = res.results;
      });
    },
    toRebateSet() {
      this.dialogVisible = true;
      this.getRebateSet();
    },
    getAccounts(type) {
      var obj = {};
      obj.platform_type = type;
      getAccountsList(obj).then((res) => {
        this.myAccounts = res.results;
        if (res.results.length) {
          this.account = res.results[0].id;
          this.accounts.push(res.results[0].id); // Default accounts
        } else {
          this.account = null;
          this.accounts = [];
        }
        this.getList();
      });
    },
    changePlatform(value){
      console.log(value)
      this.getAccounts(value)
    },
    getFilterList() {
      debounce(this.getList, 2000); //函数防抖
    },
    getList(is_download = "False") {
      // accounts format as "['accountId1', 'accountId2']"
      var str1 = this.accounts.join("','");
      var str = "['".concat(str1).concat("']");
      this.queryList.account = str1 ? str : "[]";
      this.queryList.start_day = this.period[0];
      this.queryList.end_day = this.period[1];
      this.queryList.is_download = is_download;
      if (is_download === "False") {
        getFilterLists(this.queryList).then((res) => {
          if (res.results) {
            if (res.results.report) {
              this.tableData = res.results.report;
            } else if (res.results.money_report) {
              this.tableData = res.results.money_report;
            }
            this.headeData = res.results;
            var results = res.results;
            // var arr = [];
            var obj = {};
            for (let key in results) {
              if (typeof results[key] === "number") {
                obj[key] = results[key];
              }
            }
            console.log(`obj=`, obj);
          }
        });
      } else if (is_download === "True") {
        this.downLoad();
      }
    },
    downLoad() {
      var token = getToken("user-token")
      axios
        .get(`${process.env.VUE_APP_BASE_API}v2/account/reports/reports`, {
          params: this.queryList,
          headers: {'Authorization': 'jwt ' + token}
        })
        .then((res) => {
          var fileName;
          const content = res.headers["content-disposition"]; //获取响应头信息
          if (content) {
            var str = decodeURI(content);
            fileName = str.substring(20);
            // console.log(fileName)
          }

          const a = document.createElement("a");
          const blob = new Blob([res.data], {
            type: "text/csv;charset=utf-8",
          });
          const blobUrl = window.URL.createObjectURL(blob);
          a.style.display = "none";
          a.download = fileName;
          a.href = blobUrl;
          a.click();
        });
    },
    onSearch(key) {
      console.log(key);
    },
  },
};
</script>
<style lang="scss" src="./report.scss" scoped>
</style>