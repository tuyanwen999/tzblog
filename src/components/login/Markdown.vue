<template>
  <div id="blog">
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
    <div
      v-if="$store.state.statusFlag == 0"
      style="display: inline-block; width: 80%"
    >
      <el-input
        style="margin: 20px;width: 100% !important;"
        v-model="input"
        placeholder="请输入文章标题"
        id="handinput"
      ></el-input>
    </div>
    <el-button
      type="primary"
      round
      @click="open"
      v-if="$store.state.statusFlag == 0"
      style="margin-left: 50px"
      >发布文章</el-button
    >

    <mavon-editor
      ref="md"
      style="min-height: 700px; z-index: 2"
      v-model="context"
      :toolbars="toolbars"
      :imageFilter="uploadBefore"
      @imgAdd="imgAdd"
      id="edit"
    ></mavon-editor>
    <p style="text-align: center; padding: 20px">
      <el-button
        type="primary"
        round
        @click="changeBlog"
        v-if="$store.state.statusFlag == 1"
        >点击修改</el-button
      >
    </p>

    <!-- 遮罩层 -->
    <div id="mask"></div>

    <!-- 弹窗 -->
    <div id="popOut">
      <div class="com_info">
        <div class="top_info">
          <span class="push">发布文章</span>
          <el-button type="primary" round size="mini" @click="saveDoc"
            >发布文章</el-button
          >
        </div>
        <div class="category">
          <span class="left_cate">个人分类：</span>
          <el-checkbox-group v-model="checkList" class="right_list">
            <el-checkbox label="node.js"></el-checkbox>
            <el-checkbox label="javascript"></el-checkbox>
            <el-checkbox label="react"></el-checkbox>
            <el-checkbox label="vue"></el-checkbox>
            <el-checkbox label="express"></el-checkbox>
            <el-checkbox label="egg.js"></el-checkbox>
            <el-checkbox label="golang"></el-checkbox>
            <el-checkbox label="java"></el-checkbox>
            <el-checkbox label="typescript"></el-checkbox>
            <el-checkbox label="mongoDB"></el-checkbox>
            <el-checkbox label="mysql"></el-checkbox>
            <el-checkbox label="nginx"></el-checkbox>
            <el-checkbox label="linux"></el-checkbox>
            <el-checkbox label="微信小程序"></el-checkbox>
            <el-checkbox label="生活"></el-checkbox>
            <el-checkbox label="其它"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="tag">
          <span class="tag_span">标签：</span>
          <div>
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ New Tag</el-button
            >
          </div>
        </div>
        <div class="eassy_type">
          <span style="margin-left: 26px; margin-right: 70px">文章类型：</span>
          <div class="radio_type">
            <el-radio-group v-model="radio">
              <el-radio :label="1">skill</el-radio>
              <el-radio :label="2">life</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="btn">
          <el-button
            round
            icon="el-icon-circle-close"
            @click="btnClick"
          ></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { api_03,api_04 } from "../../api";
