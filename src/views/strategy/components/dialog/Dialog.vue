<template>
  <div>
    <!-- Form -->
    <el-dialog title="跟单设置" :visible.sync="dialogFormVisible">
    
      <div class="titleSub">请选择账号启用设置</div>
      <el-scrollbar style="height:400px">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="accName" label="账号名称"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
          <el-table-column prop="serve" label="服务器"></el-table-column>
          <el-table-column prop="account" label="账号"></el-table-column>
          <el-table-column prop="balance" label="余额"></el-table-column>
        </el-table>
        <div class="titleSub">跟单设置</div>
        <el-form :model="form">
          <div style="display:flex">
            <div style="width:50%">
              <el-form-item label="最低交易手数">
                <i class="el-icon-warning-outline" style="margin-right:10px"></i>
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="启用以下最大手数">
                <i class="el-icon-warning-outline" style="margin-right:10px"></i>
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="启动滑点控制">
                <i class="el-icon-warning-outline" style="margin-right:10px"></i>
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="启动爆仓比例(%)">
                <i class="el-icon-warning-outline" style="margin-right:10px"></i>
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="暂停跟单" prop="delivery">
                <el-switch v-model="form.delivery1"></el-switch>
              </el-form-item>
              <el-form-item label="启用平仓订单明细表" prop="delivery">
                <el-switch v-model="form.delivery2"></el-switch>
              </el-form-item>
            </div>
            <div style="width:50%">
              <el-form-item label="启用延迟保护">
                <i class="el-icon-warning-outline" style="margin-right:10px"></i>
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="启用止损/止盈">
                <i class="el-icon-warning-outline" style="margin-right:10px"></i>
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="最大累计持仓手数">
                <i class="el-icon-warning-outline" style="margin-right:10px"></i>
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="最大回撤承担金额">
                <i class="el-icon-warning-outline" style="margin-right:10px"></i>
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="启动反向跟单" prop="delivery">
                <el-switch v-model="form.delivery3"></el-switch>
              </el-form-item>
              <el-form-item label="自动续费" prop="delivery">
                <el-switch v-model="form.delivery4"></el-switch>
              </el-form-item>
            </div>
          </div>
          <div style="display:flex;align-items: center;">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
              <el-radio label="线下场地"></el-radio>
            </el-radio-group>
            <el-form-item>
              <el-input v-model="form.name" class="setInput" autocomplete="off"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div style="font-size:12px">* 所有设置规则需参照客户所使用平台具体所有设置规则需参照客户所使用平台具体</div>
      </el-scrollbar>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          accName: "798232",
          type: "MT4",
          serve: "ICMmarkets-Live11",
          account: "2345678",
          balance: "$8981",
        },
        {
          accName: "798232",
          type: "MT4",
          serve: "ICMmarkets-Live11",
          account: "2345678",
          balance: "$8981",
        },
        {
          accName: "798232",
          type: "MT4",
          serve: "ICMmarkets-Live11",
          account: "2345678",
          balance: "$8981",
        },
        {
          accName: "798232",
          type: "MT4",
          serve: "ICMmarkets-Live11",
          account: "2345678",
          balance: "$8981",
        },
        {
          accName: "798232",
          type: "MT4",
          serve: "ICMmarkets-Live11",
          account: "2345678",
          balance: "$8981",
        },
        {
          accName: "798232",
          type: "MT4",
          serve: "ICMmarkets-Live11",
          account: "2345678",
          balance: "$8981",
        },
      ],
      multipleSelection: [],
      dialogFormVisible: true,
      form: {
        resource: "线上品牌商赞助",
        delivery1: false,
        delivery2: false,
        delivery3: false,
        delivery4: false,
        name: "",
        region: "",
        date1: "",
        date2: "",
        type: [],
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style scoped>
.el-dialog {
  border-radius: 10px !important;
  width: 70%;
}
.el-dialog__header {
  /* padding: 20px 20px 10px; */
  height: 32px;
  padding: 0;
  border-radius: 10px 10px 0 0 !important;
  background-color: #ad2935;
}
.el-dialog__headerbtn {
  position: absolute;
  top: 8px;
  right: 15px;
}
.el-dialog__title {
  line-height: 32px;
  font-size: 14px;
  color: #fff;
  padding-left: 10px;
}
.el-input {
  width: 134px;
  font-size: 12px;
}
.el-input__inner {
  height: 24px;
  line-height: 24px;
}
.el-form-item__label {
  font-size: 12px;
}
.el-form-item {
  margin-bottom: 0;
}
.el-button--primary {
  color: #fff;
  height: 28px;
  border-color: #fff;
  width: 80px;
  background: rgba(173, 41, 53, 1) !important;
  border-radius: 4px;
  line-height: 28px;
}
.el-button {
  font-size: 12px;
  width: 80px;
  height: 28px;
  background: rgba(247, 247, 247, 1);
  border-radius: 4px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.el-radio__label {
  font-size: 12px;
}
.setInput {
  width: 50px;
  margin-left: 10px;
}
.el-dialog__body {
  padding:5px 20px 20px 20px;
}
.titleSub {
  font-size: 12px;
  height: 30px;
  display:flex;
  align-items: center;
  border-bottom: 1px solid #EFEFEF;
}
</style>
<style lang="scss">
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>