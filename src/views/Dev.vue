<template>
  <div class="home">
    <home-header></home-header>
    <div class="banner animated fadeInDown" v-show="banshow">
      <strong style="font-size: 30px;margin-bottom: 5px;display: block">Top Banner</strong><br>
      <p>This's Application page of Renj.io</p><br>
      <p>still building🔨</p>
      <p>contact: <span style="color: #42b983">mail@renj.io</span></p>
      <p>site: <a href="http://renj.io" style="color: #378de5">http://renj.io</a></p>
      <p style="margin-top: 150px">🎨comming soon</p>
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
      banshow: false,
    }
  },
  mounted() {
    setTimeout(()=>{
      this.banshow = true;
    },800);
  }
}
</script>

<style scoped>
  .home{
    height: 100%;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .banner{
    display: block;
    padding: 20px;
    align-self: center;
    box-shadow: 1px 2px 8px #999999;
    max-width: 360px;
    width: 400px;
    height: 380px;
    border-radius: 20px;
    font-size: 20px;
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
</style>