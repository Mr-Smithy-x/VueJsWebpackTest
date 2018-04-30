<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/news">News</router-link>
    </nav>
    <!--<img src="./assets/logo.png">-->
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style src="./app.css">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
