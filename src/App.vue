<template>
  <div id="app">
    <app-header />
    <router-view />
    
  </div>
</template>
<script>
export default {
  components: {
    AppHeader: () => import("@/components/layout/AppHeader.vue"),
  },
};
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
}
::-webkit-scrollbar{
  display: none;
}
a{
  color: inherit;
  text-decoration: none;
}

#app {
  font-family: "Poppins", Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
