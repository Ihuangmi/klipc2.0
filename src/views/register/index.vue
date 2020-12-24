<template>
  <div>
    <div id="register">
      <!-- <div class="logo">
      <img src="@/assets/images/logo3.png" alt />
    </div> -->
      <div class="content">
        <div class="box">
          <div class="language">
            <img src="@/assets/images/logo0.png" alt />
            <svg-icon
              @click.native="dialogVisible = true"
              :iconClass="icon"
            ></svg-icon>
          </div>
          <span class="header">{{ $t("login.register") }}</span>
          <el-form ref="resetForm" :model="userInfo" :rules="rules">
            <el-form-item prop="mobile">
              <el-input
                ref="mobile"
                :placeholder="$t('login.mobile')"
                v-model="userInfo.mobile"
                class="input-with-select"
              >
                <div slot="prepend" class="flags">
                  <AreaFlag countryCode="cn" @excountry="excountry" />
                </div>
                <!-- <el-select
              popper-class="account-select"
              v-model="userInfo.area_code"
              slot="prepend"
              placeholder="+86"
            >
              <el-option
                v-for="v in areaCodes"
                :key="v.area_code"
                :label="'+' + v.area_code"
                :value="v.area_code"
              >
                <span v-if="$i18n.locale === 'zh-hans'"
                  >{{ v.cn_name }} +{{ v.area_code }}</span
                >
                <span v-if="$i18n.locale === 'en'"
                  >{{ v.en_name }} +{{ v.area_code }}</span
                >
              </el-option>
            </el-select> -->
              </el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                :placeholder="$t('login.email')"
                v-model="userInfo.email"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                :placeholder="$t('login.password')"
                v-model="userInfo.password"
                show-password
                class="password-input"
              ></el-input>
            </el-form-item>
            <el-form-item prop="confirm_password">
              <el-input
                :placeholder="$t('login.checkPass')"
                v-model="userInfo.confirm_password"
                show-password
                class="password-input"
              ></el-input>
            </el-form-item>
            <el-form-item prop="invite_code">
              <el-input
                :placeholder="$t('login.invite_code')"
                v-model="userInfo.invite_code"
              ></el-input>
            </el-form-item>
            <el-form-item prop="verification_code">
              <el-input
                :placeholder="$t('login.code')"
                v-model="userInfo.verification_code"
                class="input-with-button"
              >
                <el-button
                  @click="getVerifyCode"
                  :disabled="disabled"
                  slot="append"
                  >{{ btnMessage }}</el-button
                >
              </el-input>
            </el-form-item>
            <div class="checked">
              <img
                v-if="!checked"
                @click="checked = true"
                src="@/assets/images/radio.png"
                class="checkbox"
              />
              <img
                v-else
                @click="checked = false"
                src="@/assets/images/radio2.png"
                class="checkbox"
              />
              <div>
                <span>{{ $t("login.msg1") }}</span>
                <span class="pact">{{ $t("login.msg2") }}</span>
                <span>{{ $t("login.msg3") }}</span>
                <span class="pact">{{ $t("login.msg4") }}</span>
              </div>
            </div>
            <el-form-item>
              <el-button
                type="primary"
                :class="checked ? 'clickable' : 'disable'"
                @click="submitForm"
                :disabled="!checked"
                :loading="loading"
                >{{ $t("login.register") }}</el-button
              >
            </el-form-item>
          </el-form>
          <div class="footer">
            <span @click="toLogin">{{ $t("login.tologin") }}</span>
          </div>
        </div>
        <div class="descript-text">{{ $t("login.text") }}</div>
      </div>
    </div>
    <Dialog :visible.sync="dialogVisible" @submit="switchLanguage" />
  </div>
</template>
<script>
import { register, getVerifyCode } from "@/api/user";
import { Message } from "element-ui";
import AreaFlag from "@/utils/flags/index";
import { debounce } from "@/utils";
import Dialog from "@/components/LangBox";

