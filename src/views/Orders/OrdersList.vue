<template>
  <div>
    <!-- 面包屑导航 -->
    <bread-nav></bread-nav>
    <!-- 搜索 -->
    <el-card shadow="always" class="mt">
      <el-row>
        <el-col :span="8">
          <el-input
            placeholder="请输入订单号/客户名称"
            v-model="input"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search" @click="search(input)"></el-button>
          </el-input>
        </el-col>
        <el-col :span="16" class="tr">
          <el-button type="primary" @click="visible=true">新建订单</el-button>
          <el-button :disabled="!select.length" @click="operate(1)">审核</el-button>
          <el-button :disabled="!select.length" @click="operate(2)">修改</el-button>
          <el-button :disabled="!select.length" @click="operate(3)">作废</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 列表 -->
    <el-card shadow="always" class="mt">
      <!-- table组件 -->
      <div>
        <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        element-loading-text="拼命加载中"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" fixed="left">
        </el-table-column>
        <el-table-column type="index" label="序号" width="50" fixed="left">
        </el-table-column>
        <el-table-column prop="id" label="订单号" width="100" fixed="left">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">待审核</span>
            <span v-else-if="scope.row.status == 2">已审核</span>
            <span v-else-if="scope.row.status == 3">审核通过</span>
            <span v-else>审核拒绝</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="下单日期" width="120">
        </el-table-column>
        <el-table-column prop="name" label="客户名称"> </el-table-column>
        <el-table-column prop="start" label="起始城市" width="100">
        </el-table-column>
        <el-table-column prop="end" label="目的城市"> </el-table-column>
        <el-table-column prop="cargo" label="货物名称"> </el-table-column>
        <el-table-column prop="count" label="件数"> </el-table-column>
        <el-table-column prop="unit" label="单位"> </el-table-column>
        <el-table-column prop="price" label="运费"> </el-table-column>
        <el-table-column prop="from" label="订单来源"> </el-table-column>
        <el-table-column prop="pay" label="是否支付">
          <template slot-scope="scope">
            <span>{{ scope.row.pay == 1 ? "已支付" : "未支付" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="180" class="tr">
          <template slot-scope="scope">
            <el-button @click="adit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="delete1(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="params.pageSize"
        layout="prev, pager, next, jumper,sizes, total"
        :total="total"
        class="tr mt"
      >
      </el-pagination>
    </el-card>
    <!-- 编辑和新建弹窗 -->
    <order-modal :visible="visible" @hide="visible=false"></order-modal>
  </div>
</template>

<script>
import OrderModal from './OrdersModal.vue'
import BreadNav from "@/components/BreadNav.vue";
import { post , get} from "@/utils/http";
import { mapMutations , mapState} from 'vuex';
// import Mixin from '@/mixins/Mixin'
//  const configs = {
//     url: '/orderList',
//      params:{
//         page:1,
//         pageSize:10,
//       }
//   };
// const mixa = new Mixin(configs);
export default {
    // mixins: [mixa],
  data() {
    return {
      loading:false,
      tableData:[],
      total:0,
      visible:false,
      input: "",
      select:[],
      params: {
        page: 1,
        pageSize: 10,
      },
    };
  },
  mounted() {
    this.getData();
  },
  computed:{
    ...mapState(["row"])
  },
  methods: {
    async getData() {
      this.loading = true;
      const { data } = await post("/orderList", this.params);
      this.tableData = data.list;
      this.total=data.total;
      this.loading = false;
    },
    handleSizeChange(val) {
        this.params.pageSize=val;
        this.getData()
      },
      handleCurrentChange(val) {
        this.params.page=val;
        this.getData()
      },
      //勾选，获得勾选对象数组
      handleSelectionChange(val){
        this.select=val
      },
      // 搜索事件
      async search(input){
        //向搜索接口发送请求
        this.input=input;
        const res = await get('/search');
        this.getData();
        this.$message({
          message: `恭喜你，${res.message}！`,
          type: 'success'
        });

      },
      // 新建和编辑订单
      ...mapMutations(["saveRow","clearRow"]),
      adit(row){
        this.visible=true;
        this.clearRow();
        this.saveRow(row);
        this.getData();
      },
      //删除
       async delete1(id){
     const res = await post("/delete1",id);
        this.$message({
          message: res.message,
          type: 'success'
        });
        // 再次访问数据库，更新数据
        this.getData()
      },
      //3个操作按钮
      async operate(i){
          const res = await post('/operate',i);
          this.$message({
          message: res.message,
          type: 'success'
        });
      }
  },
  components: {
    BreadNav,OrderModal
  },
};
</script>

<style lang="less" scoped>
</style>