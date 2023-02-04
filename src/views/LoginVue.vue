<template>
  <div>
    <el-row type="flex" justify="center">
      <el-card class="box-card">
        <div slot="header" class="clearfix tc">
          <h1>邦达货运后台管理系统</h1>
        </div>
        <div>
            <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="70px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model.trim="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model.trim="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%" @click="login" :loading="loading">登录</el-button>
          </el-form-item>
        </el-form>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import {post} from "@/utils/http"
import {setNickname, setToken} from "@/utils/auth"
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      loading:false,
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            pattern: /^\w{4,8}$/,
            message: "用户名为4-8位的纯字母",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { pattern: /^\d{6}$/, message: "密码为6位数纯数字", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //登陆要请求数据
    login(){
        //先判断验证通过没有,
        //拿到整个表单元素对象，该对象有一个校验方法.validate((接收一个函数，函数里面有两个参数，参数1：布尔值是否通过，参数2：校验没通过的那一项)=>{})
        this.$refs.ruleForm.validate((valid)=>{
            if(valid){
                this.loading=true;
               post('/login',this.ruleForm).then((res)=>{
                setNickname(res.nickname)
                setToken(res.token)
                this.loading=false;
                this.$router.push('/');
        }).catch((error)=>{
            console.log(error);
            this.loading=false
        }) 
            }
        })
        
    }
  },
};
</script>

<style lang="less" scoped>
.box-card {
  width: 500px;
  margin-top: 200px;
  h1 {
    font-size: 24px;
  }
}
</style>