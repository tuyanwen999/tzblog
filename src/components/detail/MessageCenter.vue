<template>
  <div class="outer">
    <el-backtop>
      <div
        style="
           {
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
            border-radius: 15px;
          }
        "
      >
        <i class="el-icon-arrow-up"></i>
        up
      </div>
    </el-backtop>
    <div v-show="SystemInfo.length == 0 ? true : false">
      <el-empty
        image="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01f98a5d393b4da8012187f46ba38c.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637109545&t=094962c9f0c0b18638bc96c9de4bdda4"
      ></el-empty>
    </div>
    <div class="messageInfo" v-for="(item, index) in SystemInfo" :key="index">
      <el-divider>
        <img
          :src="item.img == '' ? $store.state.defaultImg : item.img"
          alt=""
          class="messageImg"
        /><i class="el-icon-bell"></i
        ><span style="font-size: 12px; padding: 0 10px">{{
          item.messagetime
        }}</span></el-divider
      >
      <el-alert
        :title="item.messagename"
        type="info"
        :description="item.messagecontent"
        effect="dark"
        show-icon
        :closable="false"
      >
      </el-alert>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { api_02 } from "../../api";
export default {
  data() {
    return {
      SystemInfo: [], //系统消息
    };
  },
  methods: {
    async getSystemInfo() {
      var vm = this.$store;
      vm.commit("updateNoseeMessage", 0);
      const { data: res } = await axios({
        method: "post",
        url: api_02 + "getsystemmessages",
        data: {
          username: this.$store.state.username,
          token: sessionStorage.getItem("token"),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

      console.log(res, "messssss");
      if (res.statuscode !== 200) {
        if (res.statuscode == 212) {
          sessionStorage.clear();
          this.$store.commit("updateShow_no");
          this.$router.push("/login");
          return;
        } else {
          this.$message.error(res.message);
          return;
        }
      }
      this.SystemInfo = res.messageinf;
      console.log(this.SystemInfo, "systeninfo");
    },
  },
  created() {
    this.getSystemInfo();
  },
};
</script>

<style>
.messageInfo {
  margin-bottom: 30px;
}
.el-divider__text.is-center {
  background-color: rgba(255, 255, 255, 0.9);
}
.messageImg {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin: 0 10px;
}
.line {
  height: 0;
  border-top: 2px solid red;
  margin: 0;
  padding: 0;
}
.outer {
  background-color: rgba(255, 255, 255, 0.9);
  min-height: 600px;
  padding: 20px;
}
.el-alert {
  margin: 10px 0px !important;
}
</style>