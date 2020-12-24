<template>
  <div id="signalpool">
    <!-- <TopSkin :title="$t('menu.signalpool')" /> -->
    <div class="top-title">{{$t('menu.signalpool')}}</div>
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="onSwitchTab">
        <el-tab-pane name="preferred" :label="$t('signalpool.preferred')">
          <el-row class="first-row">
            <el-col :span="3">
              <div class="box">
                <div class="category">
                  <div class="title">
                    <div class="icon0"></div>
                    <div class="text">{{ $t("signalpool.risk") }}</div>
                  </div>
                  <div
                    class="term"
                    v-for="item in filters[0].items"
                    :key="item.value"
                  >
                    <input
                      type="radio"
                      :id="item.value"
                      :value="item.value"
                      v-model="filter.risk_level"
                      @change="getFilter('risk_level')"
                    />
                    <label :for="item.value">{{ item.label }}</label>
                  </div>
                </div>
                <!--  -->

                <div class="category">
                  <div class="title">
                    <div class="icon1"></div>
                    <div class="text">{{ $t("signalpool.division") }}</div>
                  </div>
                  <el-checkbox
                    class="term-all"
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    >{{ $t("signalpool.all") }}</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="filter.product"
                    @change="getProductFilter"
                  >
                    <el-checkbox
                      class="term"
                      v-for="item in filters[1].items"
                      :key="item.value"
                      :label="item.value"
                    >
                      <span>{{ item.label }}</span>
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="category">
                  <div class="title">
                    <div class="icon2"></div>
                    <div class="text">{{ $t("signalpool.volume") }}</div>
                  </div>
                  <div
                    class="term"
                    v-for="item in filters[2].items"
                    :key="item.value"
                  >
                    <input
                      type="radio"
                      :id="item.value"
                      :value="item.value"
                      v-model="filter.total_volume"
                      @change="getFilter('total_volume')"
                    />
                    <label :for="item.value">{{ item.label }}</label>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="middle-box">
                <div class="axis">
                  <span>{{ $t("signalpool.yaxis") }}</span>
                  <el-select
                    popper-class="account-select"
                    size="mini"
                    v-model="axis.yaxis"
                    :placeholder="$t('signalpool.retracement_rate')"
                    @change="onSelectChange"
                  >
                    <el-option
                      v-for="item in allAxis"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <span>{{ $t("signalpool.xaxis") }}</span>
                  <el-select
                    popper-class="account-select"
                    size="mini"
                    v-model="axis.xaxis"
                    :placeholder="$t('master.rate')"
                    @change="onSelectChange"
                  >
                    <el-option
                      v-for="item in allAxis"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <div class="echart">
                  <component
                    :is="Echart"
                    v-if="activeName === 'preferred'"
                    :data="chartData"
                    :axis="axis"
                  ></component>
                  <!-- <ScatterEchart /> -->
                </div>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="right">
                <div class="subscription">
                  {{ $t("signalpool.subscription_status") }}
                </div>
                <Pagination
                  :total="subCount"
                  :page.sync="subPage"
                  :layout="layout"
                  @pagination="getSubs"
                />
                <!-- <el-scrollbar style="height: 70vh"> -->
                  <div class="scrollbar" style="height: 70vh">
                    <div class="scroll">
                      <div
                        class="information"
                        v-for="(e, i) in subs"
                        :key="e.time + i"
                      >
                        <div class="date">{{ e.time }}</div>
                        <div class="info">
                          <span class="follower">{{ e.msg }} </span>
                          <span class="master">{{ e.server_name }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                <!-- </el-scrollbar> -->
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane name="featured" :label="$t('signalpool.featured')">
          <el-row>
            <div class="featured">
              <!-- <el-scrollbar style="height: 78.7vh"> -->
              <base-table
                :data="tableData"
                :col-configs="conConfigs"
                :isLoad="isLoad1"
              >
                <template #index>
                  <el-table-column type="index" width="40"></el-table-column>
                </template>
                <template #trader="{ colConfig }">
                  <el-table-column v-bind="colConfig">
                    <template #default="{ row }">
                      <div class="msg">
                        <div class="avatar" @click="toMasterPage(row.user.id)">
                          <img :src="row.user.avatar" />
                        </div>
                        <div class="flag">
                          <div class="flag_up">
                            <svg-icon iconClass="flag"></svg-icon>
                            <el-tooltip
                              class="item"
                              effect="dark"
                              :content="row.user.nick_name"
                              placement="right"
                            >
                              <div class="nickname">{{ row.user.nick_name }}</div>
                            </el-tooltip>
                            <!-- <div class="nickname">{{ row.user.nick_name }}</div> -->
                          </div>
                          <div class="flag_down">
                            <svg-icon iconClass="hot"></svg-icon>
                            <span>{{ row.user.hot }}</span>
                          </div>
                        </div>
                      </div>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="row.user.user_labels"
                        placement="top"
                      >
                        <div class="label">{{ row.user.user_labels }}</div>
                      </el-tooltip>
                      <!-- <div class="label">{{row.user.user_labels}}</div> -->
                    </template>
                  </el-table-column>
                </template>
                <template #acct="{ colConfig }">
                  <el-table-column v-bind="colConfig">
                    <template #default="{ row }">
                      <span>{{ row.acct.platform_server }}</span>
                    </template>
                  </el-table-column>
                </template>
                <template #period="{ colConfig }">
                  <el-table-column v-bind="colConfig">
                    <template #default="{ row }">
                      <span>{{ row.acct.period }}</span>
                      <!-- {{ $t("signalpool.day") }} -->
                    </template>
                  </el-table-column>
                </template>
                <template #fee="{ colConfig }">
                  <el-table-column v-bind="colConfig">
                    <template #default="{ row }">
                      <span>{{ row.acct.subscribe_fee }}</span>
                    </template>
                  </el-table-column>
                </template>
                <template #echarts="{ colConfig }">
                  <el-table-column v-bind="colConfig">
                    <template #default="{ row }">
                      <component
                        :is="PlEchart"
                        v-if="activeName === 'featured'"
                        :data="row.acct.close_profit_chart"
                      ></component>
                    </template>
                  </el-table-column>
                </template>
                <template #operating="{ colConfig }">
                  <el-table-column v-bind="colConfig">
                    <template #default="{ row }">
                      <div class="operation">
                        <div class="collect">
                          <svg-icon
                            v-if="!row.user.is_favor_user"
                            @click.native="toCollect(row.user.id)"
                            iconClass="star0"
                          ></svg-icon>
                          <svg-icon
                            v-else
                            iconClass="star"
                            ></svg-icon
                          >
                          <span v-if="!row.user.is_favor_user" @click="toCollect(row.user.id)">{{ $t("master.collect") }}</span>
                          <span v-else>{{$t("master.collection")}}</span>
                        </div>
                        <div @click="toFollow(row.user.id)" class="follow">
                          {{ $t("master.follow") }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                </template>
              </base-table>
              <Pagination
                :total="count1"
                :page.sync="selectQuery.page"
                @pagination="getSelectList"
              />
              <!-- </el-scrollbar> -->
            </div>
          </el-row>
        </el-tab-pane>
        <el-tab-pane name="signallist" :label="$t('signalpool.signallist')">
          <el-row>
            <div class="filter">
              <div v-show="filterVisible === true" class="contents">
                <!-- 风险 -->
                <div class="risk">
                  <el-radio-group
                    v-for="e in radioRisks"
                    :key="e.id"
                    v-model="listQuery[e.model]"
                    @change="onRiskFilter"
                  >
                    <el-radio
                      v-for="i in e.options"
                      :key="i.label"
                      :label="i.label"
                      >{{ i.value }}</el-radio
                    >
                  </el-radio-group>
                </div>
                <div class="options">
                  <!-- 收益率 -->
                  <div class="return-rate">
                    <div
                      class="rate-item"
                      v-for="item in radioRates"
                      :key="item.name"
                    >
                      <span>{{ item.name }}</span>
                      <el-radio
                        v-for="e in item.options"
                        :key="e.label"
                        v-model="listQuery.rate"
                        :label="e.label"
                        @change="onRateFilter"
                        >{{ e.value }}</el-radio
                      >
                    </div>
                  </div>
                  <!-- other -->
                  <div class="condition" v-for="i in radioKeys" :key="i.model">
                    <span>{{ i.name }}</span>
                    <el-radio-group
                      v-model="listQuery[i.model]"
                      @change="onFilter"
                    >
                      <el-radio
                        v-for="e in i.options"
                        :key="e.label"
                        :label="e.label"
                        >{{ e.value }}</el-radio
                      >
                    </el-radio-group>
                  </div>
                </div>
              </div>
              <div v-show="filterVisible === true" class="fold">
                <span class="btn" @click="filterVisible = false">
                  <img src="@/assets/images/fold.png" class="icon" />
                  <span>{{ $t("signalpool.collapse") }}</span>
                </span>
              </div>
              <div v-show="filterVisible === false" class="fold">
                <span class="btn" @click="filterVisible = true">
                  <img src="@/assets/images/unfold.png" class="icon" />
                  <span>{{ $t("signalpool.expand") }}</span>
                </span>
              </div>
              <div v-show="breadCrumbs.length > 0" class="bread-crumbs">
                <div class="text">{{ $t("signalpool.select") }}</div>
                <div class="chosen" v-for="v in breadCrumbs" :key="v.name">
                  <span class="key">{{ v.name }}</span>
                  <span>{{ v.value }}</span>
                  <i @click="onDeleteFilter(v.label)" class="el-icon-close"></i>
                </div>
                <div @click="clearFilter" class="clear">
                  {{ $t("signalpool.clearall") }}
                </div>
              </div>
            </div>
            <div class="featured">
              <!-- <el-scrollbar style="height: 78.3vh; min-height: 41vh;"> -->
              <base-table
                :data="tableData2"
                :col-configs="conConfigs"
                :isLoad="isLoad2"
              >
                <template #index>
                  <el-table-column type="index" width="40"></el-table-column>
                </template>
                <template #trader="{ colConfig }">
                  <el-table-column v-bind="colConfig">
                    <template #default="{ row }">
                      <div class="msg">
                        <div class="avatar" @click="toMasterPage(row.user.id)">
                          <img :src="row.user.avatar" />
                        </div>
                        <div class="flag">
                          <div class="flag_up">
                            <svg-icon iconClass="flag"></svg-icon>
                            <el-tooltip
                              class="item"
                              effect="dark"
                              :content="row.user.nick_name"
                              placement="right"
                            >
                              <div class="nickname">{{ row.user.nick_name }}</div>
                            </el-tooltip>
                            <!-- <span>{{ row.user.nick_name }}</span> -->
                          </div>
                          <div class="flag_down">
                            <svg-icon iconClass="hot"></svg-icon>
                            <span>{{ row.user.hot }}</span>
                          </div>
                        </div>
                      </div>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="row.user.user_labels"
                        placement="top"
                      >
                        <div class="label">{{ row.user.user_labels }}</div>
                      </el-tooltip>
                      <!-- <div class="label">{{row.user.user_labels}}</div> -->
                    </template>
                  </el-table-column>
                </template>
                <template #acct="{ colConfig }">
                  <el-table-column v-bind="colConfig">
                    <template #default="{ row }">
                      <span>{{ row.acct.platform_server }}</span>
                    </template>
                  </el-table-column>
                </template>
                <template #period="{ colConfig }">
                  <el-table-column v-bind="colConfig" align="center">
                    <template #default="{ row }">
                      <span>{{ row.acct.period }}</span>
                    </template>
                  </el-table-column>
                </template>
                <template #fee="{ colConfig }">
                  <el-table-column v-bind="colConfig">
                    <template #default="{ row }">
                      <span>{{ row.acct.subscribe_fee }}</span>
                    </template>
                  </el-table-column>
                </template>
                <template #echarts="{ colConfig }">
                  <el-table-column v-bind="colConfig">
                    <template #default="{ row }">
                      <component
                        :is="PlEchart"
                        v-if="activeName === 'signallist'"
                        :data="row.acct.close_profit_chart"
                      ></component>
                    </template>
                  </el-table-column>
                </template>
                <template #operating="{ colConfig }">
                  <el-table-column v-bind="colConfig">
                    <template #default="{ row }">
                      <div class="operation">
                        <div class="collect">
                          <svg-icon
                            v-if="!row.user.is_favor_user"
                            @click.native="toCollect(row.user.id)"
                            iconClass="star0"
                          ></svg-icon>
                          <svg-icon
                            v-else
                            iconClass="star"
                            ></svg-icon
                          >
                          <span v-if="!row.user.is_favor_user" @click="toCollect(row.user.id)">{{ $t("master.collect") }}</span>
                          <span v-else>{{$t("master.collection")}}</span>
                        </div>
                        <div @click="toFollow(row.user.id)" class="follow">
                          {{ $t("master.follow") }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                </template>
              </base-table>
              <Pagination
                :total="count2"
                :page.sync="query.page"
                @pagination="getAllList"
              />
              <!-- </el-scrollbar> -->
            </div>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <!-- 跟单弹窗 -->
      <Dialog
        :visible.sync="dialogVisible"
        :data="followInfo"
        @submit="onFollow"
      />
    </div>
  </div>
</template>
<script>
import Classify from "./components/ClassifyBar";
import BaseTable from "@/components/BaseTable";
import Pagination from "@/components/Pagination";
import TopSkin from "@/components/TopSkin";
import Dialog from "./components/DialogBox";
import { dataFormat } from '@/utils'
import {
  getSelectList,
  getHotSignals,
  getAllLists,
  getSubscribe,
  addCollected,
  getUserAccounts,
  onfollowUp,
  delCollected,
} from "@/api";

export default {
  components: { Classify, BaseTable, Pagination, TopSkin, Dialog },
  data() {
    return {
      layout: "total, prev, next",
      pagers: 3,
      subCount: 0,
      subPage: 1,
      subs: [],
      dialogVisible: false,
      followInfo: {},
      isLoad1: true,
      isLoad2: true,
      count1: 0,
      count2: 0,
      chartData: [],
      tableData: [],
      tableData2: [],
      filter: {
        risk_level: "",
        product: [],
        total_volume: "",
      },
      checkAll: false,
      isIndeterminate: true,
      newFilter: {},
      axis: {
        xaxis: "rate2",
        yaxis: "rate4",
      },
      selectQuery: {},
      listQuery: {},
      query: {},
      filterVisible: false,
      activeName: "preferred",
      Echart: null,
      PlEchart: null,
      breadCrumbs: [],
    };
  },
  watch: {
    "$i18n.locale": function () {
      this.$nextTick(() => {
        this.Echart = () => import("./components/ScatterEchart");
      });
    },
    listQuery: {
      handler(value) {
        var array = [...this.radioRisks, ...this.radioRates, ...this.radioKeys]; //所有选项
        var crumbs = [];
        var values = Object.values(value); //已选项值
        array.forEach((e) => {
          e.options.forEach((i) => {
            values.forEach((v) => {
              if (v === i.label) {
                crumbs.push({
                  // 将已选项添加到数组
                  name: e.name,
                  value: i.value,
                  label: i.label,
                });
              }
            });
          });
        });
        this.breadCrumbs = crumbs;
      },
      deep: true,
    },
  },
  computed: {
    allAxis() {
      return [
        // { label: this.$t("signalpool.income_rate"), value: "rate1" }, //收益率
        {
          label: this.$t("signalpool.retracement_rate"),
          value: "rate2",
        }, //回撤率
        { label: this.$t("master.rate"), value: "rate3" }, //投资回报率
        { label: this.$t("master.key10"), value: "rate4" }, //均值回报率
      ];
    },
    filters() {
      return [
        {
          title: this.$t("signalpool.risk"),
          model: "risk_level",
          items: [
            { label: this.$t("signalpool.all"), value: "all1" },
            { label: this.$t("signalpool.high_risk"), value: "2|3" },
            { label: this.$t("signalpool.low_risk"), value: "1" },
          ],
        },
        {
          title: this.$t("signalpool.division"),
          model: "product",
          items: [
            // { label: this.$t("signalpool.all"), value: "all2" },
            {
              label: this.$t("signalpool.exchange"),
              value: "foreign_exchange",
            },
            { label: this.$t("signalpool.metals"), value: "precious_metal" },
            { label: this.$t("signalpool.index"), value: "index_fund" },
            {
              label: this.$t("signalpool.cryptocurrency"),
              value: "virtual_currency",
            },
            { label: this.$t("signalpool.stock"), value: "us_stocks" },
            { label: this.$t("signalpool.energy"), value: "energy_product" },
          ],
        },
        {
          title: this.$t("signalpool.volume"),
          model: "total_volume",
          items: [
            { label: this.$t("signalpool.all"), value: "all3" },
            { label: this.$t("signalpool.lots"), value: "500+手" },
            { label: "300 - 500", value: "300-500" },
            { label: "100 - 300", value: "100-300" },
            { label: "< 100", value: "<100" },
          ],
        },
      ];
    },
    filters2() {
      return {
        title: this.$t("signalpool.feature1"),
        items: [
          { label: this.$t("signalpool.feature2"), value: "feature2" },
          { label: this.$t("signalpool.feature3"), value: "feature3" },
          { label: this.$t("signalpool.feature4"), value: "feature4" },
        ],
      };
    },
    conConfigs() {
      return [
        { slot: "index" },
        {
          prop: "user",
          label: this.$t("signalpool.key1"),
          slot: "trader",
          // width: 190,
          "min-width": "13%",
        },
        {
          prop: "platform_server",
          label: this.$t("signalpool.key2"),
          slot: "acct",
          // width: 110,
          "min-width": "12%",
        },
        {
          prop: "last_3_months_profit",
          label: this.$t("signalpool.key5"),
          "min-width": "8%",
          align: 'right',
          formatter(row, column, cellValue) {
            if (cellValue) return dataFormat(cellValue)
            // var value = parseFloat(cellValue);
            // if (cellValue) return value.toLocaleString();
          },
        },
        {
          prop: "traditional_calculate_roi",
          label: this.$t("signalpool.key3"),
          sortable: true,
          // width: 105,
          "min-width": "9%",
        },
        {
          prop: "ratio_pl_initial_equity",
          label: this.$t("signalpool.key4"),
          "min-width": "7%",
        },
        {
          prop: "max_draw_down",
          label: this.$t("signalpool.key6"),
          sortable: true,
          // width: 95,
          "min-width": "8%",
        },
        {
          prop: "equity",
          label: this.$t("signalpool.key7"),
          sortable: true,
          // formatter(row, column, cellValue) {
          //   if (cellValue) return "$" + dataFormat(cellValue)
          // },
          align: 'right',
          "min-width": "8%",
        },
        {
          prop: "period",
          label: this.$t("signalpool.key8"),
          slot: "period",
          // width: 120,
          "min-width": "8%",
          align: 'center',
        },
        {
          prop: "last_month_trade_lots",
          label: this.$t("signalpool.key9"),
          // width: 110,
          "min-width": "7%",
          align: 'center',
        },
        {
          prop: "subscription_fee",
          label: this.$t("signalpool.key10"),
          slot: "fee",
          // width: 120,
          "min-width": "6%",
          align: 'right',
        },
        {
          prop: "profit_echart",
          label: this.$t("signalpool.key11"),
          slot: "echarts",
          // width: 150,
          "min-width": "13%",
        },
        {
          prop: "operating",
          label: this.$t("signalpool.key12"),
          slot: "operating",
          // width: 115,
          "min-width": "12%",
        },
      ];
    },
    radioRisks() {
      return [
        {
          id: "risk",
          name: "",
          model: "risk_level",
          options: [
            { label: "1", value: this.$t("signalpool.lower_risk") },
            {
              label: "2",
              value: this.$t("signalpool.average_risk"),
            },
            { label: "3", value: this.$t("signalpool.higher_risk") },
          ],
        },
      ];
    },
    radioRates() {
      return [
        {
          name: this.$t("signalpool.monthly"),
          model: "last_month_roi",
          options: [
            { label: "roi1", value: "1 - 10" },
            { label: "roi2", value: "10 - 30" },
            { label: "roi3", value: "30 - 100" },
            { label: "roi44", value: "100+" },
          ],
        },
        {
          name: this.$t("signalpool.quarterly"),
          model: "last_3_month_roi",
          options: [
            { label: "roi4", value: "10 - 30" },
            { label: "roi5", value: "30 - 100" },
            { label: "roi6", value: "100+" },
          ],
        },
        {
          name: this.$t("signalpool.total"),
          model: "roi",
          options: [
            { label: "roi7", value: "1 - 100" },
            { label: "roi8", value: "100 - 500" },
            { label: "roi9", value: "500+" },
          ],
        },
      ];
    },
    radioKeys() {
      return [
        {
          name: this.$t("signalpool.krr"),
          model: "krr",
          options: [
            { label: "krr1", value: "10 - 20" },
            { label: "krr2", value: "20 - 30" },
            { label: "krr3", value: "30 - 50" },
          ],
        },
        {
          name: this.$t("signalpool.retracement"),
          model: "max_draw_down",
          options: [
            { label: "maxdd1", value: "< 0" },
            { label: "maxdd2", value: "0 - 20" },
            { label: "maxdd3", value: "20 - 50" },
            { label: "maxdd4", value: "50 - 100" },
          ],
        },
        {
          name: this.$t("signalpool.net_worth"),
          model: "equity",
          options: [
            { label: "equity1", value: "0 - 500" },
            { label: "equity2", value: "500 - 5000" },
            { label: "equity3", value: "5000 - 50000" },
            { label: "equity4", value: "50000+" },
          ],
        },
        {
          name: this.$t("signalpool.leverage"),
          model: "leverage",
          options: [
            { label: "leverage1", value: "0 - 100" },
            { label: "leverage2", value: "100 - 400" },
            { label: "leverage3", value: "400+" },
          ],
        },
      ];
    },
  },
  mounted() {
    // this.getChartData();
    // this.getSelectList();
    // this.getAllList();
    this.getSubs();
    this.initialPage();
  },
  methods: {
    initialPage() {
      this.activeName = this.$route.query.tab || "preferred";
      switch (this.activeName) {
        case "preferred":
          this.getChartData();
          break;
        case "featured":
          this.getSelectList();
          break;
        case "signallist":
          this.getAllList();
          break;
      }
    },
    getSubs() {
      getSubscribe({ page: this.subPage }).then((res) => {
        this.subs = res.results;
        this.subCount = res.count;
      });
    },
    getChartData(data) {
      //热点信号
      getHotSignals(data).then((res) => {
        this.chartData = res.results;
        this.$nextTick(() => {
          this.Echart = () => import("./components/ScatterEchart");
        });
      });
    },
    getSelectList() {
      //klipc精选
      getSelectList(this.selectQuery).then((res) => {
        this.tableData = res.results;
        this.count1 = res.count;
        this.isLoad1 = false;
        this.$nextTick(() => {
          this.PlEchart = () => import("./components/PlEchart");
        });
      });
    },
    getAllList(data) {
      //信号列表
      getAllLists(data).then((res) => {
        this.tableData2 = res.results;
        this.count2 = res.count;
        this.isLoad2 = false;
        this.$nextTick(() => {
          this.PlEchart = () => import("./components/PlEchart");
        });
      });
    },
    getFilter(model) {
      if (this.filter[model].indexOf("all") >= 0) {
        this.newFilter[model] = null;
      } else {
        this.newFilter[model] = this.filter[model];
      }
      this.getChartData(this.newFilter);
    },

    handleCheckAllChange(val) {
      console.log(`checkAll=`, this.checkAll)
      var products = [
        "foreign_exchange",
        "index_fund",
        "precious_metal",
        "energy_product",
        "us_stocks",
        "virtual_currency",
      ];
      // this.filter.product = val ? products : [];
      this.filter.product = [];
      this.isIndeterminate = false;
      this.newFilter.product = '';
      this.getChartData(this.newFilter);
    },
    getProductFilter() {
      // this.isIndeterminate = true;
      this.checkAll = false;
      // console.log(this.filter.product);
      this.newFilter.product = `'${this.filter.product}'`;
      this.getChartData(this.newFilter);
    },
    onRiskFilter(val) {
      this.query.risk_level = val;
      this.getAllList(this.query);
    },
    fn1(key1, key2) {
      this.query[key1] = null;
      this.query[key2] = null;
    },
    onRateFilter(val) {
      var obj = this.query;
      switch (val) {
        case "roi1":
          obj.last_month_roi = "1-10";
          this.fn1("last_3_month_roi", "roi");
          break;
        case "roi2":
          obj.last_month_roi = "10-30";
          this.fn1("last_3_month_roi", "roi");
          break;
        case "roi3":
          obj.last_month_roi = "30-100";
          this.fn1("last_3_month_roi", "roi");
          break;
        case "roi44":
          obj.last_month_roi = "100+";
          this.fn1("last_3_month_roi", "roi");
          break;
        case "roi4":
          obj.last_3_month_roi = "10-30";
          this.fn1("last_month_roi", "roi");
          break;
        case "roi5":
          obj.last_3_month_roi = "30-100";
          this.fn1("last_month_roi", "roi");
          break;
        case "roi6":
          obj.last_3_month_roi = "100+";
          this.fn1("last_month_roi", "roi");
          break;
        case "roi7":
          obj.roi = "1-100";
          this.fn1("last_month_roi", "last_3_month_roi");
          break;
        case "roi8":
          obj.roi = "100-500";
          this.fn1("last_month_roi", "last_3_month_roi");
          break;
        case "roi9":
          obj.roi = "500+";
          this.fn1("last_month_roi", "last_3_month_roi");
          break;
      }
      this.getAllList(this.query);
    },
    onFilter(val) {
      // console.log(val);
      var obj = this.query;
      switch (val) {
        case "krr1":
          obj.krr = "10-20";
          break;
        case "krr2":
          obj.krr = "20-30";
          break;
        case "krr3":
          obj.krr = "30-50";
          break;
        case "maxdd1":
          obj.max_draw_down = "<0";
          break;
        case "maxdd2":
          obj.max_draw_down = "0-20";
          break;
        case "maxdd3":
          obj.max_draw_down = "20-50";
          break;
        case "maxdd4":
          obj.max_draw_down = "50-100";
          break;
        case "equity1":
          obj.equity = "0-500";
          break;
        case "equity2":
          obj.equity = "500-5000";
          break;
        case "equity3":
          obj.equity = "5000-50000";
          break;
        case "equity4":
          obj.equity = "50000+";
          break;
        case "leverage1":
          obj.leverage = "0-100";
          break;
        case "leverage2":
          obj.leverage = "100-400";
          break;
        case "leverage3":
          obj.leverage = "400+";
          break;
      }
      // console.log(this.query);
      // console.log(this.breadCrumbs);
      this.getAllList(this.query);
    },
    onDeleteFilter(val) {
      // console.log(val);
      this.breadCrumbs.forEach((o, i) => {
        if (o.label === val) {
          this.breadCrumbs.splice(i, 1);
        }
      });
      var obj = this.listQuery;
      for (var key in obj) {
        if (obj[key] === val) {
          obj[key] = null;
          if (key === "rate") {
            this.query["last_month_roi"] = null;
            this.query["last_3_month_roi"] = null;
            this.query["roi"] = null;
          } else {
            this.query[key] = null;
          }
        }
      }
      // console.log(`query=`, this.query);
      this.getAllList(this.query);
    },
    clearFilter() {
      this.breadCrumbs = [];
      this.listQuery = {};
      this.getAllList({});
    },
    onSwitchTab(tab) {
      // console.log(tab.name);
      this.$router.push({
        path: `/signalpool`,
        query: {
          tab: this.activeName,
        },
      });
      switch (tab.name) {
        case "preferred":
          this.getChartData();
          break;
        case "featured":
          this.getSelectList();
          break;
        case "signallist":
          this.getAllList();
          break;
      }
    },
    onSelectChange(value) {
      // console.log(value);
      console.log(this.axis);
      this.$nextTick(() => {
        this.Echart = () => import("./components/ScatterEchart");
      });
    },
    toMasterPage(id) {
      // console.log(this.$i18n.locale)
      this.$router.push({
        path: `/signalpool/master/${id}`,
      });
    },
    toFollow(id) {
      this.dialogVisible = true;
      getUserAccounts(id).then((res) => {
        this.followInfo = res.results;
      });
    },
    onFollow(data) {
      // console.log(data);
      onfollowUp(data).then((res) => {
        if (res.status === 0) {
          this.dialogVisible = false;
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
        // switch (res.status) {
        //   case 0:
        //     this.dialogVisible = false;
        //     this.$message.success("跟单成功");
        //     break;
        //   case 10012:
        //     this.$message.error(res.msg);
        //     break;
        // }
      });
    },
    toCollect(id) {
      addCollected({ fav_user_id: id }).then((res) => {
        this.getSelectList();
        this.getAllList();
      });
    },
    cancelCollect(id) {
      // delCollected({favor_user_id: id}).then(res=>{
      //   this.getSelectList();
      //   this.getAllList();
      // })
    },
  },
};
</script>
<style lang="scss" src="./signalpool.scss" scoped>
</style>