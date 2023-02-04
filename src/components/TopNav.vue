<template>
  <div>
    <div>
      <el-dropdown class="fr mr" @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎您,{{ nickname }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">个人中心</el-dropdown-item>
          <el-dropdown-item command="b">修改密码</el-dropdown-item>
          <el-dropdown-item command="c">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="block fr"><el-avatar :size="50" :src="src"></el-avatar></div>
    <div class="fr day">
      <p>
        今天是你在邦达的第
        <span class="tips">{{ WorkTime }}</span>
        天
      </p>
    </div>
    <div>
      <change-pass :visible="visible" @hide="visible = false"></change-pass>
    </div>
  </div>
</template>

<script>
import {get} from '@/utils/http'
import ChangePass from "./ChangePass.vue"
import {removeToken} from '@/utils/auth'
export default {
    data(){
        return{
            nickname:sessionStorage.getItem('nickname'),
            visible:false,
            time:'',//入职时间
            src:require('../assets/tou.png')
        }
    },
    created(){
        this.days()
        
    },
    methods:{
        handleCommand(command){
            if(command=='a'){
                this.$router.push('/personal')
            }else if(command=='b'){
                this.visible=true;
                
            }else{
                removeToken();
                this.$router.push('/login')
            }
        },
        async days(){
            const res=await get('/indate');
            this.time=res.data;
        }
    },
    computed:{
        WorkTime(){
//  js中单独调用 new Date(); 显示这种格式Fri Aug 28 2020 11:03:24 GMT+0800 (中国标准时间)
//  但是用 new Date() 参与计算会自动转换为从 1970.1.1 开始的毫秒数
            let now =new Date()
            let entrytime=this.time?new Date(this.time):new Date();
            return Math.floor((now-entrytime)/1000/60/60/24)
            
        }
    },
    components:{
        ChangePass
    }
};
</script>

<style lang="less" scoped>
.day{
    margin-right: 50px;
    .tips{
        font-size: 24px;
        color:#5696ff
}}
</style>