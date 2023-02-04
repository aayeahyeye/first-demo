<template>
  <div>
    <bread-nav></bread-nav>
    <el-card class="mt">
      <el-row shadow="always">
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
            <el-form-item label="客户单号" prop="no">
              <el-input v-model="ruleForm.no"></el-input>
            </el-form-item>
            <el-form-item label="发货地址" prop="start">
              <el-input v-model="ruleForm.start"></el-input>
            </el-form-item>
            <el-form-item label="收货地址" prop="end">
              <el-input v-model="ruleForm.end"></el-input>
            </el-form-item>
            <el-form-item label="运费" prop="price">
              <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="下单时间" prop="date">
              <el-row>
                <el-col :span="12">
                  <el-date-picker
                    v-model="ruleForm.date"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                  <el-time-select
                    class="mt"
                    v-model="ruleForm.time"
                    :picker-options="{
                      start: '08:30',
                      step: '00:15',
                      end: '18:30',
                    }"
                    placeholder="选择时间"
                  >
                  </el-time-select>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货物名称" prop="cargo">
              <el-input v-model="ruleForm.cargo"></el-input>
            </el-form-item>
            <el-form-item label="件数" prop="count">
              <el-input v-model="ruleForm.count"></el-input>
            </el-form-item>
            <el-form-item label="货物单位" prop="unit">
              <el-select v-model="ruleForm.unit" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="运单来源" prop="from">
              <el-radio-group v-model="ruleForm.from">
                <el-radio label="移动端">移动端</el-radio>
                <el-radio label="pc端">pc端</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="承运方式" prop="way">
              <el-radio-group v-model="ruleForm.pay">
                <el-radio :label="1">个人</el-radio>
                <el-radio :label="2">公司</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="即时配送" prop="InsDelivery">
              <el-switch
                v-model="ruleForm.InsDelivery"
                active-color="#13ce66"
                inactive-color="gray"
              >
              </el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="create1">立即创建</el-button>
              <el-button >重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import BreadNav from "@/components/BreadNav.vue";
import {post} from '@/utils/http'
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "方",
        },
        {
          value: "选项2",
          label: "吨",
        },
      ],
      ruleForm: {
        name: "",
        start: "",
        end: "",
        count: "",
        cargo: "",
        date: "",
        time: "",
        unit: "",
        price: "",
        from: "",
        way: "",
        InsDelivery: "",
      },
      rules: {
        name: [{ required: true, message: "此空为必填项", trigger: "blur" }],
        no: [
          { required: true, message: "此空为必填项", trigger: "blur" },
          { pattern: /^\d+$/, message: "只能为纯数字", trigger: "blur" },
        ],
        start: [{ required: true, message: "此空为必填项", trigger: "blur" }],
        end: [{ required: true, message: "此空为必填项", trigger: "blur" }],
        count: [
          { required: true, message: "此空为必填项", trigger: "blur" },
          { pattern: /^\d+$/, message: "只能为纯数字", trigger: "blur" },
        ],
        cargo: [{ required: true, message: "此空为必填项", trigger: "blur" }],
        date: [{ required: true, message: "此空为必填项", trigger: "blur" }],
        time: [{ required: true, message: "此空为必填项", trigger: "blur" }],
        unit: [{ required: true, message: "此空为必填项", trigger: "blur" }],
        price: [
          { required: true, message: "此空为必填项", trigger: "blur" },
          { pattern: /^\d+$/, message: "只能为纯数字", trigger: "blur" },
        ],
        from: [{ required: true, message: "此空为必填项", trigger: "blur" }],
        way: [{ required: true, message: "此空为必填项", trigger: "blur" }],
        InsDelivery: [
          { required: true, message: "此空为必填项", trigger: "blur" },
        ],
      },
    };
  },
  methods:{
    create1(){
      post('/waybillin',this.ruleForm);
      this.$message({
          message: '运单创建成功',
          type: 'success'
        });
        this.$router.push('/waybill/list');
    }
  },
  components: {
    BreadNav,
  },
};
</script>

<style lang="less" scoped>
</style>