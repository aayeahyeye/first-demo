<template>
    <div>
       <el-row :gutter="10">
        <el-col :span="4"><el-card class="bd">
            <el-row>
                <el-col :span="16"><h3>联系人</h3></el-col>
                <el-col :span="6" class="tr mr"><el-button size="mini" type="primary">新建联系人</el-button></el-col>
            </el-row>
            <el-row class="mt" v-for="(item,index) in src" :key="index">
                <div class="block fl"><el-avatar :size="50" :src="item.src1"></el-avatar></div>
                <div class="fl ml">
                    <h4>{{item.name}}</h4>
                    <p>职位：{{item.job}}</p>
                    <p>tel:{{item.tel}}</p>
                </div>
            </el-row>
        </el-card></el-col>
        <el-col :span="20"><el-card class="bd"></el-card></el-col>
       </el-row>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                src:[
                    {src1:require('../../assets/tou1.png'),name:'李华',job:'ui设计',tel:13496859661},
                    {src1:require('../../assets/tou2.png'),name:'杨芳',job:'ui设计',tel:18923449764},
                    {src1:require('../../assets/tou3.jpg'),name:'李四',job:'后端工程师',tel:17893280909},
                    {src1:require('../../assets/tou4.jpg'),name:'赵明',job:'后端工程师',tel:15638489828},
                    {src1:require('../../assets/tou5.png'),name:'刘三',job:'ui设计师',tel:12334343233},
                    {src1:require('../../assets/tou6.png'),name:'潘哥',job:'产品经理',tel:13434223423},
                    {src1:require('../../assets/tou7.png'),name:'王权',job:'前端工程师',tel:15533424655},
                    {src1:require('../../assets/tou8.png'),name:'海纳',job:'前端工程师',tel:14343545452},
                ]
            }
        }
    }
</script>

<style lang="less" scoped>
p{
    font-size: 10px;
}
.bd{
    border-radius: 0;
}
</style>