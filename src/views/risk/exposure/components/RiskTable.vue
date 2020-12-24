<template>
  <div class="inner-table">
    <el-table-column type="expand" v-bind="colConfig">
      <template #default="{ row }">
        <!-- 数据通过row传进来 -->
        <BaseTable :data="row.position_list" :col-configs="riskConfigs">
          <template #index>
            <el-table-column type="index" width="40"></el-table-column>
          </template>
          <template #duokong="{ colConfig }">
            <el-table-column v-bind="colConfig">
              <template #default="{ row }">
                <el-button v-if="row.type === 'buy'" size="mini" class="buy"
                  >Buy</el-button
                >
                <el-button
                  v-else-if="row.type === 'sell'"
                  size="mini"
                  class="sell"
                  >Sell</el-button
                >
                <span v-else>--</span>
              </template>
            </el-table-column>
          </template>
          <template #pl="{ colConfig }">
            <el-table-column v-bind="colConfig">
              <template #default="{ row }">
                <span v-if="row.profit >= 0" style="color: #f6665d"
                  >{{ (row.profit) }}</span
                >
                <span v-else style="color: #3ab98e"
                  >{{ (row.profit) }}</span
                >
              </template>
            </el-table-column>
          </template>
        </BaseTable>
      </template>
    </el-table-column>
  </div>
</template>
<script>
import BaseTable from "@/components/BaseTable";

export default {
  components: {
    BaseTable,
  },
  props: ["colConfig"],
  data() {
    return {
      tableData: [
        {
          product: "AUD JPY",
          d: "buy",
          c: 0.03,
          date: "2020-09-09 08:20:20",
          account: "明明",
          server: "ICMmarkets-Live11",
          price: "13655",
          pl: "13655",
        },
        {
          product: "AUD JPY",
          d: "buy",
          c: 0.03,
          date: "2020-09-09 08:20:20",
          account: "明明",
          server: "ICMmarkets-Live11",
          price: "13655",
          pl: "13655",
        },
        {
          product: "AUD JPY",
          d: "buy",
          c: 0.03,
          date: "2020-09-09 08:20:20",
          account: "明明",
          server: "ICMmarkets-Live11",
          price: "13655",
          pl: "13655",
        },
      ],
    };
  },
  computed: {
    riskConfigs() {
      return [
        { slot: "index" },
        { prop: "symbol", label: this.$t("risk_exposure.tablekey1"), 'min-width': '12%' },
        {
          prop: "type",
          label: this.$t("risk_exposure.tablekey2"),
          slot: "duokong",
          'min-width': '8%',
        },
        { prop: "volume", label: this.$t("risk_exposure.tablekey3"), 'min-width': '10%' },
        { prop: "openTime", label: this.$t("risk_exposure.tablekey4"), 'min-width': '15%' },
        { prop: "ticket", label: this.$t("risk_exposure.tablekey5"), 'min-width': '12%' },
        { prop: "broker", label: this.$t("risk_exposure.tablekey7"), 'min-width': '18%' },
        {
          prop: "openPrice",
          label: this.$t("risk_exposure.tablekey8")+'($)', 'min-width': '12%'
        },
        {
          prop: "profit",
          label: this.$t("risk_exposure.tablekey9")+'($)',
          slot: "pl", 'min-width': '12%'
        },
      ];
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/_handle.scss";

.svg-icon {
  width: 36px;
  height: 18px;
  display: block;
  margin: auto 0;
}

@mixin btn {
  width: 36px;
  height: 18px;
  border-radius: 2px;
  padding: 0 2px;
  box-sizing: border-box;
  cursor: default;
}
.buy {
  @include btn;
  @include font_color("font_color9");
  @include background_color("background_color9");
  @include border_color("border_color3");
}
.sell {
  @include btn;
  @include font_color("font_color10");
  @include background_color("background_color10");
  @include border_color("border_color3");
}
</style>