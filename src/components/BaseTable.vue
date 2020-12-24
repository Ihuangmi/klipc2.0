<template>
  <div class="table">
    <el-table
      class="bueatyScroll"
      :data="data"
      v-loading="isLoad"
      border
      v-bind="tableConfig"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      @sort-change="changeSort"
      @selection-change="changeSelectRows"
      :height="height"
    >
      <!-- :summary-method="getSummaries" -->
      <template v-for="(colConfig, index) in colConfigs">
        <!-- 有slot的单独渲染 -->
        <slot
          v-if="colConfig.slot"
          :name="colConfig.slot"
          :col-config="colConfig"
        ></slot>

        <!-- 有component的单独渲染 -->
        <component
          v-else-if="colConfig.component"
          :is="colConfig.component"
          :col-config="colConfig"
          :key="index"
        ></component>

        <!-- 普通项 -->
        <el-table-column
          v-else
          v-bind="colConfig"
          :key="index"
        ></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "enhanced-table",
  props: {
    data: {
      type: Array,
      require: true,
    },
    height: {
      type: Number,
    },
    colConfigs: {
      type: Array,
      require: true,
    },
    tableConfig: {
      type: Object,
      default: () => {},
    },
    showSummary: {
      type: Boolean,
      default: false,
    },
    isLoad: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 排序事件
    changeSort({ column, prop, order }) {
      this.$emit("sort-change", column, prop, order);
    },
    // 勾选事件
    changeSelectRows(val) {
      this.$emit("selection-change", val);
    },
    // 求和事件
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = this.$t("global.total");
        }
        // index >= 3 || index <= 11 是你需要计算的列
        else if (index === 3 || index === 7) {
          const values = data.map((item) => Number(item[column.property]));
          if (!values.every((value) => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                // 保存了两位小数点
                return Math.floor((prev + curr) * 100) / 100;
              } else {
                // 保存了两位小数点
                return Math.floor(prev * 100) / 100;
              }
            }, 0);
            // sums[index] = "$" + sums[index];
          } else {
            sums[index] = "";
          }
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_handle.scss";

.table /deep/ {
  // 表头和内容对齐
  .el-table th.gutter {
    display: table-cell !important;
  }
  // .el-table__body-wrapper,
  .el-table__empty-block {
    @include background_color("background_color1");
  }
  .el-table__empty-text {
    font-size: 12px;
  }
  .el-table__header .gutter{
    width: 0 !important;
  }
  .el-table__header th,
  .el-table__header tr {
    height: 28px;
    font-size: 12px;
    @include font_color("font_color4");
    @include background_color("background_color4");
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
  }
  .el-table__body-wrapper{
    @include background_color("background_color1");
  }
  // 滚动条样式
  .el-table__body-wrapper::-webkit-scrollbar {
    width: 7px; /*滚动条宽度*/
    // height: 0; /*滚动条高度*/
  }
  .el-table__body-wrapper::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    // border-radius: 10px; /*滚动条的背景区域的圆角*/
    // background-color: #eeeeee; /*滚动条的背景颜色*/
  }
  .el-table__body-wrapper::-webkit-scrollbar-thumb {
    // border-radius: 10px; /*滚动条的圆角*/
    // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    @include background_color("background_color27");
  }

  // *****表格边框颜色*******
  .el-table {
    // border: none;
    @include border_color("border_color2");
  }
  .el-table td,
  .el-table th.is-leaf,
  .el-table--border,
  .el-table--group {
    // border: none;
    // border-color: black;
    @include border_color("border_color2");
  }
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    // background-color: black;
    @include background_color("background_color8");
  }
  // **************
  .el-table__footer-wrapper .has-gutter td,
  .el-table__body td,
  .el-table__body th {
    height: 28px;
    font-size: 12px !important;
    @include font_color("font_color5");
    @include background_color("background_color1");
    @include border_color("border_color2");
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    @include background_color("background_color4");
  }
  .el-table td,
  .el-table th {
    padding: 0 !important;
    @include border_color("border_color2");
  }
  .el-table--border,
  .el-table--group {
    border-top: none;
    @include border_color("border_color2");
    @include background_color("border_color2");
  }

  .el-table .el-checkbox .is-checked .el-checkbox__inner,
  .el-table .el-checkbox .is-indeterminate .el-checkbox__inner {
    background-color: #ad2935;
    border-color: #ad2935;
  }
  .el-table .caret-wrapper {
    height: 28px !important;
  }
  .el-table .sort-caret.ascending {
    top: 3px;
  }
  .el-table .sort-caret.descending {
    bottom: 3px;
  }
}
</style>