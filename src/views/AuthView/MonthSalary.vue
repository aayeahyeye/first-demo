<template>
    <div>
        <el-card>
            <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="department"
        label="部门"
        width="150">
      </el-table-column>
      <el-table-column
        prop="person"
        label="人员支出"
        width="150">
      </el-table-column>
      <el-table-column
        prop="pay"
        label="采购支出">
      </el-table-column>
      <el-table-column
        prop="in"
        label="收入">
      </el-table-column>
      <el-table-column
        prop="all"
        label="总计">
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150" class="tr">
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
        class="tr mt"
      >
      </el-pagination>
        </el-card>
    </div>
</template>

<script>
import {post} from '@/utils/http'
import Mixin from '@/mixins/Mixin'
const configs = {
    url: '/MonthSalary',
     params:{
        page:1,
        pageSize:11,
      }
  };
const mixa = new Mixin(configs);
    export default {
           mixins: [mixa],
        data(){
            return{
                tableData:[],
                params:{
        page:1,
        pageSize:10,
      },
            }
        },
        methods:{
                 //删除
       async delete(id){
     await post("/delete",{id});
        this.$message({
          message: '删除操作成功',
          type: 'success'
        });},
        // 编辑
        adit(){}
  },
        }
</script>

<style lang="less" scoped>
</style>