<template>
  <div class="mycollect">
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
    <div v-show="collectBlog.length == 0 ? true : false">
      <el-empty
        image="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flz.xdf.cn%2Fzhuanti%2Fzhonxueyemian%2Fimages%2Floading.gif&refer=http%3A%2F%2Flz.xdf.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637109545&t=e657f97750f1c6db2d07626c1a5eba58"
      ></el-empty>
    </div>
    <div>
      <div v-for="(item, index) in collectBlog" :key="index" class="item">
        <p class="top_head">
          <span>发布者：{{ item.blogauthor }}</span>
          <span style="text-align: right; font-size: 14px"
            >发布时间：{{ item.blogtime }}</span
          >
        </p>
        <div class="body_nav">
          <span
            style="margin-right: 50px; font-size: 20px; cursor: pointer"
            @click="blog_enter(item.blogid, index, item.status)"
            >{{ item.blogname }}</span
          >
          <span v-for="i in item.blogclassify" :key="i"
            ><el-tag type="success">{{ i }}</el-tag></span
          >
          <span v-for="(k, w) in item.bloglabel" :key="w"
            ><el-tag type="warning">{{ k }}</el-tag></span
          >
          <span class="collect_time">收藏时间：{{ item.collecttime }}</span>
        </div>
        <p style="text-align: right; margin-top: 10px">
          <el-popconfirm
            title="确定取消收藏该博客吗？"
            icon-color="rgb(238,193,124)"
            @confirm="cancleCollect(item.blogid)"
          >
            <el-button slot="reference">取消收藏</el-button>
          </el-popconfirm>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { api_04 } from "../../api";
export default {
  data() {
    return {
      collectBlog: [], //我的博客收藏
    };
  },
  methods: {
    async myCollect() {
      const { data: res } = await axios({
        method: "post",
        url: api_04 + "viewblogcollect",
        data: {
          username: this.$store.state.username,
          token: sessionStorage.getItem("token"),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

      console.log(res, "mmmmmssssccc");
      if (res.statuscode !== 200){
         if(res.statuscode === 212){
          this.$message.error(res.message);
           sessionStorage.clear();
          this.$store.commit("updateShow_no");
          this.$router.push("/login");
          return
        }else{
          return
        }
      }
      this.collectBlog = res.arrary;
      console.log(this.collectBlog);
    },
    async cancleCollect(blogid) {
      var vm = this.$store;
      vm.commit("updateLoading", true);
      const { data: res } = await axios({
        method: "post",
        url: api_04 + "cancelblogcollect",
        data: {
          blogid: parseInt(blogid),
          username: this.$store.state.username,
          token: sessionStorage.getItem("token"),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });
      console.log(res, "cancan");
      if (res.statuscode !== 200) {
         if(res.statuscode === 212){
          this.$message.error(res.message);
           sessionStorage.clear();
          this.$store.commit("updateShow_no");
          this.$router.push("/login");
          return
        }else{
          return
        }
      }
      this.$message.success("取消收藏成功！");
      this.myCollect();
      vm.commit("updateLoading", false);
    },
    // 进入收藏博客
    blog_enter(blogid, index, status) {
      var vm = this.$store;
      vm.commit("updateLoading", true);
      this.$router.push({
        name: "Blogdetail",
        query: {
          id: blogid,
          index: index,
          type: status,
          flag: 1,
        },
      });
      vm.commit("updateLoading", false);
    },
  },
  created() {
    this.myCollect();
  },
};
</script>

<style>
.collect_time {
  float: right;
  padding: 6px 0;
}
.top_head {
  padding: 10px 0px 30px 0;
  display: flex;
  justify-content: space-between;
}
.top_head span {
  flex: 1;
}
.mycollect {
  background-color: rgba(255, 255, 255, 0.9);
  min-height: 700px;
  padding-bottom: 10px;
}

.item {
  padding: 18px 50px;
  display: block;
  margin: 0 50px 20px 50px;
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.5);
}
.item span {
  margin-right: 20px;
}
</style>