<template>
  <div class="tabs">
    <el-scrollbar style="height: 30rem">
      <div v-for="(msg, index) in data" :key="index">
        <div class="msgItem">
          <div class="date">
            <div class="time">
              <div class="dt">{{msg.add_time}}</div>
              <div
                v-if="msg.message_type==='资金类'"
                class="funds_btn"
                size="mini"
              >{{$t("my_assets.funds")}}</div>
              <div
                v-if="msg.message_type==='登录信息'"
                size="mini"
                class="transaction_btn"
              >{{$t("my_assets.loginmsg")}}</div>
              <div
                v-if="msg.message_type==='交易类'"
                size="mini"
                class="transaction_btn"
              >{{$t("my_assets.trans")}}</div>
            </div>
            <!-- <img src="@/assets/images/more.png" class="icon" /> -->
          </div>
          <div class="msg">
            <div>{{msg.msg}}</div>
            <!-- <img src="@/assets/images/delete.png" class="icon" /> -->
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeName: "",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_handle.scss";

$textColor: #5f6472;
$textSize: 12px;
$color: #ad2935;

.tabs {
  // height: 28rem;

  & /deep/.el-tabs__nav-wrap::after {
    height: 0;
  }
  & /deep/ .el-tabs__header {
    height: 32px;
    line-height: 32px;
    padding: 0 12px;
    margin: 0;
    border-bottom: 1px solid rgb(231, 229, 229);
    @include border_color("border_color1");
  }
  & /deep/ .el-tabs__active-bar {
    height: 0;
    background-color: $color;
  }
  & /deep/.el-tabs__item {
    font-size: small;
    padding: 0;
    margin-right: 15px;
    height: 18px;
    line-height: 18px;
    border-radius: 2px;
    @include font_color("font_color1");
  }
  & /deep/.el-tabs__item:hover {
    color: $color;
  }
  & /deep/.el-tabs__item.is-active {
    // color: #fff;
    @include font_color("font_color6");
    background-color: $color;
    padding: 0 4px;
  }
}
.scroll {
  height: 26.8rem;
  overflow-y: auto;
}
.scrollbar {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.scroll::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px;
  /*高宽分别对应横竖滚动条的尺寸*/
  // height: 1px;
}

.scroll::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
  background: #cac9c9;
  // @include background_color("background_color4");
}

.scroll::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  /* background: #ededed; */
}
.msgItem {
  padding: 15px 15px;
  &:hover {
    @include background_color("background_color4");
  }
  &:hover .icon {
    display: block;
  }
  .icon {
    display: none;
    cursor: pointer;
  }

  .date {
    display: flex;
    justify-content: space-between;
    color: $textColor;
    @include font_color("font_color3");
    font-size: 10px !important;
    margin-bottom: 5px;
    .time {
      display: flex;
    }
    .dt {
      margin-right: 20px;
    }
    @mixin typebox {
      border-radius: 2px;
      text-align: center;
      padding: 3px;
      font-size: 10px;
      font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
      font-weight: 400;
    }
    .funds_btn {
      @include typebox;
      color: rgba(50, 128, 254, 1);
      background: rgba(50, 128, 254, 0.1);
    }
    .transaction_btn {
      @include typebox;
      color: rgba(246, 102, 93, 1);
      background: rgba(246, 102, 93, 0.1);
    }
    img {
      width: 18px;
      height: 18px;
    }
  }
  .msg {
    color: $textColor;
    @include font_color("font_color5");
    font-size: 12px;
    display: flex;
    justify-content: space-between;

    img {
      width: 16px;
      height: 16px;
    }
  }
}
</style>