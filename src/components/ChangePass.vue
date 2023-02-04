<template>
  <div>
    <el-dialog
      title="修改密码"
      :visible="visible"
      width="50%"
      :before-close="close"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm"
            >提交</el-button
          >
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {get} from '@/utils/http'
export default {
  props: ["visible"], //子组件接收父组件属性
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' },
            { pattern: /^\d{6}$/, message: "密码为6位数纯数字", trigger: "blur" },
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur'}
          ],
          },
      }
  },
  methods: {
    close() {
      this.$emit("hide"); //向父组件传递自定义事件
      this.resetForm()
    },
    submitForm(){//箭头函数传递两项，一个是是否通过验证的布尔值，一个是没有通过的那项的信息
        this.$refs.ruleForm.validate(async (valid)=>{
            if(valid){
                //向后端发送修改密码请求
                const res = await get('/changepass');
                console.log(res.message);
                //提示修改密码成功
                this.$message({
                message: "修改密码成功",
                type: "success",
          });
          this.close();
            }else{
                this.$message({
                message: "密码校验成功",
                type: "success",})
            }
        })
    },
    resetForm() {
        this.$refs.ruleForm.resetFields();
      }
  },
};
</script>

<style lang="less" scoped>
</style>