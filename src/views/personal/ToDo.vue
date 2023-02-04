<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="12">
                <el-card>
                    <h1>本周任务</h1>
                    <el-row class="tc" :gutter="10">                        
                        <el-col :span="8">
                            <el-card  class="red">
                                <i class="el-icon-document-delete"></i>
                            </el-card>
                            <h5 class="mt">待办工作</h5>
                        </el-col>
                        <el-col :span="8">
                            <el-card  class="green">
                                <i class="el-icon-document-checked"></i>
                            </el-card>
                            <h5 class="mt">已完成工作</h5>
                        </el-col>
                        <el-col :span="8">
                            <el-card  class="orange">
                                <i class="el-icon-document"></i>
                            </el-card>
                            <h5 class="mt">进行中工作</h5>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <h1>本月任务</h1>
                    <el-row class="tc" :gutter="10">                        
                        <el-col :span="8">
                            <el-card  class="red">
                                <i class="el-icon-document-delete"></i>
                            </el-card>
                            <h5 class="mt">待办工作</h5>
                        </el-col>
                        <el-col :span="8">
                            <el-card  class="green">
                                <i class="el-icon-document-checked"></i>
                            </el-card>
                            <h5 class="mt">已完成工作</h5>
                        </el-col>
                        <el-col :span="8">
                            <el-card  class="orange">
                                <i class="el-icon-document"></i>
                            </el-card>
                            <h5 class="mt">进行中工作</h5>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
i{
    font-size: 100px;
    color: white;
}
.red{
    background:#ff6b6b;
}
.green{
    background: #3ae374;
}
.orange{
    background: #ffaf40;
}
</style>