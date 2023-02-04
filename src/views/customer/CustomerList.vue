<template>
  <div>
    <bread-nav></bread-nav>
    <!-- 搜索 -->
    <el-card class="mt">
      <el-row :gutter="24">
        <!-- 左边六个input，三个一行，点小箭头收起来 -->
        <el-col :span="18">
          <el-row :gutter="24">
            <el-col :span="8">
              <el-input
                v-model="searchData.name"
                class="wid"
                placeholder="请输入用户昵称"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <el-input
                v-model="searchData.id"
                class="wid"
                placeholder="请输入客户ID"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <el-input
                v-model="searchData.tel"
                class="wid"
                placeholder="联系电话"
              ></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="mt" v-show="show">
            <el-col :span="8">
              <el-input
                v-model="searchData.status"
                class="wid"
                placeholder="认证状态"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <el-input
                v-model="searchData.person"
                class="wid"
                placeholder="联系人"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <el-input
                v-model="searchData.work"
                class="wid"
                placeholder="主营业务"
              ></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2">
          <el-dropdown>
            <span class="el-dropdown-link" @click="expand">
              {{ show ? "收起" : "展开"
              }}<i
                :class="`el-icon-arrow-${show ? 'up' : 'down'} el-icon--right`"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="4" class="tr">
          <el-button type="primary" @click="search" size="mini">查询</el-button>
          <el-button type="primary" @click="reset" size="mini">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 批量操作 -->
    <el-card shaow="always" class="mt">
      <el-row :gutter="24">
        <el-col :span="16">
          <el-button type="primary" size="mini">添加客户</el-button>
          <el-button type="primary" size="mini">批量导入</el-button>
          <el-button type="primary" size="mini">导入模板下载</el-button>
          <el-button type="primary" size="mini">导出客户</el-button>
          <el-button type="warning" size="mini">分配</el-button>
          <el-button type="warning" size="mini">查看地图</el-button>
          <el-button type="warning" size="mini">+新增</el-button>
        </el-col>
        <el-col :span="8" class="tr">
          <el-button icon="el-icon-edit" size="mini">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
        </el-col>
      </el-row>
    </el-card>
    <!-- 数据列表 -->
    <el-card class="mt">
      <el-table :data="tableData" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading">
        <el-table-column type="index" width="50" label="序号" fixed="left">
        </el-table-column>
        <el-table-column prop="id" label="id" width="100"  fixed="left"></el-table-column>
        <el-table-column
          prop="name"
          label="用户昵称"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="company"
          label="所属公司"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="work"
          label="主体业务"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="balance"
          label="账户余额"
          width="100"
        ></el-table-column>
        <el-table-column prop="status" width="100" label="认证状态">
          <template slot-scope="scope">
            {{ scope.row.status == 1 ? "已认证" : "未认证" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="transport"
          label="运输里程数"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="person"
          label="联系人"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="tel"
          label="联系方式"
          width="120"
        >
        <template slot-scope="scope">
            {{scope.row.tel.slice(0,3)+'****'+scope.row.tel.substring(7,11)}}
        </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="公司地址"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="card"
          label="银行卡号"
          width="180"
        ></el-table-column>
        <el-table-column prop="operate" label="操作" fixed="right" width="100"
          ><el-button type="primary" size="mini">详情</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { post } from "@/utils/http";
import BreadNav from "@/components/BreadNav.vue";
import Mixin from '@/mixins/Mixin'
 const configs = {
    url: '/customer',
     params:{
        page:1,
        pageSize:10,
      }
  };
const mixa = new Mixin(configs);
export default {
  mixins: [mixa],
  data() {
    return {
      show:false,
      searchData: {
        id: "",
        name: "",
        tel: "",
        work: "",
        status: "",
        person: "",
      },
      params: {
        page: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    expand() {
      this.show = !this.show;
    },
    async search(){
      //向后端发送查询对应客户的请求
      const res = await post("/searchCustomer", this.searchData);
      this.getData();
      this.$message({
        message: `恭喜你，${res.message}！`,
        type: "success",
      });
    },
    reset(){
      this.searchData={}
    },
    //请求数据
    async getData() {
      this.loading = true;
      const { data } = await post("/customer", this.params);
      this.tableData = data.list;
      this.total = data.total;
      this.loading = false;
    },
  },
  components: {
    BreadNav,
  },
};
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>