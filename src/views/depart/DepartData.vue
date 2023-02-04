<template>
  <div>
    <bread-nav></bread-nav>
    <el-card shadow="always" class="mt">
      <el-row :gutter="24">
        <el-col :span="16">
          <el-row :gutter="24">
            <el-col :span="8">
              <el-input placeholder="请输入运单号" v-model="searchData.waybillNo"></el-input>
            </el-col>
            <el-col :span="8">
              <el-input placeholder="请输入客户名称" v-model="searchData.name"></el-input>
            </el-col>
            <el-col :span="8">
              <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8" class="tr">
          <el-button type="primary" @click="search">查询</el-button>
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
        <el-table-column type="index" label="序号" width="50" fixed="left">
        </el-table-column>
        <el-table-column prop="no" label="运单号" width="80" fixed="left">
        </el-table-column>
        <el-table-column prop="date" label="下单时间" width="100">
        </el-table-column>
        <el-table-column prop="name" label="客户名称" width="140">
        </el-table-column>
        <el-table-column prop="cargo" label="货物名称"> </el-table-column>
        <el-table-column prop="count" label="件数" width="80">
        </el-table-column>
        <el-table-column prop="start" label="起始地"> </el-table-column>
        <el-table-column prop="end" label="目的地"> </el-table-column>
        <el-table-column prop="price" label="运费"> </el-table-column>
        <el-table-column prop="needRecive" label="需要接货" width="100">
            <template slot-scope="scope">
                <span>{{scope.row.needRecive==1?"需要接货":"不需要接货"}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="plateNumber" label="车牌号" width="100"> </el-table-column>
        <el-table-column prop="driver" label="司机姓名"> </el-table-column>
        <el-table-column prop="tel" label="司机电话" width="120">
        </el-table-column>
        <el-table-column prop="percent" label="运输进度" width="180">
            <template slot-scope="scope">
                <el-progress :percentage="scope.row.percent"></el-progress>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="145" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="detail(scope.row)"
              >详情</el-button
            >
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
  </div>
</template>

<script>
import ClearKeep from '@/mixins/Clearkeep'
import {mapMutations,mapState} from 'vuex'
import {post} from '@/utils/http'
import moment from 'moment'; 
import BreadNav from "@/components/BreadNav.vue";
import Mixin from '@/mixins/Mixin'
 const configs = {
    url: '/departData',
     params:{
        page:1,
        pageSize:10,
      }
  };
const mixa = new Mixin(configs);
export default {
   mixins: [mixa,ClearKeep],
  data() {
    return {
      date:[],
      searchData:{
      waybillNo:'',
      name:"",
      startDate:"",
      endDate:''
      },
      params:{
        page:1,
        pageSize:10
      }
    };
  },
  activated(){
    if(!this.isfromDepartdetail){
      this.getData();
    }
  },
beforeRouteLeave(to,from,next){
  if(to.path=='/depart/data/detail'){
    from.meta.keepAlive=true;
  }else{
    this.clearCache()
  }
  next()
},
computed:{
  ...mapState(['isfromDepartdetail'])
},
  //  mounted(){
  //   this.getData();
  // },
  // methods: {
  //   async getData(){
  //     this.loading=true;
  //     const {data} = await post('/departData',this.params);
  //     console.log('发车',data);
  //     this.tableData=data.list;
  //     this.total=data.total;
  //     this.loading=false;
  //   },
  //   async handleSizeChange(){
  //     this.getData()
  //   },
  //   async handleCurrentChange(){
  //     this.getData()
  //   },
  // },
  methods:{
    async search(){
      this.searchData.startDate=moment(this.date[0]).format('YYYY-MM-DD');
      this.searchData.endDate=moment(this.date[1]).format('YYYY-MM-DD');
      const res=await post('/searchDepart',this.searchData);
      this.getData();
      this.$message({
          message: `恭喜你，${res.message}！`,
          type: 'success'
        });
      this.searchData={};
      this.date=[]
    },
    ...mapMutations(['setDepartdetail']),
    detail(row){
      this.setDepartdetail(row);
      this.$router.push('/depart/data/detail');
    }
  },
  components: {
    BreadNav
  },
};
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>