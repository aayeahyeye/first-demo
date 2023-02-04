<template>
  <div>
    <el-dialog
      title="修改运单"
      :visible="visible"
      width="58%"
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
            <el-form-item label="运单号" prop="no">
              <el-input v-model="ruleForm.no"></el-input>
            </el-form-item>
            <el-form-item label="客户名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="货物名称" prop="cargo">
              <el-input v-model="ruleForm.cargo"></el-input>
            </el-form-item>
            <el-form-item label="件数" prop="count">
              <el-input v-model="ruleForm.count"></el-input>
            </el-form-item>
            <el-form-item label="起始城市" prop="start">
              <el-input v-model="ruleForm.start"></el-input>
            </el-form-item>
            <el-form-item label="目的城市" prop="end">
              <el-input v-model="ruleForm.end"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下单时间" prop="date">
              <el-date-picker
      v-model="ruleForm.date"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
            </el-form-item>
            <el-form-item label="运费" prop="price">
              <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="是否需要接货" prop="needRecive">
              <el-radio-group v-model="ruleForm.needRecive">
                <el-radio label="需要">需要</el-radio>
                <el-radio label="不需要">不需要</el-radio>
              </el-radio-group>
            </el-form-item>
             <el-form-item label="车牌号" prop="plateNumber">
              <el-input v-model="ruleForm.plateNumber"></el-input> </el-form-item>
             <el-form-item label="司机姓名" prop="driver">
              <el-input v-model="ruleForm.driver"></el-input> </el-form-item>
             <el-form-item label="司机电话" prop="tel">
              <el-input v-model="ruleForm.tel"></el-input>
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
        no: "",
        date:'',
        name:'',
        start: "",
        end: "",
        count: "",
        cargo: "",
        price: "",
        needRecive:'',
        plateNumber:'',
        driver:'',
        tel:'',
      },
      rules:{
        no:[
            {required:true,message:"此空必填项",trigger:'blur'},
          {pattern:/^\d+$/,message:"只能为纯数字",trigger:'blur'}
        ],
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
        date:[{required:true,message:"此空必填项",trigger:'blur'},],
        unit:[
          {required:true,message:"此空必填项",trigger:'blur'},
        ],
        price:[
          {required:true,message:"此空必填项",trigger:'blur'},
          {pattern: /^\d+$/,message:"只能为纯数字",trigger:'blur'}
        ],
        needRecive:[{required:true,message:"此空必填项",trigger:'blur'},],
        driver:[{required:true,message:"此空必填项",trigger:'blur'},],
        tel:[{required:true,message:"此空必填项",trigger:'blur'},
        {pattern: /^\d+$/,message:"只能为纯数字",trigger:'blur'}]
      }
    };
  },
  
  computed:{
    ...mapState(["waybillrevise"])
  },
  watch:{
    visible(){//监听visible变化
      const {no,name,cargo,count,start,end,date,price,needRecive,plateNumber,driver,tel}=this.waybillrevise;
      this.ruleForm={no,name,cargo,count,start,end,date,price,plateNumber,needRecive,driver,tel}
    }
  },
  methods: {
    ...mapMutations(["clearWaybill"]),
    close() {
      this.$emit("hide");
      this.clearWaybill();
    },
    save() {
      //把填写的订单信息发送给后端
      this.$refs.ruleForm.validate(async (valid)=>{
        if(valid){
            const res =await post('/revise',this.ruleForm);
            this.$message({
          message: `恭喜你，${res.message}！`,
          type: 'success'
        });
        }
      })
      this.close()
    },
  },
};
</script>

<style lang="less" scoped>
</style>