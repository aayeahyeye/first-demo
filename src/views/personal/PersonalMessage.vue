<template>
    <div>
        <el-card shadow="always">
            <el-row>
                <el-col :span="12" class="br">
                    <el-card>
                        <el-row>
                        <el-col :span="9">
                            <div class="block"><el-avatar shape="square" :size="120" :src="src"></el-avatar></div>
                        </el-col>
                        <el-col :span="15" class="lh">
                            <h5>姓名：{{data.name}}</h5>
                            <p>职位：{{data.job}}</p>
                            <p>入职日期：{{data.date}}</p>
                            <p>直属上级：{{data.direct}}</p>
                        </el-col>
                    </el-row>
                    </el-card>
                </el-col>
                <el-col :span="12"></el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import {get} from '@/utils/http'
    export default {
        data(){
            return{
                src:require('../../assets/tou.png'),
                data:{}
        }
            },
            mounted(){
                this.getMessage()
            },
            methods:{
                async getMessage(){
                    const {data}=await get('/message');
                    console.log(data);
                    this.data=data.message;
                }
            }
        }
    
</script>

<style lang="less" scoped>
.lh{
    line-height: 30px;
}

</style>