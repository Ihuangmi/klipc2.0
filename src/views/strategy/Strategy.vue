<template>
  <div class="strategy">
    <div class="topTitle">
      <div class="top-title">{{ $t("strategy.strategy") }}</div>
    </div>
    <!-- <TopSkin :title="$t('strategy.strategy')" /> -->
    <div class="chart">
      <el-row>
        <el-col :span="17">
          <div class="cardTitle tabs">
            <el-tabs v-model="radio" @tab-click="onSwitchTab">
              <el-tab-pane
                v-for="item in acclist"
                :key="item.id"
                :name="item.id"
                :label="item.account_nick_name"
              ></el-tab-pane>
              <!-- <el-tab-pane v-for="v in 30" :key="v" :name="'strategy_two'+v" :label="$t('master.strategy_two')"></el-tab-pane> -->
            </el-tabs>
            <!-- <el-scrollbar :vartical='true' style="width:100%;height:100%">
              <el-radio-group v-model="radio">
                <el-radio
                  v-for="(item, index) in acclist"
                  :key="index"
                  :label="index"
                  @change="handleCommand(item.id)"
                  >{{ item.account_nick_name }}</el-radio
                >
              </el-radio-group>
            </el-scrollbar> -->
          </div>
          <div style="height: 245px" v-if="flag1">
            <Category
              style="height: 215px"
              :chartData="product"
              :timeArr="list"
            />
          </div>
          <div class="blank" v-if="!flag1">暂无数据</div>
        </el-col>
        <el-col :span="7" class="PLtitle">
          <div class="cardTitle" style="padding-left: 10px">{{ plTitle }}</div>
          <div style="height: 245px">
            <div class="grid-content">
              <!-- <Pie :chartData="list" /> -->
              <div class="echart" v-if="flag">
                <component :is="PieEchart" :data="chartData"></component>
              </div>
              <div class="blank" v-if="!flag">暂无数据</div>
              <!-- <Pie :chartData="product" :list="list" /> -->
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- <div class="category" >
			</div>
      <div class="Pie">
        <Pie :chartData="product" :list="list" />
      </div>-->
    </div>
    <div v class="topCard">
      <div class="subTitle">
        <div class="info">{{ cardTitle[0] }}</div>
        <div class="info">
          <div
            :class="
              cardData.total_profit >= 0 ? 'titleItem red' : 'titleItem green'
            "
            style="font-size: 20px"
          >
            {{ cardData.total_profit }}
            <img
              style="width: 14px"
              :src="
                cardData.total_profit >= 0
                  ? require('../../assets/images/up-arrow.png')
                  : require('../../assets/images/down-arrow.png')
              "
            />
          </div>
        </div>
      </div>
      <div class="subTitle">
        <div class="info">{{ cardTitle[1] }}</div>
        <div class="info">
          <div
            :class="
              cardData.last_3_month_roi >= 0
                ? 'titleItem red'
                : 'titleItem green'
            "
            style="font-size: 20px"
          >
            {{ cardData.last_3_month_roi }}
            <img
              style="width: 14px"
              :src="
                cardData.last_3_month_roi >= 0
                  ? require('../../assets/images/up-arrow.png')
                  : require('../../assets/images/down-arrow.png')
              "
            />
          </div>
        </div>
      </div>
      <div class="subTitle">
        <div class="info">{{ cardTitle[2] }}</div>
        <div class="info">
          <div
            :class="
              cardData.last_month_roi >= 0 ? 'titleItem red' : 'titleItem green'
            "
            style="font-size: 20px"
          >
            {{ cardData.last_month_roi }}
            <img
              style="width: 14px"
              :src="
                cardData.last_month_roi >= 0
                  ? require('../../assets/images/up-arrow.png')
                  : require('../../assets/images/down-arrow.png')
              "
            />
          </div>
        </div>
      </div>
      <div class="subTitle">
        <div class="info">{{ cardTitle[3] }}</div>
        <div class="info">
          <div
            :class="
              cardData.yesterday_profit >= 0
                ? 'titleItem red'
                : 'titleItem green'
            "
            style="font-size: 20px"
          >
            {{ cardData.yesterday_profit }}
            <img
              style="width: 14px"
              :src="
                cardData.yesterday_profit >= 0
                  ? require('../../assets/images/up-arrow.png')
                  : require('../../assets/images/down-arrow.png')
              "
            />
          </div>
        </div>
      </div>
      <div class="subTitle">
        <div class="info">{{ cardTitle[4] }}</div>
        <div class="info">
          <div
            :class="
              cardData.order_profit >= 0 ? 'titleItem red' : 'titleItem green'
            "
            style="font-size: 20px"
          >
            {{ cardData.order_profit }}
            <img
              style="width: 14px"
              :src="
                cardData.order_profit >= 0
                  ? require('../../assets/images/up-arrow.png')
                  : require('../../assets/images/down-arrow.png')
              "
            />
          </div>
        </div>
      </div>
      <div class="subTitle">
        <div class="info">{{ cardTitle[5] }}</div>
        <div class="info">
          <div
            :class="
              cardData.total_volume >= 0 ? 'titleItem red' : 'titleItem green'
            "
            style="font-size: 20px"
          >
            {{ cardData.total_volume }}
            <img
              style="width: 14px"
              :src="
                cardData.total_volume >= 0
                  ? require('../../assets/images/up-arrow.png')
                  : require('../../assets/images/down-arrow.png')
              "
            />
          </div>
        </div>
      </div>
    </div>
    <div class="tablelist">
      <div v-for="(value, index) in followlist" :key="index">
        <div class="subCard">
          <div>
            {{ value.account_nick_name }}
            <i
              @click="detail(value)"
              class="el-icon-warning-outline detail"
              style="font-size: 12px"
              >{{ $t("strategy.detail") }}</i
            >
          </div>
          <div class="imgbox" @click="setting(value)">
            <div style="margin-right:10px">
              {{$t('strategy.doc')}}
            </div>
            <img width="18" src="@/assets/images/setting.png" />
          </div>
        </div>
        <div class="card">
          <div class="grid-content" style="width: 100%">
            <el-table
              :data="followlist[index].follow_account"
              border
              :cell-style="cellStyle"
            >
              <el-table-column
                v-for="(item, i) in colConfigs"
                :key="i"
                :prop="item.prop"
                :label="item.label"
              ></el-table-column>
              <el-table-column :label="$t('master.cost')">
                <template slot-scope="scope">
                  <div>${{ scope.row.documentary_fee }}</div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('my_assets.key14')">
                <template slot-scope="scope">
                  <div
                    :class="scope.row.documentary_profit >= 0 ? 'red' : 'green'"
                  >
                    {{ scope.row.documentary_profit }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('housekeeper.renew')">
                <template slot-scope="scope">
                  <div
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                    style="
                      color: #ff7d00;
                      display: flex;
                      align-items: center;
                      cursor: pointer;
                    "
                  >
                    <div
                      style="width: 18px; display: flex; align-items: center"
                    >
                      <img src="@/assets/images/money.png" width="18" />
                    </div>
                    <span>{{ $t("strategy.clickrenew") }}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <!-- <div class="card">
        <div class="grid-content" style="width:100%">
          <el-table :data="followlist" border :cell-style="cellStyle">
            <el-table-column
              v-for="(item,i) in colConfigs"
              :key="i"
              :prop="item.prop"
              :label="item.label"
            ></el-table-column>
            <el-table-column :label="this.$t('strategy.renew')">
              <template slot-scope="scope">
                <div
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  style="color:#FF7D00;display: flex;align-items: center;cursor: pointer;"
                >
                  <div style="width:18px;display: flex;align-items: center;">
                    <img src="@/assets/images/money.png" width="18" />
                  </div>
                  <span>{{$t('strategy.clickrenew')}}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>-->
    </div>
    <!-- <Dialogs v-if="" /> -->
    <div class="setting">
      <el-dialog
        :title="this.$t('strategy.doc')"
        :visible.sync="show"
        top="8vh"
      >
        <div class="titleSub">{{ $t("strategy.doc1") }}</div>
        <div class="borderBox">
          <el-table
            ref="multipleTable"
            :data="tableData1"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column
              prop="master_hand_account.account_number"
              :label="this.$t('strategy.key7')"
            ></el-table-column>
            <el-table-column
              prop="documentary_type_display"
              :label="this.$t('housekeeper.source')"
            ></el-table-column>
            <el-table-column
              prop="documentary_size"
              :label="this.$t('signal_management.key4')"
            ></el-table-column>
            <el-table-column
              prop="expiration_time"
              :label="this.$t('report.key9')"
            ></el-table-column>
          </el-table>
        </div>
        <div class="titleSub">{{ $t("strategy.doc") }}</div>
        <el-form :model="form" class="form">
          <div style="display: flex">
            <div style="width: 50%" class="setcolor">
              <el-form-item :label="this.$t('master.enable')">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="$t('master.lowtradevolDesc')"
                  placement="top-end"
                >
                  <div>
                    <i
                      class="el-icon-warning-outline"
                      style="margin-right: 10px"
                    ></i>
                  </div>
                </el-tooltip>
                <el-input
                  v-model="form.min_value"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item :label="this.$t('master.enable2')">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="$t('master.enablemaxlotsDesc')"
                  placement="top-end"
                >
                  <div>
                    <i
                      class="el-icon-warning-outline"
                      style="margin-right: 10px"
                    ></i>
                  </div>
                </el-tooltip>
                <el-input
                  v-model="form.max_value"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item :label="this.$t('master.enable4')">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="$t('master.enableslippageDesc')"
                  placement="top-end"
                >
                  <div>
                    <i
                      class="el-icon-warning-outline"
                      style="margin-right: 10px"
                    ></i>
                  </div>
                </el-tooltip>
                <el-input
                  v-model="form.slippage_control"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item :label="this.$t('master.enable6')">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="$t('master.enalbestopoutDesc')"
                  placement="top-end"
                >
                  <div>
                    <i
                      class="el-icon-warning-outline"
                      style="margin-right: 10px"
                    ></i>
                  </div>
                </el-tooltip>
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item :label="this.$t('master.enable9')">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="$t('master.enablekey3')"
                  placement="top-end"
                >
                  <div>
                    <i
                      class="el-icon-warning-outline"
                      style="margin-right: 10px"
                    ></i>
                  </div>
                </el-tooltip>
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <!-- <el-form-item :label="this.$t('strategy.key2')" prop="delivery">
                  <el-switch v-model="form.delivery1"></el-switch>
              </el-form-item>-->
              <!-- <el-form-item :label="this.$t('strategy.key3')" prop="delivery">
                  <el-switch v-model="form.delivery2"></el-switch>
              </el-form-item>-->
              <el-form-item :label="this.$t('master.renew')" prop="delivery">
                <el-switch v-model="form.delivery4"></el-switch>
              </el-form-item>
            </div>
            <div style="width: 50%" class="setcolor">
              <el-form-item :label="this.$t('master.enable1')">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="$t('master.enabledelayprotectDesc')"
                  placement="top-end"
                >
                  <div>
                    <i
                      class="el-icon-warning-outline"
                      style="margin-right: 10px"
                    ></i>
                  </div>
                </el-tooltip>
                <el-input
                  v-model="form.delay_protection"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item :label="this.$t('master.enable3')">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="$t('master.enablestoplpDesc')"
                  placement="top-end"
                >
                  <div>
                    <i
                      class="el-icon-warning-outline"
                      style="margin-right: 10px"
                    ></i>
                  </div>
                </el-tooltip>
                <el-input
                  v-model="form.stop_loss_level"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item :label="this.$t('master.enable5')">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="$t('master.enablekey1')"
                  placement="top-end"
                >
                  <div>
                    <i
                      class="el-icon-warning-outline"
                      style="margin-right: 10px"
                    ></i>
                  </div>
                </el-tooltip>
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item :label="this.$t('master.enable7')">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="$t('master.enablekey2')"
                  placement="top-end"
                >
                  <div>
                    <i
                      class="el-icon-warning-outline"
                      style="margin-right: 10px"
                    ></i>
                  </div>
                </el-tooltip>
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item :label="this.$t('strategy.key1')" prop="delivery">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="$t('master.enablereversecopyDesc')"
                  placement="top-end"
                >
                  <div>
                    <i
                      class="el-icon-warning-outline"
                      style="margin-right: 10px"
                    ></i>
                  </div>
                </el-tooltip>
                <el-switch v-model="form.reverse_copying"></el-switch>
              </el-form-item>
            </div>
          </div>
          <div class="measure">
            <div class="type">
              <div class="documentary" v-for="v in types" :key="v.label">
                <el-radio v-model="form.documentary_type" :label="v.label">{{
                  v.name
                }}</el-radio>
                <div class="set_value" v-if="form.documentary_type === v.label">
                  <div style="margin-right: 8px">
                    {{ $t("master.set_value") }}
                  </div>
                  <el-input
                    v-model="form.size"
                    :placeholder="$t('global.placeholder2')"
                  ></el-input>
                </div>
              </div>
            </div>
            <div v-if="form.documentary_type === 2" class="note">
              *{{ $t("master.note1") }}
            </div>
            <div v-if="form.documentary_type === 1" class="note">
              *{{ $t("master.note2") }}
            </div>
            <div v-if="form.documentary_type === 3" class="note">
              *{{ $t("master.note3") }}
            </div>
          </div>
        </el-form>
        <div style="font-size: 12px">
          *
          {{ $t("strategy.key10") }}
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="show = false">{{
            $t("strategy.cancel")
          }}</el-button>
          <el-button type="primary" @click="getform">{{
            $t("strategy.sure")
          }}</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="renew">
      <el-dialog
        :title="$t('doc_management.card6')"
        :visible.sync="dialogFormVisible"
      >
        <el-form :model="form">
          <el-form-item
            >{{ renewList.master_hand_account_nick_name }}
            {{ $t("doc_management.card9") }}
            {{ renewList.expiration_time }}</el-form-item
          >
          <el-form-item :label="$t('housekeeper.wallet')">
            <span style="color: rgb(255, 125, 0); font-size: 14px"
              >${{ renewList.wallet_amount }}</span
            >
          </el-form-item>
          <el-form-item :label="$t('doc_management.card7')">
            <el-select
              v-model="form.data"
              popper-class="account-select"
              :placeholder="$t('global.placeholder1')"
            >
              <el-option
                v-for="item in monthlist"
                :key="item"
                :label="item + $t('doc_management.month')"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('doc_management.card8')">
            <span style="color: rgb(255, 125, 0); font-size: 14px"
              >${{ renewList.documentary_fee * form.data }}</span
            >
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{
            $t("global.cancel")
          }}</el-button>
          <el-button type="primary" @click="onLinkAccount(renewList.id)">{{
            $t("global.sure")
          }}</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="detail">
      <el-dialog :title="titleDetail" :visible.sync="show1">
        <div class="detailList">
          <div
            class="titlecolor"
            style="width: 100%; display: flex; font-size: 12px; margin: 5px 0"
          >
            <div style="min-width: 60px; font-weight: bold; margin-right: 10px">
              {{ $t("strategy.position") }}
            </div>
            <div style="min-width: 120px; margin-right: 10px">
              {{ $t("strategy.position_lots") }}
              <span style="font-weight: bold"
                >&emsp;{{ detailList.position_order_volume }}&emsp;</span
              >
              {{ $t("strategy.lot") }}
            </div>
            <div style="flex: 1">
              {{ $t("strategy.position_pl") }}
              <span style="font-weight: bold"
                >${{ detailList.position_order_profit }}</span
              >
            </div>
          </div>
          <el-table
            :data="tableData"
            row-key="ticket"
            border
            height="180"
            lazy
            :tree-props="{ children: 'follow_order' }"
          >
            <el-table-column
              min-width="8%"
              prop="account_name"
              :label="this.$t('report.key1')"
            ></el-table-column>
            <el-table-column
              min-width="16%"
              prop="broker"
              :label="this.$t('report.key2')"
            ></el-table-column>
            <el-table-column
              min-width="8%"
              prop="platform"
              :label="this.$t('report.type')"
            ></el-table-column>
            <el-table-column
              min-width="8%"
              prop="account_number"
              :label="this.$t('report.key3')"
            ></el-table-column>
            <el-table-column
              min-width="14%"
              prop="ticket"
              :label="this.$t('report.key4')"
            ></el-table-column>
            <el-table-column
              min-width="8%"
              prop="trade_type"
              :label="this.$t('report.key5')"
            ></el-table-column>
            <el-table-column
              min-width="8%"
              prop="symbol"
              :label="this.$t('report.key7')"
            ></el-table-column>
            <el-table-column
              min-width="12%"
              prop="open_time"
              :label="this.$t('report.key8')"
            ></el-table-column>
            <el-table-column
              min-width="12%"
              prop="open_price"
              :label="this.$t('report.key10')"
            ></el-table-column>
            <el-table-column
              min-width="12%"
              prop="swap"
              :label="this.$t('report.key14')"
            ></el-table-column>
            <el-table-column
              min-width="10%"
              prop="profit"
              :label="this.$t('report.key15')"
            ></el-table-column>
          </el-table>
          <div
            class="titlecolor"
            style="width: 100%; display: flex; font-size: 12px; margin: 5px 0"
          >
            <div style="min-width: 60px; font-weight: bold; margin-right: 10px">
              {{ $t("strategy.order") }}
            </div>
            <div style="min-width: 120px; margin-right: 10px">
              {{ $t("strategy.order_lots") }}
              <span style="font-weight: bold"
                >&emsp;{{ detailList.close_order_volume }}&emsp;</span
              >
              {{ $t("strategy.lot") }}
            </div>
            <div style="flex: 1">
              {{ $t("strategy.order_pl") }}
              <span style="font-weight: bold"
                >${{ detailList.close_order_profit }}</span
              >
            </div>
          </div>
          <el-table
            :data="tableData_c"
            row-key="ticket"
            border
            height="180"
            lazy
            :tree-props="{ children: 'follow_order' }"
          >
            <el-table-column
              min-width="8%"
              prop="account_nick_name"
              :label="this.$t('report.key1')"
            ></el-table-column>
            <el-table-column
              min-width="16%"
              prop="broker"
              :label="this.$t('report.key2')"
            ></el-table-column>
            <el-table-column
              min-width="8%"
              prop="platform"
              :label="this.$t('report.type')"
            ></el-table-column>
            <el-table-column
              min-width="8%"
              prop="account_number"
              :label="this.$t('report.key3')"
            ></el-table-column>
            <el-table-column
              min-width="14%"
              prop="ticket"
              :label="this.$t('report.key4')"
            ></el-table-column>
            <el-table-column
              min-width="8%"
              prop="trade_type"
              :label="this.$t('report.key5')"
            ></el-table-column>
            <el-table-column
              min-width="8%"
              prop="symbol"
              :label="this.$t('report.key7')"
            ></el-table-column>
            <el-table-column
              min-width="12%"
              prop="open_time"
              :label="this.$t('report.key8')"
            ></el-table-column>
            <el-table-column
              min-width="12%"
              prop="open_price"
              :label="this.$t('report.key10')"
            ></el-table-column>
            <el-table-column
              min-width="12%"
              prop="swap"
              :label="this.$t('report.key14')"
            ></el-table-column>
            <el-table-column
              min-width="10%"
              prop="profit"
              :label="this.$t('report.key15')"
            ></el-table-column>
          </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="show1 = false">{{
            $t("strategy.cancel")
          }}</el-button>
          <el-button type="primary" @click="show1 = false">{{
            $t("strategy.sure")
          }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Card from "@/components/card/Card";
import Category from "@/components/chartview/Category";
import Dialogs from "./components/dialog/Dialog";
import Deital from "./components/dialog/Deital";
import Subtitle from "@/components/subtitle/Subtitle";
import {
  PLchart,
  gdsetting,
  followdetail,
  renew,
  checkrenew,
  Linechart,
  strategy,
  getSignal,
  detail,
  detail_p,
  detail_c,
} from "@/api/user";
import { getlinksList } from "@/api/index";
import TopSkin from "@/components/TopSkin";

export default {
  data() {
    return {
      show: false,
      show1: false,
      loading: true,
      cardTitle: [
        this.$t("strategy.total"),
        this.$t("strategy.month_3_roi"),
        this.$t("strategy.month_1_roi"),
        this.$t("strategy.yesterday"),
        this.$t("strategy.handle"),
        this.$t("strategy.lots"),
      ],
      id: "",
      dialogFormVisible: false,
      allCate: this.$t("strategy.allstrategy"),
      plTitle: this.$t("global.pl_product"),
      name: this.$t("strategy.strategy"),
      PieEchart: null,
      formLabelWidth: "120px",
      followlist: [],
      chartData: [],
      monthlist: 24,
      flag: false,
      flag1: false,
      radio: "",
      titleDetail: "",
      title: [
        "总收益",
        "3个月收益率",
        "1个月收益率",
        "昨日盈亏",
        "手动订单收益",
        "总手数",
      ],
      form: {
        reverse_copying: false,
        delay_protection: "",
        slippage_control: "",
        stop_loss_level: "",
        max_value: "",
        min_value: "",
        size: "",
        documentary_type: 2,
        documentary: [],
        use_same_lot_size: false,
        data: 1,
      },
      acclist: [],
      imageUrl: require("../../assets/images/link-setting.png"),
      colConfigs: [
        {
          prop: "master_hand_account.account_nick_name",
          label: this.$t("link_account.key4"),
        },
        {
          prop: "master_hand_account.account_number",
          label: this.$t("my_assets.key22"),
        },
        {
          prop: "master_hand_account.platform_server",
          label: this.$t("my_assets.server"),
        },
        {
          prop: "documentary_type_display",
          label: this.$t("strategy.followtype"),
        },
        { prop: "documentary_size", label: this.$t("strategy.key9") },
        { prop: "expiration_time", label: this.$t("housekeeper.maturity") },
      ],
      tableData: [],
      tableData_c: [],
      tableData1: [],
      multipleSelection: [],
      topCardTitle: ["今日盈亏", "持仓盈亏", "净值", "可用保证金", "余额"],
      cardData: {},
      product: {},
      renewList: {},
      detailList: {},
      list: [],
    };
  },
  watch: {
    "$i18n.locale": function () {
      getlinksList().then((res) => {
        this.loading = false;
        this.acclist = res;
        this.flag = false;
        this.flag1 = false;
        this.id = res[0].id;
        PLchart(res[0].id).then((res) => {
          if (res.results.summary.length !== 0) {
            this.chartData = res.results;
            this.flag = true;
          } else {
            this.flag = false;
          }
        });
        Linechart(res[0].id).then((res) => {
          if (res.results.data !== {}) {
            this.product = res.results.data;
            this.list = res.results.date;
            this.flag1 = true;
          } else {
            this.flag1 = false;
          }
        });
        followdetail(res[0].id).then((res) => {
          this.followlist = res.results;
        });
        this.cardData = [];
        strategy(res[0].id).then((res) => {
          this.cardData = res.results;
        });
      });
      this.$nextTick(() => {
        this.PieEchart = () => import("@/components/PieEchart");
        this.cardTitle = [
          this.$t("strategy.total"),
          this.$t("strategy.month_3_roi"),
          this.$t("strategy.month_1_roi"),
          this.$t("strategy.yesterday"),
          this.$t("strategy.handle"),
          this.$t("strategy.lots"),
        ];
        this.colConfigs = [
          {
            prop: "master_hand_account.account_nick_name",
            label: this.$t("link_account.key4"),
          },
          {
            prop: "master_hand_account.account_number",
            label: this.$t("my_assets.key22"),
          },
          {
            prop: "master_hand_account.platform_server",
            label: this.$t("my_assets.server"),
          },
          {
            prop: "documentary_type_display",
            label: this.$t("strategy.followtype"),
          },
          { prop: "documentary_size", label: this.$t("strategy.key9") },
          { prop: "expiration_time", label: this.$t("housekeeper.maturity") },
        ];
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.PieEchart = () => import("@/components/PieEchart");
    });
  },
  created() {
    getlinksList().then((res) => {
      this.loading = false;
      this.acclist = res;
      this.id = res[0].id;
      this.radio = res[0].id;
      PLchart(res[0].id).then((res) => {
        if (res.results.summary.length !== 0) {
          this.chartData = res.results;
          this.flag = true;
        } else {
          this.flag = false;
        }
      });
      Linechart(res[0].id).then((res) => {
        if (res.results.data !== {}) {
          this.product = res.results.data;
          this.list = res.results.date;
          this.flag1 = true;
        } else {
          this.flag1 = false;
        }
      });
      followdetail(res[0].id).then((res) => {
        this.followlist = res.results;
      });
      this.cardData = [];
      strategy(res[0].id).then((res) => {
        this.cardData = res.results;
      });
    });
  },
  computed: {
    types() {
      return [
        { name: this.$t("master.lot"), label: 2 },
        { name: this.$t("master.percentage"), label: 1 },
        { name: this.$t("master.lot_percentage"), label: 3 },
      ];
    },
  },
  methods: {
    getform() {
      if (this.form.min_value <= this.form.max_value) {
        this.show = false;
      } else {
        this.$message.error(this.$t("doc_management.card10"));
      }
    },
    onSwitchTab(item) {
      console.log(item);
      this.product = {};
      this.list = [];
      this.flag1 = false;
      this.flag = false;
      Linechart(item.name).then((res) => {
        if (res.results.date.length !== 0) {
          this.product = res.results.data;
          this.list = res.results.date;
          this.flag1 = true;
        } else {
          this.flag1 = false;
        }
      });
      PLchart(item.name).then((res) => {
        if (res.results.summary.length !== 0) {
          this.chartData = res.results;
          this.flag = true;
        } else {
          this.flag = false;
        }
      });
      strategy(item.name).then((res) => {
        this.cardData = res.results;
      });
      followdetail(item.name).then((res) => {
        this.followlist = res.results;
      });
    },
    handleCommand(command) {
      console.log(command);
      this.product = {};
      this.list = [];
      this.flag1 = false;
      this.flag = false;
      Linechart(command).then((res) => {
        if (res.results.date.length !== 0) {
          this.product = res.results.data;
          this.list = res.results.date;
          this.flag1 = true;
        } else {
          this.flag1 = false;
        }
      });
      PLchart(command).then((res) => {
        if (res.results.summary.length !== 0) {
          this.chartData = res.results;
          this.flag = true;
        } else {
          this.flag = false;
        }
      });
      strategy(command).then((res) => {
        this.cardData = res.results;
      });
      followdetail(command).then((res) => {
        // console.log(res.results);
        this.followlist = res.results;
      });
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            id: 32,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
        ]);
      }, 1000);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (val.length === 1) {
        getSignal(val[0].id).then((res) => {
          if (res.status === 0) {
            this.$message({
              message: res.msg,
              type: "success",
            });
          }
        });
        this.form.documentary = [val[0].id];
      } else {
        for (var i = 0; i <= val.length - 1; i++) {
          this.form.documentary.push(val[i].id);
        }
      }
    },
    onLinkAccount(id) {
      this.dialogFormVisible = false;
      var data = {};
      data.documentary_id = id;
      data.month = this.form.data;
      checkrenew(data).then((res) => {
        if (res.status === 0) {
          this.$message({
            message: res.msg,
            type: "success",
          });
        }
      });
      // setTimeout(() => {
      //   this.dialogFormVisible2 = true;
      // }, 500);
    },
    // rowStyle({ row, column }) {
    //   return "padding:0;background:#F5F5F5;color:#AAADB8";
    // },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      // console.log(arguments)
      if (column.label === "盈亏") {
        if (row.pl < 0) {
          return {
            color: "#3AB98E",
          };
        } else {
          return {
            color: "#F6665D",
          };
        }
      }
    },
    detail(value) {
      this.titleDetail = value.account_nick_name;
      detail(value.id).then((res) => {
        this.detailList = res.results;
      });
      detail_p(value.id).then((res) => {
        this.tableData = res.results;
      });
      detail_c(value.id).then((res) => {
        this.tableData_c = res.results;
      });

      this.show1 = !this.show1;
    },
    setting(value) {
      this.show = !this.show;
      this.tableData1 = value.follow_account;
      // console.log(value)
      // this.tableData1.push({
      //   accName: value.account_nick_name,
      //   serve: value.platform_server,
      //   account: value.account_number,
      //   type: "",
      //   balance: "",
      // });
      // gdsetting(this.id).then((res) => console.log(res));
    },
    handleClick(row) {
      this.dialogFormVisible = true;
      renew(row.id).then((res) => {
        this.renewList = res.results;
      });
    },
  },
  components: {
    TopSkin,
    Category,
    // Table,
    Card,
    Subtitle,
  },
};
</script>
<style lang="scss" src="./strategy.scss" scoped>
</style>
<style lang="scss" scoped>
.form /deep/ .item {
  padding: 0;
  display: inline;
}
</style>