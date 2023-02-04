<template>
  <div>
    <el-empty description="页面找不到啦！">
      <el-button type="primary" @click="back">返回首页</el-button>
    </el-empty>
  </div>
</template>

<script>
export default {
    methods:{
        back(){
            this.$router.push('/index')
        }
    }
};
</script>

<style lang="less" scoped>
</style>