<template>
    <div class="about">
        <div class="top-logo">
            <span style="vertical-align: baseline" @click="goto_home()">JJService</span>
            <div class="btns">
                <span class="bt" @click="goto_apps()" title="app面板"><img src="@/assets/server.svg"></span>
                <span class="bt" @click="refresh()" title="刷新页面"><img src="@/assets/refresh.svg"></span>
                <span class="bt" @click="goto_setting()" title="全局设置"><img src="@/assets/setting.svg"></span>
                <span class="bt" @click="full()" title="全屏"><img src="@/assets/full.svg"></span>
                <span class="bt" @click="goto_about()" title="关于JJService"><img src="@/assets/about.svg"></span>
                <span class="bt" @click="logout()" title="登出"><img src="@/assets/logout.svg"></span>
            </div>
        </div>
        <div class="text-body">
            <img src="@/assets/apple-icon.png" style="width: 100px;" class="animated slideInDown">
            <p style="padding: 20px 10px;font-size: 28px" class="animated slideInDown">JJService by Lander & Renj.io</p>
            <p class="animated slideInDown" style="animation-delay: .2s">JJservice是一个在线服务管理平台，由Go编写而成，作为Renj.io站点的扩展站点是我为了练习shell脚本和接口设计的项目。
                学无止境，自己还要变得更强。
            </p>
            <p style="color: #888888;margin-top: 15px;animation-delay: .2s" class="animated slideInDown">JJService's logo is designed by Landers.</p>
            <p style="color: #888888;margin-top: 15px;animation-delay: .2s;font-size: 15px">本站点仅适用于支持ES2015+的浏览器(推荐Chrome和Safari以提高使用体验)</p>
            <br>
            <h2>JJService的组成</h2>
            <p style="line-height: 2.2">JJService由服务程序<span class="tag">jjservice</span>，控制器<span class="tag">jjctl</span>，打包工具<span class="tag">jjbuild</span>组成。</p>
            <p style="margin-top: 30px;">
                jjservice是服务主程序，负责管理部署所有的微服务<br>
                jjctl是服务管理程序，负责监控jjservice的运行状态<br>
                jjbuild是服务打包工具，负责构建服务包，备份服务程序
            </p>
            <br>
            <h2>JJService的工作</h2>
            <p>JJService是一个集中式的服务管理程序，通过运行shell脚本和定时任务达到管理服务器上其他部署服务的目的。<br>
                JJService提供Restful的接口，通过前端调用接口并经过校验后就能操作本地服务，无需登录服务器。
                目前JJService支持服务的启动，停止，日志查看，日志清空，备份等操作。
            </p>
            <br>
            <h2>JJCtl CMD</h2>
            <p>JJCtl是配套的命令行控制程序，通过简单的参数即可对JJService进行操作。</p>
            <pre style="max-width: 460px;margin: 0 auto;padding: 0 10px;text-align: left;background-color: #313440;color: white;white-space: pre-line;border-radius: 10px;margin-top: 20px">
                <code style="white-space: pre-line;word-break: break-all">
                    <em>$</em> <span class="tag-green">./jjctl status</span>
                JJService is running on PID: 29843
                    <span class="tag-yellow"># 尝试停止jjservice</span>
                    <em>$</em> <span class="tag-green">./jjctl stop</span>
                    <span class="tag-yellow"># 启动jjservice</span>
                    <em>$</em> <span class="tag-green">./jjctl start</span>
                    <span class="tag-yellow"># 脚本提权</span>
                    <em>$</em> <span class="tag-green">./jjctl init</span>
                    <span class="tag-yellow"># 更多参数详见jjctl文档</span>
                </code>
            </pre>
            <br>
            <h2>更新日志</h2>
            <div class="log-data" v-for="i in change">
                <span>版本 {{i["version"]}}</span><br>
                <span>构建日期 {{i["build"]}}</span>
                <p>{{i["log"]}}</p>
            </div>
            <br>
            <h2>探索不止</h2>
            <p>JJService页面由Vue.js编写，即将采用React Native进行重新设计已构建移动端APP。</p>
            <p>有任何意见请不要吝啬，前往<a href="https://github.com/landers1037/jjservice">https://github.com/landers1037/jjservice</a>提出issue。</p>
            <br>
            <h2 style="font-size: 3rem;margin-top: 20px">Landers 1037</h2>
            <p style="font-size: 26px;margin-top: 20px;padding: 10px;animation-delay: .4s">Powered by:</p>
            <ul>
                <li>Vue & VueRouter</li>
                <li>iconfont</li>
                <li>Gin</li>
                <li>Go-ini</li>
                <li>TinyPNG</li>
                <li>Godotenv</li>
                <li>Docker</li>
                <li>❤</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "About",
        data(){
            return{
                change: []
            }
        },
        mounted(){
            this.change_log();
        },
        methods: {
            refresh(){
                window.location.reload();
            },
            goto_home(){
                this.$router.push("/");
            },
            goto_setting(){
                this.$router.push("/setting");
            },
            goto_about(){
                this.$router.push("/about");
            },
            goto_apps(){
                this.$router.push("/apps");
            },
            logout(){
                localStorage.setItem("token", "");
                this.$router.push("/");
            },
            full(){
                var apps = document.querySelector("#app");
                if(document.webkitFullscreenElement || document.fullscreenElement || document.mozFullscreenElement || document.msFullscreenElement){
                    if(document.webkitExitFullscreen){
                        document.webkitExitFullscreen();
                    }else if(document.exitFullscreen){
                        document.exitFullscreen();
                    }else if(document.mozExitFullscreen){
                        document.mozExitFullscreen();
                    }else if(apps.msExitFullscreen){
                        document.msExitFullscreen();
                    }
                }else{
                    if(apps.webkitRequestFullScreen){
                        apps.webkitRequestFullScreen();
                    }else if(apps.requestFullScreen){
                        apps.requestFullScreen();
                    }else if(apps.mozRequestFullScreen){
                        apps.mozRequestFullScreen();
                    }else if(apps.msRequestFullScreen){
                        apps.msRequestFullScreen();
                    }
                }
            },
            change_log(){
                this.$axios.post("/api/changelog").then(res=>{
                   this.change = res.data.data;
                }).catch(()=>{

                });
            }
        }
    }
