<template>
  <div id="wrap">
    <el-container>
      <el-aside width="200px">
        <el-menu :router="true">
          <el-menu-item index="/countcharge">
            <i class="el-icon-s-custom"></i>
            <span slot="title">账号管理</span>
          </el-menu-item>
          <el-menu-item index="/messagecenter">
            <i class="el-icon-bell"></i>
            <el-badge
              :value="$store.state.noSeeMessage"
              :max="99"
              :hidden="$store.state.noSeeMessage == 0 ? true : false"
            >
              消息中心
            </el-badge>
          </el-menu-item>
          <el-menu-item index="/mycollect">
            <i class="el-icon-star-off"></i>
            <span slot="title">我的收藏</span>
          </el-menu-item>
          <el-menu-item index="/manageblog">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">博客管理</span>
          </el-menu-item>
          <el-menu-item index="/blogsafe">
            <i class="el-icon-warning-outline"></i>
            <span slot="title">安全中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import { api_02 } from "../../api";
export default {
  data() {
    return {};
  },
  mounted() {},
  created() {
    this.getUnRead();
  },
  methods: {
    // 获取未看消息数
    async getUnRead() {
      var vm = this.$store;
      vm.commit("updateLoading", true);
      const { data: res } = await axios({
        method: "post",
        url: api_02 + "getunread",
        data: {
          username: this.$store.state.username,
          token: sessionStorage.getItem("token"),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });
      if (res.statuscode !== 200) {
        if(res.statuscode === 212){
          this.$message.error(res.message);
           sessionStorage.clear();
           vm.commit("updateLoading", false);
          this.$store.commit("updateShow_no");
          this.$router.push("/login");
          return
        }else{
          vm.commit("updateLoading", false);
          return
        }
      }
      vm.commit("updateNoseeMessage", res.count);
      vm.commit("updateLoading", false);
    },
  },
};
</script>

<style>
#wrap {
  height: 100% !important;
  background-image: url(../../assets/imgs/9.jpg);
  background-size: cover;
}

#wrap .el-container {
  height: 100% !important;
}
</style>