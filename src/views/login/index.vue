<template>
  <div>
    <div id="login">
      <!-- <div class="logo">
      <img src="@/assets/images/logo3.png" alt />
    </div> -->
      <div class="content">
        <div class="box">
          <!-- <div class="logo">
        <img src="@/assets/images/logo0.png" alt />
      </div> -->
          <div class="language">
            <img src="@/assets/images/logo0.png" alt />
            <svg-icon
              @click.native="dialogVisible = true"
              :iconClass="icon"
            ></svg-icon>
          </div>
          <div class="login_type">
            <div class="type">
              <div class="pass">
                <input
                  class="passlogin"
                  type="radio"
                  id="pass"
                  value="passlogin"
                  v-model="loginType"
                />
                <label class="passlogin" for="pass">
                  <i class="el-icon-user-solid"></i>
                  <span v-if="loginType === 'passlogin'">{{
                    $t("login.login_type")
                  }}</span>
                </label>
              </div>
              <div class="code">
                <input
                  class="codelogin"
                  type="radio"
                  id="code"
                  value="codelogin"
                  v-model="loginType"
                />
                <label class="codelogin" for="code">
                  <i class="el-icon-mobile"></i>
                  <span v-if="loginType === 'codelogin'">{{
                    $t("login.code_login")
                  }}</span>
                </label>
              </div>
            </div>
            <!-- 账号密码登录 -->
            <div v-if="loginType === 'passlogin'" class="password_login">
              <el-form ref="loginForm" :model="userInfo" :rules="accountRules">
                <el-form-item prop="username">
                  <el-input
                    ref="username"
                    :placeholder="$t('login.account')"
                    v-model="userInfo.username"
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
                <el-form-item prop="password">
                  <el-input
                    ref="password"
                    :placeholder="$t('login.password')"
                    v-model="userInfo.password"
                    show-password
                    class="password-input"
                    @keyup.enter.native="handleLogin"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    :loading="loading"
                    class="loginbtn"
                    @click="handleLogin"
                    >{{ $t("login.login") }}</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
            <!-- 手机验证码登录 -->
            <div v-if="loginType === 'codelogin'" class="code_login">
              <el-form ref="loginForm" :model="mobileForm" :rules="codeRules">
                <el-form-item prop="mobile">
                  <el-input
                    ref="mobile"
                    :placeholder="$t('login.mobile')"
                    v-model="mobileForm.mobile"
                    class="input-with-select"
                  >
                    <div slot="prepend" class="flags">
                      <AreaFlag countryCode="cn" @excountry="excountry" />
                    </div>
                    <!-- <el-select
                  popper-class="account-select"
                  v-model="mobileForm.area_code"
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
                <el-form-item prop="verifycode">
                  <el-input
                    ref="verifycode"
                    :placeholder="$t('login.code')"
                    v-model="mobileForm.verifycode"
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
                <!-- <div class="checked">
              <img
                v-if="!checkLogin"
                @click="checkLogin=true"
                src="@/assets/images/radio.png"
                class="checkbox"
              />
              <img
                v-else
                @click="checkLogin=false"
                src="@/assets/images/radio2.png"
                class="checkbox"
              />
              <div>{{$t('login.auto_login')}}</div>
            </div>-->
                <el-form-item>
                  <el-button
                    type="primary"
                    class="loginbtn"
                    :loading="loading"
                    @click="handleCodeLogin"
                    >{{ $t("login.login") }}</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>

          <!-- 底部 -->
          <div class="links">
            <div @click="toRegister">{{ $t("login.register") }}</div>
            <div @click="toResetPass">{{ $t("login.forget_password") }}</div>
          </div>
        </div>
        <div class="descript-text">{{ $t("login.text") }}</div>
      </div>
    </div>
    <Dialog :visible.sync="dialogVisible" @submit="switchLanguage" />
  </div>
</template>
<script>
import { login, getVerifyCode } from "@/api/user";
import { Message } from "element-ui";
import { setToken } from "@/utils/token";
import { debounce } from "@/utils";
import AreaFlag from "@/utils/flags/index";
import Dialog from "@/components/LangBox";

