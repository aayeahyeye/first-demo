<template>
  <div>
    <bread-nav></bread-nav>
    <!-- 筛选 -->
    <el-card shadow="always" class="mt">
      <el-row :gutter="24">
        <el-col :span="5" class="mr">
          <el-input
            v-model="searchData.waybillNo"
            class="wid"
            placeholder="请输入运单号"
          ></el-input>
        </el-col>
        <el-col :span="5" class="mr">
          <el-input
            v-model="searchData.name"
            class="wid"
            placeholder="请输入客户名称"
          ></el-input>
        </el-col>
        <el-col :span="7">
          <el-date-picker
            v-model="searchData.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="6" class="tr fr">
          <el-button type="primary" @click="searchCarrier">查询</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="always" class="mt">
        <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        element-loading-text="拼命加载中"
      >
      <el-table-column type="index" label="序号" fixed="left">
        </el-table-column>
        <el-table-column prop="id" label="编号id" width="100" fixed="left">
        </el-table-column>
        <el-table-column prop="abbreviation" label="简称">
        </el-table-column>
        <el-table-column prop="permission" label="道路许可" width="130">
        </el-table-column>
        <el-table-column prop="tel" label="联系人/电话" width="160"> </el-table-column>
        <el-table-column prop="type" label="类型" width="100">
            <template slot-scope="scope">
                <span>{{scope.row.type==1?"自有车":"非自有车"}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="date" label="注册时间" width="100"> </el-table-column>
        <el-table-column prop="name" label="承运商名称" width="100"> </el-table-column>
        <el-table-column prop="credit" label="信用代码"> </el-table-column>
        <el-table-column prop="address" label="注册地址">
        </el-table-column>
        <el-table-column prop="report" label="是否上报">
        <template slot-scope="scope">
                <span>{{scope.row.report==1?"是":"否"}}</span>
            </template>
         </el-table-column>
        <el-table-column prop="sco" label="信用分"> </el-table-column>
        <el-table-column label="操作" fixed="right" width="180" class="tr">
          <template slot-scope="scope">
            <el-button @click="adit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="delete2(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="params.pageSize"
        layout=" prev, pager, next, jumper,sizes,total"
        :total="total"
        class="tr"
      >
      </el-pagination>
    </el-card>
    <adit-carrier :visible="visible" @hide="visible=false"></adit-carrier>
  </div>
</template>

<script>
import AditCarrier from './AditCarrier.vue'
import {mapMutations} from 'vuex'
import { post } from "@/utils/http";
import BreadNav from "@/components/BreadNav.vue";
import Mixin from '@/mixins/Mixin'
const configs = {
    url: '/CarrierList',
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
      visible:false,
      searchData: {
        No: "",
        name: "",
        date: "",
      },
      params: {
        page: 1,
        pageSize: 10,
      },
    };
  },
  methods: {

    //查询承运商
    async searchCarrier() {
      //向后端发送查询对应订单的请求
      const res = await post("/searchCarrier", this.searchData);
      this.getData();
      this.$message({
        message: `恭喜你，${res.message}！`,
        type: "success",
      });
      this.searchData={}
    },
    //获取数据
    // async getData() {
    //   this.loading = true;
    //   const { data } = await post("/CarrierList", this.params);
    //   this.tableData = data.list;
    //   this.total=data.total;
    //   this.loading = false;
    // },
    // handleSizeChange(val) {
    //     this.params.pageSize=val;
    //     this.getData()
    //   },
    //   handleCurrentChange(val) {
    //     this.params.page=val;
    //     this.getData()
    //   },
      //删除
       async delete2(id){
     const res = await post("/delete2",id);
        this.$message({
          message: res.message,
          type: 'success'
        });},
        // 编辑
        ...mapMutations(['setCarrier']),
        adit(row){
          this.setCarrier(row);
          console.log(row);
          this.visible=true;
        }
  },
  components: {
    BreadNav,AditCarrier
  },
};
</script>

<style lang="less" scoped>
</style>