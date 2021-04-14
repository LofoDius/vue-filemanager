<template>
  <div id="app">
    <fm-breadcrumbs/>
    <fm-files class="files"/>
    <notifications group="notify" position="right bottom"/>
  </div>
</template>

<script>
  import FmBreadcrumbs from "@/components/fm-breadcrumbs";
  import FmFiles from "@/components/fm-files";

  export default {
    name: 'App',
    components: {
      FmFiles,
      FmBreadcrumbs
    },
  }
</script>

<style>
  html, body {
    height: calc(100% - 60px);
  }

  #app {
    font-family: "Noto Sans", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    height: calc(100% - 60px);
  }

  .notification-content {
    font-size: 16px;
  }

</style>
