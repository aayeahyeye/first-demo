<template>
  <div>
    <bread-nav></bread-nav>
    <!-- 筛选 -->
    <el-card shadow="always" class="mt">
      <el-row :gutter="24">
        <el-col :span="5" class="mr">
          <el-input v-model="searchData.waybillNo" class="wid" placeholder="请输入运单号"></el-input>
        </el-col>
        <el-col :span="5" class="mr">
          <el-input v-model="searchData.name" class="wid" placeholder="请输入客户名称"></el-input>
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
            <el-button type="primary" @click="searchWaybill()">查询</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="always" class="mt">
        <el-radio-group v-model="params.status" @change="getData">
      <el-radio-button label="1">全部运单(300)</el-radio-button>
      <el-radio-button label="2">装货中(120)</el-radio-button>
      <el-radio-button label="3">运输中(70)</el-radio-button>
      <el-radio-button label="4">已完成(100)</el-radio-button>
      <el-radio-button label="5">运单异常(10)</el-radio-button>
    </el-radio-group>
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
        <el-table-column prop="no" label="运单号" width="100" fixed="left">
        </el-table-column>
        <el-table-column prop="date" label="下单时间" width="120">
        </el-table-column>
        <el-table-column prop="name" label="客户名称" width="140">
        </el-table-column>
        <el-table-column prop="cargo" label="货物名称"> </el-table-column>
        <el-table-column prop="count" label="件数" width="100">
        </el-table-column>
        <el-table-column prop="start" label="起始城市"> </el-table-column>
        <el-table-column prop="end" label="目的城市"> </el-table-column>
        <el-table-column prop="price" label="运费"> </el-table-column>
        <el-table-column prop="needRecive" label="需要接货" width="120">
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
            <el-button size="mini" @click="detail(scope.row.no)"
              >详情</el-button
            >
            <el-button size="mini" type="danger" @click="revise(scope.row)">修改</el-button>
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
    <waybill-revise :visible="visible" @hide="visible=false"></waybill-revise>
  </div>
</template>

<script>
import ClearKeep from '@/mixins/Clearkeep'
import WaybillRevise from './WaybillRevise.vue'
import BreadNav from "@/components/BreadNav.vue";
import {post} from "@/utils/http"
import {mapMutations,mapState} from 'vuex'
import Mixin from '@/mixins/Mixin'
 const configs = {
    url: '/waybillList',
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
      visible:false,
      params:{
        page:1,
        pageSize:10,
      },
      input1: "",
      input2: "",
      value1:[],
      searchData:{
      waybillNo:'',
      name:"",
      date:""
      },
     
    };
  },
  computed:{
    ...mapState(["isFromDetail"])
  },
  // mounted(){
  //   this.getData();
  // },
  activated(){
    //如果不是从详情页来的，加载数据
    if(!this.isFromDetail){
      this.getData()
    }
  },
  beforeRouteLeave(to,from,next){
    //离开页面之前判断,去的是详情页，缓存
    if(to.path=='/waybill/list/detail'){
      from.meta.keepAlive=true
      // 去的不是详情，清除缓存
    }else{
      this.clearCache();
    }
    next()
  },
  methods:{
  //   async getData(){
  //       this.loading=true;
  //       const {data} = await post('/waybillList',this.params);
  //       console.log(data);
  //       this.tableData=data.list;
  //       this.total=data.total;
  //       this.loading=false;
  //   },
  //   async handleSizeChange(){
  //     this.getData()
  //   },
  //   async handleCurrentChange(){
  //     this.getData()
  //   },
    // 详情页
    ...mapMutations(["setDetail"]),
    async detail(no){
        //把运单号传给后端，传回来需要的数据
        console.log(no);
        const {data}=await post ('/detail',no);
        // 再把这行数据储存到vuex，
        this.setDetail(data.list);
        this.$router.push('/waybill/list/detail')

    },
    //查询运单
    async searchWaybill(){
      //向后端发送查询对应订单的请求
      const res=await post('/searchwaybill',this.searchData);
      this.getData();
      this.$message({
          message: `恭喜你，${res.message}！`,
          type: 'success'
        });
    },
    //修改
    ...mapMutations(['setWaybillrevise','clearWaybill']),
    revise(row){
      console.log(row);
      this.clearWaybill();
      this.setWaybillrevise(row);
      this.visible=true;
    },

    // 清除缓存
    // clearCache() {
    //   let vnode = this.$vnode;
    //   let parentVnode = vnode && vnode.parent;
    //   if (
    //     parentVnode &&
    //     parentVnode.componentInstance &&
    //     parentVnode.componentInstance.cache
    //   ) {
    //     var key =
    //       vnode.key == null
    //         ? vnode.componentOptions.Ctor.cid +
    //           (vnode.componentOptions.tag
    //             ? `::${vnode.componentOptions.tag}`
    //             : "")
    //         : vnode.key;
    //     var cache = parentVnode.componentInstance.cache;
    //     var keys = parentVnode.componentInstance.keys;
    //     if (cache[key]) {
    //       this.$destroy();
    //       // remove key
    //       if (keys.length) {
    //         var index = keys.indexOf(key);
    //         if (index > -1) {
    //           keys.splice(index, 1);
    //         }
    //       }
    //       cache[key] = null;
    //     }
    //   }
    // },
    },
    components: {
    BreadNav,WaybillRevise
  }


  }
  
  
  
</script>

<style lang="less" scoped>
.wid{
    width:200px;
}
</style>