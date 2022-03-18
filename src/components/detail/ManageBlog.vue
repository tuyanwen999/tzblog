<template>
  <div class="blogManage">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
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
      <el-tab-pane label="待审核" name="1">
        <el-tabs tab-position="left" v-model="active" @tab-click="handleClick">
          <el-tab-pane label="学习" name="1">
            <div v-show="blogDetail.length == 0 ? true : false">
              <el-empty
                image="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F014fea5c2d6beaa8012029ac2b5edd.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637025552&t=43fbe12fb821d1154a0a5ab6b3f5a96e"
              ></el-empty>
            </div>
            <div v-for="item in blogDetail" :key="item.blogid" class="rowStyle">
              <div class="detail_wrap">
                <div>
                  <p class="blogDetail">
                    {{ item.blogname }}
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
                    <el-tag
                      type="warning"
                      v-for="k in item.bloglabel"
                      :key="k + '_02'"
                      >{{ k }}</el-tag
                    >
                  </p>
                </div>
              </div>
              <el-divider></el-divider>
            </div>
          </el-tab-pane>
          <el-tab-pane label="生活" name="2">
            <div v-show="blogDetail.length == 0 ? true : false">
              <el-empty
                image="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F017a9057bdc2100000018c1b2f446d.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637025536&t=b1f98fe516e240d1a8b39849834de4b3"
              ></el-empty>
            </div>
            <div v-for="item in blogDetail" :key="item.blogid" class="rowStyle">
              <div class="detail_wrap">
                <div>
                  <p class="blogDetail">
                    {{ item.blogname }}
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
                    <el-tag
                      type="warning"
                      v-for="k in item.bloglabel"
                      :key="k + '_02'"
                      >{{ k }}</el-tag
                    >
                  </p>
                </div>
              </div>
              <el-divider></el-divider>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="通过" name="2">
        <el-tabs tab-position="left" v-model="active" @tab-click="handleClick">
          <el-tab-pane label="学习" name="1">
            <div v-show="blogDetail.length == 0 ? true : false">
              <el-empty
                image="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F014fea5c2d6beaa8012029ac2b5edd.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637025552&t=43fbe12fb821d1154a0a5ab6b3f5a96e"
              ></el-empty>
            </div>
            <div
              v-for="(item, index) in blogDetail"
              :key="item.blogid"
              class="rowStyle"
            >
              <div class="detail_wrap">
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
                    <el-tag
                      type="warning"
                      v-for="k in item.bloglabel"
                      :key="k + '_02'"
                      >{{ k }}</el-tag
                    >
                  </p>
                </div>
              </div>
              <div class="deleteProp">
                <el-button
                  style="margin-right: 10px"
                  @click="changeBlogBtn(item.blogid)"
                  >修改博客</el-button
                >
                <el-popconfirm
                  title="确定要删除该博客吗？"
                  icon-color="rgb(238,193,124)"
                  @confirm="deleteBlog(item.blogid)"
                >
                  <el-button slot="reference">删除博客</el-button>
                </el-popconfirm>
              </div>
              <el-divider></el-divider>
            </div>
          </el-tab-pane>
          <el-tab-pane label="生活" name="2">
            <div v-show="blogDetail.length == 0 ? true : false">
              <el-empty
                image="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F017a9057bdc2100000018c1b2f446d.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637025536&t=b1f98fe516e240d1a8b39849834de4b3"
              ></el-empty>
            </div>
            <div
              v-for="(item, index) in blogDetail"
              :key="item.blogid"
              class="rowStyle"
            >
              <div class="detail_wrap">
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
                    <el-tag
                      type="warning"
                      v-for="k in item.bloglabel"
                      :key="k + '_02'"
                      >{{ k }}</el-tag
                    >
                  </p>
                </div>
              </div>
              <div class="deleteProp">
                <el-button
                  style="margin-right: 10px"
                  @click="changeBlogBtn(item.blogid)"
                  >修改博客</el-button
                >
                <el-popconfirm
                  title="确定要删除该博客吗？"
                  icon-color="rgb(238,193,124)"
                  @confirm="deleteBlog(item.blogid)"
                >
                  <el-button slot="reference">删除博客</el-button>
                </el-popconfirm>
              </div>
              <el-divider></el-divider>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="未通过" name="3">
        <el-tabs tab-position="left" v-model="active" @tab-click="handleClick">
          <el-tab-pane label="学习" name="1">
            <div v-show="blogDetail.length == 0 ? true : false">
              <el-empty
                image="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F014fea5c2d6beaa8012029ac2b5edd.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637025552&t=43fbe12fb821d1154a0a5ab6b3f5a96e"
              ></el-empty>
            </div>
            <div v-for="item in blogDetail" :key="item.blogid" class="rowStyle">
              <div class="detail_wrap">
                <div>
                  <p class="blogDetail">
                    {{ item.blogname }}
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
                    <el-tag
                      type="warning"
                      v-for="k in item.bloglabel"
                      :key="k + '_02'"
                      >{{ k }}</el-tag
                    >
                  </p>
                </div>
              </div>
              <el-divider></el-divider>
            </div>
          </el-tab-pane>
          <el-tab-pane label="生活" name="2">
            <div v-show="blogDetail.length == 0 ? true : false">
              <el-empty
                image="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F017a9057bdc2100000018c1b2f446d.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637025536&t=b1f98fe516e240d1a8b39849834de4b3"
              ></el-empty>
            </div>
            <div v-for="item in blogDetail" :key="item.blogid" class="rowStyle">
              <div class="detail_wrap">
                <div>
                  <p class="blogDetail">
                    {{ item.blogname }}
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
                    <el-tag
                      type="warning"
                      v-for="k in item.bloglabel"
                      :key="k + '_02'"
                      >{{ k }}</el-tag
                    >
                  </p>
                </div>
              </div>
              <el-divider></el-divider>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
