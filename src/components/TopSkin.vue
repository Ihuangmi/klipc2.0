<template>
  <div class="head">
    <div class="title">{{ title }}</div>
    <div class="icon">
      <div class="time_zone">
        <el-select
          popper-class="account-select"
          size="mini"
          v-model="timeZone"
          placeholder="请选择"
          @change="timeConvers"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="clock">
        <div class="line"></div>
        <span class="hour">{{ hour[0] }}</span>
        <span class="hour">{{ hour[1] }}</span>
        <i>:</i>
        <span class="minute">{{ minute[0] }}</span>
        <span class="minute">{{ minute[1] }}</span>
        <i>:</i>
        <span class="second">{{ second[0] }}</span>
        <span class="second">{{ second[1] }}</span>
      </div>
      <div @click="switchTheme" class="skin">
        <svg-icon iconClass="clothes"></svg-icon>
        <div>{{ $t("global.show") }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import { getToken, setToken } from "@/utils/token";

export default {
  props: {
    title: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      timer2: null,
      timeZone: 8,
      hour: [0, 0],
      minute: [0, 0],
      second: [0, 0],
    };
  },
  mounted() {
    this.setTheme();
    this.getTimezone()
  },
  beforeDestroy() {
    clearInterval(this.timer2);
  },
  computed: {
    options() {
      return [
        { label: "UTC+08:00 " + this.$t('global.beijing'), value: 8 },
        { label: "UTC+09:00 " + this.$t('global.Tokyo'), value: 9 },
        { label: "UTC " + this.$t('global.London'), value: 0 },
        { label: "UTC-02:00 " + this.$t('global.Washington'), value: -2 },
        { label: "UTC-05:00 " + this.$t('global.newYork'), value: -5 },
      ];
    },
  },
  watch: {
    "$i18n.locale": function (value) {
      // console.log(value);
    },
  },
  methods: {
    getTimezone() {
      var timezone = getToken("timezone");
      if (timezone) this.timeZone = parseFloat(timezone);
      this.timeConvers(this.timeZone);
    },
    timeConvers(timezone) {
      //timezone: 目标时区时间,+8:东八区
      // console.log(timezone)
      setToken("timezone", timezone);
      this.timer2 && clearInterval(this.timer2);
      this.timer2 = setInterval(() => {
        var offset_GMT = new Date().getTimezoneOffset(); // 浏览器Date中时间和格林威治的时间差，单位为分钟
        var nowDate = new Date().getTime(); // 浏览器Date中时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
        var targetDate = new Date(
          nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000
        );
        // console.log(`${timezone}区现在时间是：${targetDate}`);
        this.setTimeStr(targetDate);
      }, 1000);
    },
    // setZero(a) {
    //   return a < 10 ? "0" + a : a.toString(); //设置小于10的数字在前面加0
    // },
    setTimeStr(time) {
      var setZero = function (a) {
        return a < 10 ? "0" + a : a.toString(); //小于10的数字在前面加0
      };
      this.hour = setZero(time.getHours()).split("");
      this.minute = setZero(time.getMinutes()).split("");
      this.second = setZero(time.getSeconds()).split("");
    },
    setTheme() {
      //设置默认主题色
      var theme = getToken("theme") || "dark";
      var menu_bg = getToken("menu_bg") || "#131B2D";

      if (!store.getters.theme) {
        store.commit("SET_THEME", {
          theme: theme,
          menu_bg: menu_bg,
        });
        window.document.documentElement.setAttribute("data-theme", theme);
      }
    },
    switchTheme() {
      if (store.getters.theme === "light") {
        store.commit("SET_THEME", {
          theme: "dark",
          menu_bg: "#131B2D",
        });
        setToken("theme", "dark");
        setToken("menu_bg", "#131B2D");
        window.document.documentElement.setAttribute("data-theme", "dark");
      } else {
        store.commit("SET_THEME", {
          theme: "light",
          menu_bg: "#EFF1F7",
        });
        setToken("theme", "light");
        setToken("menu_bg", "#EFF1F7");
        window.document.documentElement.setAttribute("data-theme", "light");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_handle.scss";

.head {
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 4px solid #dee6ee;
  border-right: 4px solid #dee6ee;
  @include background_color("background_color1");
  @include border_color("border_color1");

  .title {
    text-indent: 12px;
    font-size: 14px;
    font-weight: bold;
    @include font_color("font_color11");
  }
  .icon {
    font-size: 12px;
    padding-right: 14px;
    display: flex;
    align-items: center;
    .time_zone {
      margin-right: 20px;
      @include font_color("font_color1");
      & /deep/ .el-select .el-input__inner {
        border: none;
        min-width: 150px;
      }
    }
    .clock {
      font-size: 16px;
      display: flex;
      align-items: center;
      position: relative;
      // .line {
      //   width: 100%;
      //   height: 2px;
      //   background: #ffffff;
      //   position: absolute;
      //   left: 0;
      //   top: 46%;
      //   @include background_color("font_color15");
      // }
      i {
        display: inline-block;
        width: 12px;
        height: 24px;
        border-radius: 2px;
        line-height: 22px;
        text-align: center;
        font-size: 18px;
        font-style: normal;
        margin: 0 2px;
        @include font_color("font_color15");
        @include background_color("background_color26");
      }
      span {
        display: inline-block;
        width: 14px;
        height: 24px;
        border-radius: 2px;
        line-height: 24px;
        text-align: center;
        font-weight: bold;
        margin: 0 0.5px;
        @include font_color("font_color15");
        @include background_color("background_color26");
      }
    }
    .skin {
      font-size: 12px;
      display: flex;
      align-items: center;
      margin-left: 24px;
      @include font_color("font_color4");
      &:hover {
        cursor: pointer;
      }
      .svg-icon {
        width: 18px;
        height: 18px;
        margin-right: 2px;
      }
    }
  }
}
</style>