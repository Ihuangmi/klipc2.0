<template>
  <div id="housekeeper">
    <!-- <TopSkin :title="$t('housekeeper.housekeeper')" /> -->
    <div class="top-title">{{ $t("housekeeper.housekeeper") }}</div>
    <div class="content">
      <!-- <div class="header">{{$t('housekeeper.housekeeper')}}</div> -->
      <el-row>
        <el-col :span="18">
          <div class="left">
            <div class="tabs">
              <el-tabs v-model="activeName" @tab-click="onSwitchTab">
                <!-- 我的信息 -->
                <el-tab-pane name="1" :label="$t('housekeeper.user_info')">
                  <div class="user_info">
                    <div class="edit">
                      <div>{{ $t("housekeeper.edit_info") }}</div>
                      <el-button @click="flag = false" class="eidtbtn">{{
                        $t("housekeeper.edit")
                      }}</el-button>
                    </div>
                    <!-- <el-scrollbar style="height: 74vh"> -->
                    <div class="scrollbar" style="height: 74vh">
                      <div class="body">
                        <el-form
                          ref="form"
                          :model="userInfo"
                          :rules="rules"
                          status-icon
                          label-width="150px"
                          size="mini"
                        >
                          <div class="avatar">
                            <div class="cc">
                              <el-upload
                                class="avatar-uploader"
                                :action="uploadUrl"
                                :headers="headers"
                                name="avatar"
                                :show-file-list="false"
                                accept="image/png, image/gif, image/jpg, image/jpeg"
                                :on-success="handleAvatarSuccess"
                                :on-error="handleAvatarError"
                                :before-upload="beforeAvatarUpload"
                                :disabled="flag"
                              >
                                <img
                                  v-if="userInfo.avatar"
                                  :src="userInfo.avatar"
                                  class="avatar el-upload-list__item-thumbnail"
                                />
                                <i
                                  v-else
                                  class="el-icon-plus avatar-uploader-icon"
                                ></i>
                              </el-upload>
                            </div>
                            <div class="user">
                              <div class="username">
                                {{ userInfo.nick_name }}
                              </div>
                            </div>
                          </div>
                          <el-form-item
                            :label="$t('link_account.dialog3')"
                            prop="username"
                          >
                            <el-input
                              v-model="userInfo.username"
                              disabled
                            ></el-input>
                          </el-form-item>
                          <el-form-item
                            :label="$t('housekeeper.form2')"
                            prop="name"
                          >
                            <el-input
                              v-model="userInfo.real_name"
                              :disabled="flag"
                            ></el-input>
                          </el-form-item>
                          <el-form-item :label="$t('housekeeper.form3')">
                            <el-input
                              v-model="userInfo.nick_name"
                              :disabled="flag"
                            ></el-input>
                          </el-form-item>
                          <el-form-item
                            :label="$t('housekeeper.form4')"
                            prop="mobile"
                          >
                            <el-input
                              v-model="userInfo.mobile"
                              :disabled="flag"
                            ></el-input>
                          </el-form-item>
                          <el-form-item
                            :label="$t('housekeeper.form5')"
                            prop="country"
                          >
                            <el-input
                              v-model="userInfo.country"
                              :disabled="flag"
                            ></el-input>
                          </el-form-item>
                          <el-form-item :label="$t('housekeeper.form6')">
                            <el-input
                              v-model="userInfo.city"
                              :disabled="flag"
                            ></el-input>
                          </el-form-item>
                          <el-form-item
                            :label="$t('housekeeper.form7')"
                            prop="email"
                          >
                            <el-input
                              v-model="userInfo.email"
                              :disabled="flag"
                            ></el-input>
                          </el-form-item>
                          <!-- <el-form-item :label="$t('housekeeper.form8')">
                            <el-input
                              v-model="userInfo.follow_password"
                              :disabled="flag"
                            ></el-input>
                          </el-form-item> -->
                          <!-- <el-form-item :label="$t('master.des')">
                            <el-select v-model="userInfo.labels" :placeholder="$t('global.placeholder1')" multiple filterable popper-class="account-select">
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>-->
                          <el-form-item>
                            <el-button
                              v-show="!flag"
                              class="sure"
                              type="primary"
                              @click="submitUserInfo('form')"
                              >{{ $t("global.sure") }}</el-button
                            >
                          </el-form-item>
                        </el-form>
                        <div class="progress">
                          <div class="text">
                            {{ $t("housekeeper.data_completion") }}
                          </div>
                          <el-progress
                            type="circle"
                            color="#FF7D00"
                            :width="108"
                            :percentage="percent1"
                          ></el-progress>
                        </div>
                      </div>
                    </div>
                    <!-- </el-scrollbar> -->
                  </div>
                </el-tab-pane>
                <!-- 实名制 -->
                <el-tab-pane name="2" :label="$t('housekeeper.real')">
                  <div class="real_name">
                    <div class="edit">
                      <div>{{ $t("housekeeper.edit_info") }}</div>
                      <el-button @click="flag2 = false" class="eidtbtn">{{
                        $t("housekeeper.edit")
                      }}</el-button>
                    </div>
                    <!-- <el-scrollbar style="height: 74vh"> -->
                    <div class="scrollbar" style="height: 74vh">
                      <div class="body">
                        <el-form
                          ref="form2"
                          :model="BankForm"
                          label-width="150px"
                          size="mini"
                        >
                          <el-form-item :label="$t('housekeeper.form9')">
                            <el-input
                              v-model="BankForm.username"
                              disabled
                            ></el-input>
                          </el-form-item>
                          <el-form-item :label="$t('housekeeper.form10')">
                            <el-input
                              v-model="BankForm.wallet_id"
                              disabled
                            ></el-input>
                          </el-form-item>
                          <el-form-item :label="$t('housekeeper.form19')">
                            <el-input
                              v-model="BankForm.bank_account_number"
                              :disabled="flag2"
                            ></el-input>
                          </el-form-item>
                          <el-form-item :label="$t('housekeeper.form20')">
                            <el-input
                              v-model="BankForm.bank_account_registered_mobile"
                              :disabled="flag2"
                            ></el-input>
                          </el-form-item>
                          <el-form-item :label="$t('housekeeper.form13')">
                            <el-input
                              v-model="BankForm.bank_account_name"
                              :disabled="flag2"
                            ></el-input>
                          </el-form-item>
                          <el-form-item :label="$t('housekeeper.form14')">
                            <el-input
                              v-model="BankForm.bank_branch_name"
                              :disabled="flag2"
                            ></el-input>
                          </el-form-item>
                          <el-form-item :label="$t('housekeeper.form15')">
                            <el-input
                              v-model="BankForm.bank_city"
                              :disabled="flag2"
                            ></el-input>
                          </el-form-item>
                          <el-form-item :label="$t('housekeeper.form16')">
                            <el-upload
                              class="avatar-uploader"
                              :action="uploadUrl"
                              :headers="headers"
                              name="id_card_front"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess2"
                              :on-error="handleAvatarError"
                              :before-upload="beforeAvatarUpload"
                              :disabled="flag2"
                            >
                              <img
                                v-if="BankForm.id_card_front"
                                :src="BankForm.id_card_front"
                                class="avatar"
                              />
                              <i
                                v-else
                                class="el-icon-plus avatar-uploader-icon"
                              ></i>
                            </el-upload>
                            <el-upload
                              class="avatar-uploader"
                              :action="uploadUrl"
                              :headers="headers"
                              name="id_card_back"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess3"
                              :on-error="handleAvatarError"
                              :before-upload="beforeAvatarUpload"
                              :disabled="flag2"
                            >
                              <img
                                v-if="BankForm.id_card_back"
                                :src="BankForm.id_card_back"
                                class="avatar"
                              />
                              <i
                                v-else
                                class="el-icon-plus avatar-uploader-icon"
                              ></i>
                            </el-upload>
                          </el-form-item>
                          <el-form-item :label="$t('housekeeper.form17')">
                            <el-input
                              v-model="BankForm.swift_bic_iban"
                              :disabled="flag2"
                            ></el-input>
                          </el-form-item>
                          <el-form-item :label="$t('housekeeper.form18')">
                            <el-input
                              v-model="BankForm.bank_address"
                              :disabled="flag2"
                            ></el-input>
                          </el-form-item>
                          <el-form-item>
                            <el-button
                              v-show="!flag2"
                              class="sure"
                              type="primary"
                              @click="submitBankForm('form')"
                              >{{ $t("global.sure") }}</el-button
                            >
                          </el-form-item>
                        </el-form>
                        <div class="progress">
                          <div class="text">
                            {{ $t("housekeeper.data_completion") }}
                          </div>
                          <el-progress
                            type="circle"
                            color="#FF7D00"
                            :width="108"
                            :percentage="percent2"
                          ></el-progress>
                        </div>
                      </div>
                    </div>
                    <!-- </el-scrollbar> -->
                  </div>
                </el-tab-pane>
                <!-- 购买/提取 -->
                <el-tab-pane name="3" :label="$t('housekeeper.buy')">
                  <div class="recharge">
                    <el-form
                      ref="form3"
                      :model="walletForm"
                      label-width="150px"
                      size="mini"
                    >
                      <el-form-item :label="$t('housekeeper.wallet')">
                        <div class="wallet">
                          <span>{{ $t("housekeeper.amount_available") }}</span>
                          <span>${{ userLevel.wallet_amount }}</span>
                          <span>{{ $t("housekeeper.frozen_amount") }}</span>
                          <span>${{ userLevel.frost_wallet }}</span>
                        </div>
                      </el-form-item>
                      <el-form-item :label="$t('housekeeper.operation')">
                        <el-radio
                          v-model="walletForm.operation"
                          label="recharge"
                          >{{ $t("housekeeper.recharge") }}</el-radio
                        >
                        <el-radio
                          v-model="walletForm.operation"
                          label="withdraw"
                          >{{ $t("housekeeper.withdraw") }}</el-radio
                        >
                      </el-form-item>
                      <el-form-item
                        v-if="walletForm.operation === 'recharge'"
                        :label="$t('housekeeper.paymethod')"
                      >
                        <div class="payStyles">
                          <div
                            class="payment"
                            v-for="(item, index) in payItems"
                            :key="item.id"
                          >
                            <input
                              :class="payStyles[index]"
                              type="radio"
                              :id="item.id"
                              :value="item.value"
                              v-model="walletForm.paymethod"
                            />
                            <label :class="payStyles[index]" :for="item.id">
                              <!-- <svg-icon :iconClass="item.icon"></svg-icon> -->
                              <div>{{ item.label }}</div>
                            </label>
                            <div class="sel">
                              <svg-icon
                                v-if="walletForm.paymethod === item.value"
                                iconClass="selected"
                              ></svg-icon>
                            </div>
                          </div>
                        </div>
                      </el-form-item>
                      <el-form-item :label="$t('housekeeper.currency_type')">
                        <el-select
                          v-if="
                            walletForm.paymethod === 'alipay' &&
                            walletForm.operation === 'recharge'
                          "
                          popper-class="account-select"
                          size="mini"
                          v-model="walletForm.currency_type"
                          placeholder="RMB"
                        >
                          <el-option
                            size="mini"
                            label="RMB"
                            value="RMB"
                          ></el-option>
                        </el-select>
                        <el-select
                          v-else
                          popper-class="account-select"
                          size="mini"
                          v-model="walletForm.currency_type"
                          placeholder="USD"
                        >
                          <el-option
                            v-for="e in ['USD']"
                            :key="e"
                            size="mini"
                            :label="e"
                            :value="e"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item :label="$t('housekeeper.choose_amount')">
                        <el-select
                          v-if="
                            walletForm.paymethod === 'alipay' &&
                            walletForm.operation === 'recharge'
                          "
                          popper-class="account-select"
                          size="mini"
                          v-model="walletForm.alipayAmount"
                          :placeholder="$t('global.placeholder1')"
                        >
                          <el-option
                            v-for="e in [150, 350, 700]"
                            :key="e"
                            size="mini"
                            :label="e"
                            :value="e"
                          ></el-option>
                        </el-select>
                        <el-select
                          v-else
                          popper-class="account-select"
                          size="mini"
                          v-model="walletForm.amount"
                          :placeholder="$t('global.placeholder1')"
                        >
                          <el-option
                            v-for="e in amountItems"
                            :key="e"
                            size="mini"
                            :label="e"
                            :value="e"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item class="buttons">
                        <div v-show="showPayPalBtn" class="paypal">
                          <PayPal
                            :amount="paypalAmount"
                            currency="USD"
                            :client="credentials"
                            :env="initEnv"
                            :invoice-number="orderId"
                            :button-style="buttonStyle"
                            @payment-authorized="paymentAuthorized"
                            @payment-completed="paymentCompleted"
                            @payment-cancelled="paymentCancelled"
                          ></PayPal>
                        </div>
                        <el-button
                          v-show="!showPayPalBtn"
                          class="sure"
                          type="primary"
                          @click="submitWallet()"
                          >{{ $t("global.sure") }}</el-button
                        >
                      </el-form-item>
                    </el-form>
                    <!-- 支付二维码弹框 -->
                    <el-dialog
                      :title="$t('housekeeper.payment')"
                      :visible.sync="codeVisible"
                      :before-close="onPaid"
                    >
                      <div
                        v-show="walletForm.paymethod == 'alipay'"
                        class="code"
                      >
                        <div>{{ $t("housekeeper.paid") }}</div>
                      </div>
                      <div
                        v-show="walletForm.paymethod === 'wechatpay'"
                        class="code"
                      >
                        <div style="margin-bottom: 10px">
                          {{ $t("housekeeper.wechatpaid") }}
                        </div>
                        <img :src="PayQRcode" />
                      </div>
                      <div
                        v-show="walletForm.paymethod === 'codepay'"
                        class="qrcode"
                      >
                        <div class="box">
                          <img
                            src="@/assets/images/code1.png"
                            :title="$t('housekeeper.alipay1')"
                            :alt="$t('housekeeper.alipay1')"
                          />
                          <div>{{ $t("housekeeper.alipay1") }}</div>
                        </div>
                        <div class="box">
                          <img
                            src="@/assets/images/code2.png"
                            :title="$t('housekeeper.alipay2')"
                            :alt="$t('housekeeper.alipay2')"
                          />
                          <div>{{ $t("housekeeper.alipay2") }}</div>
                        </div>
                      </div>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="onPaid">{{
                          $t("global.cancel")
                        }}</el-button>
                        <el-button type="primary" @click="onPaid">{{
                          $t("global.complete")
                        }}</el-button>
                      </div>
                    </el-dialog>
                  </div>
                </el-tab-pane>
                <!-- 升级服务 -->
                <el-tab-pane
                  class="upgrade_service"
                  name="4"
                  :label="$t('housekeeper.upgrade')"
                >
                  <div class="upgrade">
                    <ul>
                      <li class="index">
                        <div class="project">
                          {{ $t("housekeeper.project") }}
                        </div>
                      </li>
                      <li
                        v-for="(v, i) in serverList"
                        :key="v.key"
                        class="index"
                      >
                        <div class="key1">
                          <div style="min-width: 50px">{{ i + 1 }}</div>
                          <!-- <div class="keys">{{ v.key }}</div> -->
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="v.key"
                            placement="right"
                          >
                            <div class="keys">{{ v.key }}</div>
                          </el-tooltip>
                        </div>
                      </li>
                    </ul>
                    <ul>
                      <li :class="userLevel.vip_type === 1 ? 'sel' : 'basic'">
                        <div>{{ $t("housekeeper.basic") }}</div>
                        <svg-icon iconClass="basic"></svg-icon>
                      </li>
                      <li
                        v-for="(v, i) in users"
                        :key="i"
                        :class="userLevel.vip_type === 1 ? 'sel' : 'basic'"
                      >
                        <i v-if="v === true" class="el-icon-check"></i>
                        <i v-else-if="v === false" class="el-icon-minus"></i>
                        <div v-else class="key2">{{ v }}</div>
                      </li>
                    </ul>
                    <ul>
                      <li :class="userLevel.vip_type === 2 ? 'sel' : 'vip'">
                        <div>{{ $t("housekeeper.vip") }}</div>
                        <svg-icon iconClass="vip"></svg-icon>
                      </li>
                      <li
                        v-for="(v, i) in vip_users"
                        :key="i"
                        :class="userLevel.vip_type === 2 ? 'sel' : 'vip'"
                      >
                        <i v-if="v === true" class="el-icon-check"></i>
                        <i v-else-if="v === false" class="el-icon-minus"></i>
                        <div v-else class="key2">{{ v }}</div>
                      </li>
                    </ul>
                    <ul>
                      <li :class="userLevel.vip_type === 3 ? 'sel' : 'svip'">
                        <div>{{ $t("housekeeper.svip") }}</div>
                        <svg-icon iconClass="svip"></svg-icon>
                      </li>
                      <li
                        v-for="(v, i) in svip_users"
                        :key="i"
                        :class="userLevel.vip_type === 3 ? 'sel' : 'svip'"
                      >
                        <i v-if="v === true" class="el-icon-check"></i>
                        <i v-else-if="v === false" class="el-icon-minus"></i>
                        <div v-else class="key2">{{ v }}</div>
                      </li>
                    </ul>
                  </div>

                  <div class="btns">
                    <div class="userLevel">
                      <span>{{ $t("housekeeper.currently") }}</span>
                      <span v-if="userLevel.vip_type === 2">{{
                        $t("housekeeper.vip")
                      }}</span>
                      <span v-else-if="userLevel.vip_type === 3">{{
                        $t("housekeeper.svip")
                      }}</span>
                      <span v-else>{{ $t("housekeeper.basic") }}</span>
                    </div>
                    <el-button @click="dialogVisible = true">{{
                      $t("housekeeper.btn")
                    }}</el-button>
                  </div>
                  <!-- 升级弹框 -->
                  <el-dialog
                    :title="$t('housekeeper.btn')"
                    :visible.sync="dialogVisible"
                  >
                    <el-form :model="upgradeForm">
                      <el-form-item :label="$t('housekeeper.currently')">
                        <div class="current">
                          <span v-if="userLevel.vip_type === 2">{{
                            $t("housekeeper.vip")
                          }}</span>
                          <span v-else-if="userLevel.vip_type === 3">{{
                            $t("housekeeper.svip")
                          }}</span>
                          <span v-else>{{ $t("housekeeper.basic") }}</span>
                          <span v-show="userLevel.vip_time"
                            >{{ userLevel.vip_time }}
                            {{ $t("housekeeper.maturity") }}</span
                          >
                        </div>
                      </el-form-item>
                      <el-form-item :label="$t('housekeeper.wallet')">
                        <div class="wallet">
                          <span>{{ $t("housekeeper.amount_available") }}</span>
                          <span>${{ userLevel.wallet_amount }}</span>
                          <span>{{ $t("housekeeper.frozen_amount") }}</span>
                          <span>${{ userLevel.frost_wallet }}</span>
                        </div>
                      </el-form-item>
                      <el-form-item :label="$t('housekeeper.grade')">
                        <el-radio v-model="upgrade_type" label="upgrade">{{
                          $t("housekeeper.promote")
                        }}</el-radio>
                        <el-radio v-model="upgrade_type" label="renew">{{
                          $t("housekeeper.renew")
                        }}</el-radio>
                      </el-form-item>
                      <el-form-item>
                        <div class="gradeStyle">
                          <div
                            class="grade"
                            v-for="(item, index) in gradeItems"
                            :key="item.id"
                          >
                            <input
                              :class="gradeStyles[index]"
                              type="radio"
                              :id="item.id"
                              :value="item.value"
                              v-model="upgradeForm.vip_type"
                            />
                            <label :class="gradeStyles[index]" :for="item.id">
                              <svg-icon :iconClass="item.icon"></svg-icon>
                              <div>{{ item.label }}</div>
                            </label>
                            <div class="sel">
                              <svg-icon
                                v-if="upgradeForm.vip_type === item.value"
                                iconClass="selected"
                              ></svg-icon>
                            </div>
                          </div>
                        </div>
                      </el-form-item>
                      <el-form-item :label="$t('housekeeper.time')">
                        <el-radio
                          v-for="v in [1, 3, 6]"
                          :key="v"
                          v-model="upgradeForm.month"
                          :label="v"
                          >{{ v }} {{ $t("housekeeper.months") }}</el-radio
                        >
                        <el-radio v-model="upgradeForm.month" :label="12"
                          >1{{ $t("housekeeper.year") }}</el-radio
                        >
                      </el-form-item>
                      <el-form-item :label="$t('housekeeper.estimated_cost')">
                        <div class="cost">${{ charges }}</div>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible = false">{{
                        $t("global.cancel")
                      }}</el-button>
                      <el-button type="primary" @click="onUpgrade">{{
                        $t("global.sure")
                      }}</el-button>
                    </div>
                  </el-dialog>
                </el-tab-pane>
                <!-- 提醒 -->
                <el-tab-pane
                  name="5"
                  :label="$t('housekeeper.remind')"
                ></el-tab-pane>
                <!-- 历史费用 -->
                <el-tab-pane name="6" :label="$t('housekeeper.cost')">
                  <div class="heade">
                    <div class="heade_left">
                      <div class="orders">
                        <el-tabs v-model="activeTab" @tab-click="switchTab3">
                          <el-tab-pane
                            :label="$t('housekeeper.purchase')"
                            name="purchase"
                          ></el-tab-pane>
                          <el-tab-pane
                            :label="$t('housekeeper.extract')"
                            name="extract"
                          ></el-tab-pane>
                        </el-tabs>
                      </div>
                      <!-- <div class="title">{{ $t("housekeeper.purchase") }}</div> -->
                      <div class="search">
                        <el-input
                          size="mini"
                          :placeholder="$t('global.placeholder5')"
                          prefix-icon="el-icon-search"
                          v-model="searchKey"
                          class="input"
                          @change="getHistoryList1"
                        ></el-input>
                      </div>
                    </div>
                    <DatePicker
                      :period.sync="dateRange1"
                      @change="getHistoryList1"
                    />
                  </div>
                  <!-- <el-scrollbar style="height: 34.5vh"> -->
                  <div class="scrollbar" style="height: 34.5vh">
                    <base-table
                      :data="tableData1"
                      :col-configs="conConfigs"
                      :isLoad="isLoad1"
                    >
                      <template #index>
                        <el-table-column type="index"></el-table-column>
                      </template>
                    </base-table>
                  </div>
                  <!-- </el-scrollbar> -->
                  <div class="heade">
                    <div class="heade_left">
                      <div class="orders">
                        <el-tabs v-model="activeTab2" @tab-click="switchTab4">
                          <el-tab-pane
                            :label="$t('housekeeper.recharges')"
                            name="recharges"
                          ></el-tab-pane>
                          <el-tab-pane
                            :label="$t('housekeeper.withdrawal')"
                            name="withdrawal"
                          ></el-tab-pane>
                        </el-tabs>
                      </div>
                      <div class="search">
                        <el-input
                          size="mini"
                          :placeholder="$t('global.placeholder5')"
                          prefix-icon="el-icon-search"
                          v-model="searchKey2"
                          class="input"
                          @change="getHistoryList2"
                        ></el-input>
                      </div>
                    </div>
                    <DatePicker
                      :period.sync="dateRange3"
                      @change="getHistoryList2"
                    />
                  </div>
                  <!-- <el-scrollbar style="height: 34.5vh"> -->
                  <div class="scrollbar" style="height: 34.5vh">
                    <base-table
                      :data="tableData3"
                      :col-configs="conConfigs"
                      :isLoad="isLoad2"
                    >
                      <template #index>
                        <el-table-column type="index"></el-table-column>
                      </template>
                    </base-table>
                  </div>
                  <!-- </el-scrollbar> -->
                </el-tab-pane>
              </el-tabs>
            </div>
            <!-- 提醒消息 -->
            <div v-if="activeName === '5'">
              <!-- <div v-for="msg in msgs" :key="msg.add_time">{{msg.msg}}</div> -->
              <MessageBox v-if="msgs.length" :data="msgs" />
              <div
                v-else
                class="nodata"
                style="height: 180px; text-align: center; padding: 16px 0"
              >
                {{ $t("global.nodata") }}
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="right">
            <div class="head">{{ $t("housekeeper.other") }}</div>
            <!-- <el-scrollbar v-if="otherMsg.length" style="height: 78vh"> -->
            <div v-if="otherMsg.length" class="scrollbar" style="height: 78vh">
              <div class="message" v-for="v in otherMsg" :key="v.time">
                <div class="date">{{ v.time }}</div>
                <div class="msg">{{ v.msg }}</div>
              </div>
            </div>
            <!-- </el-scrollbar> -->
            <div v-else class="nodata">{{ $t("global.nodata") }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import BaseTable from "@/components/BaseTable";
import TopSkin from "@/components/TopSkin";
import { debounce, parseTime } from "@/utils";

import {
  getUserInfo,
  setUserInfo,
  getBankInfo,
  setBankInfo,
  getUserGrade,
  upgradeMember,
  renewMember,
  getHistoryList,
  getWithdraw,
  getWechatCode,
  getAlipay,
  getOrderStatus,
  getUnionPay,
  getPaypal,
  getotherMsg,
  getWarning,
} from "@/api/user";
import { Message } from "element-ui";
import MessageBox from "./MessageBox";
import HeadTitle from "@/components/HeadTitle";
import PayPal from "vue-paypal-checkout";
import DatePicker from "@/components/DatePicker";
import { getToken, setToken } from "@/utils/token";

export default {
  components: {
    BaseTable,
    MessageBox,
    HeadTitle,
    PayPal,
    DatePicker,
    TopSkin,
  },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t("login.valid_email")));
      } else {
        return callback();
      }
    };
    return {
      // href1: "",
      isLoad1: true,
      isLoad2: true,
      searchKey: "",
      searchKey2: "",
      flag: true,
      flag2: true,
      activeName2: "",
      activeTab: "purchase",
      activeTab2: "recharges",
      msgs: [],
      userId: null,
      otherMsg: [],
      headers: {
        Authorization: "jwt " + getToken("user-token"),
      },
      percent1: 0,
      percent2: 0,
      dateRange1: [],
      dateRange2: [],
      dateRange3: [],
      dateRange4: [],
      userLevel: {},
      avatar: "",
      imageUrl2: "",
      imageUrl3: "",
      activeName: "1",
      PayQRcode: "",
      codeVisible: false,
      dialogVisible: false,
      message: [],
      msgKey: "",
      queryList: {},
      pickDate: {},
      pickDate2: {},
      userInfo: {
        name: "",
        mobile: "",
        country: "",
      },
      cloneUserInfo: {},
      diffUserInfo: {},
      BankForm: {},
      cloneBankForm: {},
      diffBankForm: {},
      walletForm: {
        operation: "recharge",
        paymethod: "alipay",
        currency_type: "",
        amount: 10,
        alipayAmount: 150,
      },
      upgradeForm: {
        vip_type: 2,
        month: 1,
      },
      upgrade_type: "upgrade",
      charges: 30,
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      payStyles: ["alipay", "wechatpay", "unionpay", "paypal", "codepay"],
      orderId: "",
      showPayPalBtn: false,
      credentials: {
        //沙箱环境client_id
        sandbox:
          "AXq9VayhSWKCBHw1moyz-1SXaXK9Zu21cDb1kBKWfNcyv4-pLPdaamV4Nq65Oa4i8ULbCijzH0UTM0mI",
        //线上环境client_id
        production:
          "AUQYWEC2FeJeN7WjLHPq5FlQJoz6E92O8S0Z7lZDFHrB1uARMhK2A7z5n2sk4DLPx27Pi6PagmBTvn1s",
      },
      buttonStyle: {
        layout: "horizontal",
        label: "pay",
        size: "responsive",
        shape: "pill",
        color: "blue",
      },
      gradeStyles: ["vip", "svip"],
      rules: {
        email: [
          {
            required: true,
            validator: validateEmail,
          },
        ],
      },
    };
  },
  computed: {
    users() {
      return [
        "$0/" + this.$t("housekeeper.month"),
        "3",
        false,
        false,
        false,
        false,
        "0",
        true,
        true,
        true,
        true,
        true,
        true,
        true,
      ];
    },
    vip_users() {
      return [
        "$30/" + this.$t("housekeeper.month"),
        "10",
        false,
        true,
        true,
        true,
        "2%",
        true,
        true,
        true,
        true,
        true,
        true,
        true,
      ];
    },
    svip_users() {
      return [
        "$50/" + this.$t("housekeeper.month"),
        this.$t("housekeeper.unlimited"),
        true,
        true,
        true,
        true,
        "6%",
        true,
        true,
        true,
        true,
        true,
        true,
        true,
      ];
    },
    msgItems() {
      return [
        {
          name: "",
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
    paypalAmount() {
      return this.walletForm.amount.toString();
    },
    alipayUrl() {
      var token = getToken("user-token");
      if (`${location.origin}` === "http://my20.klipc.com.cn") {
        return `http://my21.klipc.com.cn/#/dashboard/housekeeper?tab=3&token=${token}&amount=${this.walletForm.alipayAmount}&redirect=true`;
      } else {
        // return `${location.origin}/#/dashboard/housekeeper?tab=3&token=${token}&amount=${this.walletForm.alipayAmount}&redirect=true`;
        return `http://my21.klipc.com.cn/#/dashboard/housekeeper?tab=3&token=${token}&amount=${this.walletForm.alipayAmount}&redirect=true`;
      }
    },
    initEnv() {
      if (process.env.NODE_ENV === "production") {
        return "production";
      } else {
        return "sandbox";
      }
    },
    amountItems() {
      if (process.env.NODE_ENV === "production") {
        return [10, 30, 50, 70, 100, 500];
      } else return [0.01, 0.1, 10, 50, 100];
    },
    conConfigs() {
      return [
        { slot: "index", width: 50 },
        { prop: "add_time", label: this.$t("housekeeper.date"), width: 200 },
        {
          prop: "transaction_amount",
          label: this.$t("housekeeper.charge"),
          width: 100,
          formatter(row, column, cellValue) {
            return "$" + cellValue;
          },
        },
        { prop: "transaction_msg", label: this.$t("housekeeper.use") },
        {
          prop: "transaction_type",
          label: this.$t("housekeeper.source"),
          width: 100,
        },
      ];
    },
    payItems() {
      return [
        {
          id: "alipay",
          value: "alipay",
          icon: "alipay",
          label: this.$t("housekeeper.alipay"),
        },
        {
          id: "wechatpay",
          value: "wechatpay",
          icon: "wechatpay",
          label: this.$t("housekeeper.wechatpay"),
        },
        {
          id: "unionpay",
          value: "unionpay",
          icon: "wechatpay",
          label: this.$t("housekeeper.unionpay"),
        },
        {
          id: "paypal",
          value: "paypal",
          icon: "wechatpay",
          label: this.$t("housekeeper.paypal"),
        },
        {
          id: "codepay",
          value: "codepay",
          icon: "wechatpay",
          label: this.$t("housekeeper.codepay"),
        },
      ];
    },
    gradeItems() {
      return [
        {
          id: "vip",
          value: 2,
          icon: "vip",
          label: this.$t("housekeeper.vip"),
        },
        {
          id: "svip",
          value: 3,
          icon: "svip",
          label: this.$t("housekeeper.svip"),
        },
      ];
    },
    serverList() {
      return [
        { key: this.$t("housekeeper.key1") },
        { key: this.$t("housekeeper.key2") },
        { key: this.$t("housekeeper.key3") },
        { key: this.$t("housekeeper.key4") },
        { key: this.$t("housekeeper.key5") },
        { key: this.$t("housekeeper.key6") },
        { key: this.$t("housekeeper.key7") },
        { key: this.$t("housekeeper.key8") },
        { key: this.$t("housekeeper.key9") },
        { key: this.$t("housekeeper.key10") },
        { key: this.$t("housekeeper.key11") },
        { key: this.$t("housekeeper.key12") },
        { key: this.$t("housekeeper.key13") },
        { key: this.$t("housekeeper.key14") },
      ];
    },
    uploadUrl() {
      return (
        process.env.VUE_APP_BASE_API +
        "v2/user/manage_page/upload_avatar_and_id_card"
      );
    },
    redirect() {
      return this.$route.query.redirect;
    },
  },
  watch: {
    "$i18n.locale": function () {
      this.getTabList();
    },
    "walletForm.paymethod": function (val) {
      if (val === "alipay") {
        this.walletForm.currency_type = "RMB";
      } else {
        this.walletForm.currency_type = "USD";
      }
    },
    upgradeForm: {
      handler: function (value) {
        // console.log(`value=`, value)
        if (value.vip_type === 2) {
          this.charges = 30 * value.month;
        } else if (value.vip_type === 3) {
          this.charges = 50 * value.month;
        }
      },
      deep: true,
    },
    redirect: function (val) {
      console.log(val);
      var { amount } = this.$route.query;
      val && this.submitAlipay(amount);
    },
  },
  mounted() {
    // console.log(`this.$route.query=`, this.$route.query);
    this.initPage();
    this.getotherMsg();
    this.getTabList();
  },
  beforeRouteEnter(to, from, next) {
    // console.log(`from=`, from);
    // console.log(`to.query=`, to.query);
    var { tab, token, amount, redirect } = to.query;
    if (token) {
      // this.$store.commit("SET_TOKEN", token);
      setToken("user-token", token);
      next();
    } else {
      next();
    }
  },
  methods: {
    initPage() {
      var { tab, token, amount } = this.$route.query;
      this.activeName = tab || "1"; //刷新页面时当前tab页不变
      // console.log(`query=`, this.$route.query);
      this.userId = sessionStorage.getItem("user_id");
      console.log(`initPage=`);
    },
    getotherMsg() {
      getotherMsg().then((res) => {
        this.otherMsg = res.results;
      });
    },
    getUserInfo() {
      getUserInfo(this.userId).then((res) => {
        this.userInfo = res.results;
        this.cloneUserInfo = { ...res.results };
        var values = Object.values(res.results);
        var count = 0;
        values.forEach((item) => {
          if (item) {
            count += 1;
          }
        });
        this.percent1 = parseInt((count / 8) * 100);
      });
    },
    getBankInfo() {
      getBankInfo(this.userId).then((res) => {
        this.BankForm = res.results;
        this.cloneBankForm = { ...res.results };
        var values = Object.values(res.results);
        var count = 0;
        values.forEach((item) => {
          if (item) {
            count += 1;
          }
        });
        this.percent2 = parseInt((count / 11) * 100);
      });
    },
    getUserGrade() {
      getUserGrade(this.userId).then((res) => {
        this.userLevel = res.results;
      });
    },
    getHistoryList2() {
      var [start_day3, end_day3] = this.dateRange3;
      switch (this.activeTab2) {
        case "recharges":
          this.queryList.recharge_start_day = start_day3;
          this.queryList.recharge_end_day = end_day3;
          this.queryList.recharge_search = this.searchKey2;
          getHistoryList(this.queryList).then((res) => {
            this.tableData3 = res.results.recharge;
            this.isLoad2 = false;
          });
          break;
        case "withdrawal":
          this.queryList.withdraw_start_day = start_day3;
          this.queryList.withdraw_end_day = end_day3;
          this.queryList.withdraw_search = this.searchKey2;
          getHistoryList(this.queryList).then((res) => {
            this.tableData3 = res.results.withdraw;
            this.isLoad2 = false;
          });
          break;
      }
    },
    getHistoryList1() {
      var [start_day1, end_day1] = this.dateRange1;
      switch (this.activeTab) {
        case "purchase":
          this.queryList.get_start_day = start_day1;
          this.queryList.get_end_day = end_day1;
          this.queryList.get_search = this.searchKey;
          getHistoryList(this.queryList).then((res) => {
            this.tableData1 = res.results.get_sub;
            this.isLoad1 = false;
          });
          break;
        case "extract":
          this.queryList.pay_start_day = start_day1;
          this.queryList.pay_end_day = end_day1;
          this.queryList.pay_search = this.searchKey;
          getHistoryList(this.queryList).then((res) => {
            this.tableData1 = res.results.pay_sub;
            this.isLoad1 = false;
          });
          break;
      }
    },
    getCostList() {
      // Default date period Last mounth
      var start = parseTime(
        new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 30)
      );
      var end = parseTime(new Date());
      this.queryList.get_start_day = start;
      this.queryList.get_end_day = end;
      getHistoryList(this.queryList).then((res) => {
        this.List = res.results;
        this.tableData1 = res.results.get_sub;
        this.tableData3 = res.results.recharge;
        this.isLoad1 = false;
        this.isLoad2 = false;
      });
    },
    // switchTab2(tab) {
    //   this.getWarnMsg({ message_type: tab.name });
    // },
    switchTab3(tab) {
      this.searchKey = null;
      this.getHistoryList1();
      // switch (tab.name) {
      //   case "purchase":
      //     this.getHistoryList1()
      //     // this.tableData1 = this.List.get_sub;
      //     break;
      //   case "extract":
      //     this.getHistoryList2()
      //     // this.tableData1 = this.List.pay_sub;
      //     break;
      // }
    },
    switchTab4(tab) {
      this.searchKey2 = null;
      this.getHistoryList2();
      // switch (tab.name) {
      //   case "recharges":
      //     this.tableData3 = this.List.recharge;
      //     break;
      //   case "withdrawal":
      //     this.tableData3 = this.List.withdraw;
      //     break;
      // }
    },
    // searchMsg(value) {
    //   this.getWarnMsg({ search: value });
    // },
    getWarnMsg() {
      getWarning().then((res) => {
        this.msgs = res.results;
      });
    },
    onSwitchTab() {
      this.$router.push({
        path: `/dashboard/housekeeper`,
        query: {
          tab: this.activeName,
        },
      });
      this.getTabList();
    },
    getTabList() {
      console.log(`activeName=`, this.activeName);
      switch (this.activeName) {
        case "1":
          this.getUserInfo();
          break;
        case "2":
          this.getBankInfo();
          break;
        case "3":
          this.getUserGrade();
          break;
        case "4":
          this.getUserGrade();
          break;
        case "5":
          this.getWarnMsg();
          break;
        case "6":
          this.getCostList();
          break;
        default:
          this.getUserGrade();
      }
    },
    submitUserInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          for (var key in this.userInfo) {
            if (this.userInfo[key] !== this.cloneUserInfo[key]) {
              this.diffUserInfo[key] = this.userInfo[key];
            }
          }
          if (this.diffUserInfo.email) {
            var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; //邮箱验证
            if (re.test(this.diffUserInfo.email)) {
              console.log("邮箱合法");
              this.setUserInfo();
            } else {
              this.$message.error("请输入正确的邮箱格式");
            }
          } else {
            this.setUserInfo();
          }
        } else {
          return false;
        }
      });
    },
    setUserInfo() {
      //防抖
      debounce(() => {
        setUserInfo(this.userId, this.diffUserInfo).then(
          (res) => {
            if (res.msg === "ok") {
              this.flag = true;
              this.getUserInfo();
              Message({
                message: res.msg,
                type: "success",
                duration: 3 * 1000,
              });
            }
          },
          (err) => {
            // console.log(err.response.data.email)
            this.$message.error("输入有误");
          }
        );
      }, 2000);
    },
    submitBankForm(formName) {
      for (var key in this.BankForm) {
        if (this.BankForm[key] !== this.cloneBankForm[key]) {
          this.diffBankForm[key] = this.BankForm[key];
        }
      }
      debounce(() => {
        setBankInfo(this.userId, this.diffBankForm).then((res) => {
          if (res.msg === "ok") {
            this.flag2 = true;
            this.getBankInfo();
            Message({
              message: "保存成功",
              type: "success",
              duration: 3 * 1000,
            });
          }
        });
      }, 2000);
    },
    submitWallet() {
      switch (this.walletForm.operation) {
        case "recharge":
          this.onRecharge();
          break;
        case "withdraw":
          this.onWithdraw();
          break;
      }
    },
    submitAlipay(amount) {
      // console.log(location.hostname);
      getAlipay({ amount: amount }).then((res) => {
        // console.log(res.msg);
        this.codeVisible = true;
        window.open(res.msg, "_blank"); //在新窗口打开
      });
    },
    onRecharge() {
      //充值
      var token = getToken("user-token");
      switch (this.walletForm.paymethod) {
        case "alipay":
          if (`${location.origin}` === "http://my21.klipc.com.cn") {
            this.submitAlipay(this.walletForm.alipayAmount);
          } else {
            window.location.href = this.alipayUrl;
          }
          // this.submitAlipay(this.walletForm.alipayAmount);
          break;
        case "wechatpay":
          var query = {
            amount: this.walletForm.amount * 100,
            currency: this.walletForm.currency_type,
            trade_type: 0,
          };
          getWechatCode(query).then((res) => {
            if (res.code === 200) {
              var img = `${process.env.VUE_APP_BASE}/media/${res.msg}`;
              // console.log(`img=`, img);
              this.PayQRcode = img;
              this.codeVisible = true;
            } else {
              this.$message.error(res.msg);
            }
          });
          break;
        case "unionpay":
          var query2 = {
            amount: this.walletForm.amount,
            currency: this.walletForm.currency_type,
            payment_method: "upop",
          };
          getUnionPay(query2).then((res) => {
            let newWindow = window.open("about:blank");
            newWindow.location = res.url;
          });
          break;
        case "codepay":
          this.codeVisible = true;
          break;
        case "paypal":
          getPaypal({ amount: this.paypalAmount }).then((res) => {
            this.showPayPalBtn = true;
            this.orderId = res.order_no;
          });
          break;
      }
    },
    paymentAuthorized(data) {
      // 授权完成的回调，可以拿到订单id
      // console.log(`Authorized data`, data);
    },
    paymentCompleted(data) {
      // 用户支付完成的回调，可以拿到订单id
      this.showPayPalBtn = false;
      Message({
        message: "支付成功",
        type: "success",
        duration: 3 * 1000,
      });
    },
    paymentCancelled() {
      this.showPayPalBtn = false;
    },
    onPaid() {
      this.codeVisible = false;
      if (this.walletForm.paymethod === "alipay") {
        // console.log("alipay");
        getOrderStatus({ amount: this.walletForm.alipayAmount }).then((res) => {
          this.getUserGrade();
        });
      } else {
        this.getUserGrade();
      }
    },
    onWithdraw() {
      //提取
      getWithdraw({ withdraw_money: this.walletForm.amount }).then((res) => {
        if (res.status === 0) {
          this.$message.success("操作成功");
          this.getUserGrade();
        } else {
          this.$message.error(res.msg);
        }
        // switch (res.status) {
        //   case 10020:
        //     Message({
        //       message: res.msg,
        //       type: "error",
        //       duration: 3 * 1000,
        //     });
        // }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onUpgrade() {
      // console.log(`this.upgrade_type=`, this.upgrade_type);
      if (this.upgrade_type === "upgrade") {
        upgradeMember(this.upgradeForm).then((res) => {
          if (res.status === 0) {
            this.dialogVisible = false;
            // var { month, vip_type } = res.results;
            this.getUserGrade();
            // console.log(`您成功升级为${vip_type}会员`)
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        });
      } else {
        renewMember(this.upgradeForm).then((res) => {
          if (res.status === 0) {
            this.dialogVisible = false;
            // var { month, vip_type } = res.results;
            this.getUserGrade();
            // console.log(`您成功续费${month}个月`)
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    handleAvatarSuccess(res, file) {
      this.userInfo.avatar = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess2(res, file) {
      this.BankForm.id_card_front = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess3(res, file) {
      this.BankForm.id_card_back = URL.createObjectURL(file.raw);
    },
    handleAvatarError(file) {
      this.$message("上传失败，请稍后再试");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.warning("上传头像图片只能是 JPG/PNG/gif 格式!");
      }
      if (!isLt2M) {
        this.$message.warning("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>
<style lang="scss" src="./housekeeper.scss" scoped>
</style>