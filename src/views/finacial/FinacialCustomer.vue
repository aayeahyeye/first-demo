<template>
  <div>
    <bread-nav></bread-nav>
      <!-- 搜索 -->
      <el-card class="mt">
        <el-row :gutter="24">
          <el-col :span="18">
            <el-row :gutter="24">
              <el-col :span="8">
                <el-input
                  v-model="searchData.name"
                  class="wid"
                  placeholder="请输入客户名称"
                ></el-input>
              </el-col>
              <el-col :span="8">
                <el-input
                  v-model="searchData.id"
                  class="wid"
                  placeholder="请输入对账单号"
                ></el-input>
              </el-col>
              <el-col :span="8">
                <el-input
                  v-model="searchData.tel"
                  class="wid"
                  placeholder="联系电话"
                ></el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6" class="tr">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="always" class="mt">
        <el-card>
          <el-table
            :data="tableData"
            style="width: 100%"
            element-loading-text="拼命加载中"
            v-loading="loading"
          >
            <el-table-column type="index" width="50" label="序号" fixed="left">
            </el-table-column>
            <el-table-column
              prop="no"
              label="对账单号"
              width="180"
              fixed="left"
            ></el-table-column>
            <el-table-column
              prop="date"
              label="账单日期"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="pay"
              label="付款对象"
              width="120"
            ></el-table-column>
            <el-table-column prop="Billingstatus" label="账单状态" width="120">
              <template slot-scope="scope">
                {{ scope.row.Billingstatus == 1 ? "已对账" : "未对账" }}
              </template></el-table-column
            >
            <el-table-column prop="status" label="开票状态" width="100">
              <template slot-scope="scope">
                {{ scope.row.status == 1 ? "已开票" : "未开票" }}
              </template>
            </el-table-column>
            <el-table-column prop="expenditure" width="180" label="总支出金额">
            </el-table-column>
            <el-table-column prop="abnormal" label="异常状态" width="100">
              <template slot-scope="scope">
                {{ scope.row.status == 1 ? "是" : "否" }}
              </template>
            </el-table-column>
            <el-table-column
              prop="createDate"
              label="创建日期"
              width="120"
            ></el-table-column>
            <el-table-column prop="createPerson" label="创建人" width="100">
            </el-table-column>
            <el-table-column
              prop="operate"
              label="操作"
              fixed="right"
              width="100"
            >
              <template slot-scope="scope">
                <el-button
                  type="success"
                  v-if="scope.row.status == 1 && scope.row.Billingstatus == 1"
                  size="mini"
                  >已确认</el-button
                >
                <el-button
                  type="primary"
                  v-else-if="
                    scope.row.status == 2 && scope.row.Billingstatus == 1
                  "
                  size="mini"
                  >开票</el-button
                >
                <el-button type="danger" size="mini" v-else>取消对账</el-button>
              </template>
            </el-table-column>
          </el-table>
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
      </el-card>

  </div>
</template>

<script>
import BreadNav from "@/components/BreadNav.vue";
import Mixin from '@/mixins/Mixin'
 const configs = {
    url: '/FinacialCarrier',
     params:{
        page:1,
        pageSize:10,
      }
  };
const mixa = new Mixin(configs);
export default {
    mixins: [mixa],
    data() {
    return {
      searchData: {
        id: "",
        name: "",
        tel: "",
      },
      params: {
        page: 1,
        pageSize: 8,
      },
    };
  },
  methods:{
    search(){
      this.getData();
      this.reset()
    },
    reset(){
      this.searchData={}
    }
  },
  components: {
    BreadNav,
  },
};
</script>

<style lang="less" scoped>
</style>