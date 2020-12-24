<template>
  <div id="analysis">
    <!-- <TopSkin :title="$t('analysis.analysis')" /> -->
    <div class="top-title">{{$t('analysis.analysis')}}</div>

    <div class="account">
      <div class="title">{{ $t("analysis.account") }}</div>
      <div class="select">
        <span style="margin-right: 10px">{{ $t("analysis.choose") }}</span>
        <el-select
          popper-class="account-select"
          size="mini"
          v-model="account"
          :placeholder="$t('global.placeholder1')"
          @change="onSelectChange"
        >
          <el-option
            v-for="v in myAccounts"
            :key="v.id"
            :label="v.account_number"
            :value="v.id"
          ></el-option>
        </el-select>
        <DatePicker :period.sync="period" />
        <div class="search-btn">
          <el-button type="primary" @click="getFilterList">{{
            $t("report.search")
          }}</el-button>
        </div>
      </div>
    </div>
    <el-row>
      <el-col :span="17">
        <div class="leftbox">
          <div class="title">{{ $t("analysis.statistics") }}</div>
          <div class="pro_chart" style="min-height: 323px">
            <component
              v-if="plChartData.length"
              :is="Echart"
              :data="plChartData"
            ></component>
            <div
              v-else
              class="nodata"
            >
              {{ $t("global.nodata") }}
            </div>
          </div>
          <div class="echarts">
            <div class="left" style="min-height: 353px">
              <component
                v-if="chartData.length"
                :is="YieldEchart"
                :data="chartData"
              ></component>
              <div
                v-else
                class="nodata"
              >
                {{ $t("global.nodata") }}
              </div>
            </div>
            <div class="right" style="min-height: 323px">
              <component
                v-if="pieChartData.length"
                :is="PieChart"
                :data="pieChartData"
              ></component>
              <div
                v-else
                class="nodata"
              >
                {{ $t("global.nodata") }}
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="rightbox">
          <div class="title">{{ $t("analysis.statistics") }}</div>
          <div class="list">
            <ul>
              <li v-for="v in lists" :key="v.key">
                <!-- <div class="key">{{ v.label }}</div> -->
                <!-- <el-tooltip
                  class="item"
                  effect="dark"
                  :content="v.label"
                  placement="top"
                > -->
                  <div class="key">{{ v.label }}</div>
                <!-- </el-tooltip> -->
                <div class="value">{{ statistics[v.key] }}</div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import DatePicker from "@/components/DatePicker";
import TopSkin from "@/components/TopSkin";
import { debounce } from "@/utils";

import {
  getAccountsList,
  getCurveChart,
  getYieldChart,
  getPieChart,
  getStatistics,
} from "@/api";

export default {
  components: {
    DatePicker,
    TopSkin,
  },
  data() {
    return {
      queryList: {},
      statistics: {},
      period: [],
      account: "",
      pickDate: {},
      Echart: null,
      YieldEchart: null,
      PieChart: null,
      plChartData: [],
      chartData: [],
      pieChartData: [],
      myAccounts: [],
    };
  },
  computed: {
    lists() {
      return [
        { label: this.$t("analysis.key1"), key: "begin_equity" },
        { label: this.$t("analysis.key2"), key: "end_equity" },
        { label: this.$t("analysis.key3"), key: "high_equity" },
        { label: this.$t("analysis.key4"), key: "low_equity" },
        { label: this.$t("analysis.key5"), key: "max_dd" },
        { label: this.$t("analysis.key6"), key: "max_dd_period" },
        { label: this.$t("analysis.key7"), key: "avg_profit_per_order" },
        { label: this.$t("analysis.key8"), key: "avg_loss_per_order" },
        { label: this.$t("analysis.key9"), key: "max_profit" },
        { label: this.$t("analysis.key10"), key: "max_loss" },
        { label: this.$t("analysis.key11"), key: "trade_lots" },
        { label: this.$t("analysis.key12"), key: "profit_order_avg_holding_time" },
        { label: this.$t("analysis.key13"), key: "loss_order_avg_holding_time" },
        { label: this.$t("analysis.key14"), key: "avg_profit_loss_per_lot" },
        { label: this.$t("analysis.key15"), key: "profit_order_ratio" },
        { label: this.$t("analysis.key16"), key: "roi" },
        { label: this.$t("analysis.key17"), key: "max_lots_of_order" },
        { label: this.$t("analysis.key18"), key: "average_lots_per_order" },
      ];
    },
  },
  watch: {
    "$i18n.locale": function () {
      this.getList();
    },
  },
  mounted() {
    this.getAccounts();
  },
  methods: {
    getAccounts() {
      getAccountsList().then((res) => {
        this.myAccounts = res.results;
        if (res.results.length) {
          this.account = res.results[0].id;
          this.getList();
        }
        // this.account = res.results.length ? res.results[0].id : "";
      });
    },
    getFilterList() {
      debounce(this.getList, 2000);
    },
    getList() {
      var obj = {
        account: this.account,
        start_day: this.period[0],
        end_day: this.period[1],
      };
      getCurveChart(obj).then((res) => {
        this.plChartData = res.results;
        this.$nextTick(() => {
          this.Echart = () => import("./components/CurveChart");
        });
      });
      getYieldChart(obj).then((res) => {
        this.chartData = res.results;
        this.$nextTick(() => {
          this.YieldEchart = () => import("./components/YieldChart");
        });
      });
      getPieChart({ account: this.account }).then((res) => {
        this.pieChartData = res.results.summary;
        this.$nextTick(() => {
          this.PieChart = () => import("./components/PieChart");
        });
      });
      getStatistics(obj).then((res) => {
        this.statistics = res.results;
      });
    },
    onSelectChange(value) {
      console.log(value);
    },
  },
};
</script>
<style lang="scss" src="./analysis.scss" scoped>
</style>