</script>

<style scoped>
    .about{
        padding: 4px 20px 20px 20px;
        height: fit-content;
        background-color: #F7F8FB;
    }
    @media (max-width: 480px){
        .about{
            padding: 6px 10px;
        }
    }
    h2{
        margin-top: 5px;
        margin-bottom: 10px;
    }
    a{
        color: #378de5;
        text-decoration: none;
        border-bottom: 1px solid #888888;
        padding: 1px;
    }
    .top-logo{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
        width: 100%;
        padding: 20px;
        font-size: 22px;
        color: #888888;
        background-color: #F7F8FB;
        text-align: left;
    }
    .btns{
        display: inline-block;
        height: 20px;
        margin-left: 15px;
        vertical-align: baseline;
    }
    .bt{
        display: inline-block;
        height: 20px;
        margin-left: 15px;
        cursor: pointer;
    }
    .bt img{
        height: 20px;
        width: 20px;
    }
    .bt img:hover{
        background-color: #888888;
    }
    .text-body{
        margin: 140px auto 0;
        max-width: 640px;
    }
    ul li{
        list-style: none;
    }
    .tag{
        background-color: #378de5;
        color: #ffffff;
        padding: 4px 10px;
        border-radius: 6px;
    }
    pre code em{
        color: #D093E3;
    }
    pre code .tag-green{
        color: #42b983;
    }
    pre code .tag-yellow{
        color: yellow;
    }
    .log-data{
        padding: 5px;
        text-align: left;
        margin-bottom: 10px;
    }
    .log-data span{
        color: #888888;
        font-size: 18px;
    }
    .log-data p{
        font-size: 18px;
    }
</style>