export default {
  mounted() {},
  data() {
    return {
      imagesurl:[],
      isSave:false,
      context: " ", //输入的数据
      input: "", //绑定文章标题
      detail: [],
      checkList: [], //复选框
      dynamicTags: [],
      inputVisible: false,
      inputValue: "", //标签输入的值
      radio: 1,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        mark: true, // 标记
        superscript: true, // 上角标
        quote: true, // 引用
        ol: true, // 有序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        help: true, // 帮助
        code: true, // code
        subfield: true, // 是否需要分栏
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        /* 1.3.5 */
        undo: true, // 上一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
      },
    };
  },
  methods: {
    open() {
      popOut.style.display = "block";
      mask.style.display = "block";
    },
    async saveDoc() {
      this.isSave = true
      if(!this.input.trim()){
        this.$message.error("需要输入标题呦~")
        return
      }else if(this.checkList.length == 0||this.dynamicTags==0){
        this.$message.error("需要输入标签呦~")
        return
      }else if(!this.context.trim()){
        this.$message.error("需要输入内容呦~")
        return
      }
      this.dynamicTags = this.dynamicTags.filter((i) => i.trim());
      console.log(this.dynamicTags, "dy");
      if(this.dynamicTags.length>2 || this.checkList.length>2){
        this.$message.error("最多只能上传两个标签和两个分类呦！")
        return
      }
      
      const vm = this.$store;
      vm.commit("updateLoading", true);
      const { data: res } = await axios({
        method: "post",
        url: api_04 + "uploadblog",
        data: {
          username: this.$store.state.username,
          token: sessionStorage.getItem("token"),
          blogname: this.input,
          blogauthor: this.$store.state.username,
          blogdetail: this.context,
          blogclassify: this.checkList,
          bloglabel: this.dynamicTags,
          status: this.radio,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

      console.log("================");
      console.log(res);
      console.log("================");
      if (res.statuscode !== 200) {
         if(res.statuscode == 212){
          this.$message.error(res.message);
           sessionStorage.clear();
           vm.commit("updateLoading", false);
          this.$store.commit("updateShow_no");
          this.$router.push("/login");
          return
        }else{
          vm.commit("updateLoading", false);
        popOut.style.display = "none";
        mask.style.display = "none";
        this.$router.push("/Login");
        return this.$message.error(res.message);
        }
        
      }
      vm.commit("updateLoading", false);
      this.$message.success("文章发布成功！");
      this.$router.push("/Login");
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    uploadBefore(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //图片转换
    imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("username",this.$store.state.username)
      formdata.append("image", $file);
      let api = "http://121.43.177.199:9006/uploadimg";
      axios
        .post(api, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          let resData = res.data;
          if (resData.statuscode == 200) {
            console.log(resData.imageurl);
            this.imagesurl.push(res.data.imageurl)
            console.log("1111",this.imagesurl)
            this.$message({
              message: "上传成功",
              type: "success",
            });
            this.$refs.md.$img2Url(pos, res.data.imageurl);
          } else if (resData.statuscode == 202) {
            this.$message({
              message: "上传图片请小于2M",
              type: "warning",
            });
          } else if (resData.statuscode == 205) {
            this.$message({
              message: "只允许上传jpg图片",
              type: "warning",
            });
          } else {
            this.$message({
              message: "上传图片出错",
              type: "warning",
            });
          }
        });
    },
    // 删除图片
    async deleteImg(){
      const {data:res} = await axios({
          method: "post",
          url: api_03 + "deluserimg",
          data: {
            imagesurl:this.imagesurl
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        });
        console.log(res)
        console.log("删除照片！！")
    }
  ,
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    btnClick() {
      popOut.style.display = "none";
      mask.style.display = "none";
    },
    // 修改博客
    async changeBlog() {
      var vm = this.$store;
      vm.commit("updateLoading", true);
      const { data: res } = await axios({
        method: "post",
        url: api_04 + "modblogdetail",
        data: {
          username: this.$store.state.username,
          token: sessionStorage.getItem("token"),
          blogid: parseInt(this.$route.params.id),
          blogdetail: this.context,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

      console.log(res, "changeblog");
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
      this.$message.success("博客修改成功！");
      this.$store.commit("statusFlagChange", 0);
      this.$router.go(-1);
      vm.commit("updateLoading", false);
    },

    enterBlog() {
      const ss = this.$route.params;
      if (this.$store.state.statusFlag == 1) {
        this.context = ss.detailContent;
        console.log("ppppppp");
        console.log(this.context);
      }
    },
  },
  computed: {
  },
  destroyed() {
    if(!this.isSave){
      this.deleteImg()
    }
  },
  created() {
    this.enterBlog();
  },
  mounted() {
    popOut.style.display = "none";
  },
};
</script>

<style>
#popOut {
  padding: 10px;
  position: fixed;
  margin: auto;
  background-color: #fff;
  width: 450px;
  max-height: 500px;
  border-radius: 20px;
  box-shadow: 5px 5px 5px #888888;
  top: 20%;
  left: 35%;
  z-index: 100;
}
.top_info,
.category {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
}
.top_info span.push {
  font-size: 16px;
  font-weight: 800;
}
.category {
  height: 180px;
  margin: auto;
  margin-top: 20px;
  width: 400px;
  overflow-y: scroll;
}
.left_cate {
  flex: 1;
}
.right_list {
  flex: 2;
}
.tag {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 15px;
  height: 100px;
  margin-right: 25px;
  overflow-y: scroll;
}
.eassy_type {
  display: flex;
  align-items: center;
  margin-bottom: 17px;
}
.btn {
  position: absolute;
  text-align: center;
  bottom: -18px;
  left: 45%;
}
.tag_span {
  width: 60px;
  margin-left: 53px;
  margin-right: 54px;
}
.right_list .el-checkbox {
  margin: 10px;
  padding-right: 5px;
}
#mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(127, 127, 127, 0.5);
  z-index: 30;
  display: none;
}
.el_input {
  width: 100% !important;
}
.el-input__inner {
  width: 100% !important;
}
</style>