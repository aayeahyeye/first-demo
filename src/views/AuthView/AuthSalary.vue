<template>
  <div>
    <!-- 财务功能划分 -->
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card>
          <h1>预算</h1>
          <el-row class="mt" :gutter="10">
            <el-col :span="8"
              ><el-card class="bg1 tc hei"
                ><i class="el-icon-coin color"></i>
                <p class="color">预算申报</p></el-card
              >
            </el-col>
            <el-col :span="8">
              <el-card class="bg2 tc hei"
                ><i class="el-icon-edit-outline color"></i>
                <p class="color">预算调整</p></el-card
              >
            </el-col>
            <el-col :span="8">
              <el-card class="bg3 tc hei"
                ><i class="el-icon-document-copy color"></i>
                <p class="color">新增预算</p></el-card
              >
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <h1>采购</h1>
          <el-row class="mt" :gutter="10">
            <el-col :span="8"
              ><el-card class="bg4 tc hei"
                ><i class="el-icon-date color"></i>
                <p class="color">采购申请</p></el-card
              >
            </el-col>
            <el-col :span="8">
              <el-card class="bg5 tc hei"
                ><i class="el-icon-s-shop color"></i>
                <p class="color">录入供应商</p></el-card
              >
            </el-col>
            <el-col :span="8">
              <el-card class="bg6 tc hei"
                ><i class="el-icon-s-claim color"></i>
                <p class="color">录入采购单</p></el-card
              >
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <h1>报账</h1>
          <el-row class="mt" :gutter="10">
            <el-col :span="8"
              ><el-card class="bg7 tc hei"
                ><i class="el-icon-s-custom color"></i>
                <p class="color">人员费用报销</p></el-card
              >
            </el-col>
            <el-col :span="8">
              <el-card class="bg8 tc hei"
                ><i class="el-icon-tickets color"></i>
                <p class="color">借款申请</p></el-card
              >
            </el-col>
            <el-col :span="8">
              <el-card class="bg9 tc hei"
                ><i class="el-icon-goods color"></i>
                <p class="color">差旅费用报销</p></el-card
              >
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="mt">
      <el-col :span="16">
        <el-card>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="月度财务报表" name="first"><month-salary></month-salary></el-tab-pane>
            <el-tab-pane label="年度财务报表" name="second"><year-salary></year-salary></el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="12">
            <el-col :span="8"><el-card  class="tc"><i class="el-icon-coin ft color1"></i><p>已申请</p></el-card></el-col>
            <el-col :span="8"><el-card  class="tc"><i class="el-icon-coin ft color1"></i><p>已完成</p></el-card></el-col>
            <el-col :span="8"><el-card  class="tc"><i class="el-icon-coin ft color1"></i><p>待办</p></el-card></el-col>
        </el-row>
        <el-row class="mt">
            <el-card><el-calendar v-model="value">
</el-calendar></el-card>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MonthSalary from './MonthSalary.vue'
import YearSalary from './YearSalary.vue'
export default {
    data() {
      return {
        activeName: 'first',
        value: new Date()
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    components:{
        MonthSalary,YearSalary
    }
};
</script>

<style lang="less" scoped>
.bg1 {
  background: #ff7675;
}
.bg2 {
  background: #6c5ce7;
}
.bg3 {
  background: #0984e3;
}
.bg4 {
  background: #81ecec;
}
.bg5 {
  background: #6c5ce7;
}
.bg6 {
  background: #ffaf40;
}
.bg7 {
  background: #17c0eb;
}
.bg8 {
  background: #ff4d4d;
}
.bg9 {
  background: #3ae374;
}
i {
  font-size: 80px;
}
.color {
  color: white;
}
.color1{
    color: #ff4d4d;
}
.hei{
    height: 160px;
}
.ft{
    font-size: 50px;
}
</style>