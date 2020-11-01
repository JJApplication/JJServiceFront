<template>
    <div class="app">
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
        <div class="control-panel">
            <div class="head animated fadeInDown"><img src="@/assets/app.svg" style="vertical-align: middle"><p style="display: inline-block;vertical-align: middle;margin-left: 8px">
                <span style="color: #378de5;font-weight: bold;margin-right: 10px">APP</span>
                {{app.App_name}}</p>
            </div>
            <div class="panel animated fadeInDown" style="animation-delay: .5s">
                <div class="pbt-group">
                    <span class="pbt" @click="start_app()"><img src="@/assets/start.svg">start</span>
                    <span class="pbt" @click="stop_app()" style="background-color: #ff5d65"><img src="@/assets/stop.svg">stop</span>
                    <span class="pbt" @click="get_app_log()" style="background-color: #555555"><img src="@/assets/log.svg">log</span>
                    <span class="pbt" @click="del_app_log()" style="background-color: #555555"><img src="@/assets/rm.svg">clear</span>
                    <span class="pbt" @click="backup_app()" style="background-color: #555555"><img src="@/assets/backup.svg">backup</span>
                    <span class="pbt" style="background-color: #f0f0f0;color: #444444;">status
                    <i v-if="status === 'alive'" style="margin-left: 5px;display: inline-block;border-radius: 50%;height: 20px;width: 20px;background-color: chartreuse;vertical-align: middle"></i>
                    <i v-else style="margin-left: 5px;display: inline-block;border-radius: 50%;height: 20px;width: 20px;background-color: #ff3200;vertical-align: middle"></i>
                </span>
                </div>
                <div class="info">
                    <h3>基础信息</h3>
                    <p>APP ID<span style="margin-left: 10px">{{app.App_id}}</span></p>
                    <p>服务名称<span style="margin-left: 10px">{{app.App_name}}</span></p>
                    <p>服务别名<span style="margin-left: 10px">{{app.App_code}}</span></p>
                    <p>描述信息<span style="margin-left: 10px">{{app.App_des}}</span></p>
                    <h3>构建信息</h3>
                    <p>版本号<span style="margin-left: 10px">{{app.App_version}}</span></p>
                    <p>构建号<span style="margin-left: 10px">{{app.App_build}}</span></p>
                    <p>开发状态<span style="margin-left: 10px" v-if="app.App_dev">开发完毕 ✅</span><span style="margin-left: 10px" v-else>正在开发 🔨</span></p>
                    <h3>运行信息</h3>
                    <p>端口<span style="margin-left: 10px">{{app.App_port}}</span></p>
                </div>
            </div>
        </div>
        <Table v-show="table_show" v-on:close="close" v-bind:log="log"></Table>
    </div>
</template>

<script>
    import Table from "../components/table";
    export default {
        name: "App",
        data(){
            return{
                app: {},
                status: "",
                table_show: false,
                log: ""
            }
        },
        components: {Table},
        mounted(){
          this.app_info();
        },
        methods:{
            refresh(){
                window.location.reload();
            },
            close(){
                this.table_show = false;
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
            app_info(){
                let app_id = this.$route.params.app_id;
                console.log(app_id);
                this.$axios({method: "post",url: "/api/status/app/" + app_id}).then(res=>{
                    this.app = res.data.data;
                    this.get_status();
                })
            },
            get_status(){
                let app_code = this.app.App_code;
                this.$axios.post("/api/status/" + app_code).then(res=>{
                    console.log(res.data);
                    this.status = res.data.data;
                })
            },
            // 功能函数
            start_app(){
                this.api("/api/start/", "启动失败", "启动成功");
            },
            stop_app(){
                this.api("/api/stop/", "停止失败", "停止成功");
            },
            get_app_log(){
                let app_code = this.app.App_code;
                let token = localStorage.getItem("token");
                if(this.check_token(token)){
                    this.$axios({method: "get", url: "/api/log/" + app_code,headers: {"token":token}}).then(res=>{
                        let data = res.data.data;
                        if(data === "failed"){
                            this.log = "Get Logs Failed";
                            this.table_show = true;
                        }else {
                            this.log = data;
                            this.table_show = true;
                        }
                    }).catch(err=>{
                        this.log = "Get Logs Failed";
                        this.table_show = true;
                    });
                }else{
                    alert("操作前请获取Token");
                }

            },
            del_app_log(){
                this.api("/api/log/", "删除失败", "删除成功");
            },
            backup_app(){
                this.api("/api/backup/", "备份失败", "备份成功");
            },
            api(url,fail,success){
                let app_code = this.app.App_code;
                let token = localStorage.getItem("token");
                if(this.check_token(token)){
                    this.$axios({method: "post", url: url + app_code,headers: {"token":token}}).then(res=>{
                        let data = res.data.data;
                        if(data === "success"){
                            alert(success);
                        }else if(data === "failed"){
                            alert(fail);
                        }
                    }).catch(err=>{
                        alert("Token已过期");
                    });
                }else{
                    alert("操作前请获取Token");
                }

            },
            check_token(token){
                return token !== "";
            }
        }
    }
</script>

<style scoped>
    .app{
        height: fit-content;
        padding: 4px 10px;
        background-color: #F7F8FB;
    }
    @media (max-width: 400px) {
        .app{padding: 4px;}
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
    .control-panel{
        text-align: left;
        padding: 10px;
        max-width: 960px;
        margin: 80px auto 0;
    }
    .control-panel .head{
        box-shadow: 0 0 5px 1px rgba(182, 188, 224, 0.8);
        font-size: 25px;
        padding: 10px 6px;
        background-color: white;
    }
    .head img{width: 40px;height: 40px}
    .control-panel .panel{
        margin-top: 20px;
        box-shadow: 0 0 5px 1px rgba(182, 188, 224, 0.8);
        font-size: 20px;
        padding: 15px 6px;
        background-color: white;
    }
    .control-panel .panel .pbt-group{
        display: flex;
        justify-content: space-between;
        align-content: space-between;
        margin-left: 15px;
        max-width: 560px;
    }
    .control-panel .panel .pbt{
        display: inline-block;
        background-color: #378de5;
        color: #ffffff;
        font-size: 20px;
        padding: 2px 10px 2px 6px;
        vertical-align: middle;
        cursor: pointer;
        transition: all .4s ease;
        box-shadow: 0 0 10px 2px rgba(182, 188, 224, 0.8);
    }
    .control-panel .panel .pbt:hover{
        color: #222222;
    }
    .panel .info{
        margin-left: 15px;
        margin-top: 20px;
        font-size: 18px;
    }
    .pbt img{
        width: 25px;
        height: 26px;
        vertical-align: middle;
    }
    @media (max-width: 480px) {
        .control-panel .panel .pbt-group{
            margin-left: 10px;
            flex-wrap: wrap;
            max-width: calc(100% - 20px);
        }
        .control-panel .panel .pbt{
            font-size: 16px;
            transition: all .4s ease;
            padding: 2px 6px 2px 4px;
            width: 65px;
            margin-bottom: 8px;
        }
        .panel .info{
            margin-left: 10px;
        }
    }
    .info h3{
        display: inline-block;
        margin-top: 20px;
        margin-bottom: 10px;
        color: #888888;
        border-bottom: 4px solid #888888;
        font-size: 24px;
    }
</style>