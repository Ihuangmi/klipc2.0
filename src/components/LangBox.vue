<template>
  <div class="content">
    <el-dialog
      :title="$t('global.language')"
      :visible.sync="visible"
      :before-close="handleClose"
    >
      <div class="body">
        <div class="lang" v-for="item in langsItem" :key="item.value">
          <input
            type="radio"
            :id="item.value"
            :value="item.value"
            v-model="language"
            @change="switchLanguage(item)"
          />
          <label :for="item.value">
            <svg-icon :iconClass="item.icon"></svg-icon>
            <div>{{ item.label }}</div>
            <div class="sel">
              <svg-icon
                v-if="language === item.value"
                iconClass="selected"
              ></svg-icon>
            </div>
          </label>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { getToken, setToken } from "@/utils/token";
import Cookies from 'js-cookie'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      language: "",
      langsItem: [
        {
          value: "zh-hans",
          label: "中文",
          icon: "zh-hans",
        },
        {
          value: "en",
          label: "English",
          icon: "en",
        },
        {
          value: "ja",
          label: "日本語",
          icon: "ja",
        },
        {
          value: "fr",
          label: "français",
          icon: "fr",
        },
        {
          value: "id",
          label: "Indonesia",
          icon: "id",
        },
        {
          value: "ko",
          label: "한국어",
          icon: "ko",
        },
        {
          value: "ru",
          label: "русский",
          icon: "ru",
        },
        {
          value: "hi",
          label: "हिंदी.",
          icon: "hi",
        },
        {
          value: "sv",
          label: "Swedish",
          icon: "sv",
        },
        {
          value: "de",
          label: "Deutsche",
          icon: "de",
        },
        {
          value: "vi",
          label: "Tiếng Việt",
          icon: "vi",
        },
        {
          value: "th",
          label: "ไทย",
          icon: "th",
        },
        {
          value: "es",
          label: "Español",
          icon: "es",
        },
      ],
    };
  },
  mounted(){
    this.language = this.$i18n.locale;// 设置默认语言图标
  },
  methods: {
    handleClose() {
      this.$emit("update:visible", false);
    },
    switchLanguage(obj) {
      // console.log(obj);
      this.$emit("submit", obj);
      this.$i18n.locale = obj.value;
      this.language = obj.icon;
      setToken("LANG", obj.label);
      Cookies.set('lang', obj.value, {expires: 7})
      axios
        .post(`${process.env.VUE_APP_BASE_API}v2/basic/switch_language`, {
          language: obj.value,
        })
        .then((res) => {
          const mycookie = res.headers["Set-Cookie"]
          // console.log(`res.headers=`, res.headers)
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_handle.scss";
.content {
  .svg-icon {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  .body {
    display: flex;
    flex-wrap: wrap;
    @include font_color("font_color2");

    .lang {
      width: 136px;
      height: 36px;
      margin-right: 20px;
      margin-bottom: 5px;
      display: flex;
      position: relative;
      input {
        display: none;
      }
      label {
        width: 136px;
        height: 36px;
        border: 1px solid #fff;
        @include border_color("border_color5");
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .svg-icon {
          margin: 0 10px 0 5px;
        }
      }
      .sel {
        position: absolute;
        right: 0;
        .svg-icon {
          width: 11px;
          height: 11px;
        }
      }
    }

    input[type="radio"]:checked + label {
      border: 1px solid #3ab98e;
      box-sizing: border-box;
      @include border_color("border_color4");
    }
  }
}
.content /deep/ .el-dialog {
  width: 539px;
  height: 313px;
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
    padding: 12px 24px;
    font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
    color: rgba(38, 38, 38, 1);
  }
}
</style>