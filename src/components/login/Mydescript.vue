<template>
  <div class="box">
    <el-carousel
      :interval="4000"
      type="card"
      height="400px"
      style="margin-top: 30px"
    >
      <el-carousel-item v-for="item in imgList" :key="item.name">
        <img :src="item.src" alt="" style="width: 100%; height: 100%" />
      </el-carousel-item>
    </el-carousel>
    <div class="bottom">
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
      <div :class="menuFixed == true ? 'isFixed' : ''" class="top-nav">
        <el-row :gutter="20">
          <el-col :span="4" :offset="20"
            ><div class="grid-content bg-purple-light">
              <el-button type="success" plain @click="toMark">写文章</el-button>
            </div></el-col
          >
        </el-row>
      </div>
      <div class="bottom-nav">
        <el-row :gutter="20">
          <div class="bottom-fixed-nav">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="14" :offset="10"
                    ><div class="grid-content bg-purple-light">
                      <h3><a href="#">@TZyyds</a></h3>
                    </div></el-col
                  >
                </el-row>
                <el-row>
                  <el-col :span="16" :offset="8"
                    ><div class="grid-content bg-purple-light">
                      <h3>半山腰太挤了，我想去山顶看看</h3>
                    </div></el-col
                  >
                </el-row>
                <el-row>
                  <el-col :span="14" :offset="10"
                    ><div class="grid-content bg-purple-light">
                      <h3>
                        <a
                          href="https://baike.baidu.com/item/%E5%8D%97%E9%98%B3/135168?fromtitle=%E6%B2%B3%E5%8D%97%E5%8D%97%E9%98%B3&fromid=7556031"
                          ><i class="el-icon-location-information"></i
                          >河南南阳</a
                        >
                      </h3>
                    </div></el-col
                  >
                </el-row>
              </div>
            </el-col>
          </div>

          <el-col :span="16">
            <div class="grid-content bg-purple change">
              <el-tabs
                tab-position="left"
                v-model="active"
                @tab-click="getblog"
              >
                <el-tab-pane label="学习" name="1">
                  <div class="study" v-for="(item, index) in blogArr" :key="index">
                    <div class="study_wrap">
                      <div>
                        <p class="blogDetail">
                          <a @click="detail_enter(item.blogid, index)">{{
                            item.blogname
                          }}</a>
                        </p>
                        <p class="auth">—— 发布者（{{ item.blogauthor }}）</p>
                        
                      </div>
                      <div>
                        <p>
                          <i class="el-icon-date"> {{ item.blogtime }}</i>
                        </p>
                        <p class="tags">
                          <el-tag
                            type="success"
                            v-for="(i, j) in item.blogclassify"
                            :key="j"
                            >{{ i }}</el-tag
                          >
                          <i
                            class="el-icon-collection-tag"
                            :style="{ color: item.activeColor }"
                            @click="collectBtn(item.blogid, index)"
                          ></i>
                        </p>
                      </div>
                    </div>
                    <el-divider></el-divider>
                  </div>
                  <el-row>
                    <el-col :span="9" :offset="6">
                      <h3 style="font-weight: 700; font-size: 16px">
                        没有更多文章了......
                      </h3>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="生活" name="2">
                  <div class="life" v-for="(item, index) in blogArr" :key="index">
                    <div class="life_wrap">
                      <div>
                        <p class="blogDetail">
                          <a @click="detail_enter(item.blogid, index)">{{
                            item.blogname
                          }}</a>
                        </p>
                        <p class="auth">—— 发布者（{{ item.blogauthor }}）</p>
                        
                      </div>
                      <div>
                        <p>
                          <i class="el-icon-date"> {{ item.blogtime }}</i>
                        </p>
                        <p class="tags">
                          <el-tag
                            type="success"
                            v-for="(i, j) in item.blogclassify"
                            :key="j"
                            >{{ i }}</el-tag
                          >
                          <i
                            class="el-icon-collection-tag"
                            :style="{ color: item.activeColor }"
                            @click="collectBtn(item.blogid, index)"
                          ></i>
                        </p>
                      </div>
                    </div>
                    <el-divider></el-divider>
                  </div>
                  <el-row>
                    <el-col :span="9" :offset="6">
                      <h3 style="font-weight: 700; font-size: 16px">
                        没有更多文章了......
                      </h3>
                    </el-col>
                  </el-row>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="footer_wrap">
      <div class="footer_wrap_box">
        <div class="study_type">
          <a target="_blank" href="https://leetcode-cn.com/">力扣</a>
          <a target="_blank" href="https://juejin.cn/">掘金</a>
          <a target="_blank" href="https://www.topgoer.cn/">地鼠文档</a>
          <a target="_blank" href="https://www.luogu.com.cn/">洛谷</a>
        </div>
        <el-divider></el-divider>
        <p
          style="
            font-size: 18px;
            padding: 5px 0 15px 0;
            color: rgba(170, 162, 162, 0.966);
          "
        >
          版权所有 © TZ博客开发团队
        </p>
        <p>
          <a
            href="https://beian.miit.gov.cn"
            style="font-size: 14px; color: rgba(170, 162, 162, 0.966)"
            >豫ICP备2021034238号-1</a
          >
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
      active: "1",
      menuFixed: false,
      imgList: [
        {
          name: "lj",
          src: require("@/assets/imgs/003.jpeg"),
        },
        {
          name: "logo",
          src: require("@/assets/imgs/002.jpeg"),
        },
        {
          name: "bg",
          src: require("@/assets/imgs/001.jpeg"),
        },
        {
          name: "sadmas",
          src: require("@/assets/imgs/004.jpeg"),
        },
      ],
      blogArr: [], //存储博客信息
      type: 1, //存取类别博客码
      isCollect: [], //存取收藏状态信息
      userstate: {},
    };
  },

 
  methods: {
    // 获取博客信息（点赞数，评论数....）
    async getblog(tab) {
      let index;
      if (!tab) {
        index = 1;
      } else {
        index = parseInt(tab.name);
      }
      this.type = index;
      var vm = this.$store;
      vm.commit("updateLoading", true);
      const { data: res } = await axios({
        method: "post",
        url: api_04 + "viewblogs",
        data: {
          status: index,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });
      if (res.statuscode !== 200) {
        vm.commit("updateLoading", false);
        return this.$message.error("获取信息失败！");
      }

      vm.commit("updateLoading", false);
      let bg = res.arrary;
      bg.forEach((item) => {
        item.activeColor = "blue";
      });
      this.blogArr = bg;
      console.log(res.arrary);
      this.userstate = this.$store.state;
      if (!sessionStorage.getItem("token")) {
        return;
      }
      this.drawCollect();
    },
    // 点入博客
    detail_enter(blogid, index) {
      if (!sessionStorage.getItem("token"))
        return this.$message.error("亲~，请先登录哦！");
      this.$router.push({
        name: "Blogdetail",
        query: {
          id: blogid,
          index: index,
          type: this.type,
          flag: 0,
        },
      });
    },
    // 点击收藏博客按钮进行判断
    collectBtn(blogid, index) {
      if (this.isCollect[index] == 0) {
        console.log("0jinlaile");
        this.collectBlog(blogid, index);
      } else {
        this.cancelCollect(blogid, index);
      }
    },
    // 渲染收藏
    drawCollect() {
      this.blogArr.forEach((item, index) => {
        this.judgeCollect(item.blogid, index);
      });
      console.log(this.blogArr, "blogArr");
    },
    // 是否收藏
    async judgeCollect(blogid, index) {
      const { data: res } = await axios({
        method: "post",
        url: api_04 + "isblogcollect",
        data: {
          username: this.userstate.username,
          token: sessionStorage.getItem("token"),
          blogid: parseInt(blogid),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });
      console.log(res, "是否收藏");
      if (res.statuscode == 200) {
        this.isCollect[index] = 1;
        this.blogArr[index].activeColor = "#fda085";
      } else if(res.statuscode == 211) {
        this.isCollect[index] = 0;
      }else if(res.statuscode === 212){
        this.$message.error(res.message);
           sessionStorage.clear();
          this.$store.commit("updateShow_no");
          this.$router.push("/login");
          return
      }else{
        return
      }
    },
    // 收藏
    async collectBlog(blogid, index) {
      const { data: res } = await axios({
        method: "post",
        url: api_04 + "blogcollect",
        data: {
          blogid: parseInt(blogid),
          username: this.userstate.username,
          token: sessionStorage.getItem("token"),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });
      console.log(res, "shoucang");

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
      this.$message.success("收藏成功！");
      this.isCollect[index] = 1;
      this.blogArr[index].activeColor = "#fda085";
    },
    // 取消收藏
    async cancelCollect(blogid, index) {
      const { data: res } = await axios({
        method: "post",
        url: api_04 + "cancelblogcollect",
        data: {
          blogid: parseInt(blogid),
          username: this.userstate.username,
          token: sessionStorage.getItem("token"),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

      console.log(res, "quxiao");
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
      this.isCollect[index] = 0;
      this.blogArr[index].activeColor = "blue";
    },
    handleScroll() {
      let scrollTop = document.documentElement.scrollTop;
      let offsetTop = document.querySelector(".top-nav").offsetTop;
      if (scrollTop > offsetTop) {
        this.menuFixed = true;
      }
      if (scrollTop < 570) {
        this.menuFixed = false;
      }
    },
    toMark() {
      this.$router.push("/Markdown");
    },
  },
  created() {
    this.getblog();
  },
   mounted() {
    this.$nextTick(function () {
      window.addEventListener('scroll', this.handleScroll)
    })
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll); //销毁监听事件
  },
};
</script>

<style>
.study,.life{
  margin: 0 200px 0 50px;
}
.study_wrap,.life_wrap{
  display: flex;
  justify-content: space-between;
}
.tags {
  padding-bottom: 2px;
  margin-top: 10px;
}
.tags span {
  padding: 0 5px 10px 5px !important;
}
.box {
  user-select: none;
}
.auth {
  font-size: 12px;
  text-align: left;
  padding-right: 15px;
  height: 10px;
  line-height: 10px;
  margin-top: 20px;
}
.el-icon-date {
  font-size: 12px;
}

.el-divider {
  margin: 10px;
}

h3 {
  padding: 10px;
  font-size: 14px;
}
p {
  line-height: 20px;
  font-size: 16px;
}
.blogDetail {
  margin-top: 24px;
}
.tags .el-tag {
  margin-right: 5px;
  margin-top: 6px;
}
a:hover {
  text-decoration: underline;
  color: rgb(255, 0, 200);
}
.top-nav {
  height: 62px;
  line-height: 62px;
  border-top: 1px solid rgb(204, 204, 204);
  border-bottom: 1px solid rgb(204, 204, 204);
  background-color: #1fc8db;
  background-image: linear-gradient(
    141deg,
    #9fb8ad 0%,
    #1fc8db 51%,
    #2cb5e8 75%
  );
  transition: all 3s;
  margin-bottom: 10px;
}
.bottom {
  overflow-x: hidden;
}
.isFixed {
  position: fixed;
  width: 100%;
  height: 62px;
  background: linear-gradient(to right, #f6d365 0%, #fda085 100%);
  top: 0;
  left: 0;
  z-index: 999;
  transition: all 2s;
}
.el-icon-collection-tag {
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
}
.el-icon-collection-tag:hover {
  color: #fda085 !important;
}
</style>