import { api_04 } from "../../api";
export default {
  data() {
    return {
      activeName: "1", //导航栏状态值
      active: "1", //切换学习生活触发
      blogDetail: [], //存取博客信息
      blogInfo: "", //博客详细内容
    };
  },
  methods: {
    // 导航栏点击触发事件
    async handleClick() {
      this.blogDetail = [];
      const { data: res } = await axios({
        method: "post",
        url: api_04 + "viewpersonalblogs",
        data: {
          username: this.$store.state.username,
          token: sessionStorage.getItem("token"),
          auditstatus: parseInt(this.activeName),
          status: parseInt(this.active),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });
      console.log(res, "handle");
      if (res.statuscode !== 200){
         if(res.statuscode === 213){
          this.$message.error(res.message);
           sessionStorage.clear();
          this.$store.commit("updateShow_no");
          this.$router.push("/login");
          return
        }else{
          return
        }
      }
      this.blogDetail = res.arrary;
      console.log(this.blogDetail);
    },
    // 进入博客详情
    detail_enter(blogid, index) {
      this.$router.push({
        name: "Blogdetail",
        query: {
          id: blogid,
          token: sessionStorage.getItem("token"),
          index: index,
          type: this.active,
          flag: 1,
        },
      });
    },
    // 删除博客
    async deleteBlog(blogid) {
      const { data: res } = await axios({
        method: "post",
        url: api_04 + "userdelbloginf",
        data: {
          username: this.$store.state.username,
          token: sessionStorage.getItem("token"),
          blogid: parseInt(blogid),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });
      console.log(res, "shanshan");
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
      this.$message.success("博客删除成功！");
      this.handleClick();
    },
    // 根据id获取博客内容
    async getBlogContent(blogid) {
      const vm = this.$store;
      const { data: res } = await axios({
        method: "post",
        url: api_04 + "viewblogdetail",
        data: {
          username: this.$store.state.username,
          token: sessionStorage.getItem("token"),
          blogid: parseInt(blogid),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

      console.log(res, "blogcontent");
      if (res.statuscode !== 200) {
        if(res.statuscode === 213){
          this.$message.error(res.message);
           sessionStorage.clear();
          this.$store.commit("updateShow_no");
          this.$router.push("/login");
          return
        }else{
          return
        }
      }
      this.blogInfo = res.blogdetail;
      console.log(this.blogInfo);
    },
    //点击修改博客按钮
    changeBlogBtn(blogid) {
      this.getBlogContent(blogid);
      setTimeout(() => {
        this.$router.push({
          name: "Markdown",
          params: { id: blogid, detailContent: this.blogInfo },
        });
        this.$store.commit("statusFlagChange", 1);
      }, 500);
    },
  },
  created() {
    this.handleClick();
  },
};
</script>

<style>
.detail_wrap {
  display: flex;
  justify-content: space-between;
}
.rowStyle {
  margin: 0 200px 60px 50px;
  position: relative;
}
.deleteProp {
  position: absolute;
  bottom: -39px;
  right: -18px;
}
.el-tabs {
  padding: 10px 50px;
}
.blogManage {
  min-height: 700px;
  background-color: rgba(255, 255, 255, 0.9);
}
.tags {
  padding-bottom: 2px;
  margin-top: 10px;
}
.tags span {
  padding: 0 5px 10px 5px !important;
}
.el-icon-date {
  font-size: 12px;
}
.el-divider {
  margin: 10px;
}

.blogDetail {
  cursor: pointer;
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
h3 {
  padding: 10px;
  font-size: 14px;
}
p {
  line-height: 20px;
  font-size: 16px;
}
.auth {
  font-size: 12px;
  text-align: left;
  padding-right: 15px;
  height: 10px;
  line-height: 10px;
}
</style>