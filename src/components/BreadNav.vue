<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in Bread" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>

export default {
    data(){
        return{
            Bread:[],
        }
    },
    mounted(){
        this.getBread()
    },
    methods:{
        getBread(){
            this.Bread=this.$route.meta.bread||[];
        }
    }
};
</script>

<style lang="less" scoped>
</style>