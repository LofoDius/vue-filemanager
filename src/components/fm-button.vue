<template>
  <button @click="$emit('onButtonClick', label)">{{ label }}</button>
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
  transition: all 50ms;
  font-size: calc(15px + 1vh);

  background: #33658A;
  color: #E0EEF5;

  padding: 10px;
  margin: 5px;

  border: none;
  cursor: pointer;
}

  button:active {
    transition: all 50ms;
    background: #86BBD8;
  }

  button:focus {
    outline: none;
  }

  button:hover {
    transition: all 150ms;
    transform: scale(1.05);
    opacity: 0.9;
  }

</style>