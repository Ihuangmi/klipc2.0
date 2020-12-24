<template>
  <div class="scrollbar">
    <div v-if="data.length>0" class="scrollbar" style="height: 14.3rem">
    <!-- <el-scrollbar v-if="data.length>0" style="height: 14.3rem"> -->
      <div class="card-box" v-for="v in data" :key="v.id">
        <div class="avatar">
          <!-- <img src="@/assets/images/yi.png" /> -->
          <img :src="v.fav_user.avatar" @click="toMasterPage(v.fav_user.id)" />
        </div>
        <div class="col_item item1">
          <div class="server">{{ v.fav_user.platform_server }}</div>
          <div>
            <span class="text">{{ $t("my_assets.pl1") }}：</span>
            <span
              :class="v.fav_user.today_profit_loss < 0 ? 'loss' : 'profit'"
              >{{ v.fav_user.today_profit_loss }}</span
            >
          </div>
        </div>
        <div class="col_item item2">
          <div class="flag">
            <svg-icon iconClass="flag"></svg-icon>
            <span class="text nickname">{{ v.fav_user.nick_name }}</span>
          </div>
          <div>
            <span class="text">{{ $t("my_assets.pl2") }}：</span>
            <span
              :class="v.fav_user.seven_day_profit_loss < 0 ? 'loss' : 'profit'"
              >{{ v.fav_user.seven_day_profit_loss }}</span
            >
          </div>
        </div>
        <div class="col_item item3">
          <div class="fire">
            <svg-icon iconClass="hot"></svg-icon>
            <span class="number">{{ v.fav_user.heat }}</span>
          </div>
          <div>
            <span class="text">{{ $t("my_assets.net_worth") }}：</span>
            <span :class="v.fav_user.equity < 0 ? 'loss' : 'profit'">{{
              v.fav_user.equity.toLocaleString()
            }}</span>
          </div>
        </div>
        <div class="col_item delete_icon">
          <img @click="deleteUser(v.fav_user.id)" src="@/assets/images/delete.png" class="icon" />
        </div>
      </div>
    <!-- </el-scrollbar> -->
    </div>
    <div v-else class="empty">
      {{ $t("my_assets.go") }}
      <span class="links" @click="toSignalpool">{{ $t("menu.signalpool") }}</span>
      {{ $t("my_assets.look") }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
  },
  methods: {
    deleteUser(id){
      this.$emit('deleteUser', id)
    },
    toSignalpool(){
      this.$router.push('/signalpool')
    },
    toMasterPage(id) {
      this.$router.push({
        path: `/signalpool/master/${id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_handle.scss";
.empty{
  font-size: 12px;
  margin: 20px 16px;
  color: #909399;
  text-align: center;
  // @include font_color("font_color2");
  .links{
    color: #AD2935;
    cursor: pointer;
    &:hover{
      color: #e0081a;
    }
  }
}
.scrollbar {
  overflow-x: hidden;
  overflow-y: auto;
}
.scrollbar::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  // height: 1px;
}

.scrollbar::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
  background: #cac9c9;
  @include background_color("background_color27");
}

.scrollbar::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  /* background: #ededed; */
}

.card-box {
  width: 100%;
  display: flex;
  padding: 12px 0;
  font-size: 14px;
  &:hover {
    @include background_color("background_color4");
  }
  &:hover .icon {
    display: block;
  }
  .avatar {
    width: 20%;
    text-align: center;
    cursor: pointer;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
  }
  .col_item {
    line-height: 25px;
    padding: 0 5px;
    .flag,
    .fire {
      display: flex;
      align-items: center;
      margin: 2px 0 6px 0;
      overflow: hidden;
    }
    .svg-icon {
      width: 14px;
      height: 14px;
      margin-right: 8px;
    }
  }
  .icon {
    width: 14px;
    height: 14px;
    display: none;
    cursor: pointer;
  }
  .item1 {
    min-width: 27%;
  }
  .item2 {
    min-width: 23%;
  }
  .item3 {
    min-width: 25%;
  }
  .delete_icon{
    min-width: 4%;
  }

  .server {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    // color: rgba(38, 38, 38, 1);
    @include font_color("font_color5");
  }

  .text {
    font-size: 12px;
    font-family: NotoSansCJKsc-Regular, NotoSansCJKsc;
    font-weight: 400;
    // color: rgba(0, 0, 0, 0.85);
    @include font_color("font_color5");
    line-height: 18px;
  }
  .nickname{
    overflow: hidden;
    text-overflow: ellipsis;
    
  }
  .number {
    font-size: 12px;
    line-height: 18px;
    @include font_color("font_color3");
  }

  .profit {
    font-size: 12px;
    line-height: 18px;
    color: #F6665D;
  }
  .loss {
    font-size: 12px;
    line-height: 18px;
    color: #3AB98E;
  }
}
</style>