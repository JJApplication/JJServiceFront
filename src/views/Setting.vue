<template>
    <div class="setting">
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
        <div class="panel">
            <p style="margin-top: 40px;margin-bottom: 60px;color: #555555">优先使用localstorage存储token，当indexeddb被使用时对前者不影响.</p>
            <div class="input">
                <span>User's Token</span>
                <input type="text" placeholder="参数设置" v-model="usertoken">
            </div>
            <div class="input">
                <span>LocalStorage token池</span>
                <input type="text" placeholder="参数设置" v-model="token">
            </div>
            <div class="input">
                <span>IndexedDB token池</span>
                <input type="text" placeholder="参数设置">
            </div>

            <div class="btns">
                <span class="bt" @click="generate_token()" style="margin-left: 0">生成Token</span>
                <span class="bt" @click="del_token()" style="margin-left: 30px">清除Token</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Setting",
        data(){
            return{
                usertoken: "",
                token: ""
            }
        },
        mounted(){
            this.get_token();
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
            get_token(){
                let token = localStorage.getItem("token");
                if(token !== ""){
                    this.token = token;
                }
            },
            generate_token(){
                let usertoken = this.usertoken;
                if(usertoken !== ""){
                    this.$axios({method: "post",url: "/api/login",headers: {"tokenstring":usertoken}}).then(res=>{
                        console.log(res.data);
                        if(res.data.data !== ""){
                            this.token = res.data.data;
                            localStorage.setItem("token",res.data.data);
                        }
                    })
                }
            },
            del_token(){
                this.token = "";
                localStorage.setItem("token", "");
            }
        }
    }
</script>

<style scoped>
    .setting{
        padding: 4px 10px;
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
    .input{
        padding: 4px 10px;
    }
    .input span{
        display: inline-block;
        width: 150px;
        text-align: left;
    }
    .input input{
        padding: 2px;
        line-height: 1.4;
        border: 1px solid black;
        width: 300px;
        max-width: 300px;
    }
    .panel{
        margin-top: 80px;
    }
    .panel .btns{
        margin-top: 60px;
        margin-left: 0;
    }
    .panel .btns .bt{
        padding: 6px 10px;
        background-color: #555555;
        color: white;
    }
    .panel .btns .bt:hover{
        background-color: #222222;
        color: white;
    }
    @media (max-width: 480px) {
        .setting {
            padding: 4px;
        }
    }
</style>