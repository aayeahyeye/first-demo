<template>
    <div>
        <bread-nav></bread-nav>
    <!-- 头部信息 -->
    <el-card class="mb mt">
      <el-row :gutter="16">
        <el-col :span="6">
          <span>运单编号：{{ detail.no }}</span>
        </el-col>
        <el-col :span="6">
          <span>创建时间：{{detail.date}}</span>
        </el-col>
        <el-col :span="6">
          <span>审核员：刘军</span>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="back" class="fr">返回</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 运单状态 -->
    <el-card class="mb">
      <el-row>
        <el-steps :space="1200" :active="1" finish-status="success" :align-center="true">
        <el-step title="未发货"></el-step>
        <el-step title="运输中"></el-step>
        <el-step title="已收货"></el-step>
        <el-step title="已完成"></el-step>
      </el-steps>
      </el-row>
    </el-card>
    <!-- 详细信息 -->
    <el-card>
        <!-- 基础信息 -->
        <el-row :gutter="16" class="lh mb">
            <div><h1>基础信息</h1></div>
            <el-col :span="6">
                <p>客户名称：{{detail.name}}</p>
                <p>货物名称：{{detail.cargo}}</p>
                <p>数量：{{detail.count}}</p>
            </el-col>
            <el-col :span="6">
                <p>是否易燃易爆物品：否</p>
                <p>结算方式：线上支付</p>
                <p>运费：{{detail.price}}</p>
            </el-col>
            <el-col :span="6">
                <p>发货单据：制单中</p>
                <p>接获单据：暂未接获</p>
                <p>所属业务员：{{detail.Operator}}</p>
            </el-col>
            <el-col :span="6">
                <p>客户下单时间：{{detail.date}}</p>
                <p>是否需要接货：{{detail.needReciev==1?"需要接货":"不需要接货"}}</p>
            </el-col>
        </el-row>
        <hr>
        <!-- 运输信息 -->
        <el-row :gutter="16" class="lh mb">
            <div><h1>运输信息</h1></div>
            <el-col :span="6">
                <p>车牌号：{{detail.plateNumber}}</p>
                <p>司机姓名：{{detail.driver}}</p>
            </el-col>
            <el-col :span="6">
                <p>是司机电话：{{detail.tel}}</p>
                <p>司机地址：{{detail.dress}}</p>
            </el-col>
            <el-col :span="6">
                <p>司机身份证号：{{detail.carid}}</p>
                <p>接所属公司：接货公司·</p>
            </el-col>
            <el-col :span="6">
                <p>预计运输时间:2022-12-18 10:00</p>
                <p>违约金：{{detail.price*0.5}}</p>
            </el-col>
        </el-row>
        <hr>
        <el-row :gutter="16" class="lh mb">
             <!-- 经办人信息 -->
            <div><h1>经办人信息</h1></div>
            <el-col :span="6">
                <p>业务员：{{detail.Operator}}</p>
            </el-col>
            <el-col :span="6">
                <p>审核员：刘军</p>
            </el-col>
            <el-col :span="6">
                <p>制单员：{{detail.Operator}}</p>
            </el-col>
            <el-col :span="6">
                <p>备注：保证安全送达</p>
            </el-col>
        </el-row>
    </el-card>
    </div>
</template>

<script>
import BreadNav from "@/components/BreadNav.vue"
import {mapState,mapMutations} from 'vuex'
    export default {
        computed:{
           ...mapState(['detail','isFromDetail'])
        },
        beforeRouteLeave(to,from,next){
            if(to.path=='/waybill/list'){
                this.changeIsFromDetail(true);
            }else{
                this.changeIsFromDetail(false)
            }
            next()
        },
        methods:{
            ...mapMutations(["changeIsFromDetail"]),
            back(){
                this.$router.push('/waybill/list')
            }
        },
        components:{
            BreadNav
        }
    }
</script>

<style lang="less" scoped>
h1{
    line-height: 50px;
}
</style>