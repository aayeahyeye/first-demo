<template>
  <div>
    <bread-nav></bread-nav>
    <el-card shadow="always" class="mt">
      <el-row :gutter="24">
        <el-col :span="5" class="mr">
          <el-input
            v-model="searchData.name"
            class="wid"
            placeholder="请输入司机姓名"
          ></el-input>
        </el-col>
        <el-col :span="5" class="mr">
          <el-input
            v-model="searchData.No"
            class="wid"
            placeholder="请输入ID"
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
          <el-button type="primary" @click="searchDriver">查询</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card shaow="always" class="mt">
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
       <el-table-column prop="name" label="承运司机姓名" width="120"> </el-table-column>
       <el-table-column prop="plateNumber" label="车牌号" width="100"> </el-table-column>
        <el-table-column prop="permission" label="道路许可" width="130">
        </el-table-column>
        <el-table-column prop="tel" label="联系方式" width="160"> </el-table-column>
        <el-table-column prop="type" label="类型" width="100">
            <template slot-scope="scope">
                <span>{{scope.row.type==1?"自有车":"非自有车"}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="card" label="身份证" width="180"> </el-table-column>
        <el-table-column prop="address" label="现居地址" width="120">
        </el-table-column>
        <el-table-column prop="report" label="是否上报">
        <template slot-scope="scope">
                <span>{{scope.row.report==1?"是":"否"}}</span>
            </template>
         </el-table-column>
        <el-table-column prop="sco" label="信用分"> </el-table-column>
        <el-table-column label="操作" fixed="right" width="180" class="tr">
          <template slot-scope="scope">
            <el-button @click="adit(scope.row)" size="mini">编辑</el-button>
          <el-button type="danger" @click="delete(scope.row.id)" size="mini">删除</el-button>
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
    <adit-driver :visible="visible" @hide="visible=false"></adit-driver>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import AditDriver from './AditDriver.vue'
import BreadNav from "@/components/BreadNav.vue";
import {post} from '@/utils/http'
import Mixin from '@/mixins/Mixin'
const configs = {
    url: '/DriverList',
     params:{
        page:1,
        pageSize:10,
      }
  };
const mixa = new Mixin(configs);
export default {
    mixins: [mixa],
    data(){
        return{
          visible:false,
             searchData: {
             No: "",
             name: "",
             date: [],
      },
      params:{
        page:1,
        pageSize:10,
      }
        }
    },
    methods:{
        //查询司机
    async searchDriver() {
      //向后端发送查询对应司机的请求
      const res = await post("/searchDriver", this.searchData);
      this.getData();
      this.$message({
        message: `恭喜你，${res.message}！`,
        type: "success",
      });
    },
    //编辑
    ...mapMutations(['setDriver']),
    adit(row){
      this.visible=true;
      this.setDriver(row);
    },
    //删除
       async delete2(id){
      await post("/delete2",id);
        this.$message({
          message: '删除承运司机成功',
          type: 'success'
        });},
    },
  components: {
    BreadNav,AditDriver
  },
};
</script>

<style lang="less" scoped>
</style>