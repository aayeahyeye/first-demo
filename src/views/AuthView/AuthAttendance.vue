<template>
  <div>
    <el-card>
      <!-- 行政功能划分 -->
      <el-row :gutter="12">
        <el-col :span="12">
          <el-card>
            <h1>文案管理</h1>
            <el-row class="mt" :gutter="10">
              <el-col :span="8"
                ><el-card class="bg1 tc hei"
                  ><i class="el-icon-coin color"></i>
                  <p class="color">项目登记</p></el-card
                >
              </el-col>
              <el-col :span="8">
                <el-card class="bg2 tc hei"
                  ><i class="el-icon-edit-outline color"></i>
                  <p class="color">项目审批</p></el-card
                >
              </el-col>
              <el-col :span="8">
                <el-card class="bg3 tc hei"
                  ><i class="el-icon-document-copy color"></i>
                  <p class="color">项目归档</p></el-card
                >
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <h1>人员</h1>
            <el-row class="mt" :gutter="10">
              <el-col :span="8"
                ><el-card class="bg4 tc hei"
                  ><i class="el-icon-date color"></i>
                  <p class="color">考勤管理</p></el-card
                >
              </el-col>
              <el-col :span="8">
                <el-card class="bg5 tc hei"
                  ><i class="el-icon-s-shop color"></i>
                  <p class="color">节假日福利</p></el-card
                >
              </el-col>
              <el-col :span="8">
                <el-card class="bg6 tc hei"
                  ><i class="el-icon-s-claim color"></i>
                  <p class="color">团建安排</p></el-card
                >
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-row class="mt" :gutter="12">
      <el-col :span="15">
        <el-card>
          <h1>待办事项</h1>
          <el-timeline>
            <el-timeline-item
              :timestamp="item.timestamp"
              placement="top"
              v-for="(item, index) in waitData"
              :key="index"
            >
              <el-card>
                <h4>{{ item.operation }}</h4>
                <p class="fl mt mb">{{ item.name }} 提交于 {{ item.time }}</p>
                <div class="fr mb">
                  <el-button type="primary" size="mini">审批</el-button>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :span="9"
        ><el-card><el-calendar v-model="value"> </el-calendar></el-card
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import { get } from "@/utils/http";
export default {
  data() {
    return {
      value: new Date(),
      waitData: [],
    };
  },
  mounted(){
    this.getData()
  },
  methods: {
    async getData() {
      const { data } = await get("/admini");
      this.waitData = data;
    },
  },
};
</script>

<style lang="less" scoped>
.bg1 {
  background: #ff7675;
}
.bg2 {
  background: #6c5ce7;
}
.bg3 {
  background: #0984e3;
}
.bg4 {
  background: #81ecec;
}
.bg5 {
  background: #6c5ce7;
}
.bg6 {
  background: #ffaf40;
}
.color {
  color: white;
}
.hei {
  height: 160px;
}
i {
  font-size: 80px;
}
</style>