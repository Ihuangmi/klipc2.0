<template>
  <div class="classify">
    <div class="select">
      <span>分类</span>
      <el-select
        popper-class="account-select"
        size="mini"
        v-model="selectKey"
        :placeholder="$t('signalpool.placeholder')"
      >
        <el-option size="mini" label="餐厅名" value="1"></el-option>
        <el-option size="mini" label="订单号" value="2"></el-option>
        <el-option size="mini" label="用户电话" value="3"></el-option>
      </el-select>
    </div>
    <div class="box">
      <div class="category" v-for="(e, i) in categorys" :key="e.title">
        <div class="title">
          <div :class="'icon'+i"></div>
          <div class="text">{{e.title}}</div>
        </div>
        <div class="term" v-for="item in e.items" :key="item">{{item}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      selectKey: "",
      categorys: [
        {
          title: "精选",
          items: ["用户精选", "JK精选", "5月精选"],
        },
        {
          title: "风险",
          items: ["中高风险", "低风险"],
        },
        {
          title: "产品划分",
          items: ["外汇", "贵金属", "指数", "加密货币", "股票"],
        },
        {
          title: "高交易量",
          items: ["500 + 手", "300 - 500", "100 - 300", "< 300"],
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_handle.scss";
$color: #ad2935;
$bgc: #d7e4f2;
$border: 4px solid $bgc;

@mixin border_b {
  border-bottom: $border;
}
@mixin border_r {
  border-right: $border;
}

.el-select {
  margin-left: 8px;
}
.classify {
  @include font_color("font_color1");
  @include background_color("background_color1");
  @include border_color("border_color1");
  width: 100%;
  height: 100%;
  font-size: 12px;
  box-sizing: border-box;
  .select {
    height: 2rem;
    line-height: 2rem;
    border-bottom: 1px solid #efefef;
    @include border_color("border_color2");
    padding-left: 12px;
  }
  .box {
    padding: 1rem;
    .category {
      margin-bottom: 1rem;
      .title {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        @mixin icon {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-right: 6px;
        }
        .icon0 {
          @include icon;
          background: #ff7d00;
        }
        .icon1 {
          @include icon;
          background: #9013fe;
        }
        .icon2 {
          @include icon;
          background: #3280fe;
        }
        .icon3 {
          @include icon;
          background: #3ab98e;
        }
        .text {
          font-family: MicrosoftYaHei;
          color: #262626;
          @include font_color("font_color1");
        }
      }
      .term {
        font-family: MicrosoftYaHei;
        color: #5f6472;
        @include font_color("font_color3");
        line-height: 22px;
        text-indent: 1rem;
        cursor: pointer;
      }
    }
  }
}
</style>