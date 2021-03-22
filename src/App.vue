<template>
  <div id="app">
    <fm-breadcrumbs/>

  </div>
</template>

<script>

  import FmBreadcrumbs from "@/components/fm-breadcrumbs";

  export default {
    name: 'App',
    components: {
      FmBreadcrumbs
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
