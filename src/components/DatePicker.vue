<template>
  <div class="date-picker">
    <span class="title">{{$t('report.value5')}}</span>
    <el-date-picker
      v-model="currentValue"
      size="mini"
      type="daterange"
      align="right"
      unlink-panels
      value-format="yyyy-MM-dd"
      :range-separator="$t('report.value12')"
      :start-placeholder="$t('report.value11')"
      :end-placeholder="$t('report.value13')"
      :picker-options="pickerOptions"
      popper-class="picker-box"
      @change="dateChange"
    ></el-date-picker>
  </div>
</template>
<script>
import { parseTime } from "@/utils";

export default {
  props: {
    period: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentValue: [],
      defaultValue: [],
      pickerOptions: {
        shortcuts: [
          {
            text: this.$t("report.value7"),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: this.$t("report.value8"),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: this.$t("report.value9"),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  mounted() {
    // Default date period Last mounth
    var start = parseTime(
      new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 30)
    );
    var end = parseTime(new Date());
    this.currentValue.push(start);
    this.currentValue.push(end);
  },
  watch: {
    currentValue: function (val) {
      // console.log(val)
      this.$emit("update:period", val);
    },
  },
  methods: {
    dateChange(){
      // console.log(this.currentValue)
      this.$emit('change')
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/_handle.scss";

.date-picker {
  display: flex;
  align-items: center;
    @include font_color("font_color1");
    @include background_color("background_color1");
  .title {
    margin-right: 16px;
    @include font_color("font_color1");
  }
}
.date-picker /deep/ {
  .el-range-editor--mini.el-input__inner {
    width: 265px;
    height: 24px;
    @include font_color("font_color1");
    @include background_color("background_color1");
  }
  .el-range-editor .el-range-input{
    @include font_color("font_color1");
    @include background_color("background_color1");

  }
  .el-range-editor--mini .el-range__close-icon,
  .el-range-editor--mini .el-range__icon,
  .el-range-editor--mini .el-range-separator {
    line-height: 16px;
  }
  .el-range-editor.is-active,
  .el-range-editor.is-active:hover {
    border-color: #ad2935;
  }
}
</style>