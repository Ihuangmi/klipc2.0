<template>
  <!-- 跟单弹窗 -->
  <div class="content">
    <el-dialog
      :title="$t('master.follow') + ' ' + nickName"
      :visible.sync="visible"
      :before-close="handleClose"
    >
      <div class="scroll">
        <!-- v-loading="loading" -->
        <!-- master account -->
        <div v-if="masterInfos.length" class="servers">
          <div class="server" v-for="item in masterInfos" :key="item.id">
            <el-radio
              v-model="formValue.master_hand_account_id"
              :label="item.id"
            >
              <span> {{ item.platform_server }} </span>
              <span
                >{{ $t("master.subscription_fee") }} USD
                {{ item.subscribe_fee }}/{{ $t("master.month") }}</span
              >
              <span>{{ item.account_number }}</span>
            </el-radio>
            <span v-if="item.has_follow_password" style="margin-right: 5px">{{
              $t("master.follow_password")
            }}</span>
            <el-input
              v-if="item.has_follow_password"
              v-model="formValue.password"
              :placeholder="$t('global.placeholder2')"
              show-password
            ></el-input>
          </div>
        </div>
        <Loading v-else />
        <!-- <div v-else class="nodata">{{ $t("global.nodata") }}</div> -->
        <!-- follow type -->
        <div class="measure">
          <div class="type">
            <div class="documentary" v-for="v in types" :key="v.label">
              <el-radio v-model="formValue.documentary_type" :label="v.label">{{
                v.name
              }}</el-radio>
              <div
                class="set_value"
                v-if="formValue.documentary_type === v.label"
              >
                <div style="margin-right: 8px">
                  {{ $t("master.set_value") }}
                </div>
                <el-input
                  v-model="formValue.size"
                  :placeholder="$t('global.placeholder2')"
                ></el-input>
              </div>
            </div>
          </div>
          <div v-if="formValue.documentary_type === 2" class="note">
            *{{ $t("master.note1") }}
          </div>
          <div v-if="formValue.documentary_type === 1" class="note">
            *{{ $t("master.note2") }}
          </div>
          <div v-if="formValue.documentary_type === 3" class="note">
            *{{ $t("master.note3") }}
          </div>
        </div>
        <!-- user accounts -->
        <div class="account">
          <div class="text">{{ $t("master.accounts") }}</div>
          <el-checkbox-group
            v-if="userAccounts.length"
            v-model="formValue.lower_hand_account_ids"
            @change="onAccountChange"
          >
            <el-checkbox v-for="v in userAccounts" :key="v.id" :label="v.id">
              <span>{{ v.platform_server }}</span>
              <span style="margin: 0 30px">{{ v.account_number }}</span>
              <span>{{ v.account_nick_name }}</span>
            </el-checkbox>
          </el-checkbox-group>
          <div v-else class="nodata">{{ $t("link_account.empty") }}</div>
          <div class="note">*{{ $t("master.notes") }}</div>
        </div>
        <!-- follow setting -->
        <div class="setting">{{ $t("master.setting") }}</div>
        <el-form ref="myform" :model="formValue" :rules="rules">
          <el-form-item
            v-for="k in formConfigs"
            :key="k.value"
            :label="k.label"
            :prop="k.value"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="k.prompt"
              placement="right"
            >
              <i class="el-icon-warning-outline"></i>
            </el-tooltip>
            <el-input
              v-model="formValue[k.value]"
              :placeholder="$t('global.placeholder2')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('master.enable8')" prop="reverse_copying">
            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('master.enablereversecopyDesc')"
              placement="right"
            >
              <i class="el-icon-warning-outline"></i>
            </el-tooltip>
            <el-switch
              v-model="formValue.reverse_copying"
              active-color="#AD2935"
              inactive-color="#2D3D5C"
              active-text="开启"
            ></el-switch>
          </el-form-item>
          <el-form-item :label="$t('master.renew')" prop="auto_renew">
            <el-switch
              v-model="formValue.auto_renew"
              active-color="#AD2935"
              inactive-color="#2D3D5C"
              active-text="开启"
            ></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $t("global.cancel") }}</el-button>
        <el-button type="primary" @click="onFollow">{{
          $t("global.sure")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Loading from "@/components/LoadAnimation";

export default {
  components: { Loading },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    var validate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t("link_account.valid")));
      } else {
        return callback();
      }
    };
    return {
      nickName: "",
      // loading: true,
      masterInfos: [],
      userAccounts: [],
      formValue: {
        master_hand_account_id: "",
        lower_hand_account_ids: [],
        documentary_type: 2, //（1表示合约百分比，2表示固定手数，3表示手数百分比）
        size: 0.01,
        use_same_lot_size: true, //（固定手数和手数百分比时为true，合约百分比时为false）
        reverse_copying: false,
        auto_renew: false,
      },
      rules: {
        min_value: [
          {
            validator: validate,
          },
        ],
        delay_protection: [
          {
            validator: validate,
          },
        ],
        max_value: [
          {
            validator: validate,
          },
        ],
        stop_loss_level: [
          {
            validator: validate,
          },
        ],
        slippage_control: [
          {
            validator: validate,
          },
        ],
      },
    };
  },
  watch: {
    data: {
      handler(value) {
        this.masterInfos = value.master_hand_accounts;
        this.userAccounts = value.lower_hand_accounts;
        this.formValue.master_hand_account_id = this.masterInfos[0].id; //默认选中高手账号
        if (this.userAccounts.length > 0) {
          this.formValue.lower_hand_account_ids.push(this.userAccounts[0].id); //默认选中低手第一个账号
        }
        this.nickName = this.masterInfos[0].nick_name;
        // this.loading = false;
      },
      deep: true,
    },
    visible: function (value) {
      if (value === false) {
        this.$refs["myform"].resetFields();
      }
    },
  },
  computed: {
    types() {
      return [
        { name: this.$t("master.lot"), label: 2 },
        { name: this.$t("master.percentage"), label: 1 },
        { name: this.$t("master.lot_percentage"), label: 3 },
      ];
    },
    formConfigs() {
      return [
        {
          label: this.$t("master.enable"),
          value: "min_value",
          prompt: this.$t("master.lowtradevolDesc"),
        },
        {
          label: this.$t("master.enable1"),
          value: "delay_protection",
          prompt: this.$t("master.enabledelayprotectDesc"),
        },
        {
          label: this.$t("master.enable2"),
          value: "max_value",
          prompt: this.$t("master.enablemaxlotsDesc"),
        },
        {
          label: this.$t("master.enable3"),
          value: "stop_loss_level",
          prompt: this.$t("master.enablestoplpDesc"),
        },
        {
          label: this.$t("master.enable4"),
          value: "slippage_control",
          prompt: this.$t("master.enableslippageDesc"),
        },
        // { label: this.$t("master.enable5"), value: "input6", prompt: "" },
        // { label: this.$t("master.enable6"), value: "input7", prompt: "" },
        // { label: this.$t("master.enable7"), value: "input8", prompt: "" },
      ];
    },
  },
  methods: {
    onAccountChange(val) {
      console.log(val);
    },
    handleClose() {
      this.$emit("update:visible", false);
    },
    onFollow() {
      if (this.formValue.documentary_type === 1) {
        this.formValue.use_same_lot_size = false;
      } else {
        this.formValue.use_same_lot_size = true;
      }
      this.$refs["myform"].validate((valid) => {
        if (valid) {
          if (this.formValue.lower_hand_account_ids.length === 0) {
            this.$message.warning(this.$t("master.accounts"));
            return false;
          } else {
            this.$emit("submit", this.formValue);
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_handle.scss";

$color: #ad2935;
$bgc: #d7e4f2;
$border: 4px solid $bgc;
.el-dialog {
  @include font_color("font_color1");
  @include border_color("border_color2");
  .note {
    font-size: 10px;
    color: rgba(170, 173, 184, 1);
    margin-top: 10px;
    @include font_color("font_color4");
  }

  .nodata {
    font-size: 12px;
    color: #909399;
    // @include font_color("font_color4");
  }
  .server {
    display: flex;
    align-items: center;
    font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
    padding-bottom: 8px;
    @include font_color("font_color1");
    @include background_color("background_color1");
    .el-radio__label {
      span {
        display: inline-block;
        &:nth-child(1) {
          min-width: 140px;
        }
        &:nth-child(2) {
          margin: 0 10px;
          // min-width: 120px;
        }
      }
    }
    .el-input .el-input__inner {
      width: 100px;
    @include border_color("border_color2");
    }
  }
  .measure {
    padding: 10px 0;
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
    @include border_color("border_color2");
    .type {
      display: flex;
      // justify-content: space-between;
      flex-wrap: wrap;
    }
    .documentary {
      display: flex;
      align-items: center;
      margin-right: 20px;
    }
    .set_value {
      display: flex;
      align-items: center;
      @include font_color("font_color2");
    }
  }
  .account {
    padding: 10px 0;
    border-bottom: 1px solid #efefef;
    @include font_color("font_color2");
    @include border_color("border_color2");
    .text {
      color: #ad2935;
      margin-bottom: 8px;
      @include font_color("font_color11");
    }
    .item {
      margin: 8px 0;
    }
  }
  .account /deep/ {
    .el-checkbox-group {
      .el-checkbox {
        margin-bottom: 6px;
      }
      .el-checkbox__input.is-checked .el-checkbox__inner,
      .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #ad2935;
        border-color: #ad2935;
        @include border_color("font_color11");
        @include background_color("font_color11");
      }
      .el-checkbox__input.is-checked {
        color: #ad2935;
        @include font_color("font_color11");
      }
      .el-checkbox__label {
        font-size: 12px;
        @include font_color("font_color3");
        span {
          display: inline-block;
          &:nth-child(1) {
            min-width: 160px;
          }
          &:nth-child(2) {
            min-width: 100px;
          }
        }
      }
      .el-checkbox__input.is-checked + .el-checkbox__label {
        // font-weight: bold;
        @include font_color("font_color1");
      }
      .el-checkbox__inner:hover {
        border-color: #ad2935;
        @include border_color("font_color11");
      }
    }
  }
  .setting {
    margin-top: 12px;
    @include font_color("font_color2");
  }
  .el-icon-warning-outline {
    margin-right: 10px;
    @include font_color("font_color2");
  }
}

.content /deep/ .el-dialog {
  width: 646px;
  height: 70vh;
  @include background_color("background_color1");
  border-radius: 16px;
  .el-dialog__header {
    height: 32px;
    border-radius: 16px 16px 0px 0px;
    padding: 0 25px;
    display: flex;
    align-items: center;
    @include background_color("background_color24");
  }
  .el-dialog__title {
    font-size: 14px;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    line-height: 20px;
    font-family: NotoSansCJKsc-Bold, NotoSansCJKsc;
  }
  .el-dialog__headerbtn {
    top: 8px;
    color: rgba(255, 255, 255, 1);
  }
  .el-dialog__body {
    font-size: 12px;
    padding: 20px 28px;
    height: 50vh;
    overflow-y: auto;
    font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
    color: rgba(38, 38, 38, 1);
  }
  .el-dialog__footer {
    padding: 20px;
    // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  }
  // ********** scrollbar ***************
  .scroll {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .el-dialog__body::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 5px;
  }

  .el-dialog__body::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 15px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #cac9c9;
    // @include background_color("background_color4");
  }

  .el-dialog__body::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    /* background: #ededed; */
  }
  // ********** scrollbar ***************
  .dialog-footer {
    display: flex;
    justify-content: center;
  }
  @mixin btn-text($color, $bgc) {
    font: {
      family: Arial;
      size: 12px;
    }
    color: $color;
    background: $bgc;
    width: 80px;
    height: 28px;
    text-align: center;
    border-radius: 4px;
  }
  .el-button {
    padding: 0;
  }
  .el-button:nth-child(2) {
    @include btn-text(rgba(255, 255, 255, 1), rgba(173, 41, 53, 1));
    border-color: #ad2935;
  }
  .el-button:nth-child(1) {
    @include btn-text(#ffffff, #5f6472);
    border: 1px solid #5f6472;
    box-sizing: border-box;
  }

  .el-form {
    display: flex;
    flex-wrap: wrap;
  }
  .el-form-item {
    // min-width: 50%;
    // max-width: 100%;
    width: 50%;
    // height: 40px;
    margin-bottom: 5px;
  }
  $labelwidth: 60px;
  $marginright: 10px;
  $itemHeight: 36px;
  .el-form-item__label {
    font-size: 12px;
    // min-width: 50%;
    width: 106px;
    text-align: left;
    height: $itemHeight !important;
    line-height: $itemHeight;
    padding: 0;
    margin-right: $marginright;
    color: rgba(38, 38, 38, 1);
    @include font_color("font_color1");
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .el-form-item__error {
    position: absolute;
    left: 140px;
    top: 32px;
  }
  .el-input {
    width: 134px;
    height: 24px;
  }
  .el-input__inner {
    height: 24px;
    border: 1px solid rgba(239, 239, 239, 1);
    font-size: 12px;
    @include font_color("font_color1");
    @include border_color("border_color2");
    @include background_color("background_color1");

    &::placeholder {
      color: #ad2935 !important;
    }
  }
  .el-switch__label, .el-switch__label *{
    font-size: 12px;
  }
  .el-switch__label.is-active{
    font-size: 12px;
    @include font_color("font_color1");
  }
  .el-input__icon {
    line-height: 24px;
  }
}
</style>