<template>
  <div class="fm-files__container">

    <div class="fm-files__buttons">
      <fm-button v-for="button in buttons" :key="button" :label="button"/>
    </div>

    <div class="fm-files__frame">

      <div class="fm-files__manager-window">

      </div>

      <div class="fm-files__preview">

      </div>
    </div>

  </div>
</template>

<script>
import FmButton from "@/components/fm-button";

export default {
  name: "fm-files",
  components: {FmButton},
  data() {
    return {
      buttons: ['Копировать', 'Вырезать', 'Переименовать', 'Удалить']
    }
  }
}
</script>

<style scoped>
.fm-files__container {
  display: flex;
  flex-direction: column;
  background: red;
  margin: 50px auto;
  width: 90%;
  height: 90%;
}

.fm-files__frame {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.fm-files__preview {
  width: 25%;
  height: 100%;
  background: #2c3e50;
}

.fm-files__buttons {
  background: lightcoral;
}

.fm-files__manager-window {
  background: yellow;
  width: 75%;
  height: 100%;
}

</style>