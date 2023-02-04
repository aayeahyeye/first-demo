<template>
  <div>
    <el-dialog
      :title="title"
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
            <el-form-item label="客户名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="起始城市" prop="start">
              <el-input v-model="ruleForm.start"></el-input>
            </el-form-item>
            <el-form-item label="目的城市" prop="end">
              <el-input v-model="ruleForm.end"></el-input>
            </el-form-item>
            <el-form-item label="货物名称" prop="cargo">
              <el-input v-model="ruleForm.cargo"></el-input>
            </el-form-item>
            <el-form-item label="件数" prop="count">
              <el-input v-model="ruleForm.count"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位" prop="unit">
              <el-input v-model="ruleForm.unit"></el-input>
            </el-form-item>
            <el-form-item label="运费" prop="price">
              <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="订单来源" prop="from">
              <el-radio-group v-model="ruleForm.from">
                <el-radio label="移动端">移动端</el-radio>
                <el-radio label="pc端">pc端</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否支付" prop="pay">
              <el-radio-group v-model="ruleForm.pay">
                <el-radio :label="1">已支付</el-radio>
                <el-radio :label="2">未支付</el-radio>
              </el-radio-group>
            </el-form-item></el-col
          >
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
import {mapMutations, mapState} from 'vuex'
import {post} from '@/utils/http'
export default {
  props: ["visible"],
  data() {
    return {
      title:'',
      ruleForm: {
        name: "",
        start: "",
        end: "",
        count: "",
        cargo: "",
        unit: "",
        price: "",
        from: "",
        pay: "",
      },
      rules:{
        name:[
          {required:true,message:"此空必填项",trigger:'blur'},
        ],
        start:[
          {required:true,message:"此空必填项",trigger:'blur'},
        ],
        end:[
          {required:true,message:"此空必填项",trigger:'blur'},
        ],
        count:[
          {required:true,message:"此空必填项",trigger:'blur'},
          {pattern:/^\d+$/,message:"只能为纯数字",trigger:'blur'}
        ],
        cargo:[
          {required:true,message:"此空必填项",trigger:'blur'},
        ],
        unit:[
          {required:true,message:"此空必填项",trigger:'blur'},
        ],
        price:[
          {required:true,message:"此空必填项",trigger:'blur'},
          {pattern: /^\d+$/,message:"只能为纯数字",trigger:'blur'}
        ],
        from:[
          {required:true,message:"此空必填项",trigger:'blur'},
        ],
        pay:[
          {required:true,message:"此空必填项",trigger:'blur'},
        ],
      }
    };
  },
  
  computed:{
    ...mapState(["row"])
  },
  watch:{
    visible(){//监听visible变化
      const {name,start,end,count,cargo,unit,price,from,pay}=this.row;
      this.title=name?"编辑订单":"新建订单";
      this.ruleForm={name,start,end,count,cargo,unit,price,from,pay}
    }
  },
  methods: {
    ...mapMutations(["clearRow"]),
    close() {
      this.$emit("hide");
      this.clearRow();
    },
    save() {
      //把填写的订单信息发送给后端
      this.$refs.ruleForm.validate(async (valid)=>{
        if(valid){
          if(this.title==="编辑订单"){
        const res = await post('/adit',this.ruleForm);
      this.$message({
          message: `恭喜你，${res.message}！`,
          type: 'success'
        });
      }else{
        const res = await post('/construct',this.ruleForm);
        this.$message({
          message: `恭喜你，${res.message}！`,
          type: 'success'
        });
      }
        }
      })
      this.clearRow();
      this.$emit("hide");
    },
  },
};
</script>

<style lang="less" scoped>
</style>