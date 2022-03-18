<template>
  <div class="demo" id="login">
    

    <div class="demo_innerwrap">
      <div id="musicplay">
      <div id="top_01">
        <span style="font-size:18px;">{{text}}</span>
        <div id="search_01">
          <input
            type="text"
            placeholder="请输入歌曲信息"
            v-on:keyup.enter="search"
            v-model="name"
          />
        </div>
      </div>
      <div id="cont">
        <div id="left">
          <img v-bind:src="songImg" />
        </div>
        <div id="line"></div>
        <div id="right">
          <ul class="music_list">
            <li v-for="(item, i) in obj" :key="i">
              <img src="../../assets/imgs/music_01.gif" @click="playIt(i)" />
              <p>{{ item.song }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div id="bottom">
        <audio
          v-bind:src="thisSrc"
          controls=""
          autoplay=""
          style="width: 100%"
        ></audio>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {},
  data() {
    return {
      name:'薛之谦',
      text: "娱乐中心",
      thisSinger: "",
      thisSrc: "",
      obj: [],
      songImg:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01f20757b2ba670000012e7e3fed2c.gif",
    };
  },
  methods: {
    search() {
      var that = this;
      this.obj.splice(0, 20);
      axios
        .get(
          "https://api.imjad.cn/cloudmusic/?type=search&search_type=1&s=" +
            this.name
        )
        .then(function (datas) {
          for (var i = 0; i < datas.data.result.songs.length; i++) {
            that.obj.push({
              song: datas.data.result.songs[i].name,
              imgSrc: datas.data.result.songs[i].al.picUrl,
              id: datas.data.result.songs[i].privilege.id,
            });
          }
        });
    },
    playIt(i) {
      var that = this;
      this.text = this.obj[i].song;
      axios
        .get(
          "https://api.imjad.cn/cloudmusic/?type=song&br=128000&id=" +
            this.obj[i].id
        )
        .then(function (ddd) {
          that.thisSrc = ddd.data.data[0].url;
          that.songImg = that.obj[i].imgSrc;
        });
    },
  },
  created(){
    this.search();
  }
};
</script>

<style>
#musicplay {
  border-radius: 10px;
  position: absolute;
  background-color: #fff;
  left: 10%;
  top: 60px;
  width: 80%;
  height: 600px;
  box-shadow: 2px 2px 4px rgb(0,150,136);
  overflow: hidden;
}
#top_01 {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  height: 50px;
  background-color: rgb(0,150,136);
}
#top_01 span {
  padding-left: 8px;
  color: #fff;
  line-height: 50px;
}
#search_01 {
  position: absolute;
  right: 8px;
  top: 10px;
}
#search_01 input {
  width: 180px;
  height: 24px;
  padding-left: 8px;
  border-radius: 12px;
  border: 1px solid #e4795e;
  box-shadow: 1px 1px 2px #5c5c5f;
  outline: none;
  color: rgb(255, 0, 149);
}

#cont {
  position: absolute;
  margin: 8px 0;
  width: 100%;
  height: 400px;
}
#left {
  position: absolute;
  left: 1%;
  width: 100%;
  height: 100%;
  background-color: rgba(233,233,233,.5);
  padding: 50px;
}
#left img {
  position: absolute;
  left: 7%;
  top: 0%;
  height: 99%;
  width: auto;
}
#left p {
  font-size: 24px;
  font-weight: 500;
  color: #5e72e4;
}
#line {
  position: absolute;
  top: 10%;
  left: 62%;
  width: 0;
  height: 80%;
  border-left: 1px solid #59666d;
  opacity: 0.4;
}
#right {
  position: absolute;
  padding-top: 6%;
  right: 1%;
  width: 36%;
  height: 90%;
  /* background-color: rgba(233,233,233,.8); */
}
ul.music_list {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(233,233,233,.5);
}
ul.music_list li {
background-color: rgba(233,233,233,.5);
  width: 100%;
  height: 30px;
  list-style: none;
  padding-left: 2%;
}
ul.music_list li img {
  /* position: absolute; */
  padding-top: 3px;
  float: left;
  width: 24px;
  height: auto;
  cursor: pointer;
}
ul.music_list li p {
  font-size: medium;
  float: left;
  width: 85%;
  white-space: nowrap;
}

#bottom {
  position: absolute;
  bottom: 4px;
  width: 100%;
  height: 50px;
  background-color: #f4f5f7;
}
#bottom img {
  position: absolute;
  left: 4%;
  top: 16px;
  width: 20px;
  height: auto;
}
#bottom p {
  position: absolute;
  left: 10%;
  top: 6px;
  font-size: 10px;
}
.demo {
  user-select: none;
  background: url(../../assets/imgs/9.jpg) no-repeat;
  background-size: cover;
  width: 100%;
  height: 860px;
  box-sizing: border-box;
  overflow: hidden;
}
.demo_innerwrap{
  width: 100%;
  height: 860px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: rgba(255,255,255,.8);
}
</style>