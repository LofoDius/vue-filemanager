<template>
  <button>{{ label }}</button>
</template>

<script>
  export default {
    name: "fm-button",

    props: {
      label: {
        type: String,
        default: 'label'
      }
    }
  }
</script>

<style scoped>
  button {
    background: #2F4858;
    color: #E0EEF5;
    font-size: calc(5px + 2vh);
    padding: 10px;
  }
</style>