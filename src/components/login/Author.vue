<template>
  <div id="wrap">
    <div class="bg bg-blur"></div>
    <div class="contain">
      <div id="desc_01">
        <div>
          <div class="out_01">
            <div class="out_02">
              <div class="out_03">
                <img
                  src="http://121.43.177.199:8087/2021-10-22/20683c68-3029-4115-be52-cb9ba590af52.jpg"
                  alt=""
                  class="myselfImg"
                />
              </div>
            </div>
            <div class="skill_01">
              <img src="../../assets/imgs/vue.jpeg" alt="" class="skill_img" />
            </div>
            <div class="skill_02">
              <img src="../../assets/imgs/js.webp" alt="" class="skill_img" />
            </div>
            <div class="skill_03">
              <img
                src="../../assets/imgs/react.webp"
                alt=""
                class="skill_img"
              />
            </div>
          </div>
          <div class="myIntro">
            <p style="padding: 15px;font-size:35px;">"用不懈的努力战胜一切的不可能"</p>
            <h6>大家好，我是小周</h6>
            <p style="font-size: 22px; padding: 15px">致力于分享web技术</p>
            <p><i class="el-icon-arrow-down"></i></p>
            <p>ABOUT ME</p>
            <div class="detail_info">
              <p style="text-align: left; padding: 15px; font-size: 18px">
                2000年1月8日于河南南阳出生，就读于南阳理工学院计算机与软件学院，在校期间，积极参加活动，团结同学，成绩优异\(^o^)/~。
              </p>
              <p style="text-align: left; padding: 15px; font-size: 18px">
                性格开朗活泼，喜欢跑步，打乒乓球，卷室友....
              </p>
              <p style="text-align: left; padding: 15px; font-size: 18px">
                缺点：本人最大的缺点就是没有缺点！
              </p>
              <el-descriptions :column="3" border size="medium">
                <el-descriptions-item
                  label="姓名"
                  content-class-name="my-content"
                >
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    姓名
                  </template>
                  小周
                </el-descriptions-item>
                <el-descriptions-item label="性别">
                  <template slot="label">
                    <el-tag size="small" class="el-icon-female">性别</el-tag>
                  </template>
                  男
                </el-descriptions-item>
                <el-descriptions-item
                  label="出生日期"
                  content-class-name="birth"
                >
                  <template slot="label">
                    <i class="el-icon-key"></i>
                    出生日期
                  </template>
                  2000.01.08
                </el-descriptions-item>
                <el-descriptions-item label="联系方式">
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    联系方式
                  </template>
                  15638982297</el-descriptions-item
                >
                <el-descriptions-item label="邮箱" content-class-name="email">
                  <template slot="label">
                    <i class="el-icon-message"></i>
                    邮箱
                  </template>
                  3177162043@qq.com
                </el-descriptions-item>
                <el-descriptions-item label="居住地"
                  ><template slot="label">
                    <i class="el-icon-location-outline"></i>
                    居住地
                  </template>
                  河南省南阳市</el-descriptions-item
                >
                <el-descriptions-item label="毕业院校">
                  <template slot="label">
                    <i class="el-icon-school"></i>
                    毕业院校
                  </template>
                  <el-tag size="small">南阳理工学院</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="技术栈">
                  <template slot="label">
                    <i class="el-icon-s-promotion"></i>
                    技术栈
                  </template>
                  <el-tag size="small">全栈开发</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="联系地址"
                  ><template slot="label">
                    <i class="el-icon-office-building"></i>
                    联系地址
                  </template>
                  河南省南阳市邓州市</el-descriptions-item
                >
                <el-descriptions-item label="主修课程">
                  <template slot="label">
                    <i class="el-icon-pie-chart"></i>
                    主修课程
                  </template>
                  <el-tag size="small">HTML</el-tag>
                  <el-tag size="small">css</el-tag>
                  <el-tag size="small">JavaScript</el-tag>
                  <el-tag size="small">Es6</el-tag>
                  <el-tag size="small">Node.js(MongoDB)</el-tag>
                  <el-tag size="small">webpack</el-tag>
                  <el-tag size="small">Vue</el-tag>
                  <el-tag size="small">微信小程序</el-tag>
                  <el-tag size="small">React</el-tag>
                  <el-tag size="small">TypeScript</el-tag>
                </el-descriptions-item>
              </el-descriptions>
              <div class="skillDes">
                <p
                  style="
                    text-align: left;
                    padding: 15px;
                    font-size: 18px;
                    color: rgba(187, 255, 147, 0.5);
                  "
                >
                  专业技能
                </p>
                <p
                  style="
                    text-align: left;
                    padding-left: 15px;
                    font-size: 20px;
                    color: rgba(187, 255, 147, 0.5);
                  "
                >
                  <i class="el-icon-price-tag" style="padding-right: 10px"></i>
                  <span style="font-size: 15px">熟练掌握H5,css3,Es6</span>
                </p>
                <p
                  style="
                    text-align: left;
                    padding-left: 15px;
                    font-size: 20px;
                    color: rgba(187, 255, 147, 0.5);
                  "
                >
                  <i class="el-icon-price-tag" style="padding-right: 10px"></i>
                  <span style="font-size: 15px"
                    >能熟练运用不同主流UI框架ElementUI及多个移动端UI框架</span
                  >
                </p>
                <p
                  style="
                    text-align: left;
                    padding-left: 15px;
                    font-size: 20px;
                    color: rgba(187, 255, 147, 0.5);
                  "
                >
                  <i class="el-icon-price-tag" style="padding-right: 10px"></i>
                  <span style="font-size: 15px">掌握前端主流Vue框架</span>
                </p>
                <p
                  style="
                    text-align: left;
                    padding-left: 15px;
                    font-size: 20px;
                    color: rgba(187, 255, 147, 0.5);
                  "
                >
                  <i class="el-icon-price-tag" style="padding-right: 10px"></i>
                  <span style="font-size: 15px"
                    >熟练掌握H5混合APP开发，跨多端技术uni-app、apicloud</span
                  >
                </p>
                <p
                  style="
                    text-align: left;
                    padding-left: 15px;
                    font-size: 20px;
                    color: rgba(187, 255, 147, 0.5);
                  "
                >
                  <i class="el-icon-price-tag" style="padding-right: 10px"></i>
                  <span style="font-size: 15px">了解微信小程序开发</span>
                </p>
                <p
                  style="
                    text-align: left;
                    padding-left: 15px;
                    font-size: 20px;
                    color: rgba(187, 255, 147, 0.5);
                  "
                >
                  <i class="el-icon-price-tag" style="padding-right: 10px"></i>
                  <span style="font-size: 15px">熟悉后端语言node.js</span>
                </p>
                <p
                  style="
                    text-align: left;
                    padding-left: 15px;
                    font-size: 20px;
                    color: rgba(187, 255, 147, 0.5);
                  "
                >
                  <i class="el-icon-price-tag" style="padding-right: 10px"></i>
                  <span style="font-size: 15px"
                    >熟悉css预处理器sass、stylus以及前端构建工具webpack和npm包管理库</span
                  >
                </p>
                <p
                  style="
                    text-align: left;
                    padding: 15px;
                    font-size: 18px;
                    color: pink;
                  "
                >
                  非专业技能
                </p>
                <p
                  style="
                    text-align: left;
                    padding-left: 15px;
                    font-size: 20px;
                    color: pink;
                  "
                >
                  <i class="el-icon-price-tag" style="padding-right: 10px"></i>
                  <span style="font-size: 15px">喜欢用Photoshop工具批图，制作海报等</span>
                </p>
                <p
                  style="
                    text-align: left;
                    padding-left: 15px;
                    font-size: 20px;
                    color: pink;
                  "
                >
                  <i class="el-icon-price-tag" style="padding-right: 10px"></i>
                  <span style="font-size: 15px"
                    >喜欢用premiere工具剪辑视频</span
                  >
                </p>
              </div>
            </div>
          </div>
          <p>DETAIL SKILL</p>
          <p><i class="el-icon-arrow-down"></i></p>
          <div class="progress">
              <div>
                  <p style="font-size:18px;padding:10px;color:rgb(32,160,255);">JavaScript</p>
                  <el-progress type="circle" :percentage="65" :stroke-width='20'></el-progress>
              </div>
                <div>
                    <p style="font-size:18px;padding:10px;color:yellow;">Node.js</p>
                    <el-progress type="circle" :percentage="80" :stroke-width='20' color="yellow"></el-progress>
                </div>
                <div>
                    <p style="font-size:18px;padding:10px;color:green;">Vue</p>
                   <el-progress type="circle" :percentage="70" :stroke-width='20' color="green"></el-progress> 
                </div>
                <div>
                    <p style="font-size:18px;padding:10px;color:purple;">uni-app</p>
                    <el-progress type="circle" :percentage="75" :stroke-width='20' color="purple"></el-progress>
                </div>
            
          </div>
        </div>
      </div>

      <div id="desc_02">
        <div>
          <div class="out_01">
            <div class="out_02">
              <div class="out_03">
                <img
                  src="http://121.43.177.199:8087/2021-10-15/d0a5441a-abc3-4e34-8c21-87d775a122e9.jpg"
                  alt=""
                  class="myselfImg"
                />
              </div>
            </div>
            <div class="skill_01">
              <img src="../../assets/imgs/go.jpg" alt="" class="skill_img" />
            </div>
            <div class="skill_02">
              <img
                src="../../assets/imgs/docker.webp"
                alt=""
                class="skill_img"
              />
            </div>
            <div class="skill_03">
              <img
                src="../../assets/imgs/redis.webp"
                alt=""
                class="skill_img"
              />
            </div>
          </div>
          <div class="myIntro">
            <p style="padding: 15px;font-size:35px;">
              "任何一件事情，只要心甘情愿，总是能够变得简单！"
            </p>
            <h6>大家好，我是小涂</h6>
            <p style="font-size: 22px; padding: 15px">致力于goweb分享</p>
            <p><i class="el-icon-arrow-down"></i></p>
            <p>ABOUT ME</p>
            <div class="detail_info">
              <p style="text-align: left; padding: 15px; font-size: 18px">
                1999年12月31日于河南驻马店出生，毕业于南阳理工学院计算机与软件学院，在校期间，参加学生会，获得优秀社员，团结同学，热爱生活，成绩优异，多次获得奖学金。
              </p>
              <p style="text-align: left; padding: 15px; font-size: 18px">
                性格开朗活泼，喜欢跑步，打乒乓球，卷室友....
              </p>
              <p style="text-align: left; padding: 15px; font-size: 18px">
                缺点：本人最大的缺点就是没有缺点！
              </p>
              <el-descriptions :column="3" border size="medium">
                <el-descriptions-item
                  label="姓名"
                  content-class-name="my-content"
                >
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    姓名
                  </template>
                  小涂
                </el-descriptions-item>
                <el-descriptions-item label="性别">
                  <template slot="label">
                    <el-tag size="small" class="el-icon-female">性别</el-tag>
                  </template>
                  男
                </el-descriptions-item>
                <el-descriptions-item
                  label="出生日期"
                  content-class-name="birth"
                >
                  <template slot="label">
                    <i class="el-icon-key"></i>
                    出生日期
                  </template>
                  1999.12.25
                </el-descriptions-item>
                <el-descriptions-item label="联系方式">
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    联系方式
                  </template>
                  17638720000
                </el-descriptions-item>
                <el-descriptions-item label="邮箱" content-class-name="email">
                  <template slot="label">
                    <i class="el-icon-message"></i>
                    邮箱
                  </template>
                  1368258400@qq.com
                </el-descriptions-item>
                <el-descriptions-item label="居住地"
                  ><template slot="label">
                    <i class="el-icon-location-outline"></i>
                    居住地
                  </template>
                  河南省驻马店市</el-descriptions-item
                >
                <el-descriptions-item label="毕业院校">
                  <template slot="label">
                    <i class="el-icon-school"></i>
                    毕业院校
                  </template>
                  <el-tag size="small">南阳理工学院</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="技术栈">
                  <template slot="label">
                    <i class="el-icon-s-promotion"></i>
                    技术栈
                  </template>
                  <el-tag size="small">全栈开发</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="联系地址"
                  ><template slot="label">
                    <i class="el-icon-office-building"></i>
                    联系地址
                  </template>
                  河南省驻马店市正阳县</el-descriptions-item
                >
                <el-descriptions-item label="主修课程">
                  <template slot="label">
                    <i class="el-icon-pie-chart"></i>
                    主修课程
                  </template>
                  <el-tag size="small">golang</el-tag>
                  <el-tag size="small">mysql</el-tag>
                  <el-tag size="small">docker</el-tag>
                  <el-tag size="small">gorm</el-tag>
                  <el-tag size="small">redis</el-tag>
                  <el-tag size="small">rpc</el-tag>
                  <el-tag size="small">数据结构</el-tag>
                  <el-tag size="small">aes数据加密</el-tag>
                  <el-tag size="small">nginx</el-tag>
                  <el-tag size="small">网关</el-tag>
                </el-descriptions-item>
              </el-descriptions>
              <div class="skillDes">
                <p
                  style="
                    text-align: left;
                    padding: 15px;
                    font-size: 18px;
                    color: rgba(128,0,128, 0.5);
                  "
                >
                  专业技能
                </p>
                <p
                  style="
                    text-align: left;
                    padding-left: 15px;
                    font-size: 20px;
                    color: rgba(128,0,128, 0.5);
                  "
                >
                  <i class="el-icon-price-tag" style="padding-right: 10px"></i>
                  <span style="font-size: 15px">熟练掌握gin框架，进行前后端数据交互</span>
                </p>
                <p
                  style="
                    text-align: left;
                    padding-left: 15px;
                    font-size: 20px;
                    color: rgba(128,0,128, 0.5);
                  "
                >
                  <i class="el-icon-price-tag" style="padding-right: 10px"></i>
                  <span style="font-size: 15px"
                    >熟练掌握golang语言的特点，高并发，反射等，高效率编程</span
                  >
                </p>
                <p
                  style="
                    text-align: left;
                    padding-left: 15px;
                    font-size: 20px;
                    color: rgba(128,0,128, 0.5);
                  "
                >
                  <i class="el-icon-price-tag" style="padding-right: 10px"></i>
                  <span style="font-size: 15px">熟练掌握redis的Key-Value等多种数据结构的存储，理解redis的基于内存和可持久化</span>
                </p>
                <p
                  style="
                    text-align: left;
                    padding-left: 15px;
                    font-size: 20px;
                    color: rgba(128,0,128, 0.5);
                  "
                >
                  <i class="el-icon-price-tag" style="padding-right: 10px"></i>
                  <span style="font-size: 15px"
                    >能够掌握mysql以及gorm对数据库进行操作，以及二者区别。</span
                  >
                </p>
                <p
                  style="
                    text-align: left;
                    padding-left: 15px;
                    font-size: 20px;
                    color: rgba(128,0,128, 0.5);
                  "
                >
                  <i class="el-icon-price-tag" style="padding-right: 10px"></i>
                  <span style="font-size: 15px">能够熟练掌握rpc，理解rpc：1.服务化/微服务 2：分布式系统架构 3：服务可重用 4：系统间交互调用</span>
                </p>
                <p
                  style="
                    text-align: left;
                    padding-left: 15px;
                    font-size: 20px;
                    color: rgba(128,0,128, 0.5);
                  "
                >
                  <i class="el-icon-price-tag" style="padding-right: 10px"></i>
                  <span style="font-size: 15px">能够运用docker容器进行运维，部署</span>
                </p>
              </div>
            </div>
          </div>
          <p>DETAIL SKILL</p>
          <p><i class="el-icon-arrow-down"></i></p>
          <div class="progress">
              <div>
                  <p style="font-size:18px;padding:10px;color:yellow;">golang</p>
                  <el-progress type="circle" :percentage="80" :stroke-width='20' color="yellow"></el-progress>
              </div>
                <div>
                    <p style="font-size:18px;padding:10px;color:purple;">docker</p>
                    <el-progress type="circle" :percentage="75" :stroke-width='20' color="purple"></el-progress>
                </div>
                <div>
                    <p style="font-size:18px;padding:10px;color:orange;">mysql</p>
                   <el-progress type="circle" :percentage="85" :stroke-width='20' color="orange"></el-progress> 
                </div>
                <div>
                    <p style="font-size:18px;padding:10px;color:purple;">redis</p>
                    <el-progress type="circle" :percentage="75" :stroke-width='20' color="purple"></el-progress>
                </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
