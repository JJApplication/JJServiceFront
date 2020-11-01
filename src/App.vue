<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>
<style>
  *{
    margin: 0;
    padding: 0;
  }
  /*@font-face {*/
  /*  font-family: 'go';*/
  /*  font-display: fallback;*/
  /*  src: url("./assets/PT_Sans-Narrow-Web-Regular.ttf") format("truetype");*/
  /*}*/
</style>
<style>
html{
  height: 100%;
}
body{
  height: 100%;
}
#app {
  font-family:  'PT Sans Narrow', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  margin: 0 auto;
  background-color: #F7F8FB;
  user-select: none;
  line-height: 1.3;
  -webkit-tap-highlight-color: transparent;
  -webkit-overflow-scrolling: touch;
  -webkit-text-size-adjust: 100%;
}
</style>
