<template>
    <div>
        <el-card>
            <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="月份"
        width="80">
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
        </el-card>
    </div>
</template>

<script>
import {get,post} from '@/utils/http'
    export default {
        data(){
            return{
                loading:false,
                tableData:[],
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            async getData(){
                this.loading=true;
                const {data} = await get('/YearSalary');
                console.log(data);
                this.tableData=data.list;
                this.loading=false

            },
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