<template>
    <div>
<el-dialog
      title="编辑司机"
      :visible="visible"
      width="50%"
      :before-close="close"
    >
      <el-row :gutter="24">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-col :span="12">
            <el-form-item label="司机名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="编号id" prop="id">
              <el-input v-model="ruleForm.id"></el-input>
            </el-form-item>
            <el-form-item label="车牌号" prop="plateNumber">
              <el-input v-model="ruleForm.plateNumber"></el-input>
            </el-form-item>
            <el-form-item label="道路许可" prop="permission">
              <el-input v-model="ruleForm.permission"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="tel">
              <el-input v-model="ruleForm.tel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型" prop="type">
              <el-radio-group v-model="ruleForm.type">
                <el-radio :label="1">自有车</el-radio>
                <el-radio :label="2">非自有车</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="身份证" prop="card">
              <el-input v-model="ruleForm.card"></el-input>
            </el-form-item>
            <el-form-item label="现居地址" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
            <el-form-item label="信用分" prop="sco">
              <el-input v-model="ruleForm.sco"></el-input> </el-form-item
          ></el-col>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { post } from "@/utils/http";
    export default {
        props:['visible'],
        data(){
             return {
      ruleForm: {
        name: "",
        id: "",
        abbreviation: "",
        permission: "",
        tel: "",
        type: "",
        date: "",
        credit: "",
        address: "",
        sco: "",
      },
      rules: {
        name: [{ required: true, message: "此空必填项", trigger: "blur" }],
        id: [{ required: true, message: "此空必填项", trigger: "blur" }],
        plateNumber: [{ required: true, message: "此空必填项", trigger: "blur" }],
        permission: [
          { required: true, message: "此空必填项", trigger: "blur" },
        ],
        tel: [{ required: true, message: "此空必填项", trigger: "blur" }],
        type: [{ required: true, message: "此空必填项", trigger: "blur" }],
        card: [{ required: true, message: "此空必填项", trigger: "blur" },
        { pattern: /^\d+$/, message: "只能为纯数字", trigger: "blur" },],
        address: [
          { required: true, message: "此空必填项", trigger: "blur" },
        ],
        sco: [
          { required: true, message: "此空必填项", trigger: "blur" },
          { pattern: /^\d+$/, message: "只能为纯数字", trigger: "blur" },
        ],
      },
    };
  },
  computed:{
    ...mapState(['driver'])
  },
  watch:{
    //监听visible变化
    
    visible(){
        const {id,name,plateNumber,permission,tel,type,card,address,report,sco}=this.driver;
        this.ruleForm={id,name,plateNumber,permission,tel,type,card,address,report,sco}
    }
  },
  methods:{
    // 关闭
    ...mapMutations(['clearDriver']),
    close(){
        this.$emit('hide');
        this.clearDriver()
    },
    //保存
    save(){
        this.$refs.ruleForm.validate(async(valid)=>{
            if(valid){
                await post('/adit',this.ruleForm);
                this.$message({
                    message: `恭喜你,编辑承运司机成功！`,
              type: "success",
                })
            }
        });
        this.close()

    }
  }

        }
</script>

<style lang="less" scoped>

</style>