<template>
  <div class="home">
    <home-header></home-header>
    <div class="banner">
      <div class="icon" @click="goto_apps()">
        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg"><path d="M3.9468 10.0288L20.5548.995c2.4433-1.3267 5.45-1.3267 7.8936 0l16.6078 9.0338C47.4966 11.3585 49 13.8102 49 16.4666V34.534c0 2.6537-1.5034 5.1082-3.9438 6.438l-16.6078 9.0307c-2.4435 1.3297-5.4503 1.3297-7.8937 0L3.9467 40.972C1.5035 39.642 0 37.1876 0 34.534V16.4667c0-2.6564 1.5034-5.108 3.9468-6.4378z" class="app-icon" fill-rule="evenodd"></path></svg>
      </div>
      <div class="banner-text">
        <p style="color:#47494E;font-size: 22px;margin-top: 20px;margin-bottom: 10px">JJService Apps</p>
        <p>Welcome to JJService platform of <a href="http://renj.io" style="text-decoration: none;color: #408fec">Renj.io</a> projects.It's a platform written in Golang, responsible for managing all the Renj Apps.</p>
        <br>
        <pre class="code"><code>
          <p style="margin-bottom: 8px"><b style="color: #42b983">$</b> jjservice <span>start --app</span></p>
          <p style="margin-bottom: 8px"><b style="color: #42b983">$</b> git <span>clone <span style="color: #8cf8ff">https://github.com/landers1037/jjservice</span></span></p>
          <p style="margin-bottom: 8px"><b style="color: #42b983">$</b> system:
            <span>CPU <strong id="cpu" v-model="cpu">100%</strong></span>
            <span style="margin-left: 10px">Mem <strong id="mem" v-model="mem">0mb</strong></span>
            <span style="margin-left: 10px">Network <strong id="net">0kb</strong></span>
          </p>
          <p><b style="color: #42b983">$</b> Designed by Landers with ❤.</p>
          </code>
        </pre>
      </div>
    </div>
    <div class="jjicon" @click="goto_dev()">
      <img src="@/assets/apple-icon.png"><span style="margin-left: 8px">JJService</span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import homeHeader from "@/components/homeHeader";

export default {
  name: 'Home',
  components: {
    homeHeader
  },
  data(){
    return{
      cpu: '',
      mem: '',
      timer: null,
      timer_count: 30
    }
  },
  mounted(){
    let that = this;
    this.timer = setInterval(function () {
      that.sys();
    },5000);
  },
  beforeDestroy(){
    if(this.timer){
      clearInterval(this.timer);
    }
  },
  methods: {
    goto_apps(){
      this.$router.push("/apps");
    },
    goto_dev(){
      this.$router.push("/dev");
    },
    sys(){
      if(this.timer_count >= 1){
          this.timer_count--;
          this.axios.post("/api/status/sys").then(res=>{
              let data = res.data.data;
              if(data === "failed"){
                  document.getElementById("cpu").innerText = "0%";
                  document.getElementById("mem").innerText = "0mb";
                  document.getElementById("net").innerText = "0kb";
              }else{
                  document.getElementById("cpu").innerText = parseInt(data[0]) * 100 + "%";
                  document.getElementById("mem").innerText = data[1] + "mb";
                  document.getElementById("net").innerText = (parseInt(data[2])/ 60).toFixed(2)  + "kb";
              }
          }).catch((e)=>{
              console.log(e);
              document.getElementById("cpu").innerText = "0%";
              document.getElementById("mem").innerText = "0mb";
              document.getElementById("net").innerText = "0kb";
          });
      }else{
          clearInterval(this.timer);
      }
    }
  }
}
</script>

<style scoped>
  .home{
    height: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .banner{
    font-family: sans-serif;
    padding: 20px;
    max-width: 460px;
    font-size: 15px;
    align-self: center;
    line-height: 1.4;
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-perspective: 1000;
    -moz-perspective: 1000;
    -ms-perspective: 1000;
    perspective: 1000;
  }
  .icon{
    cursor: pointer;
  }
  .icon svg{
    fill: #DBE1EC;
  }
  .banner-text{
    color: #7F828B;
  }
  .banner .code{
    white-space: normal;
    text-align: left;
    word-break: break-all;
    font-size: 14px;
    font-family: monospace;
    line-height: 1.2;
    background-color: #313440;
    color: white;
    padding: 8px 12px;
    border-radius: 8px;
  }
  .banner .code span{
    color: #D093E3;
  }
  .banner .code p{
    user-select: text;
    display: block;
    margin-bottom: 0;
  }
  .jjicon{
    position: fixed;
    bottom: 20px;
    left: 15px;
    color: #888888;
    vertical-align: middle;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }
  .jjicon img{
    width: 40px;
    vertical-align: middle;
  }
  @keyframes status {
    0%  {color: darkgreen}
    25% {color: chartreuse}
    50% {color: chartreuse}
    100% {color: darkgreen}
  }
  #cpu, #mem, #net{
    animation: status 3s;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
</style>