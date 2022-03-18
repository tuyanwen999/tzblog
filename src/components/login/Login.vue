<template>
  <div class="container login">
    <ul class="layui-nav layui-bg-green right_01 clearfix lay-filter=''">
      <div class="search_blog">
        <el-input
          placeholder="请输入您要搜索的博客信息"
          prefix-icon="el-icon-search"
          v-model="blogText"
          @input="searchBlog"
          clearable
        >
        </el-input>
        <div class="blogContainer" v-show="blogText">
          <el-empty :image-size="100" v-show="!searchBlogArr.length"></el-empty>
          <div v-for="(item, index) in searchBlogArr" :key="index">
            <p style="color: black; font-size: 12px; margin-bottom: 10px">
              <a
                style="color: red"
                @click="detail_enter(item.blogid, index, item.status)"
                >{{ item.blogname }}
              </a>
              ---{{ item.blogauthor }}
            </p>
          </div>
        </div>
      </div>
      <li class="layui-nav-item" v-if="!$store.state.isShow">
        <a href="#" @click="logout">退出</a>
      </li>
      <li class="layui-nav-item">
        <router-link to="Author">关于作者</router-link>
      </li>
      <li class="layui-nav-item">
        <router-link to="Happy">娱乐中心</router-link>
      </li>
      <li
        class="layui-nav-item"
        @click="myselfIf"
        style="margin: 0 10px 0; cursor: pointer"
      >
        <el-badge
          value="new"
          :hidden="$store.state.noSeeMessage == 0 ? true : false"
        >
          <el-button type="text" size="small" class="perCenter"
            >个人中心</el-button
          >
        </el-badge>
      </li>
      <li class="layui-nav-item">
        <span
          v-if="$store.state.isShow"
          @click="loginDialogVisible = true"
          style="cursor: pointer"
          ><img
            src="../../assets/imgs/noodle.gif"
            class="layui-nav-img"
          />登录/注册</span
        >
        <span v-else style="padding: 0 15px"
          ><img v-lazy="$store.state.defaultImg" alt="" class="defaultImg" />
          {{ $store.state.username }}</span
        >
      </li>
      <li class="layui-nav-item">
        <router-link to="/">首页</router-link>
      </li>
    </ul>
    <div>
      <vue-element-loading
        :active="this.$store.state.vueElementLoading"
        spinner="bar-fade-scale"
        color="#FF6700"
        :is-full-screen="false"
      ></vue-element-loading>
      <router-view></router-view>
    </div>

    <!-- 点击按钮，显示登录预览对话框 -->
    <el-dialog
      title="登录"
      :visible.sync="loginDialogVisible"
      width="50%"
      @close="loginDialogClosed"
    >
      <el-form
        :model="loginRuleForm"
        status-icon
        :rules="loginRuleFormRules"
        ref="loginRuleFormRef"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="usernameemail">
          <el-input v-model="loginRuleForm.usernameemail"></el-input>
        </el-form-item>
        <el-form-item label="密码" type="password" prop="password">
          <el-input
            v-model="loginRuleForm.password"
            type="password"
            @keyup.enter.native="loginUser()"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple-light">
              <el-button type="primary" plain @click="forgetPassword"
                >忘记密码？</el-button
              >
            </div>
          </el-col>
          <el-col :span="21">
            <div class="grid-content bg-purple-light">
              <el-button type="warning" @click="register"
                >我 要 注 册</el-button
              >
              <el-button @click="loginDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="loginUser">确 定</el-button>
            </div>
          </el-col>
        </el-row>
      </span>
    </el-dialog>

    <!-- 点击按钮，显示注册预览对话框 -->
    <el-dialog
      title="注册"
      :visible.sync="registerDialogVisible"
      width="50%"
      @close="registerDialogClosed"
    >
      <el-form
        :model="registerRuleForm"
        status-icon
        :rules="registerRuleFormRules"
        ref="registerRuleFormRef"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerRuleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="registerRuleForm.nickname"></el-input>
        </el-form-item>
        <el-form-item type="password" label="密码" prop="password">
          <el-input
            v-model="registerRuleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="registerRuleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-row :gutter="40">
          <el-col :span="14">
            <div class="grid-content bg-purple-light">
              <el-form-item label="邮箱" prop="useremail">
                <el-input v-model="registerRuleForm.useremail"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple-light">
              <el-button type="primary" v-if="!btnBool">
                {{ yzmtext }}
              </el-button>
              <el-button
                type="primary"
                v-if="btnBool"
                @click="identifyingCode_02(1, registerRuleForm.useremail)"
                :disabled="disabled"
                :loading="isloading"
              >
                {{ yzmtext }}
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="验证码" prop="emailcode">
                <el-input v-model="registerRuleForm.emailcode"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="tabLogin">我 要 登 录</el-button>
        <el-button @click="registerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="registerUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 点击按钮，显示忘记密码框 -->
    <el-dialog
      title="找回密码"
      :visible.sync="editPasswordDialogVisible"
      width="40%"
      @close="editPasswordDialogClosed"
    >
      <!-- 步骤条 -->
      <el-steps :active="activeIndex - 0" finish-status="success">
        <el-step title="邮箱验证"></el-step>
        <el-step title="更改密码"></el-step>
      </el-steps>
      <el-form
        :model="editPasswordRuleForm"
        :rules="editPasswordRules"
        ref="editPasswordRuleFormRef"
        label-width="100px"
        style="margin-top: 25px"
      >
        <el-tabs
          tab-position="left"
          style="height: 200px"
          v-model="activeIndex"
          :before-leave="beforeTabLeave"
          v-loading="loading"
          element-loading-text="玩命加载中"
          element-loading-spinner="el-icon-loading"
        >
          <el-tab-pane label="邮箱验证" name="0">
            <el-row :gutter="30">
              <el-col :span="15">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editPasswordRuleForm.email"></el-input>
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
                    @click="identifyingCode(2, editPasswordRuleForm.email)"
                    :disabled="disabled"
                    :loading="isloading"
                  >
                    {{ yzmtext }}
                  </el-button>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="20">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="验证码" prop="verificationcode">
                    <el-input
                      v-model="editPasswordRuleForm.verificationcode"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5" :offset="8">
                <div class="grid-content bg-purple-light">
                  <el-button type="primary" @click="proved()"
                    >开始验证</el-button
                  >
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="更改密码" name="1">
            <el-form
              :model="forgetRuleForm"
              status-icon
              :rules="forgetRuleFormRules"
              ref="forgetRuleFormRef"
              label-width="100px"
            >
              <el-form-item type="password" label="密码" prop="password">
                <el-input
                  v-model="forgetRuleForm.password"
                  autocomplete="off"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  v-model="forgetRuleForm.checkPass"
                  autocomplete="off"
                  type="password"
                ></el-input>
              </el-form-item>
            </el-form>
            <el-row>
              <el-col :span="5" :offset="8">
                <div class="grid-content bg-purple-light">
                  <el-button type="primary" @click="modificate()"
                    >确认修改</el-button
                  >
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { api_02, api_03, api_04 } from "../../api";
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
        if (this.registerRuleForm.checkPass !== "") {
          this.$refs.registerRuleFormRef.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerRuleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.forgetRuleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      blogText: "", //搜索博客内容
      searchBlogArr: [], //存储相关博客信息
      yzmtext: "获取验证码",
      btnBool: "false",
      isloading: false,
      // 监听对话框状态
      loginDialogVisible: false,
      registerDialogVisible: false,
      editPasswordDialogVisible: false,
      activeIndex: "0",
      disabled: false,
      flag: 0, // 监听标签页的切换
      loading: false,
      dataForm: {},
      // 添加分类的表单数据对象
      loginRuleForm: {
        usernameemail: "",
        password: "",
      },
      imgAward: "", //头像
      registerRuleForm: {
        username: "",
        useremail: "",
        nickname: "",
        password: "",
        checkPass: "",
        emailcode: "",
      },
      editPasswordRuleForm: {
        email: "",
        verificationcode: "",
      },
      forgetRuleForm: {
        password: "",
        checkPass: "",
      },
      // 添加分类表单的验证规则
      loginRuleFormRules: {
        usernameemail: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 18,
            message: "长度在 3 到 18 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      registerRuleFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 18,
            message: "长度在 3 到 18 个字符",
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
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        emailcode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
      editPasswordRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        verificationcode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
      forgetRuleFormRules: {
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        checkPass: [{ validator: validatePass3, trigger: "blur" }],
      },
    };
  },

  methods: {
    // 博客搜索
    async searchBlog() {
      if (!this.blogText) {
        this.searchBlogArr = [];
        return;
      } else if (!sessionStorage.getItem("token")) {
        return this.$message.error("请先登录再进行操作呦！");
      } else {
        if (this.$route.path == "/blogdetail") {
          this.$router.go(-1);
        }
        const { data: res } = await axios({
          method: "post",
          url: api_04 + "viewblogname",
          data: {
            username: this.$store.state.username,
            token: sessionStorage.getItem("token"),
            blogname: this.blogText,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        });
        if (res.statuscode !== 200) {
          if (res.statuscode == 211) {
            sessionStorage.clear();
            this.$store.commit("updateShow_no");
            if (this.$route.path == "/mydescript") {
              this.$router.go(0);
              return;
            } else {
              this.$router.push("/login");
              return;
            }
          } else {
            return;
          }
        }
        this.searchBlogArr = res.arrary;
      }
    },
    // 点入博客
    detail_enter(blogid, index, status) {
      if (!sessionStorage.getItem("token"))
        return this.$message.error("亲~，请先登录哦！");
      this.$router.push({
        name: "Blogdetail",
        query: {
          id: blogid,
          index: index,
          type: status,
          flag: 1,
        },
      });
      this.blogText = "";
    },
    createLoves() {
      this.$refs.background.createLoves(event);
    },
    // 判断是否登录
    myselfIf() {
      if (!sessionStorage.getItem("token"))
        return this.$message.error("请先登录或注册哦！");

      if (this.$route.path == "/countcharge") {
        return;
      } else {
        this.$router.push("/myinfo");
      }
    },
    //请求获取验证码******
    //验证码倒计时
    identifyingCode(index, email) {
      this.editPasswordSkill(index, email).then((val) => {
        // console.log(val)
        if (!val) return;
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
      });
    },
    identifyingCode_02(index, email) {
      this.editPasswordSkill(index, email);
      if (!email) return;
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
    // 登录
    loginUser() {
      var vm = this.$store;
      let session = sessionStorage.getItem("token");
      if (session) {
        axios({
          method: "post",
          url: api_03 + "withoutcodelogin",
          data: {
            username: this.loginRuleForm.usernameemail,
            token: sessionStorage.getItem("token"),
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }).then(({ data: res }) => {
          vm.dispatch("updateNewForm", res.user);
          if (res.statuscode !== 200) {
            if (res.statuscode == 211) {
              sessionStorage.clear();
              this.$store.commit("updateShow_no");
              if (this.$route.path == "/mydescript") {
                this.$router.go(0);
                return;
              } else {
                this.$router.push("/login");
                return;
              }
            } else {
              this.$message.error(res.message);
              return;
            }
          }
          this.getUnRead();
          if (!res.user.img) {
            this.imgAward = this.$store.state.dedfaultImg;
          } else {
            this.imgAward = res.user.img;
            vm.commit("imgChange", res.user.img);
          }

          vm.commit("updateShow_yes", res.user.username);
        });
      } else {
        this.$refs.loginRuleFormRef.validate(async (valid) => {
          if (!valid) return;
          vm.commit("updateLoading", false);
          const { data: res } = await axios({
            method: "post",
            url: api_03 + "userlogin",
            data: {
              usernameemail: this.loginRuleForm.usernameemail,
              password: this.loginRuleForm.password,
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json",
            },
          });
          vm.commit("updateShow_yes", res.arrary.username);
          vm.dispatch("updateNewForm", res.arrary);
          if (res.statuscode !== 200) {
            vm.commit("updateLoading", false);
            return this.$message.error(res.message);
          }
          sessionStorage.setItem(
            "userinfousernameemail",
            window.btoa(
              unescape(encodeURIComponent(this.loginRuleForm.usernameemail))
            )
          );
          sessionStorage.setItem("token", res.arrary.token);
          console.log("0000ddd");
          this.getUnRead();
          vm.commit("updateLoading", false);
          this.$message.success("登录成功！");
          if (!res.arrary.img) {
            this.imgAward = this.$store.state.dedfaultImg;
          } else {
            this.imgAward = res.arrary.img;
            vm.commit("imgChange", res.arrary.img);
          }
          this.$router.go(0);
          this.loginDialogVisible = false;
        });
      }
    },
    loginDialogClosed() {
      this.$refs.loginRuleFormRef.resetFields();
    },
    registerDialogClosed() {
      this.$refs.registerRuleFormRef.resetFields();
    },
    editPasswordDialogClosed() {
      this.$refs.editPasswordRuleFormRef.resetFields();
    },
    // 退出登录
    async logout() {
      const { data: res } = await axios({
        method: "post",
        url: api_03 + "frontoutlogin",
        data: {
          username: this.$store.state.username,
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
          if (this.$route.path == "/mydescript") {
            this.$router.go(0);
            return;
          } else {
            this.$router.push("/login");
          }
        } else {
          this.$message.error(res.message);
          return;
        }
      }
      this.$message.success(res.message);
      sessionStorage.clear();
      this.$store.commit("updateShow_no");
      if (this.$route.path == "/mydescript") {
        return;
      } else {
        this.$router.push("/login");
      }
    },
    register() {
      this.loginDialogVisible = false;
      this.registerDialogVisible = true;
    },
    tabLogin() {
      this.loginDialogVisible = true;
      this.registerDialogVisible = false;
    },
    // 注册
    registerUser() {
      const vm = this.$store;
      this.$refs.registerRuleFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await axios({
          method: "post",
          url: api_03 + "userregister",
          data: {
            username: this.registerRuleForm.username,
            useremail: this.registerRuleForm.useremail,
            nickname: this.registerRuleForm.nickname,
            password: this.registerRuleForm.password,
            checkPass: this.registerRuleForm.checkPass,
            emailcode: this.registerRuleForm.emailcode,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        });

        console.log(res);
        if (res.statuscode !== 200) return this.$message.error(res.message);
        this.$message.success(res.message);
        this.registerDialogVisible = false;
      });
    },
    // 忘记密码
    forgetPassword() {
      this.editPasswordDialogVisible = true;
      this.loginDialogVisible = false;
    },
    // 更改密码步骤条
    next() {
      if (this.activeIndex++ > 1) this.activeIndex = 0;
    },
    // 发送验证码
    async editPasswordSkill(index, email) {
      if (!email) {
        this.$message.error("邮箱不能为空呦！");
        return false;
      } else {
        const { data: res } = await axios({
          method: "post",
          url: api_02 + "sendcode",
          data: {
            status: index,
            email,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        });

        console.log(index, email);
        console.log(res);
        if (res.statuscode !== 200) return this.$message.error(res.message);
        this.$message.success("发送验证码成功！");
      }
    },
    // 开始验证
    proved() {
      this.flag = 0;
      this.$refs.editPasswordRuleFormRef.validate(async (valid) => {
        if (!valid) return;
        try {
          this.loading = true;
          const { data: res } = await axios({
            method: "post",
            url: api_02 + "findcode",
            data: {
              email: this.editPasswordRuleForm.email,
              verificationcode: this.editPasswordRuleForm.verificationcode,
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json",
            },
          });

          console.log(res, "验证信息");
          if (res.statuscode !== 200) {
            this.loading = false;
            return this.$message.error("信息验证失败！");
          } else {
            this.$message.success("信息验证成功！");
            this.flag = 1;
            this.activeIndex = "1";
            this.loading = false;
          }
        } catch (error) {
          this.$message.error("出错啦！");
          this.loading = false;
        }
      });
    },
    // 监听标签页的切换
    beforeTabLeave(activeName, oldActiveName) {
      if (oldActiveName === "0" && this.flag === 0) {
        this.$message.error("请先填写验证部分信息！");
        return false;
      }
      return true;
    },
    // 修改密码
    modificate() {
      this.$refs.forgetRuleFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await axios({
          method: "post",
          url: api_03 + "frogetpassword",
          data: {
            useremail: this.editPasswordRuleForm.email,
            password: this.forgetRuleForm.password,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        });

        if (res.statuscode !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.$message.success("密码修改成功！");
        this.editPasswordDialogVisible = false;
      });
    },
    // 自动登录
    JudgeSessiopn() {
      let session = sessionStorage.getItem("token");
      if (session) {
        const userinfousernameemail = decodeURIComponent(
          escape(window.atob(sessionStorage.getItem("userinfousernameemail")))
        );
        this.loginRuleForm.usernameemail = userinfousernameemail;
        this.loginUser();
      }
    },
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
      console.log(res, "getunread");
      if (res.statuscode !== 200) {
        if (res.statuscode == 211) {
          vm.commit("updateLoading", false);
          sessionStorage.clear();
          this.$store.commit("updateShow_no");
          if (this.$route.path == "/mydescript") {
            this.$router.go(0);
            return;
          } else {
            this.$router.push("/login");
            return;
          }
        } else {
          vm.commit("updateLoading", false);
          return;
        }
      }
      vm.commit("updateNoseeMessage", res.count);
      console.log(res, "getunread");
      vm.commit("updateLoading", false);
    },
  },
  created() {
    this.JudgeSessiopn();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll); //监听事件
    L2Dwidget.init({
      model: {
        jsonPath:
          "https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json",
        scale: 1,
      },
      display: {
        position: "left",
        width: 90,
        height: 150,
        hOffset: 0,
        vOffset: -20,
      },
      mobile: { show: true, scale: 0.5 },
      react: { opacityDefault: 0.8, opacityOnHover: 0.2 },
    });
  },
};
</script>

<style lang="less" scoped>
.blogContainer {
  border-bottom-left-radius: 6px;
  width: 93%;
  max-height: 300px;
  overflow-y: scroll;
  position: absolute;
  top: 48px;
  left: 15px;
  background-color: rgba(241, 241, 241, 0.9);
  z-index: 100;
  cursor: pointer;
  padding: 20px;
  box-sizing: border-box;
  user-select: none;
}
.search_blog {
  position: relative;
  float: left;
  padding: 8px 15px;
  width: 25%;
}
.el-dialog__header {
  background-image: linear-gradient(45deg, #0081ff, #1cbbb4) !important;
}
.defaultImg {
  border-radius: 50%;
  width: 32px;
  height: 32px;
}
.clearfix::after {
  display: block;
  content: "";
  clear: both;
}
.right_01 .layui-nav-item {
  float: right;
}
.container {
  height: 100%;
}
.login .el-input {
  width: 100% !important;
}
.layui-nav {
  padding: 8px 0;
}
.perCenter {
  color: rgba(255, 255, 255, 0.7);
}
.perCenter:hover {
  color: rgb(255, 255, 255);
  text-decoration: underline;
}
</style>
