<template>
  <div>
    <bread-nav></bread-nav>
    <el-card shadow="always" class="mt">
      <el-row :gutter="24">
        <el-col :span="5" class="mr">
          <el-input
            v-model="searchData.id"
            class="wid"
            placeholder="请输入车辆Id"
          ></el-input>
        </el-col>
        <el-col :span="5" class="mr">
          <el-input
            v-model="searchData.plateNumber"
            class="wid"
            placeholder="请输入车牌号"
          ></el-input>
        </el-col>
        <el-col :span="13" class="tr fr">
          <el-button type="primary" @click="searchCar">查询</el-button>
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
        <el-table-column type="index" label="序号"  fixed="left">
        </el-table-column>
        <el-table-column prop="id" label="ID"  fixed="left">
        </el-table-column>
       <el-table-column prop="plateNumber" label="车牌号" width="100"> </el-table-column>
        <el-table-column prop="permission" label="道路许可" width="130">
        </el-table-column>
        <el-table-column prop="name" label="所属司机姓名" width="120"> </el-table-column>
        <el-table-column prop="tel" label="联系方式" width="160"> </el-table-column>
        <el-table-column prop="type" label="类型" width="100">
            <template slot-scope="scope">
                <span>{{scope.row.type==1?"自有车":"非自有车"}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="credit" label="信用代码"> </el-table-column>
        <el-table-column prop="address" label="现居地址" width="120">
        </el-table-column>
        <el-table-column prop="report" label="是否上报">
        <template slot-scope="scope">
                <span>{{scope.row.report==1?"是":"否"}}</span>
            </template>
         </el-table-column>
        <el-table-column prop="quality" label="今年是否质检" width="120">
        <template slot-scope="scope">
                <span>{{scope.row.quality==1?"是":"否"}}</span>
            </template>
         </el-table-column>
        <el-table-column label="操作" fixed="right" width="180" class="tr">
          <template slot-scope="scope">
            <el-button @click="adit(scope.row)" size="mini">编辑</el-button>
          <el-button type="danger" @click="delete1(scope.row.id)" size="mini">删除</el-button>
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
    <adit-trucks :visible="visible" @hide="visible=false"></adit-trucks>
  </div>
</template>

<script>
import AditTrucks from './AditTrucks.vue'
import {post} from '@/utils/http'
import BreadNav from "@/components/BreadNav.vue";
import Mixin from '@/mixins/Mixin'
import { mapMutations } from 'vuex';
const configs = {
    url: '/CarList',
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
        id: "",
        plateNumber: "",
      },
      params:{
        page:1,
        pageSize:10,
      }
    };
  },
  methods:{
    async searchCar() {
      //向后端发送查询对应订单的请求
      const res = await post("/searchCar", this.searchData);
      this.getData();
      this.$message({
        message: `恭喜你，${res.message}！`,
        type: "success",
      });
    },
    ...mapMutations(['setTrucks']),
    adit(row){
    this.setTrucks(row);
    this.visible=true;
    },
    //删除
       async delete1(id){
      await post("/delete2",id);
        this.$message({
          message: '删除承运车辆成功',
          type: 'success'
        });},
  },

  components: {
    BreadNav,AditTrucks
  },
};
</script>

<style lang="less" scoped>
</style>