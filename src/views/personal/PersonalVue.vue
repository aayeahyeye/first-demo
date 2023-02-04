<template>
  <div>
    <bread-nav></bread-nav>
    <el-card shadow="always" class="mt">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="个人信息面板" name="first">
        <personal-message></personal-message>
        </el-tab-pane>
        <el-tab-pane label="考勤" name="second">
            <personal-attendance></personal-attendance>
        </el-tab-pane>
        <el-tab-pane label="待办事项" name="third">
            <to-do></to-do>
        </el-tab-pane>
        <!-- <el-tab-pane label="联系人" name="fourth">
          <personal-contact></personal-contact>
        </el-tab-pane> -->
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import BreadNav from "@/components/BreadNav.vue";
import PersonalMessage from './PersonalMessage.vue';
import personalAttendance from './PersonalAttendance.vue';
// import PersonalContact from './PersonalContact.vue'
import ToDo from './ToDo.vue'
export default {
     data() {
      return {
        activeName: 'first'
      };
    },
    methods:{
        handleClick(tab, event) {
        console.log(tab, event);
      }
    },
  components: {
    BreadNav,PersonalMessage,personalAttendance,
    ToDo,
  },
};
</script>

<style lang="less" scoped>
</style>