<template>
    <div class="apps">
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
        <div class="app-list">
<!--            避免undefined问题-->
            <div class="app animated fadeInDown" v-if="apps.length>0" v-for="app in apps">
                <p style="margin-bottom: 8px;cursor: pointer" @click="goto_app(app.App_id)"><span class="icon"><img src="@/assets/app.svg"></span><span class="app-name">{{app.App_code.toUpperCase()}}</span></p>
                <p>APP ID<span style="margin-left: 10px">{{app.App_id}}</span></p>
                <p>描述<span style="margin-left: 10px">{{app.App_des}}</span></p>
                <p>版本号<span style="margin-left: 10px">{{app.App_version}}&emsp;{{app.App_build}}</span><span></span></p>
                <p>端口<span style="margin-left: 10px">{{app.App_port}}</span></p>
                <p>开发状态<span style="margin-left: 10px" v-if="app.App_dev">✅</span><span style="margin-left: 10px" v-else>🔨</span></p>
            </div>
<!--            <div class="app animated fadeInDown">-->
<!--                <p style="margin-bottom: 8px;cursor: pointer" @click="goto_app(apps.app_jjservice.App_id)"><span class="icon"><img src="@/assets/app.svg"></span><span class="app-name">JJService</span></p>-->
<!--                <p>APP ID<span style="margin-left: 10px">{{apps.app_jjservice.App_id}}</span></p>-->
<!--                <p>描述<span style="margin-left: 10px">{{apps.app_jjservice.App_des}}</span></p>-->
<!--                <p>版本号<span style="margin-left: 10px">{{apps.app_jjservice.App_version}}&emsp;{{apps.app_jjservice.App_build}}</span><span></span></p>-->
<!--                <p>端口<span style="margin-left: 10px">{{apps.app_jjservice.App_port}}</span></p>-->
<!--                <p>开发状态<span style="margin-left: 10px" v-if="apps.app_jjservice.App_dev">✅</span><span style="margin-left: 10px" v-else>🔨</span></p>-->
<!--            </div>-->
<!--            <div class="app animated fadeInDown" style="animation-delay: 0.2s">-->
<!--                <p style="margin-bottom: 8px;cursor: pointer" @click="goto_app(apps.app_jjgo.App_id)"><span class="icon"><img src="@/assets/app.svg"></span><span class="app-name">JJGo</span></p>-->
<!--                <p>APP ID<span style="margin-left: 10px"></span>{{apps.app_jjgo.App_id}}</p>-->
<!--                <p>描述<span style="margin-left: 10px">{{apps.app_jjgo.App_des}}</span></p>-->
<!--                <p>版本号<span style="margin-left: 10px"></span>{{apps.app_jjgo.App_version}}&emsp;{{apps.app_jjgo.App_build}}<span></span></p>-->
<!--                <p>端口<span style="margin-left: 10px">{{apps.app_jjgo.App_port}}</span></p>-->
<!--                <p>开发状态<span style="margin-left: 10px" v-if="apps.app_jjgo.App_dev">✅</span><span style="margin-left: 10px" v-else>🔨</span></p>-->
<!--            </div>-->
<!--            <div class="app animated fadeInDown" style="animation-delay: 0.4s">-->
<!--                <p style="margin-bottom: 8px;cursor: pointer" @click="goto_app(apps.app_jjbox.App_id)"><span class="icon"><img src="@/assets/app.svg"></span><span class="app-name">JJBox</span></p>-->
<!--                <p>APP ID<span style="margin-left: 10px">{{apps.app_jjbox.App_id}}</span></p>-->
<!--                <p>描述<span style="margin-left: 10px">{{apps.app_jjbox.App_des}}</span></p>-->
<!--                <p>版本号<span style="margin-left: 10px">{{apps.app_jjbox.App_version}}&emsp;{{apps.app_jjbox.App_build}}</span><span></span></p>-->
<!--                <p>端口<span style="margin-left: 10px">{{apps.app_jjbox.App_port}}</span></p>-->
<!--                <p>开发状态<span style="margin-left: 10px" v-if="apps.app_jjbox.App_dev">✅</span><span style="margin-left: 10px" v-else>🔨</span></p>-->
<!--            </div>-->
<!--            <div class="app animated fadeInDown" style="animation-delay: 0.8s">-->
<!--                <p style="margin-bottom: 8px;cursor: pointer" @click="goto_app(apps.app_mysite.App_id)"><span class="icon"><img src="@/assets/app.svg"></span><span class="app-name">Renj.io</span></p>-->
<!--                <p>APP ID<span style="margin-left: 10px">{{apps.app_mysite.App_id}}</span></p>-->
<!--                <p>描述<span style="margin-left: 10px">{{apps.app_mysite.App_des}}</span></p>-->
<!--                <p>版本号<span style="margin-left: 10px">{{apps.app_mysite.App_version}}&emsp;{{apps.app_mysite.App_build}}</span><span></span></p>-->
<!--                <p>端口<span style="margin-left: 10px">{{apps.app_mysite.App_port}}</span></p>-->
<!--                <p>开发状态<span style="margin-left: 10px" v-if="apps.app_mysite.App_dev">✅</span><span style="margin-left: 10px" v-else>🔨</span></p>-->
<!--            </div>-->
<!--            <div class="app animated fadeInDown" style="animation-delay: 1s">-->
<!--                <p style="margin-bottom: 8px;cursor: pointer" @click="goto_app(apps.app_blog.App_id)"><span class="icon"><img src="@/assets/app.svg"></span><span class="app-name">Blog</span></p>-->
<!--                <p>APP ID<span style="margin-left: 10px">{{apps.app_blog.App_id}}</span></p>-->
<!--                <p>描述<span style="margin-left: 10px">{{apps.app_blog.App_des}}</span></p>-->
<!--                <p>版本号<span style="margin-left: 10px">{{apps.app_blog.App_version}}&emsp;{{apps.app_blog.App_build}}</span><span></span></p>-->
<!--                <p>端口<span style="margin-left: 10px">{{apps.app_blog.App_port}}</span></p>-->
<!--                <p>开发状态<span style="margin-left: 10px" v-if="apps.app_blog.App_dev">✅</span><span style="margin-left: 10px" v-else>🔨</span></p>-->
<!--            </div>-->
<!--            <div class="app animated fadeInDown" style="animation-delay: 1.2s">-->
<!--                <p style="margin-bottom: 8px;cursor: pointer" @click="goto_app(apps.app_jjmail.App_id)"><span class="icon"><img src="@/assets/app.svg"></span><span class="app-name">Mail Server</span></p>-->
<!--                <p>APP ID<span style="margin-left: 10px">{{apps.app_jjmail.App_id}}</span></p>-->
<!--                <p>描述<span style="margin-left: 10px">{{apps.app_jjmail.App_des}}</span></p>-->
<!--                <p>版本号<span style="margin-left: 10px">{{apps.app_jjmail.App_version}}&emsp;{{apps.app_jjmail.App_build}}</span><span></span></p>-->
<!--                <p>端口<span style="margin-left: 10px">{{apps.app_jjmail.App_port}}</span></p>-->
<!--                <p>开发状态<span style="margin-left: 10px" v-if="apps.app_jjmail.App_dev">✅</span><span style="margin-left: 10px" v-else>🔨</span></p>-->
<!--            </div>-->
<!--            <div class="app animated fadeInDown" style="animation-delay: 0.8s">-->
<!--                <p style="margin-bottom: 8px;cursor: pointer" @click="goto_app(apps.app_mgek.App_id)"><span class="icon"><img src="@/assets/app.svg"></span><span class="app-name">Mgek APPs</span></p>-->
<!--                <p>APP ID<span style="margin-left: 10px">{{apps.app_mgek.App_id}}</span></p>-->
<!--                <p>描述<span style="margin-left: 10px">{{apps.app_mgek.App_des}}</span></p>-->
<!--                <p>版本号<span style="margin-left: 10px">{{apps.app_mgek.App_version}}&emsp;{{apps.app_mgek.App_build}}</span><span></span></p>-->
<!--                <p>端口<span style="margin-left: 10px">{{apps.app_mgek.App_port}}</span></p>-->
<!--                <p>开发状态<span style="margin-left: 10px" v-if="apps.app_mgek.App_dev">✅</span><span style="margin-left: 10px" v-else>🔨</span></p>-->
<!--            </div>-->
<!--            <div class="app animated fadeInDown" style="animation-delay: 0.8s">-->
<!--                <p style="margin-bottom: 8px;cursor: pointer" @click="goto_app(apps.app_mgekfile.App_id)"><span class="icon"><img src="@/assets/app.svg"></span><span class="app-name">Mgek File</span></p>-->
<!--                <p>APP ID<span style="margin-left: 10px">{{apps.app_mgekfile.App_id}}</span></p>-->
<!--                <p>描述<span style="margin-left: 10px">{{apps.app_mgekfile.App_des}}</span></p>-->
<!--                <p>版本号<span style="margin-left: 10px">{{apps.app_mgekfile.App_version}}&emsp;{{apps.app_mgekfile.App_build}}</span><span></span></p>-->
<!--                <p>端口<span style="margin-left: 10px">{{apps.app_mgekfile.App_port}}</span></p>-->
<!--                <p>开发状态<span style="margin-left: 10px" v-if="apps.app_mgekfile.App_dev">✅</span><span style="margin-left: 10px" v-else>🔨</span></p>-->
<!--            </div>-->
<!--            <div class="app animated fadeInDown" style="animation-delay: 0.8s">-->
<!--                <p style="margin-bottom: 8px;cursor: pointer" @click="goto_app(apps.app_mgekdoc.App_id)"><span class="icon"><img src="@/assets/app.svg"></span><span class="app-name">Mgek Doc</span></p>-->
<!--                <p>APP ID<span style="margin-left: 10px">{{apps.app_mgekdoc.App_id}}</span></p>-->
<!--                <p>描述<span style="margin-left: 10px">{{apps.app_mgekdoc.App_des}}</span></p>-->
<!--                <p>版本号<span style="margin-left: 10px">{{apps.app_mgekdoc.App_version}}&emsp;{{apps.app_mgekdoc.App_build}}</span><span></span></p>-->
<!--                <p>端口<span style="margin-left: 10px">{{apps.app_mgekdoc.App_port}}</span></p>-->
<!--                <p>开发状态<span style="margin-left: 10px" v-if="apps.app_mgekdoc.App_dev">✅</span><span style="margin-left: 10px" v-else>🔨</span></p>-->
<!--            </div>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "Apps",
        data(){
            return{
                apps: []
            }
        },
        created(){
            setTimeout(()=>{
                this.get_apps();
            },400);
        },
        methods: {
            get_apps(){
                this.$axios.post("/api/status/all").then(res => {
                   let d = res.data.data;
                   var list = [];
                   for (var key in d) {
                       list.push(d[key]);
                   }
                   this.apps = list;
                   this.$nextTick(()=>{
                       let app = document.getElementsByClassName("app");
                       for(var i=0;i<app.length;i++){
                           app[i].style.animationDelay = i * 0.2 + "s";
                       }
                   });
                });
            },
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
            goto_app(app_id){
              this.$router.push("/app/" + app_id);
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
            }
        }
    }
