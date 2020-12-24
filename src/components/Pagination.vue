<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      current_page
      :total="total"
      :pager-count="pagers"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      hide-on-single-page
    />
  </div>
</template>

<script>
import { Pagination } from 'element-ui';
export default {
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Number,
    },
    pagers: {
      type: Number,
      default: 7,
    },
    layout: {
      type: String,
      default: "total, prev, pager, next, jumper",
    },
    background: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      },
    },
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("pagination", { page: this.currentPage, limit: val });
    },
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_handle.scss";
.pagination-container {
  @include background_color("background_color1");
  @include font_color("font_color1");
}
.pagination-container /deep/ {
  background: #fff;
  // padding: 5px;
  .el-pagination{
    // padding: 6px 0;
    padding: 6px 16px;
  }
  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    color: #aaadb8;
    background-color: #fff;
    @include font_color("font_color1");
    @include background_color("background_color1");
  }
  .el-pagination.is-background .btn-next:not(.disabled):hover,
  .el-pagination.is-background .btn-prev:not(.disabled):hover,
  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #ad2935;
    @include font_color("font1");
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    color: #fff;
    background-color: #ad2935;
    @include font_color("font_color6");
    @include background_color("background_color18");
    border-radius: 50%;
  }
  .el-input__inner:focus {
    border-color: #c0c0c0;
  }
  .el-pagination button,
  .el-pagination span:not([class*="suffix"]),
  .el-pager li {
    font-size: 12px;
    min-width: 20px !important;
    height: 20px;
    line-height: 20px;
    padding: 0;
  }
  .el-pagination__editor.el-input .el-input__inner {
    width: 34px;
    height: 20px;
    font-size: 12px;
    @include font_color("font_color1");
    @include background_color("background_color1");
  }
  .el-pager .more::before {
    line-height: 20px;
  }
  .el-pagination__total, .el-pagination__jump{
    @include font_color("font_color7");
  }
}
.pagination-container.hidden {
  display: none;
}
</style>

