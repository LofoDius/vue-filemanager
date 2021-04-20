<template>
  <div id="app">
    <div class="fm">
      <fm-breadcrumbs/>
      <fm-files class="files"/>
    </div>
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
  height: 100vh;
  overflow: hidden;
}

#app {
  font-family: "Noto Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%
}

.notification-content {
  font-size: 16px;
}


.fm {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