</script>

<style scoped>
    .apps{
        height: fit-content;
        padding: 4px 10px;
        background-color: #F7F8FB;
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
    .app-list{
        display: flex;
        padding: 40px 20px 10px 20px;
        justify-content: space-between;
        max-width: 800px;
        margin: 30px auto 0;
        flex-wrap: wrap;
    }
    .app{
        width: calc(50% - 50px);
        padding: 10px 15px;
        text-align: left;
        margin: 10px;
        height: 170px;
        background-color: white;
        box-shadow: 0 0 5px 2px rgba(0,0,0,0.1);
        border-radius: 20px;
        font-size: 17px;
    }
    .app p {
        margin-bottom: 6px;
        word-break: break-all;
    }
    .app .icon{
        display: inline-block;
        height: 30px;
        width: 30px;
        vertical-align: middle;
    }
    .app .icon img{
        width: 30px;
        height: 30px;
    }
    .app .app-name{
        vertical-align: middle;
        margin-left: 10px;
        font-size: 24px;
    }
    @media (max-width: 480px) {
        .apps{
            padding: 4px;
        }
        .app-list{
            padding: 40px 0 10px 0;
        }
        .app{
            font-size: 15px;
            height: 180px;
        }
    }
    @media (max-width: 400px) {
        .apps{
            padding: 4px;
        }
        .app-list{
            padding: 40px 0 10px 0;
        }
        .app{
            font-size: 16px;
            width: calc(100% - 50px);
            height: 170px;
        }
    }
</style>