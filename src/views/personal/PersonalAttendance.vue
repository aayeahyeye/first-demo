<template>
  <div>
    <!-- 月考勤 -->
    <el-row :gutter="24">
      <el-card>
        <h1 class="mb ml">本月考勤：</h1>
        <el-col :span="6">
          <el-card class="mb">
            <el-row>
              <el-col :span="9"><i class="el-icon-date color1 ft"></i></el-col>
              <el-col :span="15">
                <h4 class="mt">
                  应到考勤天数：<span>{{ data.num1 }}</span
                  >天
                </h4>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <el-row>
              <el-col :span="9"><i class="el-icon-date color1 ft"></i></el-col>
              <el-col :span="15">
                <h4 class="mt">
                  实际考勤天数：<span>{{ data.num2 }}</span
                  >天
                </h4>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <el-row>
              <el-col :span="9"><i class="el-icon-date color1 ft"></i></el-col>
              <el-col :span="15">
                <h4 class="mt">
                  剩余考勤天数：<span>{{ data.num4 }}</span
                  >天
                </h4>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <el-row>
              <el-col :span="9"
                ><i class="el-icon-warning-outline color2 ft"></i
              ></el-col>
              <el-col :span="15">
                <h4 class="mt">
                  缺勤天数：<span class="color2">{{ data.num3 }}</span
                  >天
                </h4>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-card>
    </el-row>
    <el-row class="mt" :gutter="24">
      <el-col :span="9">
        <el-card>
          <div>
            <h1>打卡</h1>
            <div class="bite" @click="change">点击</div>
          </div>
          <div>
            <h1 class="mt">考勤申请</h1>
          <div v-for="(item,index) in data1" :key="index" class="text item">
            <el-card class="mt"><el-link type="primary">{{ item}}</el-link></el-card>
          </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="15">
        <el-card>
          <el-calendar v-model="value" id="calendar">
            <template slot="dateCell" slot-scope="{ data }">
              <div style="margin: 0px">
                {{ data.day.split("-").slice(2).join() }}<br />
                <!--标记-->
                <div v-for="(i, index) in dayTime" :key="index">
                  <div v-if="data.day == i" class="budge"></div>
                  <span v-if="data.day == i">缺勤</span>
                </div>
              </div>
            </template>
          </el-calendar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { get } from "@/utils/http";
export default {
  data() {
    return {
      data: {},
      value: new Date(),
      dayTime: ["2022-12-15"],
      show: false,
      data1:['事假申请','病假申请','年假申请']
    };
  },
  mounted() {
    this.getPerAtt();
  },
  methods: {
    async getPerAtt() {
      const { data } = await get("/personalAttendance");
      this.data = data.days;
    },
    change() {
      this.show = !this.show;
      if (this.show == true) {
        this.$message({
          message: "恭喜你，打卡成功！",
          type: "success",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.color1 {
  color: #55efc4;
}
.ft {
  font-size: 50px;
}
.color2 {
  color: #ff7675;
}
span {
  color: #5696ff;
}
.budge {
  width: 15px;
  height: 15px;
  background: #ff7675;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 10px;
}
.bite {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-image: linear-gradient(to top, #55efc4, white);
  margin: 30px auto;
  text-align: center;
  line-height: 300px;
  color: white;
  cursor: pointer;
}
.mt{
    margin-top: 20px;
}
</style>