export default {
  components: { Dialog, AreaFlag },
  data() {
    var validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t("login.valid_username")));
      } else {
        return callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t("login.valid_password")));
      } else {
        return callback();
      }
    };
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
    var validateCode = (rule, value, callback) => {
      console.log(`验证码`, value);
      if (!value) {
        return callback(new Error(this.$t("login.valid_code")));
      } else {
        return callback();
      }
    };
    return {
      loading: false,
      areaCodes: [],
      regions: [],
      dialogVisible: false,
      icon: "zh-hans",
      loginType: "passlogin",
      checkLogin: false,
      btnMessage: this.$t("login.get_code"),
      userInfo: {
        username: null,
        password: null,
        login_to: "website",
        area_code: "0086",
        login_type: "password",
      },
      mobileForm: {
        mobile: null,
        verifycode: null, //验证码
        area_code: "0086",
      },
      disabled: false,
      accountRules: {
        username: [
          {
            required: true,
            validator: validateUsername,
          },
        ],
        password: [
          {
            required: true,
            validator: validatePassword,
          },
        ],
      },
      codeRules: {
        mobile: [{ required: true, validator: validateMobile }],
        verifycode: [{ required: true, validator: validateCode }],
      },
    };
  },
  mounted() {
    this.getAreaCode();
    this.icon = this.$i18n.locale; // 设置默认语言图标
    this.$nextTick(() => {
      this.$refs.username.focus();
    });
  },
  watch: {
    "$i18n.locale": function (value) {
      // console.log(`$i18n.locale=`, value);
      this.$refs["loginForm"].resetFields();
      this.btnMessage = this.$t("login.get_code")
    },
    // 重置表单验证
    loginType: function (value) {
      if (value === "passlogin") {
        this.$nextTick(() => {
          this.$refs.username.focus();
          this.$refs["loginForm"].resetFields();
        });
      } else {
        this.$nextTick(() => {
          this.$refs.mobile.focus();
          this.$refs["loginForm"].resetFields();
        });
      }
    },
  },
  methods: {
    // 获取区号不需要token
    getAreaCode() {
      this.$store.dispatch("getAreaCode").then((res) => {
        this.areaCodes = res.results;
      });
    },
    excountry(obj) {
      this.userInfo.area_code = this.FillZero(obj.dialCode);
      this.mobileForm.area_code = this.FillZero(obj.dialCode);
    },
    FillZero(p) {
      return new Array(4 - (p + "").length + 1).join("0") + p;
    },
    handleLogin() {
      debounce(() => {
        this.$refs["loginForm"].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$store
              .dispatch("login", this.userInfo)
              .then((res) => {
                this.loading = false;
                this.$router.push({ path: "/" });
              })
              .catch((err) => {
                this.loading = false;
                if (err.status === 400) {
                  this.$message.error(this.$t("login.error400"));
                }
              });
          } else {
            return false;
          }
        });
      }, 500);
    },
    handleCodeLogin() {
      var loginInfo = {
        login_to: "website",
        login_type: "verification_code",
        username: this.mobileForm.mobile,
        password: this.mobileForm.verifycode,
        area_code: this.mobileForm.area_code,
      };
      debounce(() => {
        this.$refs["loginForm"].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$store
              .dispatch("login", loginInfo)
              .then((res) => {
                this.$router.push({ path: "/" });
                this.loading = false;
              })
              .catch((err) => {
                this.$message.error(this.$t("login.error400"));
                this.loading = false;
              });
          } else {
            return false;
          }
        });
      }, 500);
    },
    getVerifyCode() {
      this.$refs["loginForm"].validateField("mobile", (error) => {
        if (!error) {
          var obj = {
            code_type: "login",
            mobile: this.mobileForm.mobile,
            area_code: this.mobileForm.area_code,
          };
          getVerifyCode(obj)
            .then((res) => {
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
            })
            .catch((err) => {
              // console.log(err.response);
              if (err.response.status === 500) {
                this.$message.error(this.$t("login.error500"));
              }
            });
        }
      });
    },
    switchLanguage(obj) {
      console.log(`obj=`, obj);
      // this.$i18n.locale = obj.value;
      this.icon = obj.icon;
      // this.icon = this.$i18n.locale;// 设置默认语言图标
      // sessionStorage.setItem("LANG", obj.value);
      this.dialogVisible = false;
    },
    toRegister() {
      this.$router.push("./register");
    },
    toResetPass() {
      this.$router.push("./reset-password");
    },
  },
};
</script>
<style lang="scss" src="./index.scss" scoped>
</style>