export default {
  components: { AreaFlag, Dialog },
  data() {
    var validateMobile = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t("login.valid_mobile")));
      } else {
        if (value.length > 11) {
          callback(new Error(this.$t("login.valid_mobile2")));
        } else if (isNaN(Number(value))) {
          callback(new Error(this.$t("login.valid_mobile")));
        } else {
          callback();
        }
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t("login.valid_email")));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t("login.valid_password")));
      } else {
        if (value.length < 4 || value.length > 16) {
          callback(new Error(this.$t("login.valid_password2")));
        } else {
          callback();
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t("login.checkPass")));
      } else if (value !== this.userInfo.password) {
        callback(new Error(this.$t("login.checkPass2")));
      } else {
        callback();
      }
    };
    var validateInviteCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t("login.valid_code2")));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t("login.valid_code")));
      } else {
        callback();
      }
    };
    return {
      icon: "zh-hans",
      dialogVisible: false,
      loading: false,
      areaCodes: [],
      btnMessage: this.$t("login.get_code"),
      checked: false,
      userInfo: {
        mobile: "",
        area_code: "0086",
        email: "",
        password: "",
        confirm_password: "",
        invite_code: "",
        verification_code: "",
      },
      disabled: false,
      rules: {
        mobile: [{ required: true, validator: validateMobile }],
        email: [{ required: true, validator: validateEmail }],
        password: [
          {
            required: true,
            validator: validatePass,
          },
        ],
        confirm_password: [{ required: true, validator: validatePass2 }],
        invite_code: [{ required: true, validator: validateInviteCode }],
        verification_code: [{ required: true, validator: validateCode }],
      },
    };
  },
  mounted() {
    this.icon = this.$i18n.locale; // 设置默认语言图标
    this.getAreaCode();
    if (!this.userInfo.mobile) {
      this.$refs.mobile.focus();
    }
  },
  methods: {
    switchLanguage(obj) {
      console.log(`obj=`, obj);
      this.icon = obj.icon;
      this.dialogVisible = false;
    },
    getAreaCode() {
      this.$store.dispatch("getAreaCode").then((res) => {
        this.areaCodes = res.results;
      });
    },
    excountry(obj) {
      this.userInfo.area_code = this.FillZero(obj.dialCode);
    },
    FillZero(p) {
      return new Array(4 - (p + "").length + 1).join("0") + p;
    },
    submitForm() {
      debounce(() => {
        this.$refs["resetForm"].validate((valid) => {
          if (valid) {
            this.loading = true;
            register(this.userInfo)
              .then((res) => {
                if (res.status === 0) {
                  this.$message.success(res.msg);
                  this.$router.push("./login");
                } else {
                  this.$message.error(res.msg);
                }
                this.loading = false;
              })
              .catch((err) => {
                this.loading = false;
                // console.log(err.response);
                this.$message.error(this.$t("login.error500"));
              });
          } else {
            return false;
          }
        });
      }, 500);
    },
    getVerifyCode() {
      var obj = {
        mobile: this.userInfo.mobile,
        area_code: this.userInfo.area_code,
        code_type: "register",
      };
      // 获取手机验证码
      this.$refs.resetForm.validateField("mobile", (error) => {
        if (!error) {
          getVerifyCode(obj).then((res) => {
            if (res.status === 0) {
              this.disabled = true;
              var count = 60;
              this.btnMessage = count + " s";
              var timer = setInterval(() => {
                count--;
                this.btnMessage = count + " s";
                if (count === 0) {
                  this.btnMessage = this.$t("login.get_code");
                  this.disabled = false;
                  clearInterval(timer);
                }
              }, 1000);
              this.$once("hook:beforeDestroy", () => {
                clearInterval(timer);
              });
              this.$message.success(res.msg);
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    toLogin() {
      this.$router.push("./login");
    },
  },
};
</script>
<style lang="scss" src="./index.scss" scoped>
</style>