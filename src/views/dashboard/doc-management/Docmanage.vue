<template>
  <div class="docPage">
    <div class="subTitle">
      <!-- <TopSkin :title="$t('menu.docmanage')" /> -->
    <div class="top-title">{{$t('menu.docmanage')}}</div>
    </div>
    <div class="docMain">
      <el-row style="width: 100%">
        <el-col :span="7">
          <div class="grid-content">
            <!-- <el-card class="box-card" > -->
            <div class="accList">
              <img
                @click="cancelBtn"
                width="18"
                :src="
                  flag
                    ? require('../../../assets/images/checkall.png')
                    : require('../../../assets/images/null.png')
                "
              />
              <span class="signal">{{ $t("doc_management.signal") }}</span>
              <div class="accInput">
                <el-input
                  size="mini"
                  :placeholder="$t('global.placeholder5')"
                  prefix-icon="el-icon-search"
                  v-model="inputKey"
                  @blur="listSearch"
                  class="input"
                ></el-input>
              </div>
            </div>
            <el-card
              shadow="hover"
              class="box-card"
              body-style="padding:0"
              v-for="(item, index) in list"
              v-loading="loading"
              :key="index"
            >
              <div class="text item">
                <div class="choosePic" @click="chooseAcc(index, item.id)">
                  <img
                    width="18"
                    :src="
                      checkbox.includes(index)
                        ? require('../../../assets/images/check.png')
                        : require('../../../assets/images/null.png')
                    "
                  />
                </div>
                <div class="chooseInfo">
                  <div class="chooseHead">
                    <div class="signalName">{{ item.account_nick_name }}</div>
                    <div class="headRight">
                      <div class="setting" @click="setting(item)">
                        <!-- <img width="16" src="../../../assets/images/setting.png" /> -->
                      </div>
                    </div>
                  </div>
                  <div class="chooseBody" @click="chooseAcc(index, item.id)">
                    <div>
                      <span>{{ $t("doc_management.card1") }}</span>
                      <span>{{ item.account_name }}</span>
                    </div>
                    <div>
                      <span>{{ $t("doc_management.card2") }}</span>
                      <span>{{ item.platform }}</span>
                    </div>
                    <div>
                      <span>{{ $t("doc_management.card3") }}</span>
                      <span>{{ item.platform_server }}</span>
                    </div>

                    <div>
                      <span>{{ $t("doc_management.card4") }}</span>
                      <span>{{ item.account_number }}</span>
                    </div>
                    <div>
                      <span>{{ $t("doc_management.card5") }}</span>
                      <span>${{ item.balance }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
            <!-- </el-card> -->
          </div>
        </el-col>
        <el-col :span="17">
          <div class="grid-content">
            <el-tabs
              v-model="activeName"
              @tab-click="handleClick"
              :cell-style="rowStyle"
              style="height: 100%"
              class="tabsHead"
            >
              <el-tab-pane
                :label="this.$t('doc_management.position')"
                name="first"
              >
                <div class="PC">
                  <slot>
                    <div class="nav">
                      <div size="mini" @click="getAll" class="all">
                        {{ $t("link_account.all") }}
                      </div>
                      <div style="display: flex; align-items: center">
                        <div>{{ $t("doc_management.unwind") }}</div>
                        <el-select
                          size="mini"
                          v-model="selectKey1.platform_type"
                          @change="getChange1"
                          slot="prepend"
                          popper-class="account-select"
                          :placeholder="$t('link_account.all')"
                        >
                          <el-option label="MT4" value="MT4"></el-option>
                          <el-option label="MT5" value="MT5"></el-option>
                        </el-select>
                      </div>
                      <!-- </div> -->
                      <DatePicker :period.sync="period" @change="timePicker" />
                      <div class="search">
                        <el-input
                          size="mini"
                          :placeholder="$t('global.placeholder5')"
                          prefix-icon="el-icon-search"
                          v-model="selectKey1.account_number_or_platform_server"
                          @blur="inputChange1"
                          class="input"
                        ></el-input>
                      </div>
                    </div>
                  </slot>
                  <el-table
                    :data="close"
                    row-key="ticket"
                    stripe
                    v-loading="loadingdata"
                    lazy
                    border
                    :cell-style="rowStyle"
                    style="width: 100%"
                    :tree-props="{ children: 'follow_order' }"
                  >
                    <el-table-column
                      min-width="8%"
                      prop="account_nick_name"
                      :label="this.$t('report.key1')"
                    ></el-table-column>
                    <el-table-column
                      min-width="6%"
                      prop="platform"
                      :label="this.$t('report.key2')"
                    ></el-table-column>
                    <el-table-column
                      min-width="16%"
                      prop="broker"
                      :label="this.$t('report.key17')"
                    ></el-table-column>
                    <el-table-column
                      min-width="8%"
                      prop="account_number"
                      :label="this.$t('strategy.key7')"
                    ></el-table-column>
                    <el-table-column
                      min-width="10%"
                      prop="ticket"
                      :label="this.$t('report.key4')"
                    ></el-table-column>
                    <el-table-column
                      min-width="6%"
                      :label="this.$t('report.key5')"
                    >
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          disabled
                          :class="
                            scope.row.trade_type === 'buy' ? 'buy' : 'sell'
                          "
                          >{{
                            scope.row.trade_type === "buy" ? "  Buy" : "Sell"
                          }}</el-button
                        >
                      </template>
                    </el-table-column>
                    <el-table-column
                      min-width="8%"
                      prop="symbol"
                      :label="this.$t('report.key7')"
                    ></el-table-column>
                    <el-table-column
                      min-width="14%"
                      prop="open_time"
                      :label="this.$t('report.key8')"
                    ></el-table-column>
                    <el-table-column
                      min-width="12%"
                      :label="this.$t('report.key10')"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.open_price }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      min-width="12%"
                      :label="this.$t('report.key14')"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.swap }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      min-width="8%"
                      :label="this.$t('report.key15')"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.profit >= 0" class="red"
                          >{{ scope.row.profit }}</span
                        >
                        <span v-else class="green"
                          >{{ scope.row.profit }}</span
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                  <div
                    style="width: 100%; height: 50px; display: flex; align-items: center; justify-content: center; position: absolute; bottom: 100px;"></div>
                </div>
              </el-tab-pane>
              <el-tab-pane
                :label="this.$t('doc_management.position1')"
                name="second"
                style="height: 100%"
              >
                <div class="PC">
                  <slot>
                    <div class="nav">
                      <div size="mini" @click="getAll1" class="all">
                        {{ $t("link_account.all") }}
                      </div>
                      <div style="display: flex; align-items: center">
                        <div>{{ $t("doc_management.unwind") }}</div>
                        <el-select
                          size="mini"
                          v-model="selectKey.platform_type"
                          @change="getChange"
                          slot="prepend"
                          popper-class="account-select"
                          :placeholder="$t('link_account.all')"
                        >
                          <el-option label="MT4" value="MT4"></el-option>
                          <el-option label="MT5" value="MT5"></el-option>
                        </el-select>
                      </div>
                      <!-- </div> -->
                      <DatePicker :period.sync="period" @change="timePicker" />
                      <div class="search1">
                        <el-input
                          size="mini"
                          :placeholder="$t('global.placeholder7')"
                          prefix-icon="el-icon-search"
                          v-model="selectKey.account_number"
                          @blur="inputChange"
                          class="input"
                        ></el-input>
                      </div>
                      <div class="search1">
                        <el-input
                          size="mini"
                          :placeholder="$t('global.placeholder8')"
                          prefix-icon="el-icon-search"
                          v-model="selectKey.broker"
                          @blur="inputChange"
                          class="input"
                        ></el-input>
                      </div>
                    </div>
                  </slot>
                  <el-table :data="position" row-key="ticket" stripe lazy v-loading="loadingdata1" border :cell-style="rowStyle" style="width: 100%" :tree-props="{ children: 'follow_order' }">
                    <el-table-column
                      min-width="8%"
                      prop="account_nick_name"
                      :label="this.$t('report.key1')"
                    ></el-table-column>
                    <el-table-column
                      min-width="6%"
                      prop="platform"
                      :label="this.$t('report.key2')"
                    ></el-table-column>
                    <el-table-column
                      min-width="16%"
                      prop="broker"
                      :label="this.$t('report.key17')"
                    ></el-table-column>
                    <el-table-column
                      min-width="8%"
                      prop="account_number"
                      :label="this.$t('strategy.key7')"
                    ></el-table-column>
                    <el-table-column
                      min-width="10%"
                      prop="ticket"
                      :label="this.$t('report.key4')"
                    ></el-table-column>
                    <el-table-column
                      min-width="6%"
                      :label="this.$t('report.key5')"
                    >
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          disabled
                          :class="
                            scope.row.trade_type === 'buy' ? 'buy' : 'sell'
                          "
                          >{{
                            scope.row.trade_type === "buy" ? "  Buy" : "Sell"
                          }}</el-button
                        >
                      </template>
                    </el-table-column>
                    <el-table-column
                      min-width="8%"
                      prop="symbol"
                      :label="this.$t('report.key7')"
                    ></el-table-column>
                    <el-table-column
                      min-width="14%"
                      prop="open_time"
                      :label="this.$t('report.key9')"
                    ></el-table-column>
                    <el-table-column
                      min-width="12%"
                      :label="this.$t('report.key11')"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.open_price }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      min-width="12%"
                      :label="this.$t('report.key14')"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.swap }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      min-width="8%"
                      :label="this.$t('report.key15')"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.profit >= 0" class="red"
                          >{{ scope.row.profit }}</span
                        >
                        <span v-else class="green"
                          >{{ scope.row.profit }}</span
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                  <div
                    v-if="position.length !== 0"
                    style="
                      width: 100%;
                      height: 50px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      position: absolute;
                      bottom: 0;
                    "
                  >
                    <Pagination
                      :page.sync="positionP.page"
                      :total="positionPage.count"
                      @pagination="pageChange"
                    />
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="setting">
      <el-dialog
        :title="this.$t('master.setting')"
        :visible.sync="show"
        top="8vh"
      >
        <div class="titleSub">{{ $t("strategy.doc1") }}</div>
        <div
          class="borderbox"
        >
          <el-table
            ref="multipleTable"
            :data="tableData2"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column
              prop="lower_hand_account"
              :label="this.$t('strategy.key7')"
            ></el-table-column>
            <el-table-column
              prop="documentary_type_display"
              label="类型"
            ></el-table-column>
            <el-table-column
              prop="documentary_size"
              label="比例"
            ></el-table-column>
            <el-table-column
              prop="expiration_time"
              label="平仓时间"
            ></el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div class="renew" @click="renewSet(scope.row)">
                  <img width="16" src="../../../assets/images/money.png" />
                  <span style="margin-left: 5px; color: #ff7d00">{{
                    $t("strategy.clickrenew")
                  }}</span>
                </div>
                <!-- <div
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                    style="color:#FF7D00;display: flex;align-items: center;cursor: pointer;"
                  >
                    <div style="width:18px;display: flex;align-items: center;">
                      <img src="@/assets/images/money.png" width="18" />
                    </div>
                    <span>{{$t('strategy.clickrenew')}}</span>
                </div>-->
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="titleSub">{{ $t("strategy.doc") }}</div>
        <el-form :model="form" class="form">
          <div style="display: flex">
            <div style="width: 50%">
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
                <el-form-item :label="this.$t('master.renew')" prop="delivery">
                  <el-switch v-model="form.delivery4"></el-switch>
              </el-form-item>
              <!-- <el-form-item :label="this.$t('strategy.key2')" prop="delivery">
                  <el-switch v-model="form.delivery1"></el-switch>
              </el-form-item>-->
              <!-- <el-form-item :label="this.$t('strategy.key3')" prop="delivery">
                  <el-switch v-model="form.delivery2"></el-switch>
              </el-form-item>-->
            </div>
            <div style="width: 50%">
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
               <el-tooltip class="item" effect="dark" :content="$t('master.enablestoplpDesc')" placement="top-end">
                  <div>
                    <i class="el-icon-warning-outline" style="margin-right: 10px"></i>
                  </div>
                </el-tooltip>
                <el-input
                  v-model="form.stop_loss_level"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item :label="this.$t('master.enable5')">
                <el-tooltip class="item" effect="dark" :content="$t('master.enablekey1')"
                  placement="top-end"
                >
                  <div>
                    <i class="el-icon-warning-outline" style="margin-right: 10px" ></i>
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
              <!-- <el-form-item :label="this.$t('master.renew')" prop="delivery">
                  <el-switch v-model="form.delivery4"></el-switch>
              </el-form-item>-->
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
          <!-- <div style="display:flex;align-items: center;">
            <el-radio-group v-model="form.documentary_type">
              <el-radio :label="2">{{this.$t('master.lot')}}</el-radio>
              <el-radio :label="1">{{this.$t('master.percentage')}}</el-radio>
              <el-radio :label="3">{{this.$t('master.lot_percentage')}}</el-radio>
            </el-radio-group>
            <el-form-item style="margin-left:20px">
              <span style="font-size:12px">{{this.$t('master.set_value')}}</span>
              <el-input v-model="form.size" class="setInput" autocomplete="off"></el-input>
            </el-form-item>
          </div>-->
        </el-form>
        <div style="font-size: 12px">
          *
          {{$t('doc_management.key1')}}
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="show = false">{{
            $t("strategy.cancel")
          }}</el-button>
          <el-button type="primary" @click="getForm">{{
            $t("strategy.sure")
          }}</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="renew">
      <el-dialog :title="$t('doc_management.card6')" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item
            >{{ renewList.master_hand_account_nick_name }} {{$t('doc_management.card9')}}
            {{ renewList.expiration_time }}</el-form-item>
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
             <el-option v-for="item in monthlist" :key="item" :label="item+$t('doc_management.month')" :value="item"></el-option>

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
          <el-button type="primary" @click="renewOk">{{
            $t("global.sure")
          }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Subtitle from "@/components/subtitle/Subtitle";
import { Message } from "element-ui";
import DatePicker from "@/components/DatePicker";
import Pagination from "@/components/Pagination";
import TopSkin from "@/components/TopSkin";
import {
  follow_p,
  follow_c,
  followsearch_p,
  followsearch_c,
  followsort_c,
  docmanage,
  subdocmanage,
  docAcc,
  gdAcc,
  signalSetting,
  signalChange,
  renew,
  renewinfo,
  renewOk,
  getSignal,
  gdAccSearch,
  searchAcc,
} from "../../../api/user";
// import Dialog from "../../strategy/components/dialog/Dialog";
export default {
  data() {
    return {
      activeName: "second",
      selectKey: {
        account_number: "",
        broker: "",
        platform_type: "",
        start_time: "",
        end_time: "",
      },
      selectKey1: {
        account_number_or_platform_server: "",
        platform_type: "",
        start_time: "",
        end_time: "",
      },
      search1: false,
      inputKey: "",
      list: [],
      loading: true,
      positionP: { page: 1 },
      datalist: [],
      checkbox: [],
      show: false,
      dialogFormVisible: false,
      loadingdata: false,
      loadingdata1: false,
      monthlist:24,
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
      formLabelWidth: "120px",
      period: [],
      positionPage: {},
      renewList: {},
      tableData: [],
      query: {},
      accountlist: [],
      position: [],
      close: [],
      tableData2: [],
      documentary_id: "",
      tableData1: [],
      flag: false,
    };
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
    listSearch() {
      searchAcc(this.inputKey).then((res) => {
        this.loading = false;
        this.list = res;
        console.log(res);
      });
    },
    getAll() {
      (this.selectKey1 = {
        account_number_or_platform_server: "",
        platform_type: "",
        start_time: "",
        end_time: "",
      }),
        followsearch_c(this.accountlist, this.selectKey1).then((res) => {
          this.close = res.results;
        });
    },
    getAll1() {
      (this.selectKey = {
        account_number: "",
        broker: "",
        platform_type: "",
        start_time: "",
        end_time: "",
      }),
        followsearch_p(
          this.accountlist,
          this.positionP.page,
          this.selectKey
        ).then((res) => {
          this.position = res.results;
          this.positionPage = res;
          this.search1 = true;
        });
    },
    timePicker() {
      (this.selectKey.start_time = this.period[0]),
        (this.selectKey.end_time = this.period[1]),
        console.log(this.selectKey);
      followsearch_p(
        this.accountlist,
        this.positionP.page,
        this.selectKey
      ).then((res) => {
        this.position = res.results;
        this.positionPage = res;
        this.search1 = true;
      });
    },
    timePicker1() {
      (this.selectKey1.start_time = this.period[0]),
        (this.selectKey1.end_time = this.period[1]),
        followsearch_c(this.accountlist, this.selectKey1).then((res) => {
          this.close = res.results;
          this.search1 = true;
        });
    },
    inputChange() {
      console.log(this.selectKey);
      followsearch_p(
        this.accountlist,
        this.positionP.page,
        this.selectKey
      ).then((res) => {
        this.position = res.results;
        this.positionPage = res;
        this.search1 = true;
      });
    },
    inputChange1() {
      followsearch_c(this.accountlist, this.selectKey1).then((res) => {
        this.close = res.results;
        this.search1 = true;
      });
    },
    getChange() {
      followsearch_p(
        this.accountlist,
        this.positionP.page,
        this.selectKey
      ).then((res) => {
        //  console.log(res)
        this.position = res.results;
        this.positionPage = res;
        this.search1 = true;
      });
    },
    getChange1() {
      followsearch_c(this.accountlist, this.selectKey1).then((res) => {
        console.log(res);
        this.close = res.results;
        this.search1 = true;
      });
    },

    renewSet(row) {
      this.dialogFormVisible = true;
      this.documentary_id = row.id;
      renewinfo(row.id).then((res) => {
        this.renewList = res.results;
      });
    },
    pageChange() {
      if (this.search1 === true) {
        followsearch_p(
          this.accountlist,
          this.positionP.page,
          this.selectKey
        ).then((res) => {
          this.position = res.results;
          this.positionPage = res;
          this.search1 = true;
        });
      } else {
        follow_p(this.accountlist, this.positionP.page).then((res) => {
          this.position = res.results;
        });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
      if (val.length === 1) {
        getSignal(val[0].id).then((res) => {
          if (res.status === 0) {
            this.$message({
              message: res.msg,
              type: "success",
            });
          }else{
            this.$message.error(res.msg);
          }
        });
        this.form.documentary = [val[0].id];
      } else {
        for (var i = 0; i <= val.length - 1; i++) {
          this.form.documentary.push(val[i].id);
        }
      }
    },
    getFilterList() {
      // accounts format as "['accountId1', 'accountId2']"
      var str1 = this.accounts.join("','");
      var str = "['".concat(str1).concat("']");
      this.queryList.account = str;
      this.queryList.start_day = this.period[0];
      this.queryList.end_day = this.period[1];
    },
    setting(item) {
      this.show = true;
      this.form.documentary = [];
      signalSetting(item.id).then((res) => {
        this.tableData2 = res.results;
      });
    },
    getForm() {
      if(this.form.min_value<=this.form.max_value){
        this.show = false;
        if (
          this.form.documentary_type === 2 ||
          this.form.documentary_type === 3
        ) {
          this.form.use_same_lot_size = true;
        }
        signalChange(this.form).then((res) => {
          if (res.status === 0) {
            this.$message({
              message: res.msg,
              type: "success",
            });
          }else{
              this.$message.error(res.msg);
            }
        });
      }else{
              this.$message.error(this.$t('doc_management.card10'));
      }
    },
    // sort(key) {
    //   var sort;
    //   var sort1;
    //   var sort2;
    //   var sort3;
    //   switch (key) {
    //     case 1:

    //       if (sort === 1) {
    //         followsort_c(this.accountlist, "-open_time").then((res) => {this.close = res.results;});
    //         sort = 2;
    //       }else if (sort === 2) {
    //         follow_c(this.accountlist).then((res) => {this.close = res.results;});
    //         sort = 0;
    //       }else{
    //          followsort_c(this.accountlist, "open_time").then((res) => {this.close = res.results;});
    //       }
    //       break;
    //       case 2:
    //       if (sort1 === 1) {
    //         followsort_c(this.accountlist, "-open_price").then((res) => {this.close = res.results;});
    //         sort1 = 2;
    //       }else if (sort1 === 2) {
    //         follow_c(this.accountlist).then((res) => {this.close = res.results;});
    //         sort1 = 0;
    //       }else{followsort_c(this.accountlist, "open_price").then((res) => {this.close = res.results;});}
    //       console.log(sort1)
    //       break;
    //       case 3:
    //       if (sort2 === 1) {
    //         followsort_c(this.accountlist, "-swap").then((res) => {this.close = res.results;});
    //         sort1 = 2;
    //       }else if (sort1 === 2) {
    //         follow_c(this.accountlist).then((res) => {this.close = res.results;});
    //         sort1 = 0;
    //       }else{followsort_c(this.accountlist, "swap").then((res) => {this.close = res.results;});}
    //       break;

    //   }
    // },
    cancelBtn() {
      if (this.checkbox.length !== 0) {
        this.checkbox = [];
        this.position = [];
        this.close = [];
        this.flag = false;
      } else if (this.checkbox.length === 0) {
        this.flag = true;
        this.loadingdata1 = true;
        this.loadingdata = true;
        gdAcc().then((res) => {
          for (var i = 0; i <= res.length - 1; i++) {
            this.checkbox.push(i);
            this.accountlist.push(`'` + res[i].id + `'`);
          }
          follow_p(this.accountlist, 1).then((res) => {
            this.position = res.results;
            this.loadingdata1 = false;
            this.positionPage = res;
            // console.log(this.position)
          });
          follow_c(this.accountlist).then((res) => {
            this.close = res.results;
            this.loadingdata = false;
            // console.log(this.close)
          });
        });
      }
    },
    chooseAcc(index, id) {
      this.search1 = false;
      this.loadingdata = true;
      this.loadingdata1 = true;
      this.selectKey = {
        account_number: "",
        broker: "",
        platform_type: "",
        start_time: "",
        end_time: "",
      };

      if (this.checkbox.includes(index)) {
        this.checkbox.splice(this.checkbox.indexOf(index), 1);
        this.accountlist.splice(this.accountlist.indexOf(id), 1);
      } else {
        this.checkbox.push(index);
        this.accountlist.push(`'` + id + `'`);
      }
      if (this.checkbox.length !== 0) {
        this.flag = true;
      } else if (this.checkbox.length === 0) {
        this.flag = false;
      }
      follow_p(this.accountlist, 1).then((res) => {
        this.position = res.results;
        this.loadingdata1 = false;
        this.positionPage = res;
        // console.log(this.position)
      });
      follow_c(this.accountlist).then((res) => {
        this.close = res.results;
        this.loadingdata = false;
        // console.log(this.close)
      });
    },
    renewOk() {
      this.dialogFormVisible = false;
      var data = {};
      data.documentary_id = this.documentary_id;
      data.month = this.form.data;
      renewOk(data).then((res) => {
        if (res.status === 0) {
          this.$message({
            message: res.msg,
            type: "success",
          });
        }else{
            this.$message.error(res.msg);
          }
      });
    },
    rowStyle({ row, column }) {
      return "padding:0";
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  components: {
    Subtitle,
    DatePicker,
    Pagination,
    TopSkin,
  },
  created() {
    this.loading = true;
    gdAcc().then((res) => {
      this.loading = false;
      this.list = res;
      console.log(res);
    });

    // docAcc().then((res) => console.log(res));
    docmanage().then((res) => {
      this.tableData1 = res.data;
      for (var i = 0; i <= res.data.length - 1; i++) {
        this.tableData1[i].id = i;
      }
      this.tableData1[2].hasChildren = true;
    });
  },
};
</script>

<style lang="scss" src='./docmanage.scss' scoped>
</style>
<style lang='scss' scope>
.el-col {
  height: 100%;
}

.grid-content,
.el-tabs,
.el-tab-pane {
  height: 100%;
}
.el-table {
  font-size: 12px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.form /deep/ .item {
  padding: 0;
  display: inline;
}
</style>
<style lang="scss">
@import "@/styles/_handle.scss";
.el-date-range-picker__content.is-left{

}
</style>