@keyframes zmove{
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}
@keyframes imgmove{
    from{
        transform: rotate(360deg);
    }
    to{
        transform: rotate(0deg);
    }
}
.progress div{
    flex: 1;
}
.progress{
    width: 900px;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
}
.detail_info {
  margin: 20px auto;
  width: 900px;
  height: 700px;
  border: 3px dashed rgb(103, 200, 219);
  background-color: rgba(255, 255, 255, 0.5);
  overflow: hidden;
}
.skill_03 {
  position: absolute;
  width: 110px;
  height: 110px;
  background-color: #fff;
  bottom: 265px;
  right: -30px;
  border-radius: 50%;
}
.skill_02 {
  position: absolute;
  width: 110px;
  height: 110px;
  background-color: #fff;
  bottom: -45px;
  right: 155px;
  border-radius: 50%;
}
.skill_01 {
  position: absolute;
  width: 110px;
  height: 110px;
  background-color: #fff;
  top: 15px;
  left: 0;
  border-radius: 50%;
}
.skill_img {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  position: absolute;
  left: 0;
  bottom: 0;
  animation: imgmove 15s linear 0s infinite;
}
.out_01 {
  border-radius: 50%;
  border: 2px solid rgb(241, 241, 241);
  width: 450px;
  height: 450px;
  margin: 100px auto;
  position: relative;
  animation: zmove 15s linear 0s infinite;
}
.out_02 {
  border-radius: 50%;
  border-left: 2px solid yellow;
  width: 220px;
  height: 220px;
  margin: 0px auto;
  position: absolute;
  left: 115px;
  bottom: 111px;
}
.out_03 {
  border-radius: 50%;
  border-right: 2px solid green;
  width: 190px;
  height: 190px;
  margin: 0px auto;
  position: absolute;
  left: 13px;
  bottom: 10px;
}
.myselfImg {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  position: absolute;
  left: 20px;
  top: 22px;
  animation: imgmove 15s linear 0s infinite;
}
.bg {
  background: url("../../assets/imgs/author.jpg");
  height: 4100px;
  text-align: center;
}
.bg-blur {
  float: left;
  position: absolute;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: blur(8px);
}
.contain {
  position: absolute;
  left: 10px;
  right: 10px;
  height: 4000px;
  width: 1000px;
  text-align: center;
  color: #ffffff;
  font-size: 35px;
  margin: 60px auto;
}
#desc_01,
#desc_02 {
  width: 1000px;
  height: 1900px;
  text-align: center;
  /* border: 2px solid rgb(5, 209, 69); */
}
#wrap {
  padding: 0;
}
.my-content {
  background: #e2f4fd;
}
.email {
  background: rgba(255, 231, 147, 0.5);
}
.birth {
  background: rgba(187, 255, 147, 0.5);
}
.el-progress--circle{
    padding: 20px;
}
</style>