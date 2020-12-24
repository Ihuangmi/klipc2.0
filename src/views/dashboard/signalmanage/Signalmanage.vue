<template>
  <div class="docPage">
    <div class="subTitle">
      <!-- <TopSkin :title="$t('menu.signalmanage')" /> -->
    <div class="top-title">{{$t('menu.signalmanage')}}</div>
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
              <span class="mysignal">{{
                $t("signal_management.mysignal")
              }}</span>
              <div class="accInput">
                <el-input
                  size="mini"
                  :placeholder="$t('global.placeholder5')"
                  prefix-icon="el-icon-search"
                  v-model="inputKey"
                  @blur="inputAcc"
                  class="input"
                ></el-input>
              </div>
              <button @click="addshow" class="addAcc">
                +{{ $t("signal_management.addAcc") }}
              </button>
            </div>
            <div class="master"></div>

            <el-card
              shadow="hover"
              class="box-card"
              body-style="padding:0"
              v-for="(item, index) in list"
              :key="index"
            >
              <div class="text item">
                <div
                  class="choosePic"
                  @click="
                    chooseAcc(
                      index,
                      item.id,
                      item.platform,
                      item.platform_server
                    )
                  "
                >
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
                    <div :class="item.is_master?'headRight1':'headRight'">
                      <div class="renew">
                        <div
                          class="mainBtn1"
                          v-show=" item.is_master"
                          @click="setMaster(item.is_master, item.id, item.is_show)"
                        >
                          <span style="font-size: 8px !important">{{
                            $t("link_account.master_show")
                          }}</span>
                        </div>
                      </div>
                      <div class="renew">
                        <div
                          :class="item.is_show
                              ?'mainBtn1':'mainBtn2'"
                          @click="checkEye(index, item.id, item.is_show)"
                        >
                          <span style="font-size: 8px !important">
                            {{
                              item.is_show
                              ? $t("link_account.showing")
                              : $t("link_account.not_show")
                          }}
                      
                          </span>
                        </div>
                      </div>
                      <div class="eyes">
                        <svg-icon
                          width="16"
                          v-if="item.is_show"
                          iconClass="eye-open"
                        ></svg-icon>
                        <svg-icon
                          width="16"
                          v-else
                          iconClass="eye-close"
                        ></svg-icon>
                      </div>
                      <div class="delete" @click="deleteAcc(item.id)"></div>
                      <div class="setMain">
                        <el-popover
                          placement="bottom"
                          width="80"
                          popper-class="setPop"
                          trigger="click"
                        >
                          <p
                            @click="
                              setMaster(item.is_master, item.id, item.is_show)
                            "
                          >
                            {{item.is_master===false?$t('signal_management.masterset'):$t('signal_management.mastercancel')}}
                          </p>
                          <p @click="signalset(item.id)">{{$t('signal_management.set')}}</p>
                          <el-button
                            slot="reference"
                            class="setmore"
                            @click="setPop(index)"
                          ></el-button>
                        </el-popover>
                        <!-- <div @click="setPop(index)" class="more">
                          <div class="setmore"></div> -->
                        <!-- <img width="16" src="../../../assets/images/more.png" /> -->
                        <!-- </div> -->
                      </div>
                    </div>
                  </div>
                  <div
                    class="chooseBody"
                    @click="
                      chooseAcc(
                        index,
                        item.id,
                        item.platform,
                        item.platform_server
                      )
                    "
                  >
                    <div>
                      <span>{{ $t("signalpool.key7") }}</span>
                      <span>{{ item.equity }}</span>
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
                  <!-- <div class="setPop" v-show="index === i">
                    <p
                      @click="setMaster(item.is_master, item.id, item.is_show)"
                    >
                      设置主展示
                    </p>
                    <p @click="signalset(item.id)">设置</p>
                  </div> -->
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
              style="height: 90%"
              class="tabsHead"
            >
              <el-tab-pane
                :label="this.$t('signal_management.follower')"
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
                      <div style="display: flex; align-items: center">
                        <div>{{ $t("doc_management.type") }}</div>
                        <el-select
                          size="mini"
                          v-model="selectKey.documentary_type"
                          @change="getChange"
                          slot="prepend"
                          popper-class="account-select"
                          :placeholder="$t('link_account.all')"
                        >
                          <el-option label="百分比" value="1"></el-option>
                          <el-option label="固定手数" value="2"></el-option>
                          <el-option label="手数百分比" value="3"></el-option>
                        </el-select>
                      </div>
                      <div class="search">
                        <el-input
                          size="mini"
                          :placeholder="$t('global.placeholder5')"
                          prefix-icon="el-icon-search"
                          v-model="selectKey.account_number_or_platform_server"
                          @blur="inputChange"
                          class="input"
                        ></el-input>
                      </div>
                    </div>
                  </slot>
                  <div style="height: 100%; overflow: auto">
                    <el-table
                      :data="tableData1"
                      row-key="id"
                      lazy
                      border
                      stripe
                      :cell-style="rowStyle"
                      style="width: 100%"
                    >
                      <el-table-column
                        min-width="3%"
                        type="index"
                      ></el-table-column>
                      <el-table-column
                        min-width="12%"
                        prop="lower_hand_account.platform_server"
                        :label="this.$t('signal_management.key1')"
                      ></el-table-column>
                      <el-table-column
                        min-width="5%"
                        prop="lower_hand_account.platform"
                        :label="this.$t('signal_management.key2')"
                      ></el-table-column>
                      <el-table-column
                        min-width="12%"
                        prop="lower_hand_account.add_time"
                        :label="this.$t('signal_management.key3')"
                      ></el-table-column>
                      <el-table-column
                        min-width="8%"
                        prop="documentary_size"
                        :label="this.$t('signal_management.key4')"
                      ></el-table-column>
                      <el-table-column
                        min-width="8%"
                        prop="lower_hand_account.account_nick_name"
                        :label="this.$t('signal_management.key5')"
                      ></el-table-column>
                      <el-table-column
                        min-width="8%"
                        prop="lower_hand_account.account_number"
                        :label="this.$t('signal_management.key6')"
                      ></el-table-column>
                      <el-table-column
                        min-width="5%"
                        prop="lower_hand_account.balance"
                        :label="this.$t('signal_management.key7')"
                      ></el-table-column>
                      <el-table-column
                        min-width="8%"
                        prop="documentary_fee"
                        :label="this.$t('signal_management.key8')"
                      ></el-table-column>
                      <el-table-column
                        min-width="5%"
                        prop="documentary_type_display"
                        :label="this.$t('signal_management.key9')"
                      ></el-table-column>
                      <el-table-column
                        min-width="8%"
                        prop="lower_hand_account.leverage"
                        :label="this.$t('signal_management.key10')"
                      ></el-table-column>
                      <el-table-column
                        min-width="8%"
                        prop="lower_hand_account.equity"
                        :label="this.$t('signal_management.key11')"
                      >
                        <template slot-scope="scope">
                          <span
                            v-if="scope.row.lower_hand_account.equity >= 0"
                            class="red"
                            >{{ scope.row.lower_hand_account.equity }}</span
                          >
                          <span v-else class="green">{{
                            scope.row.lower_hand_account.equity
                          }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        min-width="8%"
                        prop="lower_hand_account.equity"
                        :label="this.$t('signal_management.key12')"
                      ></el-table-column>
                    </el-table>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane
                :label="this.$t('signal_management.followerdetail')"
                name="second"
                style="height: 100%"
              >
                <div class="PC">
                  <div class="nav" style="font-weight: bold">
                    {{ $t("strategy.position") }}
                  </div>
                  <div style="height: 45%; overflow: auto">
                    <el-table
                      :data="close"
                      row-key="account_number"
                      style="width: 100%"
                      stripe
                      v-loading="loadingdata1"
                      :tree-props="{ children: 'follow_order' }"
                    >
                      <!-- <el-table-column type="expand" min-width="3%">
                      </el-table-column>-->
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
                        min-width="14%"
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
                        min-width="12%"
                        prop="open_time"
                        show-overflow-tooltip
                        :label="this.$t('report.key8')"
                      ></el-table-column>
                      <el-table-column
                        min-width="8%"
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
                          <span v-if="scope.row.profit >= 0" class="red">{{
                            scope.row.profit
                          }}</span>
                          <span v-else class="green">{{
                            scope.row.profit
                          }}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="blank"></div>
                  <div class="nav" style="font-weight: bold">
                    {{ $t("strategy.order") }}
                  </div>
                  <div style="height: 40%; overflow: auto">
                    <el-table
                      :data="position"
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
                        min-width="14%"
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
                        label="产品名"
                      ></el-table-column>
                      <el-table-column
                        min-width="12%"
                        prop="open_time"
                        :label="this.$t('report.key9')"
                      ></el-table-column>
                      <el-table-column
                        min-width="8%"
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
                          <span v-if="scope.row.profit >= 0" class="red">{{
                            scope.row.profit
                          }}</span>
                          <span v-else class="green">{{
                            scope.row.profit
                          }}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
                    <div
                      v-if="position.length !== 0"
                      style="
                        width: 100%;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: relative;
                        bottom: 0;
                        z-index:1000
                      "
                    >
                      <Pagination
                        :page.sync="positionP.page"
                        :total="positionPage.count"
                        @pagination="pageChange"
                      />
                    </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      :title="this.$t('signal_management.addAcc')"
      :visible.sync="dialogFormVisible"
      top="8vh"
    >
      <el-form :model="form">
        <el-form-item
          :label="this.$t('signal_management.chooseAcc')"
          :label-width="formLabelWidth"
        >
          <el-select
            popper-class="account-select"
            v-model="form.account"
            :placeholder="$t('global.placeholder1')"
            @change="signalinfo(form.account)"
          >
            <el-option
              v-for="(item, index) in tablelist"
              :key="index"
              :label="item.account_nick_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <div style="color: #aaadb8; font-size: 10px; padding-left: 10px">
          * {{ $t("signal_management.key13") }}
        </div>
        <div
          style="width: 100%; height: 0; margin: 10px"
          class="bordertop"
        ></div>
        <!-- <div class="formlist"> -->
        <!-- <el-radio v-model="radio" label="1">{{$t('signal_management.key14')}}</el-radio>
          <el-select
            popper-class="account-select"
            :placeholder="this.$t('global.placeholder2')"
            v-model="form.max_value"
          ></el-select>
        </div>
        <el-radio-group v-model="radio" class="pl">
          <el-radio label="1">{{$t('signal_management.key15')}}</el-radio>
          <div class="inputgroup">
            <el-radio label="2">{{$t('signal_management.key16')}}</el-radio>
            <el-input v-model="form.max_value" :placeholder="this.$t('global.placeholder2')"></el-input>
          </div>
          <div class="inputgroup">
            <el-radio label="3">{{$t('signal_management.key17')}}</el-radio>
            <el-input v-model="form.max_value" :placeholder="this.$t('global.placeholder2')"></el-input>
          </div>
        </el-radio-group>-->
        <!-- <div style="width:100%;height:0;border-top:1px solid #efefef; margin:10px"></div> -->
        <div style="font-size: 12px; padding: 0 10px 10px 10px; width: 100%">
          {{ $t("signal_management.key32") }}
        </div>
        <br />
        <div>
          <el-radio-group v-model="radio" style="padding-left: 10px">
            <el-radio label="1">{{ $t("signal_management.key18") }}</el-radio>
            <el-radio label="2">{{ $t("signal_management.key19") }}</el-radio>
          </el-radio-group>
          <span style="color: #aaadb8; font-size: 10px; padding-left: 10px"
            >* {{ $t("signal_management.key34") }}</span
          >
        </div>
        <div
          style="width: 100%; height: 0; margin: 10px"
          class="bordertop"
        ></div>
        <div class="setMain" style="width: 100%">
          <div class="additem">
            <span style="font-size: 12px; padding: 10px; width: 90px">{{
              $t("signal_management.key20")
            }}</span>
            <el-input
              v-model="form.follow_password"
              :placeholder="$t('global.placeholder2')"
            ></el-input>
          </div>
          <div class="additem">
            <span style="font-size: 12px; width: 100px">{{
              $t("signal_management.key21")
            }}</span>
            <el-input
              v-model="form.follower_min_balance"
              :placeholder="$t('global.placeholder2')"
            ></el-input>
          </div>
        </div>
        <div
          style="width: 100%; height: 0; margin: 10px"
          class="bordertop"
        ></div>
        <el-form-item :label="$t('master.subscription_fee')+'*'" label-width="90px">
          <el-select
            popper-class="account-select"
            v-model="form.subscribe_fee"
            :placeholder="$t('global.placeholder1')"
          >
            <el-option
              v-for="(item, index) in subscribe"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <div
          style="width: 100%; height: 0; margin: 10px"
          class="bordertop"
        ></div>
        <span style="font-size: 12px; padding: 10px">{{
          $t("signal_management.key22")
        }}</span>
        <div class="desc">
          <el-input
            v-model="form.account_description"
            :placeholder="$t('signal_management.key35')"
            maxlength="30"
            show-word-limit
            type="textarea"
          ></el-input>
        </div>
        <div
          style="
            color: #aaadb8;
            font-size: 10px;
            padding-left: 10px;
            margin-top: 10px;
          "
        >
          {{ $t("signal_management.desc") }}
        </div>
        <!-- <div class="desc">
          <el-input
            v-model="form.account_description"
            placeholder="请输入描述"
            maxlength="30"
            show-word-limit
            type="textarea"
          ></el-input>
        </div>
        <div style="color: #aaadb8; font-size: 10px; padding-left: 10px;margin-top:10px">{{$t('signal_management.desc')}}</div> -->
        <div
          style="width: 100%; height: 0; margin: 10px"
          class="bordertop"
        ></div>
        <div style="font-size: 12px; padding: 0 10px 10px 10px; width: 100%">
          {{ $t("signal_management.key23") }}
        </div>
        <el-checkbox-group v-model="checkList" style="padding-left: 10px">
          <el-checkbox
            :label="this.$t('signal_management.key24')"
          ></el-checkbox>
          <el-checkbox label="EA"></el-checkbox>
          <el-checkbox
            :label="this.$t('signal_management.key25')"
          ></el-checkbox>
          <el-checkbox
            :label="this.$t('signal_management.key26')"
          ></el-checkbox>
          <el-checkbox
            :label="this.$t('signal_management.key27')"
          ></el-checkbox>
        </el-checkbox-group>
        <div
          style="width: 100%; height: 0; margin: 10px"
          class="bordertop"
        ></div>
        <!-- <div style="font-size:12px;padding:10px;width:100%">{{$t('signal_management.key28')}}</div>
        <div class="pwd">
          <div style="width:53px">{{$t('signal_management.key29')}}</div>
          <el-input v-model="form.max_value" placeholder="请输入"></el-input>
        </div>
        <div class="setMain" style="width:100%;padding-left:10px">
          <span>{{$t('signal_management.key30')}}</span>
          <el-input v-model="form.max_value" placeholder="请输入"></el-input>
          <span>{{$t('signal_management.key31')}}</span>
          <el-input v-model="form.max_value" placeholder="请输入"></el-input>
        </div>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{
          $t("global.cancel")
        }}</el-button>
        <el-button type="primary" @click="onLinkAccount">{{
          $t("global.sure")
        }}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="this.$t('signal_management.key33')"
      :visible.sync="signalshow"
      top="8vh"
    >
      <el-form :model="form">
        <!-- <div class="formlist"> -->
        <!-- <el-radio v-model="radio" label="1">{{$t('signal_management.key14')}}</el-radio>
          <el-select
            popper-class="account-select"
            :placeholder="this.$t('global.placeholder2')"
            v-model="form.max_value"
          ></el-select>
        </div>
        <el-radio-group v-model="radio" class="pl">
          <el-radio label="1">{{$t('signal_management.key15')}}</el-radio>
          <div class="inputgroup">
            <el-radio label="2">{{$t('signal_management.key16')}}</el-radio>
            <el-input v-model="form.max_value" :placeholder="this.$t('global.placeholder2')"></el-input>
          </div>
          <div class="inputgroup">
            <el-radio label="3">{{$t('signal_management.key17')}}</el-radio>
            <el-input v-model="form.max_value" :placeholder="this.$t('global.placeholder2')"></el-input>
          </div>
        </el-radio-group>-->
        <!-- <div style="width:100%;height:0;border-top:1px solid #efefef; margin:10px"></div> -->
        <div style="font-size: 12px; padding: 0 10px 10px 10px; width: 100%">
          {{ $t("signal_management.key32") }}
        </div>
        <br />
        <div>
          <el-radio-group v-model="radio1" style="padding-left: 10px">
            <el-radio label="1">{{ $t("signal_management.key18") }}</el-radio>
            <el-radio label="2">{{ $t("signal_management.key19") }}</el-radio>
          </el-radio-group>
          <span style="color: #aaadb8; font-size: 10px; padding-left: 10px"
            >* {{ $t("signal_management.key34") }}</span
          >
        </div>
        <div
          style="width: 100%; height: 0; margin: 10px"
          class="bordertop"
        ></div>
        <div class="setMain" style="width: 100%">
          <div class="additem">
            <span style="font-size: 12px; padding: 10px; width: 90px">{{
              $t("signal_management.key20")
            }}</span>
            <el-input
              v-model="form.follow_password"
              :placeholder="$t('global.placeholder2')"
            ></el-input>
          </div>
          <div class="additem">
            <span style="font-size: 12px; width: 100px">{{
              $t("signal_management.key21")
            }}</span>
            <el-input
              v-model="form.follower_min_balance"
              :placeholder="$t('global.placeholder2')"
            ></el-input>
          </div>
        </div>
        <div
          style="width: 100%; height: 0; margin: 10px"
          class="bordertop"
        ></div>
        <el-form-item :label="$t('master.subscription_fee')+'*'" label-width="90px">
          <el-select
            popper-class="account-select"
            v-model="form.subscribe_fee"
            :placeholder="$t('global.placeholder1')"
          >
            <el-option
              v-for="(item, index) in subscribe"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <div
          style="width: 100%; height: 0; margin: 10px"
          class="bordertop"
        ></div>
        <span style="font-size: 12px; padding: 10px">{{
          $t("signal_management.key22")
        }}</span>
        <div class="desc">
          <el-input
            v-model="form.account_description"
            :placeholder="$t('signal_management.key35')"
            maxlength="30"
            show-word-limit
            type="textarea"
          ></el-input>
        </div>
        <div
          style="
            color: #aaadb8;
            font-size: 10px;
            padding-left: 10px;
            margin-top: 10px;
          "
        >
          {{ $t("signal_management.desc") }}
        </div>
        <div
          style="width: 100%; height: 0; margin: 10px"
          class="bordertop"
        ></div>
        <div style="font-size: 12px; padding: 0 10px 10px 10px; width: 100%">
          {{ $t("signal_management.key23") }}
        </div>
        <div class="setting">
          <el-checkbox-group v-model="checkList" style="padding-left: 10px">
            <el-checkbox
              :label="this.$t('signal_management.key24')"
            ></el-checkbox>
            <el-checkbox label="EA"></el-checkbox>
            <el-checkbox
              :label="this.$t('signal_management.key25')"
            ></el-checkbox>
            <el-checkbox
              :label="this.$t('signal_management.key26')"
            ></el-checkbox>
            <el-checkbox
              :label="this.$t('signal_management.key27')"
            ></el-checkbox>
          </el-checkbox-group>
        </div>
        <div
          style="width: 100%; height: 0; margin: 10px"
          class="bordertop"
        ></div>
        <!-- <div style="font-size:12px;padding:10px;width:100%">{{$t('signal_management.key28')}}</div>
        <div class="pwd">
          <div style="width:53px">{{$t('signal_management.key29')}}</div>
          <el-input v-model="form.max_value" placeholder="请输入"></el-input>
        </div>
        <div class="setMain" style="width:100%;padding-left:10px">
          <span>{{$t('signal_management.key30')}}</span>
          <el-input v-model="form.max_value" placeholder="请输入"></el-input>
          <span>{{$t('signal_management.key31')}}</span>
          <el-input v-model="form.max_value" placeholder="请输入"></el-input>
        </div>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="signalshow = false">{{
          $t("global.cancel")
        }}</el-button>
        <el-button type="primary" @click="signalfee">{{
          $t("global.sure")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Subtitle from "@/components/subtitle/Subtitle";
import Pagination from "@/components/Pagination";
import {
  subdocmanage,
  signalManage,
  signalget,
  follow,
  follow_p,
  follow_c,
  addSignal,
  infoSignal,
  signalManageAcc,
} from "../../../api/user";
import Dialog from "../../strategy/components/dialog/Dialog";
import TopSkin from "@/components/TopSkin";
export default {
  data() {
    return {
      radio: "2",
      radio1: "2",
      activeName: "second",
      accountlist: [],
      position: [],
      close: [],
      type: 1,
      i: -1,
      feeid: "",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      inputKey: "",
      tableData1: [],
      list: [],
      signalshow: false,
      datalist: [],
      checkbox: [],
      checkList: [],
      positionP: { page: 1 },
      positionPage: {},
      show: false,
      flag: false,
      loading: true,
      loadingdata: false,
      loadingdata1: false,
      tablelist: [],
      form: {
        account: "",
        account_description: "",
        follower_min_balance: 0,
        follow_password: "",
        tags: "",
        is_open_signal: false,
        is_signal: true,
        subscribe_fee: "",
      },
      subscribe: [
        { label: this.$t('signal_management.nofee'), value: 0 },
        { label: "USD 1", value: 1 },
        { label: "USD 10", value: 10 },
        { label: "USD 20", value: 20 },
        { label: "USD 30", value: 30 },
        { label: "USD 50", value: 50 },
        { label: "USD 80", value: 80 },
        { label: "USD 100", value: 100 },
        { label: "USD 200", value: 200 },
        { label: "USD 500", value: 500 },
      ],
      selectKey: {
        account_number_or_platform_server: "",
        platform_type: "",
        documentary_type: "",
      },
      visible: false,
      visible1: false,
      flag1: true,
    };
  },
  methods: {
    signalinfo(id){
            infoSignal(id).then((res) => {
        if (res.results.is_open_signal === true) {
          this.radio = "1";
        } else {
          this.radio = "2";
        }
        this.form.account_description = res.results.account_description;
        if(res.results.tags!=null){
          this.checkList = res.results.tags.split("|");
        }else{
          this.checkList=[]
        }
          (this.form.follow_password = res.results.follow_password);
        this.form.follower_min_balance = res.results.follower_min_balance;
        if(res.results.subscribe_fee!=null){
          this.form.subscribe_fee = res.results.subscribe_fee;
        }else{
          this.form.subscribe_fee=""
        }
        console.log(this.form);
      });
    },
    inputAcc() {
      signalManageAcc(this.inputKey).then((res) => {
        // console.log(res)
        this.list = res.results;
        this.loading = false;
      });
    },
    getAll() {
      (this.selectKey = {
        account_number_or_platform_server: "",
        platform_type: "",
        documentary_type: "",
      }),
        follow(
          this.accountlist,
          this.selectKey.platform_type,
          this.selectKey.documentary_type,
          this.selectKey.account_number_or_platform_server
        ).then((res) => {
          this.tableData1 = res;
        });
    },
    addshow() {
      this.dialogFormVisible = true;
      signalget().then((res) => {
        this.tablelist = res.results;
        console.log(res);
      });
    },
    onLinkAccount() {
      this.form.tags = this.checkList.join("|");
      this.dialogFormVisible = false;
      if (this.radio == "1") {
        this.form.is_open_signal = true;
      } else {
        this.form.is_open_signal = false;
      }
      this.form.is_signal = true;
      if(this.form.follower_min_balance===''){
        this.form.follower_min_balance=null
      }
      addSignal(this.form.account, this.form).then((res) => {
        if (res.status === 0) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.loading = true;
          signalManage().then((res) => {
            // console.log(res)
            this.list = res.results;
            this.loading = false;
          });
        } else {
          this.$message.error(res.msg);
        }
      });
       this.form.account=""
    },
    setPop(index) {
      if (this.i == index) {
        this.i = -1;
      } else {
        this.i = index;
      }
    },
    setMaster(is_master, id, is_show) {
      this.i = -1;
      if (is_show === false) {
        this.$message.error("该账号未展示");
      } else {
        if(is_master===false){
          addSignal(id, { is_master: true }).then((res) => {
            if (res.status === 0) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              signalManage().then((res) => {
                this.list = res.results;
              });
            } else {
              this.$message.error(res.msg);
            }
          });
        }else{
           addSignal(id, { is_master: false }).then((res) => {
            if (res.status === 0) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              signalManage().then((res) => {
                this.list = res.results;
              });
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      }
    },
    deleteAcc(id) {
       infoSignal(id).then((res) => {
        this.form.account_description = res.results.account_description;
        if(res.results.tags!=null){
          this.checkList = res.results.tags.split("|");
        }else{
          this.checkList=[]
        }
          (this.form.follow_password = res.results.follow_password);
        this.form.follower_min_balance = res.results.follower_min_balance;
        if(res.results.subscribe_fee!=null){
          this.form.subscribe_fee = res.results.subscribe_fee;
        }else{
          this.form.subscribe_fee=null
        }
      });
      this.form.is_signal = false;
      
      this.loading = true;
      this.$confirm(this.$t('signal_management.deletsignal'), this.$t('signal_management.hint'), {
        confirmButtonText: this.$t('global.sure'),
        cancelButtonText: this.$t('global.cancel'),
        type: "warning",
      })
        .then(() => {
          addSignal(id, this.form).then((res) => {
            if (res.status === 0) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              signalManage().then((res) => {
                // console.log(res)
                this.list = res.results;
                this.loading = false;
              });
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    checkEye(i, id, is_show) {
      var data = {};
      if (is_show == true) {
        data.is_show = false;
        addSignal(id, data).then((res) => {
          if (res.status === 0) {
            this.list = [];
            this.$message({
              message: res.msg,
              type: "success",
            });
            signalManage().then((res) => {
              this.list = res.results;
            });
          } else {
            this.$message.error(res.msg);
          }
        });
      } else {
        data.is_show = true;
        addSignal(id, data).then((res) => {
          if (res.status === 0) {
            this.list = [];
            this.$message({
              message: res.msg,
              type: "success",
            });
            signalManage().then((res) => {
              this.list = res.results;
            });
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    getChange() {
      follow(
        this.accountlist,
        this.selectKey.platform_type,
        this.selectKey.documentary_type,
        this.selectKey.account_number_or_platform_server
      ).then((res) => {
        this.tableData1 = res;
      });
    },
    inputChange() {
      follow(
        this.accountlist,
        this.selectKey.platform_type,
        this.selectKey.documentary_type,
        this.selectKey.account_number_or_platform_server
      ).then((res) => {
        this.tableData1 = res;
      });
    },
    cancelBtn() {
      if (this.checkbox.length !== 0) {
        console.log(111);
        this.checkbox = [];
        this.position = [];
        this.close = [];
        this.flag = false;
      } else if (this.checkbox.length === 0) {
        this.loadingdata1 = true;
        this.loadingdata = true;
        this.flag = true;
        signalManage().then((res) => {
          console.log(res);
          for (var i = 0; i <= res.results.length - 1; i++) {
            this.checkbox.push(i);
            this.accountlist.push(`'` + res.results[i].id + `'`);
            follow_p(this.accountlist, 1).then((res) => {
              this.loadingdata = false;
              this.position = res.results;
              this.positionPage = res;
            });
            follow_c(this.accountlist).then((res) => {
              this.loadingdata1 = false;
              this.close = res.results;
            });
          }
        });
        // console.log(111);
        // this.flag = true;
        // for (var i = 0; i <= this.list.length - 1; i++) {
        //   console.log(i);
        //   // this.checkbox[i].push(i)
        // }
      }
    },
    signalset(id) {
      infoSignal(id).then((res) => {
        if (res.results.is_open_signal === true) {
          this.radio1 = "1";
        } else {
          this.radio1 = "2";
        }
        this.form.account_description = res.results.account_description;
        if(res.results.tags==null){
          this.checkList=[]
        }else{
          this.checkList = res.results.tags.split("|")
        }
          (this.form.follow_password = res.results.follow_password);
        this.form.follower_min_balance = res.results.follower_min_balance;
        this.form.subscribe_fee = res.results.subscribe_fee;
      });
      this.visible = false;
      this.signalshow = true;
      this.i = -1;
      this.feeid = id;
    },
    signalfee() {
      this.signalshow = false;
      this.form.tags = this.form.tags = this.checkList.join("|");
      if(this.form.follower_min_balance===''){
        this.form.follower_min_balance=null
      }
      addSignal(this.feeid, this.form).then((res) => {
        if (res.status === 0) {
          this.$message({
            message: res.msg,
            type: "success",
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    pageChange() {
      console.log(this.positionP.page);
      follow_p(this.accountlist, this.positionP.page).then((res) => {
        this.position = res.results;
      });
    },
    chooseAcc(index, id, platform, platformserver) {
      if (this.checkbox.includes(index)) {
        this.checkbox.splice(this.checkbox.indexOf(index), 1);
        this.accountlist.splice(this.accountlist.indexOf(id), 1);
      } else {
        this.checkbox.push(index);
        this.accountlist.push(`'` + id + `'`);
      }
      this.loadingdata = true;
      this.loadingdata1 = true;
      if (this.checkbox.length !== 0) {
        this.flag = true;
      } else if (this.checkbox.length === 0) {
        this.flag = false;
      }
      follow(this.accountlist, platform, this.type, platformserver).then(
        (res) => {
          this.tableData1 = res;
        }
      );
      follow_p(this.accountlist, 1).then((res) => {
        this.loadingdata = false;
        this.position = res.results;
        this.positionPage = res;
      });
      follow_c(this.accountlist).then((res) => {
        this.loadingdata1 = false;
        this.close = res.results;
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
    Dialog,
    TopSkin,
    Pagination,
  },
  created() {
    this.loading = true;
    signalManage().then((res) => {
      // console.log(res)
      this.list = res.results;
      this.loading = false;
    });
    // follow('1a3b877f-7d41-4c96-96ca-b5ed7531fa71','MT4','1','FairTradingGlobal-Asia').then(res=>{
    //   console.log(res)
    // })
    // docmanage().then((res) => {
    //   this.tableData1 = res.data;
    //   for (var i = 0; i <= res.data.length - 1; i++) {
    //     this.tableData1[i].id = i;
    //   }
    //   this.tableData1[2].hasChildren = true;
    // });
  },
};
</script>

<style lang="scss" src='./signalmanage.scss' scoped>
</style>
<style>
.el-popover {
  width: 78px;
  min-width: none;
  margin-top: 0;
}
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
.setPop {
  width: 80px;
  height: 50px;
  position: relative;
  bottom: 50%;
  left: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #ffe;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
<style lang="scss">
@import "@/styles/_handle.scss";
.setPop{
  width: 60px;
height: 60px;
@include font_color("font_color5");
@include background_color("background_color3");
@include border_color("border_color1");
}
</style>