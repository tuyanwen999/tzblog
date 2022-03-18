<template>
  <div class="blogSafe">
    <div class="passChange">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="原密码" prop="fontpass">
          <el-input
            type="password"
            v-model="ruleForm.fontpass"
            autocomplete="off"
            label-width="30px"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            label-width="30px"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="emailChange">
      <el-form
        :model="emailRuleForm"
        status-icon
        :rules="emailRules"
        ref="emailRuleForm"
        label-width="100px"
      >
        <el-form-item label="原邮箱" prop="fontemail">
          <el-input
            type="text"
            v-model="emailRuleForm.fontemail"
            autocomplete="off"
            label-width="30px"
          ></el-input>
        </el-form-item>
        <el-form-item label="新邮箱" prop="nowemail">
          <el-input
            type="text"
            v-model="emailRuleForm.nowemail"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="submitEmailForm">提交</el-button>
          <el-button @click="resetEmailForm('emailRuleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="withdraw">
      <el-button
        type="danger"
        @click="dialogVisible = true"
        style="margin-left: 100px"
        >注销</el-button
      >
    </div>

    <!-- 注销显示对话框 -->
    <el-dialog
      title="注销"
      :visible.sync="dialogVisible"
      width="45%"
      @close="dialogClosed"
    >
      <el-form
        :model="withdrawForm"
        :rules="withdrawFormRules"
        ref="withdrawFormRef"
        label-width="100px"
      >
        <el-row :gutter="30">
          <el-col :span="15">
            <div class="grid-content bg-purple-light">
              <el-form-item label="邮箱" prop="useremail">
                <el-input v-model="withdrawForm.useremail"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple-light">
              <el-button type="primary" v-if="!btnBool">
                {{ yzmtext }}
              </el-button>
              <el-button
                type="primary"
                v-if="btnBool"
                @click="proved"
                :disabled="disabled"
                :loading="isloading"
              >
                {{ yzmtext }}
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="15">
            <div class="grid-content bg-purple-light">
              <el-form-item label="验证码" prop="verificationcode">
                <el-input v-model="withdrawForm.verificationcode"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item label="注销理由" label-width="100px" prop="case">
          <el-input v-model="withdrawForm.case" autocomplete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="5" :offset="8">
            <div class="grid-content bg-purple-light">
              <el-button type="warning" @click="withdrawBtn"
                >申请注销</el-button
              >
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { api_02, api_03 } from "../../api";
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

    var validatePass = (rule, value, callback) => {
      const regPass = /^[\w+,.?<>{}!@#%&*;':"$^()|\[\]\\\-\/]{6,18}$/;
      if (!regPass.test(value)) {
        this.disabled = true;
        callback(new Error("请输入合法的密码！"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 密码表单
      ruleForm: {
        pass: "",
        checkPass: "",
        fontpass: "",
      },
      //   密码校验规则
      rules: {
        fontpass: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        pass: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      //   邮箱
      emailRuleForm: {
        fontemail: "",
        nowemail: "",
      },
      //   邮箱校验规则
      emailRules: {
        fontemail: [
          { required: true, message: "请输入原邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        nowemail: [
          { required: true, message: "请输入新邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
      },
      dialogVisible: false, //对话框状态
      loading: false,
      yzmtext: "获取验证码",
      btnBool: "false",
      isloading: false,
      disabled: false,
      //   注销表单
      withdrawForm: {
        useremail: "",
        case: "",
        verificationcode: "",
      },
      //   注销表单验证规则
      withdrawFormRules: {
        useremail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        case: [
          { required: true, message: "请输入注销原因", trigger: "blur" },
          {
            min: 3,
            max: 30,
            message: "长度在 3 到 30 个字符",
            trigger: "blur",
          },
        ],
        verificationcode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //验证码倒计时
    identifyingCode() {
      this.btnBool = true;
      let i = 60; //倒计时时间
      let timer = setInterval(() => {
        this.disabled = true;
        this.isloading = true;
        this.yzmtext = i + "s内有效";
        i--;
        if (i < 0) {
          this.btnBool = false;
          this.yzmtext = "获取验证码";
          clearInterval(timer);
          this.disabled = true;
          this.isloading = false;
        }
      }, 1000);
    },
    // 获取验证码
    async proved() {
      //   this.loading = true;
      if (!this.withdrawForm.useremail) {
        this.$message.error("内容不能为空呦！");
        return;
      }

      try {
        this.identifyingCode();
        const { data: res } = await axios({
          method: "post",
          url: api_02 + "sendpwdemailcode",
          data: {
            username: this.$store.state.username,
            email: this.withdrawForm.useremail,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        });
        console.log(res);
        if (res.statuscode !== 200) {
          return this.$message.error(res.message);
        } else {
          this.$message.success("信息验证成功！");
        }
      } catch (error) {
        this.$message.error("出错啦！");
      }
    },
    //注销
    withdrawBtn() {
      var vm = this.$store;
      this.$refs.withdrawFormRef.validate(async (vaild) => {
        if (!vaild) return;
        vm.commit("updateLoading", true);
        const { data: res } = await axios({
          method: "post",
          url: api_03 + "userlogout",
          data: {
            username: this.$store.state.username,
            useremail: this.withdrawForm.useremail,
            token: sessionStorage.getItem("token"),
            code: this.withdrawForm.verificationcode,
            applymessage: this.withdrawForm.case,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        });

        console.log(res, "codecdoe");
        if (res.statuscode !== 200) {
          if (res.statuscode == 211) {
            sessionStorage.clear();
            this.$store.commit("updateShow_no");
            this.$router.push("/login");
            vm.commit("updateLoading", false);
            return;
          } else {
            vm.commit("updateLoading", false);
            this.$message.error(res.message);
            return;
          }
        }

        this.$message.success("申请发送成功！");
        this.dialogVisible = false;
        this.logout();
        vm.commit("updateLoading", false);
      });
    },
    // 退出登录
    async logout() {
      const { data: res } = await axios({
        method: "post",
        url: api_03 + "frontoutlogin",
        data: {
          username: this.$store.state.newForm.username,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

      console.log(res, "退出登录！");
      if (res.statuscode !== 200) {
        if (res.statuscode == 211) {
          sessionStorage.clear();
          this.$store.commit("updateShow_no");
          this.$router.push("/login");
          return;
        } else {
          this.$message.error(res.message);
          return;
        }
      }
      this.$message.success(res.message);
      sessionStorage.clear();
      this.$store.commit("updateShow_no");
      if (this.$route.path == "/mydescript") {
        this.$router.go(0);
        return;
      } else {
        this.$router.push("/login");
      }
    },
    //   对话框关闭触发事件
    dialogClosed() {
      this.$refs.withdrawFormRef.resetFields();
    },
    //   修改密码
    submitForm() {
      var vm = this.$store;
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return;
        vm.commit("updateLoading", true);
        const { data: res } = await axios({
          method: "post",
          url: api_03 + "frontmodpassword",
          data: {
            username: this.$store.state.username,
            password: this.ruleForm.pass,
            newpassword: this.ruleForm.checkPass,
            token: sessionStorage.getItem("token"),
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        });
        console.log(res, "mimimimi");
        if (res.statuscode !== 200) {
          if (res.statuscode == 211) {
            sessionStorage.clear();
            this.$store.commit("updateShow_no");
            this.$router.push("/login");
            return;
          } else {
            this.$message.error(res.message);
            this.$refs.ruleForm.resetFields();
            vm.commit("updateLoading", false);
            return;
          }
        }
        this.$message.success("密码修改成功！");
        this.$refs.ruleForm.resetFields();
        vm.commit("updateLoading", false);
      });
    },
    // 修改邮箱
    submitEmailForm() {
      var vm = this.$store;
      this.$refs.emailRuleForm.validate(async (valid) => {
        if (!valid) return;
        vm.commit("updateLoading", true);
        const { data: res } = await axios({
          method: "post",
          url: api_03 + "usermodemail",
          data: {
            username: this.$store.state.username,
            newuseremail: this.emailRuleForm.nowemail,
            token: sessionStorage.getItem("token"),
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        });

        console.log(res, "ememem");
        if (res.statuscode !== 200) {
          if (res.statuscode == 211) {
            sessionStorage.clear();
            this.$store.commit("updateShow_no");
            this.$router.push("/login");
            return;
          } else {
            this.$message.error(res.message);
            this.$refs.ruleForm.resetFields();
            vm.commit("updateLoading", false);
            return;
          }
        }
        this.$message.success("邮箱修改成功！");
        this.$refs.emailRuleForm.resetFields();
        vm.commit("updateLoading", false);
      });
    },
    // 密码表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 邮箱表单重置
    resetEmailForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.blogSafe .el-input {
  width: 100% !important;
}
.blogSafe {
  min-height: 700px;
  background-color: rgba(255, 255, 255, 0.9);
}
.passChange,
.emailChange {
  width: 70%;
  margin: 0px auto;
  padding-top: 50px;
}
.withdraw {
  width: 100%;
  margin: 100px auto;
  text-align: center;
}
</style>