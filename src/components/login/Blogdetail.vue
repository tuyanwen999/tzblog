<template>
  <div id="blogDetailInfo" @click="bodyClick">
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
    <div class="top_nav">
      <h1>{{ itemBlog.blogname }}</h1>
      <p class="tags">
        <span>收藏数：{{ itemBlog.collectnum }}</span>
        <span>评论数：{{ itemBlog.commentnum }}</span>
        <span>点赞数：{{ itemBlog.thumbnum }}</span>
        <span>浏览量：{{ itemBlog.visitsnum }}</span>
        <span>发布时间：{{ itemBlog.blogtime }}</span>
      </p>
    </div>
    <mavon-editor
      :value="itemDes"
      defaultOpen="preview"
      :boxShadow="false"
      style="z-index: 1; min-height: 700px; width: 70%; margin: 0 auto"
      :editable="false"
      :subfield="false"
      :toolbarsFlag="false"
      ref="md"
      @imgAdd="$imgAdd"
      @imgDel="$imgDel"
    >
    </mavon-editor>
    <div class="thum">
      <p><i class="el-icon-trophy" @click="thumBtn"></i></p>
      <p>{{ itemBlog.thumbnum }}人点赞</p>
    </div>
    <div class="footer">
      <el-row v-for="(item, index) in commentArr" :key="index">
        <el-col :span="12">
          <div>
            <div class="headerCom">
              <div class="info">
                <img
                  v-lazy="
                    item.commentuserimg == ''
                      ? $store.state.defaultImg
                      : item.commentuserimg
                  "
                  alt=""
                />
                <span>{{ item.commentusername }}</span>
                <span class="rooter" v-show="itemBlog.blogauthor==item.commentusername">作者</span>
              </div>
              <span>{{ item.commenttime }}</span>
            </div>
            <div class="bottomCom">
              <p
                v-html="
                  item.commentcontent.replace(
                    /\#[\u4E00-\u9FA5]{1,3}\;/gi,
                    emotion
                  )
                "
                style="padding-right: 10px"
              ></p>
              <div class="moreComment">
                <i class="el-icon-more"></i>
                <div class="pos_icon">
                  <i
                    class="el-icon-chat-dot-round"
                    @click="replyBtn(item.commentusername, item.commentid)"
                  ></i>
                  <i
                    class="el-icon-delete"
                    v-show="item.commentusername == $store.state.username"
                    @click="delcomment(item.commentid)"
                  ></i>
                </div>
              </div>
            </div>
          </div>
          <el-row v-for="(i, j) in item.arr" :key="j">
            <el-col :span="22" :offset="2">
              <div class="replyType">
                <div class="headerCom" style="margin-bottom: 0px">
                  <div class="info">
                    <img
                      v-lazy="
                        i.commentimg == ''
                          ? $store.state.defaultImg
                          : i.commentimg
                      "
                      alt=""
                      style="height: 20px; width: 20px; padding-top: 8px"
                    />
                    <span
                      >{{ i.commentusername }}
                      <i class="footer_02" v-show="itemBlog.blogauthor==i.commentusername">作者</i>
                      <i class="el-icon-caret-right"></i>
                      {{ i.replycommentusename }}</span
                    >
                    
                  </div>
                  <span>{{ i.replycommenttime }}</span>
                </div>
                <div class="bottomCom">
                  <p
                    v-html="
                      i.replycommentcontent.replace(
                        /\#[\u4E00-\u9FA5]{1,3}\;/gi,
                        emotion
                      )
                    "
                    style="
                      padding-right: 10px;
                      font-size: 13px;
                      padding-left: 20px;
                    "
                  ></p>
                  <div class="moreComment">
                    <i class="el-icon-more"></i>
                    <div class="pos_icon">
                      <i
                        class="el-icon-chat-dot-round"
                        @click="replyBtn(i.commentusername, item.commentid)"
                      ></i>
                      <i
                        class="el-icon-delete"
                        v-show="i.commentusername == $store.state.username"
                        @click="deleteReply(i.replyid, item.commentid)"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-divider></el-divider>
        </el-col>
      </el-row>
      <div>
        <el-row>
          <el-col :span="12">
            <p>评论预览框</p>
            <div class="ss">
              <p
                v-html="content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"
              ></p>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <p>评论编辑框</p>
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="content"
              maxlength="500"
              show-word-limit
              @keyup.enter.native="publishComment"
            >
            </el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div class="last_footer">
              <div class="left_wrap">
                <img
                  src="../../assets/imgs/laugh.png"
                  @click="btnClick"
                  alt=""
                />
                <div id="meme" @click="meClick">
                  <emotion @emotion="handleEmotion" :height="200"></emotion>
                </div>
              </div>

              <div>
                <i class="el-icon-share" @click="shareBtn"></i>
                <el-button
                  size="small"
                  type="primary"
                  @click="publishComment"
                  round
                  v-preventReClick="5000"
                  >发表感言</el-button
                >
              </div>
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
import { api_02, api_04 } from "../../api";
import Emotion from "../out_plugins/index.vue";
export default {
  components: {
    Emotion,
  },
  data() {
    return {
      itemDes: "", //博客详细内容
      itemBlog: {}, //完整的博客信息
      text: "",
      content: "",
      message: "", //验证是否点赞
      commentArr: [], //存储博客评论,
      status: 1, //存取类别博客码
      index: 1, //点击的第几个博客,
      thumStatus: 0, //当前点赞状态
      flag: 0, //对回复信息做标记
      // 回复评论数据
      replyComArr: {
        commentusername: "",
        commentid: "",
      },
    };
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
          username: this.$store.state.newForm.username,
          token: sessionStorage.getItem("token"),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

      console.log(this.$store.state.newForm);
      console.log(this.$store.state.newForm.username);
      console.log(sessionStorage.getItem("token"));
      console.log(res, "hhhyyyy");
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
    // 点击表情包
    handleEmotion(i) {
      this.content += i;
    },
    // 将匹配结果替换表情图片
    emotion(res) {
      let word = res.replace(/\#|\;/gi, "");
      const list = [
        "微笑",
        "撇嘴",
        "色",
        "发呆",
        "得意",
        "流泪",
        "害羞",
        "闭嘴",
        "睡",
        "大哭",
        "尴尬",
        "发怒",
        "调皮",
        "呲牙",
        "惊讶",
        "难过",
        "酷",
        "冷汗",
        "抓狂",
        "吐",
        "偷笑",
        "可爱",
        "白眼",
        "傲慢",
        "饥饿",
        "困",
        "惊恐",
        "流汗",
        "憨笑",
        "大兵",
        "奋斗",
        "咒骂",
        "疑问",
        "嘘",
        "晕",
        "折磨",
        "衰",
        "骷髅",
        "敲打",
        "再见",
        "擦汗",
        "抠鼻",
        "鼓掌",
        "糗大了",
        "坏笑",
        "左哼哼",
        "右哼哼",
        "哈欠",
        "鄙视",
        "委屈",
        "快哭了",
        "阴险",
        "亲亲",
        "吓",
        "可怜",
        "菜刀",
        "西瓜",
        "啤酒",
        "篮球",
        "乒乓",
        "咖啡",
        "饭",
        "猪头",
        "玫瑰",
        "凋谢",
        "示爱",
        "爱心",
        "心碎",
        "蛋糕",
        "闪电",
        "炸弹",
        "刀",
        "足球",
        "瓢虫",
        "便便",
        "月亮",
        "太阳",
        "礼物",
        "拥抱",
        "强",
        "弱",
        "握手",
        "胜利",
        "抱拳",
        "勾引",
        "拳头",
        "差劲",
        "爱你",
        "NO",
        "OK",
        "爱情",
        "飞吻",
        "跳跳",
        "发抖",
        "怄火",
        "转圈",
        "磕头",
        "回头",
        "跳绳",
        "挥手",
        "激动",
        "街舞",
        "献吻",
        "左太极",
        "右太极",
      ];
      let index = list.indexOf(word);
      return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`;
    },
    // 获取博客详信息(点赞数，评论数....)
    async getdetailBlog() {
      var vm = this.$store;
      vm.commit("updateLoading", true);
      const { data: res } = await axios({
        method: "post",
        url: api_04 + "viewblogs",
        data: {
          status: parseInt(this.status),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

      if (res.statuscode !== 200) {
        vm.commit("updateLoading", false);
        return;
      }
      vm.commit("updateLoading", false);
      if (this.$route.query.flag == 1) {
        let resault = res.arrary.filter((item) => {
          return parseInt(item.blogid) == parseInt(this.$route.query.id);
        });
        this.itemBlog = resault[0];
      } else {
        this.itemBlog = res.arrary[this.index];
      }

      console.log(this.itemBlog, "iiiii");
    },
    // 获取博客内容
    async getItemDes() {
      console.log(this.$store.state.newForm, "hahahahah");
      const vm = this.$store;
      vm.commit("updateLoading", true);
      const { data: res } = await axios({
        method: "post",
        url: api_04 + "viewblogdetail",
        data: {
          username: this.$store.state.username,
          token: sessionStorage.getItem('token'),
          blogid: parseInt(this.$route.query.id),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });
  console.log(this.$route.query.id,"ididid")
      if (res.statuscode !== 200) {
        vm.commit("updateLoading", false);
        return;
      }
      console.log(res, "rescontent");
      this.itemDes = res.blogdetail;
      this.status = this.$route.query.type;
      this.index = this.$route.query.index;
      console.log(this.index);
      console.log(this.status);
      vm.commit("updateLoading", false);
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", $file);
      this.img_file[pos] = $file;
      this.$http({
        url: "http://121.43.177.199:9101/upload",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        let _res = res.data;
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        this.$refs.md.$img2Url(pos, _res.url);
      });
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    },
    btnClick(e) {
      e.stopPropagation();
      meme.classList.toggle("active");
    },
    // 清除事件冒泡
    meClick(e) {
      e.stopPropagation();
    },
    // 点赞按钮触发
    thumBtn() {
      if (this.thumStatus == 0) {
        this.thumUp().then(() => {
          this.getUnRead();
        });
      } else {
        this.cancelThumb();
      }
    },
    // 点击分享按钮
    shareBtn() {
      this.$message.success("正在开发中......");
    },
    // 点赞功能
    async thumUp() {
      let colorChange = document.querySelector(".el-icon-trophy");
      const { data: res } = await axios({
        method: "post",
        url: api_04 + "admireblog",
        data: {
          blogid: parseInt(this.itemBlog.blogid),
          username: this.$store.state.username,
          token: sessionStorage.getItem("token"),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

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
      this.thumStatus = 1;
      this.$message.success("点赞成功！");
      this.message = res.message;
      colorChange.style.color = "rgb(252,201,102)";
      this.getdetailBlog();
    },
    // 取消点赞
    async cancelThumb() {
      let colorChange = document.querySelector(".el-icon-trophy");
      const { data: res } = await axios({
        method: "post",
        url: api_04 + "canceladmireblog",
        data: {
          blogid: parseInt(this.itemBlog.blogid),
          username: this.$store.state.username,
          token: sessionStorage.getItem("token"),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

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
      this.thumStatus = 0;
      colorChange.style.color = "rgb(38,38,38)";
      this.getdetailBlog();
    },
    // 是否点赞
    async judgeThumb() {
      let colorChange = document.querySelector(".el-icon-trophy");
      const { data: res } = await axios({
        method: "post",
        url: api_04 + "isadmireblog",
        data: {
          blogid: parseInt(this.$route.query.id),
          username: this.$store.state.username,
          token: sessionStorage.getItem("token"),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

      console.log(res, "dianzan");
      if (res.statuscode !== 200) {
        this.thumStatus = 0;
        colorChange.style.color = "rgb(38,38,38)";
      } else {
        colorChange.style.color = "rgb(252,201,102)";
        this.thumStatus = 1;
      }
    },
    // 上传评论
    async publishComment() {
      if (this.flag == 1) {
        this.replyCom().then(() => {
          this.content = "";
          this.getComment().then(() => {
            this.getdetailBlog().then(() => {
              this.getUnRead();
            });
          });
        });
      } else {
        if (!this.content.trim()) return this.$message.error("评论不能为空哦！");
        const { data: res } = await axios({
          method: "post",
          url: api_04 + "commentblog",
          data: {
            blogid: parseInt(this.itemBlog.blogid),
            username: this.$store.state.username,
            token: sessionStorage.getItem("token"),
            commentmessage: this.content,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        });

        console.log(res);
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
        this.$message.success("评论发表成功！");
        this.content = "";
        this.getComment().then(() => {
          this.getdetailBlog().then(() => {
            this.getUnRead();
          });
        });
      }
    },
    // 渲染评论
    async getComment() {
      const { data: res } = await axios({
        method: "post",
        url: api_04 + "viewallcomment",
        data: {
          blogid: parseInt(this.itemBlog.blogid),
          username: this.$store.state.username,
          token: sessionStorage.getItem("token"),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });
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
      this.commentArr = res.arrary;
      console.log(this.commentArr, "jjjjjj");
    },
    // 点击回复评论按钮
    replyBtn(commentusername, commentid) {
      window.scrollTo(
        0,
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight
      );
      this.content = `@${commentusername} `;
      this.flag = 1;
      this.replyComArr.commentusername = commentusername;
      this.replyComArr.commentid = commentid;
    },
    // 回复评论
    async replyCom() {
      const { data: res } = await axios({
        method: "post",
        url: api_04 + "replycomment",
        data: {
          commentid: this.replyComArr.commentid,
          replyusername: this.replyComArr.commentusername,
          username: this.$store.state.username,
          token: sessionStorage.getItem("token"),
          commentmessage: this.content,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

      console.log(res, "yyyyy");
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
      this.flag = 0;
      this.$message.success("评论发表成功！");
    },
    // 删除回复
    async deleteReply(replyid, commentid) {
      const { data: res } = await axios({
        method: "post",
        url: api_04 + "delreplycomment",
        data: {
          commentid: parseInt(commentid),
          username: this.$store.state.username,
          token: sessionStorage.getItem("token"),
          replycommentid: parseInt(replyid),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });
      console.log(res, "sssssssjjjj");
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
      this.$message.success("回复删除成功！");
      this.getComment().then(() => {
        this.getdetailBlog();
      });
    },
    // 删除评论
    async delcomment(commentid) {
      const { data: res } = await axios({
        method: "post",
        url: api_04 + "delcomment",
        data: {
          commentid,
          username: this.$store.state.username,
          token: sessionStorage.getItem("token"),
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

      console.log(res, "shanchupinglun");
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
      this.$message.success("评论删除成功！");
      this.getComment().then(() => {
        this.getdetailBlog();
      });
    },
    // 点击body
    bodyClick(e) {
      meme.classList.remove("active");
    },
  },
  created() {
    this.getItemDes().then(() => {
      this.getdetailBlog().then(() => {
        this.getComment().then(() => {
          this.judgeThumb();
        });
      });
    });
  },
  mounted() {},
};
</script>

<style>
.info .rooter{
  background-color: rgb(248, 51, 51);
  color: #fff;
  margin: 0 10px;
  border-radius:20%;
  padding: 0 6px;
  position: absolute;
  top: 7px;
  right: -51px;
  height: 20px !important;
  line-height: 20px !important;
}
.footer_02{
  background-color: rgb(248, 51, 51);
  color: #fff;
  border-radius:10%;
  padding: 0 3px;
}
.replyType {
  margin-bottom: 8px;
}
.el-icon-more:hover {
  color: rgb(97, 204, 123);
}
.moreComment:hover .pos_icon {
  display: block;
}
.pos_icon i {
  display: inline;
  padding: 5px;
  font-size: 20px;
}
.pos_icon i:hover {
  color: rgb(97, 204, 123);
}
.pos_icon {
  padding-left: 35px;
  position: absolute;
  top: -5px;
  right: -60px;
  display: none;
  /* border: 1px solid red; */
}
.moreComment {
  position: relative;
  cursor: pointer;
}
.bottomCom {
  display: flex;
  justify-content: space-between;
}
.thum p {
  text-align: center;
  font-size: 12px;
  padding: 8px;
}
.el-icon-trophy {
  font-size: 30px;
  text-align: center;
  /* color: rgb(251,251,251); */
  cursor: pointer;
}
.el-icon-trophy:hover {
  color: rgb(252, 201, 102);
}
.thum {
  margin: -5px auto;
  width: 70%;
  box-sizing: border-box;
  padding: 20px 0 4px 40px;
  background-color: #fff;
}
.active {
  display: block !important;
}
.left_wrap {
  position: relative;
}
#meme {
  position: absolute;
  left: 0;
  top: 45px;
  height: 200px;
  width: 500px;
  background-color: #fff;
  display: none;
}
.el-icon-share {
  color: rgb(26, 165, 255);
  margin-right: 15px;
  padding-top: 5px;
  font-size: 20px;
  cursor: pointer;
}
.el-icon-share:hover {
  color: rgb(102, 177, 255);
}
.last_footer {
  display: flex;
  justify-content: space-between;
  margin: 10px 10px 200px 10px;
}
.last_footer img {
  padding-top: 3px;
  height: 24px;
  width: 24px;
  cursor: pointer;
}
.el-textarea__inner {
  height: 120px;
  overflow-y: scroll;
  border: 1px solid #ccc;
  outline: none;
}
.el-divider--horizontal {
  margin: 5px 0 24px 0;
}
.info {
  position: relative;
  display: flex;
}
.headerCom {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.headerCom img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  vertical-align: middle;
  padding-right: 5px;
}
.headerCom span {
  text-align: center;
  display: block;
  height: 35px;
  line-height: 35px;
  font-size: 10px;
}
.top_nav {
  margin: 30px auto;
  width: 70%;
  background-color: rgb(251, 251, 251);
  padding: 20px 0 4px 40px;
  box-sizing: border-box;
}
.tags span {
  font-size: 12px;
  color: #778a95;
  padding: 10px 0 10px 0;
  box-sizing: border-box;
  margin-right: 15px;
}
.footer {
  margin: 30px auto;
  width: 70%;
  box-sizing: border-box;
  padding: 20px 0 4px 40px;
  background-color: rgba(251, 251, 251, 0.5);
}
.ss {
  height: 120px !important;
  box-sizing: border-box;
  padding: 5px 10px;
  border-radius: 8px;
  background: rgb(241, 241, 241);
  margin-bottom: 30px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.ss >>> p {
  height: 120px;
  overflow-y: scroll;
}
</style>