<template>
  <div>
    <!-- 4个卡片 -->
    <el-row :gutter="24">
      <el-col :span="6" class="card">
        <el-card shadow="always" class="grid-content bg1">
          <div class="fl">
            <p>本月订单量</p>
            <p class="fw">{{cardData[0].monthin}}</p>
            <p>
              {{cardData[0].compare}}
              <span>与上月同比</span>
            </p>
          </div>
          <i class="el-icon-tickets ico fr"></i>
          <div class="clear"></div>
        </el-card>
      </el-col>
      <el-col :span="6" class="card">
        <div class="grid-content">
          <el-card shadow="always" class="grid-content bg2">
            <div class="fl">
              <p>本月回款(元)</p>
              <p class="fw">{{cardData[1].monthin}}</p>
              <p>
                {{cardData[1].compare}}
                <span>与上月同比</span>
              </p>
            </div>
            <i class="el-icon-money ico fr"></i>
            <div class="clear"></div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6" class="card">
        <div class="grid-content">
          <el-card shadow="always" class="grid-content bg3">
            <div class="fl">
              <p>累计订单量</p>
              <p class="fw">{{cardData[2].allorder}}</p>
              <p>
                {{cardData[2].compare}}
                <span>与去年同比</span>
              </p>
            </div>
            <i class="el-icon-date ico fr"></i>
            <div class="clear"></div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6" class="card">
        <div class="grid-content">
          <el-card shadow="always" class="grid-content bg4">
            <div class="fl">
              <p>累计回款</p>
              <p class="fw">{{cardData[3].monthin}}</p>
              <p>
                {{cardData[3].compare}}
                <span>与去年同比</span>
              </p>
            </div>
            <i class="el-icon-coin ico fr"></i>
            <div class="clear"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <!-- 图表 -->
    <el-row :gutter="24" class="mb">
      <!-- 弧线图 -->
      <el-col :span="18">
        <el-card shadow="always">
          <!-- 标题通过插槽引入 -->
          <div slot="header">订单统计分析</div>
          <div class="analysis" ref="analysis"></div>
        </el-card>
      </el-col>
      <!-- 饼图 -->
      <el-col :span="6">
        <el-card shadow="always">
          <!-- 标题通过插槽引入 -->
          <div slot="header">货源产品占比</div>
          <div class="pie" ref="pie"></div>
        </el-card>
      </el-col>
    </el-row>
       <!-- 操作日志 -->
    <el-row :gutter="24">
      <!-- 操作日志细化 -->
      <el-col :span="12">
        <el-card shadow="always" class="operate_hei">
          <el-timeline>
            <el-timeline-item
              :timestamp="item.timestap"
              placement="top"
              v-for="(item, index) in operateData"
              :key="index"
            >
              <el-card>
                <h4>{{ item.operation }}</h4>
                <p>{{ item.name }} 提交于 {{ item.time }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :span="12">
        <!-- 日历 -->
       <el-card shaow="always">
        <el-calendar v-model="value"> </el-calendar>
       </el-card>
      </el-col>
    </el-row>
    
  </div>
</template>


<script>
import * as echarts from "echarts";
import { get } from "@/utils/http";
export default {
  data(){
    return{
      operateData:[],
      value:new Date(),
      cardData:[
        {monthin:'',compare:''},
        {monthin:'',compare:''},
        {allorder:'',compare:''},
        {monthin:'',compare:''},
      ]
    }
  },
  //把图表渲染到页面
  mounted() {
    this.getLineConetnt();
    this.getPie();
    this.getOperate();
    this.getCardData();
  },
  methods: {
    //卡片数据
    async getCardData(){
      const {data} = await get('/monthData');
      this.cardData=data;
      console.log(data[0].monthin);
    },
    // 曲线图
    async getLineConetnt() {
      //1.准备有固定高的容器
      var myChart = echarts.init(this.$refs.analysis);
      const { data } = await get("/line");
      let keys = [];
      let val = [];
      for (let key in data) {
        keys.push(key);
        val.push(data[key]);
      }
      // 2.图标配置项(类似的图表，把配置项粘进来)
      const option = {
        xAxis: {
          boundaryGap: false,
          type: "category", //横轴坐标轴类型
          data: keys,
        }, //data类目数据，在类目轴（type: 'category'）中有效。
        yAxis: {
          //纵轴
          type: "value", //'value' 数值轴，适用于连续数据。
        },
        series: [
          {
            data: val,
            type: "line",
            smooth: true,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#4f88ff", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "white", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        ],
      };
      //3。调用方法，使用图表
      myChart.setOption(option);
    },
    // 饼图
  async getPie() {
    var myChart = echarts.init(this.$refs.pie);
    const {data} = await get('/pie');
    const option = {
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['30%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 18,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: data
    }
  ]
};
myChart.setOption(option);
  },
  //操作时间戳数据
    async getOperate() {
      let { data } = await get("/operate");
      this.operateData = data;
    },
  }
};
</script>

<style lang="less" scoped>
.card {
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 12px;
}
.bg1 {
  background: #4f88ff;
}
.bg2 {
  background: #ff6b6b;
}
.bg3 {
  background: #5f27cd;
}
.bg4 {
  background: #f0932b;
}
.grid-content {
  border-radius: 4px;
  color: #fff;
  div {
    p {
      line-height: 30px;
    }
    .fw {
      font-weight: bold;
    }
    &:last-child {
      span {
        font-size: 12px;
      }
    }
  }
}
.ico {
  font-size: 60px;
  color: rgba(255, 255, 255, 0.3);
  
}
//图表容器，有固定高
.analysis,
.pie {
  height: 240px;
}
.operate_hei{
  height: 700px;
}
.mb{
  margin-bottom: 20px;
}
</style>