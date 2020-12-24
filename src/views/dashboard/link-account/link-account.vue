<template>
  <div id="account">
    <!-- <div class="header">
        <div class="link-title">{{$t('link_account.link_account')}}</div>
      </div>-->
    <!-- <TopSkin :title="$t('link_account.link_account')" /> -->
    <div class="top-title">{{ $t("link_account.link_account") }}</div>

    <div class="nav">
      <div size="mini" class="all">{{ $t("link_account.all") }}</div>
      <div class="filter">
        <span>{{ $t("link_account.account") }}</span>
        <el-select
          popper-class="account-select"
          size="mini"
          v-model="selectKey.account_type"
          @change="onFilter"
          slot="prepend"
          :placeholder="$t('global.placeholder3')"
        >
          <el-option
            v-for="e in [
              { label: $t('my_assets.all'), value: '' },
              { label: $t('link_account.real_account'), value: 'real' },
              { label: $t('link_account.virtual_account'), value: 'demo' },
            ]"
            :key="e.value"
            size="mini"
            :label="e.label"
            :value="e.value"
          ></el-option>
        </el-select>
        <span>{{ $t("link_account.password") }}</span>
        <el-select
          popper-class="account-select"
          size="mini"
          v-model="selectKey.login_type"
          @change="onFilter"
          slot="prepend"
          :placeholder="$t('global.placeholder3')"
        >
          <el-option
            v-for="e in [
              { label: $t('my_assets.all'), value: '' },
              {
                label: $t('link_account.transaction_password'),
                value: 'Trader',
              },
              { label: $t('link_account.virtual_password'), value: 'investor' },
            ]"
            :key="e.value"
            size="mini"
            :label="e.label"
            :value="e.value"
          ></el-option>
        </el-select>
        <span>{{ $t("link_account.status") }}</span>
        <el-select
          popper-class="account-select"
          size="mini"
          v-model="selectKey.status"
          @change="onFilter"
          slot="prepend"
          :placeholder="$t('global.placeholder3')"
        >
          <el-option
            v-for="e in [
              { label: $t('my_assets.all'), value: '' },
              { label: $t('link_account.linked'), value: 'connected' },
              { label: $t('link_account.notlinked'), value: 'disconnected' },
            ]"
            :key="e.value"
            size="mini"
            :label="e.label"
            :value="e.value"
          ></el-option>
        </el-select>
      </div>
      <div class="search">
        <el-input
          size="mini"
          :placeholder="$t('global.placeholder5')"
          prefix-icon="el-icon-search"
          v-model="selectKey.account_number_or_platform_server"
          @change="onFilter"
          class="input"
        ></el-input>
      </div>
      <div class="icons">
        <div class="icon">
          <svg-icon v-if="isListView" iconClass="list2"></svg-icon>
          <svg-icon
            v-else
            iconClass="list1"
            @click.native="isListView = true"
            className="notSel"
          ></svg-icon>
          <svg-icon v-if="!isListView" iconClass="card2"></svg-icon>
          <svg-icon
            v-else
            iconClass="card1"
            @click.native="isListView = false"
            className="notSel"
          ></svg-icon>
        </div>
        <el-button
          size="mini"
          class="addbtn"
          type="text"
          @click="toLinkAccount"
          >{{ $t("link_account.add_account") }}</el-button
        >

        <el-dialog
          :title="$t('link_account.link_account')"
          :visible.sync="dialogFormVisible"
          @click.native="onClickDialog"
        >
          <el-form ref="linkForm" :model="linkForm" :rules="linkRules">
            <el-form-item :label="$t('link_account.key1')" prop="platform">
              <el-select
                popper-class="account-select"
                v-model="linkForm.platform"
                :placeholder="$t('global.placeholder1')"
                @change="changePlatform"
              >
                <el-option
                  v-for="e in platTypes"
                  :key="e.platform_type"
                  size="mini"
                  :label="e.platform_type"
                  :value="e.platform_type"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :label="$t('link_account.key2')"
              prop="broker"
              class="broker1"
            >
              <div class="server">
                <div @click.stop="onOptionShow">
                  <el-input
                    :placeholder="$t('global.placeholder1')"
                    v-model="linkForm.broker"
                    @focus="onfocus"
                  >
                    <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
                    <el-tooltip
                      slot="append"
                      class="item"
                      effect="dark"
                      :content="$t('global.search')"
                      placement="top"
                    >
                      <svg-icon
                        @click.native="searchBrokers"
                        iconClass="search"
                        class="svg-search"
                      ></svg-icon>
                    </el-tooltip>
                  </el-input>
                </div>
                <div v-show="optionVisible" class="options">
                  <ul v-if="brokers.length > 0 && !isLoading">
                    <li v-for="e in brokers" :key="e.id" @click="onSelect(e)">
                      {{ e.name }}
                    </li>
                  </ul>
                  <div v-else class="nodata">
                    <Loading v-if="isLoading" />
                    <span v-else>{{ $t("global.nodata") }}</span>
                  </div>
                </div>
              </div>
            </el-form-item>
            <el-form-item
              :label="$t('link_account.key3')"
              prop="account_number"
            >
              <el-input
                v-model="linkForm.account_number"
                :placeholder="$t('global.placeholder2')"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('link_account.key5')"
              prop="account_password"
            >
              <el-input
                v-model="linkForm.account_password"
                :placeholder="$t('global.placeholder2')"
                autocomplete="off"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('link_account.key4')"
              prop="account_nick_name"
            >
              <el-input
                v-model="account_nick_name"
                :placeholder="$t('link_account.placeholder2')"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <span class="note"> {{ $t("link_account.notes") }} </span>
          <span style="color: #f6665d"> * </span>
          <span class="note"> {{ $t("link_account.notes2") }} </span>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">{{
              $t("global.cancel")
            }}</el-button>
            <el-button type="primary" @click="onLinkAccount">{{
              $t("global.sure")
            }}</el-button>
          </div>
        </el-dialog>
      </div>

      <el-dialog
        :visible.sync="dialogFormVisible2"
        center
        custom-class="successfully-linked"
      >
        <div class="top">
          <img src="@/assets/images/success-linked.png" alt />
          <span class="text"
            >{{ $t("link_account.dialog1") }}&nbsp;5648152</span
          >
        </div>
        <div class="content">
          <div>
            <span>{{ $t("link_account.dialog2") }}</span>
            <span>64596556</span>
          </div>
          <div>
            <span>{{ $t("link_account.dialog3") }}</span>
            <span>Choie</span>
          </div>
          <div>
            <span>{{ $t("link_account.dialog4") }}</span>
            <span>Tickmill-Live 01</span>
          </div>
          <div>
            <span>{{ $t("link_account.dialog5") }}</span>
            <span>1:200</span>
          </div>
        </div>
        <div slot="footer" class="dialog-footer footer">
          <span>{{ $t("link_account.dialog6") }}</span
          >&nbsp; <span>{{ $t("link_account.dialog7") }}</span
          >&nbsp;
          <span>{{ $t("link_account.dialog8") }}</span>
        </div>
      </el-dialog>
    </div>
    <div class="contain">
      <!-- List view -->
      <div class="list-view" v-if="isListView">
        <base-table :data="tableData" :col-configs="plConfigs">
          <template #index>
            <el-table-column type="index" width="40"></el-table-column>
          </template>
          <template #connect="{ colConfig }">
            <el-table-column v-bind="colConfig">
              <template #default="{ row }">
                <div v-if="row.status === 'connected'" class="link-status">
                  <svg-icon iconClass="greenlink"></svg-icon>
                  <span style="color: #3ab98e">{{
                    $t("link_account.linked")
                  }}</span>
                </div>
                <div
                  v-else-if="row.status === 'disconnected'"
                  class="link-status"
                >
                  <svg-icon iconClass="redlink"></svg-icon>
                  <span style="color: #f5222d">{{
                    $t("link_account.notlinked")
                  }}</span>
                </div>
              </template>
            </el-table-column>
          </template>
          <template #operating="{ colConfig }">
            <el-table-column v-bind="colConfig">
              <template #default="{ row }">
                <div class="operation">
                  <span class="remove" @click="toRemove(row.id)">{{
                    $t("link_account.remove")
                  }}</span>
                  <span class="change_password" @click="toChangePass(row)">{{
                    $t("link_account.update")
                  }}</span>
                </div>
              </template>
            </el-table-column>
          </template>
        </base-table>
        <!-- <Pagination
          :total="listQuery.total"
          :page.sync="listQuery.page"
          @pagination="getLinkList(listQuery)"
        /> -->
      </div>
      <!-- Card view -->
      <div class="card-view" v-if="!isListView">
        <div class="box" v-for="(item, index) in tableData" :key="index">
          <el-card :class="cardbgc[item.status]">
            <div class="head">
              <div class="left">
                <div v-if="item.is_show">
                  <svg-icon iconClass="eyes"></svg-icon>
                  <span>{{ $t("link_account.showing") }}</span>
                </div>
                <div v-else>
                  <svg-icon iconClass="eyes2"></svg-icon>
                  <span>{{ $t("link_account.not_show") }}</span>
                </div>
              </div>
              <div class="right">
                <svg-icon v-if="item.is_master" iconClass="zhu"></svg-icon>
                <svg-icon
                  @click.native="toChangePass(item)"
                  iconClass="edit"
                ></svg-icon>
                <svg-icon
                  @click.native="toRemove(item.id)"
                  iconClass="delete"
                ></svg-icon>
              </div>
            </div>
            <div class="content">
              <div class="server">
                <span>{{ item.platform_server }}</span>
                <div v-if="item.status === 'connected'" class="link-status">
                  <svg-icon iconClass="greenlink"></svg-icon>
                  <span style="color: #3ab98e">{{
                    $t("link_account.linked")
                  }}</span>
                </div>
                <div
                  v-else-if="item.status === 'disconnected'"
                  class="link-status"
                >
                  <svg-icon iconClass="redlink"></svg-icon>
                  <span style="color: #f5222d">{{
                    $t("link_account.notlinked")
                  }}</span>
                </div>
              </div>
              <div class="user">
                <span v-if="item.account_nick_name" class="username">{{
                  item.account_nick_name
                }}</span>
                <span class="account">{{ item.account_number }}</span>
              </div>
              <div class="type">
                <div class="left">
                  <!-- account_type 账户类型 -->
                  <div v-if="item.account_type === 'real'">
                    <svg-icon iconClass="real"></svg-icon>
                    <span>{{ $t("link_account.real_account") }}</span>
                  </div>
                  <div v-else-if="item.account_type === 'demo'">
                    <svg-icon iconClass="virtual"></svg-icon>
                    <span>{{ $t("link_account.virtual_account") }}</span>
                  </div>
                  <div v-else>
                    <svg-icon iconClass="virtual"></svg-icon>
                    <span>{{ item.account_type }}</span>
                  </div>
                  <!-- login_type 登录类型 -->
                  <div v-if="item.login_type === 'Trader'">
                    <span>{{ $t("link_account.transaction_password") }}</span>
                  </div>
                  <div v-else-if="item.login_type === 'investor'">
                    <span>{{ $t("link_account.virtual_password") }}</span>
                  </div>
                  <div v-else>
                    <span>{{ item.login_type }}</span>
                  </div>
                  <!-- <div>{{ item.account_type }}</div> -->
                  <!-- <div>{{ item.login_type }}</div> -->
                </div>
                <span>{{ item.platform }}</span>
              </div>
            </div>
          </el-card>
        </div>
        <div v-if="tableData.length === 0" class="empty">
          {{ $t("link_account.empty") }}
        </div>
      </div>
      <div style="text-align: center">
        <Pagination
          :total="listQuery.total"
          :page.sync="listQuery.page"
          @pagination="getLinkList(listQuery)"
        />
      </div>
      <!-- 确定移除弹框 -->
      <el-dialog
        :visible.sync="dialogFormVisible3"
        center
        custom-class="delete-dialog"
      >
        <div class="top">
          <img src="@/assets/images/warn.png" alt />
          <span class="text">{{ $t("link_account.isdelete") }}&nbsp;</span>
        </div>
        <div class="content">{{ $t("link_account.delete_prompt") }}</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible3 = false">{{
            $t("global.cancel")
          }}</el-button>
          <el-button type="primary" @click="onRemoveAccount">{{
            $t("global.sure")
          }}</el-button>
        </div>
      </el-dialog>
      <!-- 修改密码弹框 -->
      <el-dialog
        :title="$t('link_account.update')"
        :visible.sync="dialogFormVisible4"
        custom-class="pass-dialog"
      >
        <el-form ref="passForm" :model="passForm" :rules="passRules">
          <el-form-item
            :label="$t('link_account.server_type')"
            prop="platform_server"
          >
            <el-select
              popper-class="account-select"
              v-model="passForm.platform_server"
              :placeholder="$t('global.placeholder1')"
              disabled
            >
              <el-option label="server1" value="server1"></el-option>
              <el-option label="server2" value="server2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('link_account.platform_type')"
            prop="platform"
          >
            <el-input
              v-model="passForm.platform"
              :placeholder="$t('global.placeholder2')"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('link_account.account_number')"
            prop="account_number"
          >
            <el-input
              v-model="passForm.account_number"
              :placeholder="$t('global.placeholder2')"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('link_account.new_pass')" prop="new_pass">
            <el-input
              v-model="passForm.new_pass"
              :placeholder="$t('global.placeholder2')"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('link_account.login_pass')"
            prop="login_pass"
          >
            <el-input
              v-model="passForm.login_pass"
              :placeholder="$t('global.placeholder2')"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible4 = false">{{
            $t("global.cancel")
          }}</el-button>
          <el-button type="primary" @click="onChangePass">{{
            $t("global.sure")
          }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import BaseTable from "@/components/BaseTable";
import TopSkin from "@/components/TopSkin";
import Loading from "@/components/LoadAnimation";
import { debounce } from "@/utils";
import { mapGetters } from "vuex";
import Pagination from "@/components/Pagination";

import {
  getLinksList,
  linkAccount,
  removeAccount,
  changePass,
  getPlatformType,
  getBrokers,
} from "@/api";
import { Message } from "element-ui";

export default {
  components: {
    BaseTable,
    TopSkin,
    Loading,
    Pagination,
  },
  data() {
    var validPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t("login.password")));
      } else {
        return callback();
      }
    };
    var validServer = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t("link_account.valid")));
      } else {
        return callback();
      }
    };
    return {
      listQuery: {
        total: 0,
        page: 1,
      },
      isLoading: false,
      brokerKey: "",
      optionVisible: false,
      cardbgc: {
        connected: "connected",
        disconnected: "disconnect",
      },
      platTypes: [],
      brokers: [],
      isListView: true,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      linkForm: {
        platform: "",
        broker: "",
        v2_broker_id: "",
        account_number: "",
        account_password: "",
        // account_nick_name: "",
      },
      account_nick_name: "",
      passForm: {
        new_pass: "",
        login_pass: "",
      },
      linkRules: {
        platform: [{ required: true, validator: validServer, trigger: "blur" }],
        broker: [{ required: true, validator: validServer, trigger: "blur" }],
        account_number: [
          { required: true, validator: validServer, trigger: "blur" },
        ],
        account_password: [
          { required: true, validator: validServer, trigger: "blur" },
        ],
      },
      passRules: {
        new_pass: [{ validator: validPassword }],
        login_pass: [{ validator: validPassword }],
      },
      selectKey: {
        account_type: "",
        login_type: "",
        status: "",
      },
      inputKey: "",
      tableData: [],
      flag: false,
      keyword: "",
      list: [],
    };
  },
  computed: {
    ...mapGetters(["msgStatus"]),
    plConfigs() {
      return [
        { slot: "index" },
        {
          prop: "platform_server",
          label: this.$t("link_account.tablekey1"),
          width: 240,
          // sortable: true,
        },
        {
          prop: "account_number",
          label: this.$t("link_account.account_number"),
        },
        {
          prop: "account_nick_name",
          label: this.$t("link_account.tablekey3"),
        },
        {
          prop: "account_type",
          label: this.$t("link_account.tablekey4"),
        },
        {
          prop: "platform",
          label: this.$t("link_account.tablekey5"),
        },
        {
          prop: "login_type",
          label: this.$t("link_account.tablekey6"),
        },
        {
          prop: "status",
          label: this.$t("link_account.tablekey7"),
          slot: "connect",
        },
        {
          prop: "operating",
          label: this.$t("link_account.tablekey8"),
          slot: "operating",
          width: 220,
        },
      ];
    },
  },
  mounted() {
    // console.log(this.msgStatus);
    this.getLinkList();
  },
  watch: {
    msgStatus: {
      deep: true,
      handler: function (newVal, oldVal) {
        // console.log(newVal);
        this.$message.success(newVal.msg);
        this.getLinkList(this.listQuery);
      },
    },
    // msgStatus: function (val) {
    //   if (val === 201) {
    //     this.getLinkList(this.listQuery);
    //     Message({
    //       message: this.$t('global.completed'),
    //       type: "success",
    //       duration: 5 * 1000,
    //     });
    //   }
    // },
    "linkForm.broker": function (query) {
      // console.log(query);
      this.brokers = this.list.filter((item) => {
        return item.name.toLowerCase().indexOf(query.toLowerCase()) == 0;
      });
    },
  },
  methods: {
    onSelect(broker) {
      var ids = [];
      this.list.forEach((item) => {
        ids.push(item.id);
      });

      if (ids.indexOf(broker.id) < 0) {
        this.list.unshift(broker);
      }

      // console.log(name);
      // console.log(id);
      this.linkForm.broker = broker.name;
      this.linkForm.v2_broker_id = broker.id;
      this.optionVisible = false;
    },
    onfocus() {
      this.optionVisible = true;
      this.brokers = this.list;
    },
    onOptionShow() {
      this.optionVisible = true;
    },
    onClickDialog() {
      // console.log(`this.optionVisible=`, this.optionVisible);
      this.optionVisible = false;
    },
    inputChange(val) {
      console.log(val);
    },
    getLinkList(obj) {
      getLinksList(obj).then((res) => {
        this.tableData = res.results;
        this.listQuery.total = res.count;
      });
    },
    getList() {
      getPlatformType().then((res) => {
        this.platTypes = res.results;
        this.linkForm.platform = res.results[0].platform_type;
        // this.getBrokerList();
        // getBrokers().then((res) => {
        //   if (res.results) {
        //     this.brokers = res.results;
        //     this.list = res.results;
        //     this.isLoading = false;
        //     // console.log(`brokers=`, this.brokers)
        //   }
        // });
      });
    },
    toLinkAccount() {
      this.dialogFormVisible = true;
      this.getList();
      this.$nextTick(() => {
        this.$refs["linkForm"].resetFields();
      });
    },
    onFocus(e) {
      // console.log(`focus`, e.target.value);
      this.keyword = e.target.value;
    },
    onBlur(e) {
      // console.log(`blur`, e.target.value);
      this.keyword = e.target.value;
    },
    remoteMethod(query) {
      // console.log(`remote`, query);
      if (query) {
        if (this.flag) {
          // console.log(`remote search`, query);
          this.getBrokerList(query);
          this.flag = false;
        } else {
          // console.log(`search`, query);
          this.brokers = this.list.filter((item) => {
            return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }
      } else {
        this.brokers = this.list;
      }
    },
    searchBrokers() {
      // console.log(this.linkForm.broker);
      var query = this.linkForm.broker;
      this.flag = true;
      this.remoteMethod(query);
    },
    getBrokerList(val) {
      this.isLoading = true;
      // console.log(val);
      debounce(() => {
        getBrokers({ search: val, platform: this.linkForm.platform }).then(
          (res) => {
            if (res.results) {
              this.brokers = res.results;
              this.isLoading = false;
              // console.log(`brokers=`, this.brokers);
            }
          },
          (err) => {
            console.log(`err=`, err);
            this.isLoading = false;
          }
        );
      }, 500); //函数防抖
    },
    changePlatform(platform) {
      console.log(`platform=`, platform);
    },
    onLinkAccount() {
      // this.$store.commit("SET_STATUS", 200);
      if (this.account_nick_name) {
        this.linkForm.account_nick_name = this.account_nick_name;
      }
      this.$refs.linkForm.validate((valid) => {
        if (valid) {
          linkAccount(this.linkForm).then(
            (res) => {
              if (res.status === 0) {
                this.dialogFormVisible = false;
                // this.$message.success(res.msg);
                this.getLinkList(this.listQuery);
              } else {
                this.$message.error(res.msg);
              }
            },
            (err) => {
              if (err.response.status === 400) {
                this.$message.error("输入有误");
              } else {
                this.$message.error("出错了，请稍后再试");
              }
            }
          );
        } else {
          return false;
        }
      });
    },
    onFilter() {
      this.getLinkList(this.selectKey);
    },
    // onAccountFilter(value) {
    //   console.log(this.selectKey)
    //   // console.log(value);
    //   this.getLinkList({ account_type: value });
    // },
    // onPassFilter(value) {
    //   // console.log(value);
    //   this.getLinkList({ login_type: value });
    // },
    // onStatusFilter(value) {
    //   // console.log(value);
    //   this.getLinkList({ status: value });
    // },
    onSearch(value) {
      // console.log(value);
      this.getLinkList({ account_number_or_platform_server: value });
    },
    toRemove(id) {
      this.dialogFormVisible3 = true;
      this.accountId = id;
    },
    onRemoveAccount() {
      // this.$store.commit("SET_STATUS", 200);
      // console.log(this.accountId);
      removeAccount(this.accountId).then(
        (res) => {
          this.dialogFormVisible3 = false;
          // this.getLinkList();
        },
        (err) => {
          this.dialogFormVisible3 = false;
          Message({
            message: "移除失败",
            type: "error",
            duration: 3 * 1000,
          });
        }
      );
    },
    toChangePass(row) {
      console.log(row);
      this.dialogFormVisible4 = true;
      this.passForm.account_number = row.account_number;
      this.passForm.platform = row.platform;
      this.passForm.platform_server = row.platform_server;
      this.passForm.id = row.id;
      this.$nextTick(() => {
        this.$refs["passForm"].resetFields();
      });
    },
    onChangePass() {
      var obj = {
        login_password: this.passForm.login_pass,
        account_password: this.passForm.new_pass,
        id: this.passForm.id,
      };
      this.$refs["passForm"].validate((valid) => {
        if (valid) {
          changePass(obj).then(
            (res) => {
              if (res.status === 0) {
                this.dialogFormVisible4 = false;
                this.$message.success(res.msg);
              } else {
                this.$message.error(res.msg);
              }
            },
            (err) => {
              this.$message.error("出错了");
              console.log(err.response);
            }
          );
        }
      });
    },
  },
};
</script>

<style lang="scss" src="./link-account.scss" scoped>
</style>