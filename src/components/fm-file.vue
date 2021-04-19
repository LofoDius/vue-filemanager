<template>
  <div class="fm-file__container">
    <button
        @mouseover="focus = true"
        @mouseout="focus = false"
        :class="{'button-focus': focus}"
        @dblclick="$emit('doubleClick')"
    >
      <img :src="iconSrc" alt="icon"/>
      <span>{{ filename }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "fm-file",

  props: {
    filename: {
      type: String,
      default: 'error'
    },

    fileType: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      checked: false,
      focus: false,
    }
  },

  computed: {
    isChecked() {
      return this.checked;
    },

    iconSrc() {
      if (this.fileType === 'unknown')
        return '/fileTypeIcons/unknown.png';
      if (this.fileType === 'directory')
        return '/fileTypeIcons/directory.png'

      return '/fileTypeIcons/' + this.fileType.toUpperCase() + '.png';
    }
  }
}
</script>

<style scoped>
  .fm-file__container {
    user-select: none;
    background: none;
    margin: 5px;
    width: 10vw;
    height: auto;
  }

  img {
    width: calc(3vw + 40px);
  }

  input {
    position: absolute;
    right: 5px;
    top: 5px;
  }

  .button-focus {
    background: rgba(255, 255, 255, 0.5);
    outline: none;
  }

  button {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    width: 10vw;
    overflow: hidden;
    
    font-size: 16px;
    color: rgba(50, 50, 50, 0.9);

    background: none;
    border: none;
  }

  span {
    display: block;
    justify-self: flex-start;
    max-width: 10vw;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  button:focus {
    background: rgba(255, 255, 255, 0.5);
    outline: none;
    overflow: visible;
    word-wrap: anywhere;
  }

  button:focus span {
    white-space: normal;
  }
</style>