<template>
    <div>
<bread-nav></bread-nav>
    <!-- 头部信息 -->
    <el-card class="mb mt">
      <el-row :gutter="16">
        <el-col :span="6">
          <span>运单编号：{{ departDetail.no }}</span>
        </el-col>
        <el-col :span="6">
          <span>创建时间：{{departDetail.date}}</span>
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
                <p>客户名称：{{departDetail.name}}</p>
                <p>货物名称：{{departDetail.cargo}}</p>
                <p>数量：{{departDetail.count}}</p>
            </el-col>
            <el-col :span="6">
                <p>是否易燃易爆物品：否</p>
                <p>结算方式：线上支付</p>
                <p>运费：{{departDetail.price}}</p>
            </el-col>
            <el-col :span="6">
                <p>发货单据：制单中</p>
                <p>接获单据：暂未接获</p>
                <p>所属业务员：{{departDetail.Operator}}</p>
            </el-col>
            <el-col :span="6">
                <p>客户下单时间：{{departDetail.date}}</p>
                <p>是否需要接货：{{departDetail.needReciev==1?"需要接货":"不需要接货"}}</p>
            </el-col>
        </el-row>
        <hr>
        <!-- 运输信息 -->
        <el-row :gutter="16" class="lh mb">
            <div><h1>运输信息</h1></div>
            <el-col :span="6">
                <p>车牌号：{{departDetail.plateNumber}}</p>
                <p>司机姓名：{{departDetail.driver}}</p>
            </el-col>
            <el-col :span="6">
                <p>是司机电话：{{departDetail.tel}}</p>
                <p>司机地址：湖南省长沙市</p>
            </el-col>
            <el-col :span="6">
                <p>接所属公司：接货公司</p>
                <p>违约金：{{departDetail.price*0.5}}</p>
            </el-col>
            <el-col :span="6">
                <p>预计运输时间:2022-12-18</p>
                
            </el-col>
        </el-row>
        <hr>
        <el-row :gutter="16" class="lh mb">
             <!-- 经办人信息 -->
            <div><h1>经办人信息</h1></div>
            <el-col :span="6">
                <p>业务员：何明</p>
            </el-col>
            <el-col :span="6">
                <p>审核员：刘军</p>
            </el-col>
            <el-col :span="6">
                <p>制单员：何明</p>
            </el-col>
            <el-col :span="6">
                <p>备注：保证安全送达</p>
            </el-col>
        </el-row>
    </el-card>
    </div>
</template>

<script>
import BreadNav from '@/components/BreadNav.vue'
import {mapState,mapMutations} from 'vuex'
    export default {
        beforeRouteLeave(to,from,next){
            if(to.path=='/depart/data'){
                this.changeIsFromDepartdetail(true)
            }else{
                this.changeIsFromDepartdetail(false)
            }
            next()
        },
        computed:{
            ...mapState(['departDetail'])
        },
        methods:{
            ...mapMutations(['changeIsFromDepartdetail']),
            back(){this.$router.push('/depart/data')}
        },
        components:{
            BreadNav
        }
    }
</script>

<style lang="less" scoped>

</style>