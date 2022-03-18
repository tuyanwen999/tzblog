<template>
  <div id="box">
    <el-card class="box_card">
      <div class="intro">
        <div class="intro" v-if="isShow">
          <el-row>
            <el-col :offset="1"
              ><h3>用户名：{{ registerRuleForm.username }}</h3></el-col
            >
          </el-row>
          <el-row>
            <el-col :offset="1"
              ><h3>昵称：{{ registerRuleForm.nickname }}</h3></el-col
            >
          </el-row>
          <el-row>
            <el-col :offset="1"
              ><h3>邮箱：{{ registerRuleForm.useremail }}</h3></el-col
            >
          </el-row>
          <el-row>
            <el-col :offset="1"
              ><h3>姓名：{{ registerRuleForm.usercompellation }}</h3></el-col
            >
          </el-row>
          <el-row>
            <el-col :offset="1"
              ><h3>性别：{{ registerRuleForm.usergender }}</h3></el-col
            >
          </el-row>
          <el-row>
            <el-col :offset="1"
              ><h3>生日：{{ registerRuleForm.userbirthday }}</h3></el-col
            >
          </el-row>
          <el-row>
            <el-col :offset="1"
              ><h3>座右铭：{{ registerRuleForm.usermotto }}</h3></el-col
            >
          </el-row>
          <el-row>
            <el-col :offset="1"
              ><h3>注册时间：{{ registerRuleForm.registertime }}</h3></el-col
            >
          </el-row>
        </div>
        <div class="intro" v-if="!isShow">
          <el-form
            :model="registerRuleForm"
            :rules="rules"
            ref="ruleFormRef"
            label-width="100px"
          >
            <el-form-item label="用户名：" prop="username">
              <el-input disabled v-model="registerRuleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="昵称：" prop="nickname">
              <el-input disabled v-model="registerRuleForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="useremail">
              <el-input
                disabled
                v-model="registerRuleForm.useremail"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="usercompellation">
              <el-input v-model="registerRuleForm.usercompellation"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="usergender">
              <el-radio-group v-model="registerRuleForm.usergender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="生日：" prop="userbirthday">
              <el-input v-model="registerRuleForm.userbirthday"></el-input>
            </el-form-item>
            <el-form-item label="座右铭：" prop="usermotto">
              <el-input
                type="textarea"
                v-model="registerRuleForm.usermotto"
              ></el-input>
            </el-form-item>
            <el-form-item label="注册时间：" prop="registertime">
              <el-input
                disabled
                v-model="registerRuleForm.registertime"
              ></el-input>
            </el-form-item>
            <el-row>
              <el-col :offset="12">
                <el-button type="primary" @click="changeBtn"
                  >点击保存</el-button
                >
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>

      <div class="right_wrap">
        <div class="right_wrap" v-if="isShow">
          <el-row>
            <el-avatar :size="100" :src="imageUrl"></el-avatar>
          </el-row>
        </div>

        <div class="right_wrap" v-else>
          <el-row>
            <el-col>
              <el-avatar :size="100" :src="imageUrl"></el-avatar>
            </el-col>
          </el-row>
          <el-row>
            <el-col :offset="2">
              <el-upload
                style="padding: 10px 0"
                action=""
                :http-request="uploadImage"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-col>
          </el-row>
        </div>
        <div></div>
      </div>

      <div class="right_wrap02">
        <el-row>
          <el-col>
            <h3 @click="changeState">{{ text }}</h3>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import { api_01,api_03 } from "../../api";
export default {
  data() {
    // 定义邮箱的校验规则
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/;
      if (regEmail.test(value)) {
        this.disabled = false;
        return cb();
      } else {
        this.disabled = true;
        cb(new Error("请输入合法的邮箱！"));
      }
    };
    return {
      registerRuleForm: {},
      modRuleForm: {},
      imageUrl:
        "http://121.43.177.199:8087/2021-10-23/9796a1ff-ac59-4c4b-b71f-3f93ffe7ddb2.jpg",
      isShow: true,
      text: "点击修改",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 12,
            message: "长度在 2 到 12 个字符",
            trigger: "blur",
          },
        ],
        useremail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        usercompellation: [
          { required: true, message: "请输入名字", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 自动获取当前用户数据
    async login_Init() {
      var vm = this.$store;
      vm.commit("updateLoading", true);
      const { data: res } = await axios({
        method: "post",
        url: api_01 + "readuserinf",
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
        if (res.statuscode == 212) {
              sessionStorage.clear();
              this.$store.commit("updateShow_no");
              this.$router.push("/login");
              return
        }else {
              this.$message.error(res.message);
              return;
            }
      }
      vm.commit("updateLoading", false);
      vm.commit("updateNewForm", this.registerRuleForm);
      this.registerRuleForm = res.usermessage;
      console.log(this.registerRuleForm, "reg");
      if (!this.registerRuleForm.userimage) return;
      this.imageUrl = this.registerRuleForm.userimage;
    },

    //点击修改
    changeState() {
      this.isShow = !this.isShow;
      this.isShow === true ? (this.text = "点击修改") : (this.text = "取消");
      if(this.isShow){
        console.log("2333333")
        this.deleteImg()
      }
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },

    beforeAvatarUpload(file) {
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

    // 点击按钮保存信息
    changeBtn() {
      this.$refs.ruleFormRef.validate(async (valid) => {
        if (!valid) return;
        var vm = this.$store;
        vm.commit("updateLoading", true);
        const { data: res } = await axios({
          method: "post",
          url: api_01 + "moduserinf",
          data: {
            username: this.registerRuleForm.username,
            token: sessionStorage.getItem("token"),
            userimage: this.imageUrl,
            usercompellation: this.registerRuleForm.usercompellation,
            usergender: this.registerRuleForm.usergender,
            userbirthday: this.registerRuleForm.userbirthday,
            usermotto: this.registerRuleForm.usermotto,
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
          this.$message.error(res.message);
          vm.commit("updateLoading", false);
          return
        }
        }
        vm.commit("updateLoading", false);
        this.$store.commit("imgChange", this.imageUrl);
        this.$message.success("修改成功！");
        this.$router.push("/login");
      });
    },

    //图片转换
    uploadImage(file) {
      if(!this.$store.state.flag)return this.$message.error("一天只能上传一次呦~")
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("username",this.$store.state.username)
      formdata.append("image", file.file);
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
            this.imageUrl = resData.imageurl;
            console.log(this.imageUrl);
            this.$store.commit("updateFlag",false)
            
            this.$message({
              message: "上传成功",
              type: "success",
            });
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
    async deleteImg(){
      const {data:res} = await axios({
          method: "post",
          url: api_03 + "deluserimg",
          data: {
            imagesurl:[this.imageUrl]
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        });
        console.log(res)
        console.log("删除照片！！")
    }
  },
  mounted() {
    this.login_Init();
  },
};
</script>

<style>
.el-card {
  background-color: rgba(255, 255, 255, 0.9);
}
.el-input {
  width: 50% !important;
}
.el-card__body {
  display: flex;
}
.intro {
  flex: 3;
}
.intro .el-row {
  padding: 15px;
  height: 70px;
  line-height: 70px;
}
.right_wrap {
  flex: 1;
}
.right_wrap02 {
  flex: 0.5;
  color: rgb(78, 167, 231);
}
.right_wrap02 h3 {
  cursor: pointer;
}
.right_wrap02 h3:hover {
  color: red;
}
</style>