<template>
  <div>
    <el-submenu v-if="menu.children" :index="menu.url" class="head">
        <template slot="title">
            <i :class="menu.icon"></i>
            <span>{{menu.name}}</span>
        </template>
        <!-- 递归 -->
        <navs-menu v-for="(item,index) in menu.children" :key="index" :menu="item"></navs-menu>
    </el-submenu>
    <el-menu-item v-else class="head" :index="menu.url">
        <i :class="menu.icon"></i>
        <!-- 插槽决定显示位置 -->
        <span slot="title">{{menu.name}}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: "NavsMenu",
  props: {
    menu: {
      type: Object,
      required: true,//比传数据
    },
  },
};
</script>

<style lang="less" scoped>
.head{
    color: #fff;
    width: 200px;
}
</style>