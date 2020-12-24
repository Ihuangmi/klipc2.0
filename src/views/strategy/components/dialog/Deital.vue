<template>
  <div>
    <!-- Form -->
    <el-dialog title="策略1（FTG - Live 2397) 订单细节" :visible.sync="show1">
      <el-scrollbar style="height:400px">
        <div style="width:100%;display:flex;font-size:12px;margin:5px 0">
            <div style="width:60px;font-weight:bold">持仓</div>
            <div style="width:120px">持仓手数 <span style="font-weight:bold">&emsp;0.5&emsp;</span> 手</div>
            <div style="flex:1">持仓盈亏 <span style="font-weight:bold">$6890</span></div>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          row-key="id"
          border
          lazy
          :load="load"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="accName" label="名称" width="80"></el-table-column>
          <el-table-column prop="serve" label="平台" width="80"></el-table-column>
          <el-table-column prop="type" label="类型" width="50"></el-table-column>
          <el-table-column prop="account" label="账户" width="80"></el-table-column>
          <el-table-column prop="number" label="订单号" width="80"></el-table-column>
          <el-table-column prop="dk" label="多空" width="50"></el-table-column>
          <el-table-column prop="product" label="产品名" width="80"></el-table-column>
          <el-table-column prop="openTime" label="开仓时间" sortable width="120"></el-table-column>
          <el-table-column prop="openPrice" label="开仓价格" sortable width="120"></el-table-column>
          <el-table-column prop="overnight" label="隔夜利息" sortable width="120"></el-table-column>
          <el-table-column prop="pl" label="盈亏金额" sortable width="120"></el-table-column>
        </el-table>
        <div style="width:100%;display:flex;font-size:12px;margin:5px 0">
            <div style="width:60px;font-weight:bold">平仓</div>
            <div style="width:120px">平仓手数 <span style="font-weight:bold">&emsp;0.5&emsp;</span> 手</div>
            <div style="flex:1">平仓盈亏 <span style="font-weight:bold">$6890</span></div>
        </div>
       <el-table
          :data="tableData"
          style="width: 100%"
          row-key="id"
          border
          lazy
          :load="load"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="accName" label="名称" width="80"></el-table-column>
          <el-table-column prop="serve" label="平台" width="80"></el-table-column>
          <el-table-column prop="type" label="类型" width="50"></el-table-column>
          <el-table-column prop="account" label="账户" width="80"></el-table-column>
          <el-table-column prop="number" label="订单号" width="80"></el-table-column>
          <el-table-column prop="dk" label="多空" width="50"></el-table-column>
          <el-table-column prop="product" label="产品名" width="80"></el-table-column>
          <el-table-column prop="openTime" label="开仓时间" sortable width="120"></el-table-column>
          <el-table-column prop="openPrice" label="开仓价格" sortable width="120"></el-table-column>
          <el-table-column prop="overnight" label="隔夜利息" sortable width="120"></el-table-column>
          <el-table-column prop="pl" label="盈亏金额" sortable width="120"></el-table-column>
        </el-table>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show1 = false">取 消</el-button>
        <el-button type="primary" @click="show1 = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
        show1:true,
      tableData: [
        {
          id: 1,
          accName: "Choie",
          serve: "ICMmarkets-Live11",
          type:'MT4',
          account:'123******0',
          number:'234****8',
          dk:'Buy',
          product:'USD JPY',
          openTime:'2020-09-09 12:09:10',
          openPrice:'$6,789.09',
          overnight:'$1.09',
          pl:'$201.09',
        },
        {
          id: 2,
           accName: "Choie",
          serve: "ICMmarkets-Live11",
          type:'MT4',
          account:'123******0',
          number:'234****8',
          dk:'Buy',
          product:'USD JPY',
          openTime:'2020-09-09 12:09:10',
          openPrice:'$6,78.09',
          overnight:'$1.09',
          pl:'$201.09',
        },
        {
          id: 3,
           accName: "Choie",
          serve: "ICMmarkets-Live11",
          type:'MT4',
          account:'123******0',
          number:'234****8',
          dk:'Buy',
          product:'USD JPY',
          openTime:'2020-09-09 12:09:10',
          openPrice:'$6,89.09',
          overnight:'$1.09',
          pl:'$201.09',
          children: [
            {
              id: 31,
               accName: "Choie",
          serve: "ICMmarkets-Live11",
          type:'MT4',
          account:'123******0',
          number:'234****8',
          dk:'Buy',
          product:'USD JPY',
          openTime:'2020-09-09 12:09:10',
          openPrice:'$789.09',
          overnight:'$1.09',
          pl:'$201.09',
            },
            {
              id: 32,
               accName: "Choie",
          serve: "ICMmarkets-Live11",
          type:'MT4',
          account:'123******0',
          number:'234****8',
          dk:'Buy',
          product:'USD JPY',
          openTime:'2020-09-09 12:09:10',
          openPrice:'$6,789.09',
          overnight:'$1.09',
          pl:'$201.09',
            },
          ],
        },
        {
          id: 4,
           accName: "Choie",
          serve: "ICMmarkets-Live11",
          type:'MT4',
          account:'123******0',
          number:'234****8',
          dk:'Buy',
          product:'USD JPY',
          openTime:'2020-09-09 12:09:10',
          openPrice:'$6,789.09',
          overnight:'$1.09',
          pl:'$201.09',
        },
      ],
    };
  },

  methods: {
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            id: 32,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
        ]);
      }, 1000);
    },
  },
};
</script>
<style lang="scss">
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>