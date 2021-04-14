<template>
  <div class="fm-files__frame">
    <div class="fm-files__buttons">
      <fm-button
          v-for="button in buttons"
          :key="button"
          :label="button"
          class="fm-files__buttons-button"
          @onButtonClick="buttonClickHandler"
      />
    </div>
    <div class="fm-files__container">
      <drag-select class="fm-files__main" attribute="attribute" @change="selectedFiles = $event">
        <fm-file
            v-for="file in filesToShow"
            :key="file.path"
            :file-type="file.type"
            :filename="file.name"
            :attribute="file.path"
            :class="{'fm-files__selected-file': selectedFiles.includes(file.path)}"
            @dblclick="openFolder(file.name, file.type)"
        />
      </drag-select>
      <div class="fm-files__preview">

      </div>
    </div>

    <div class="fm-files__modal-rename" v-if="showRenameModal">
      <div class="fm-files__modal-rename__container">
        <h1>Переименовать файл</h1>
        <input type="text" v-model="newFileName" @focus="$event.target.select()">
        <div class="fm-files__modal-rename__buttons">
          <button @click="showRenameModal = false">Отмена</button>
          <button @click="renameFile">OK</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import FmButton from "@/components/fm-button";
import FmFile from "@/components/fm-file";
import DragSelect from 'drag-select-vue';
import FmBreadcrumbsMixin from '@/mixin/fm-breadcrumbs-mixin'

export default {
  name: "fm-files",
  components: {FmFile, FmButton, DragSelect},
  data() {
    return {
      buttons: ['Копировать', 'Вырезать', 'Переименовать', 'Удалить'],
      selectedFiles: [],
      filesToShow: [],
      showRenameModal: false,
      oldFileName: '',
      newFileName: '',
    }
  },

  mounted() {
    this.$store.commit('INIT_STORE');
    this.$store.dispatch('LOAD_FILES_TO_SHOW').then(() => {
      this.filesToShow = this.$store.getters.GET_FILES_TO_SHOW;
      console.log(this.filesToShow);
    })
  },

  methods: {
    buttonClickHandler(button) {
      if (this.selectedFiles.length === 0)
        return;

      switch (button) {
        case 'Копировать':
        case 'Вырезать': {
          this.$store.commit('SET_SELECTED_FILES', this.selectedFiles);
          this.$store.commit('SET_ACTION_TYPE', button);
          this.selectedFiles = [];
          break;
        }
        case 'Переименовать': {
          if (this.selectedFiles.length !== 1) {
            console.log('here');
            this.$notify({group: 'notify', text: 'Выберите только один файл для переименования'});
            return;
          } else {
            let file = this.filesToShow.find(file => file.path === this.selectedFiles[0]);
            console.log(file);
            let lastDotIndex = file.name.lastIndexOf('.');
            this.oldFileName = file.name.substring(0, lastDotIndex);
            this.newFileName = file.name.substring(0, lastDotIndex);
            this.showRenameModal = true;
          }
          break;
        }
        case 'Удалить': {

          break;
        }
        default: {
          break;
        }
      }
    },

    renameFile() {
      this.showRenameModal = false;
      for (let i in this.filesToShow) {
        if (this.filesToShow[i].path === this.selectedFiles[0]) {
          this.filesToShow[i].name = this.filesToShow[i].name.replace(this.oldFileName, this.newFileName);
          this.filesToShow[i].path = this.filesToShow[i].path.replace(this.oldFileName, this.newFileName);
        }
      }

      this.$store.dispatch('RENAME_FILE', {
        path: this.selectedFiles[0],
        oldName: this.oldFileName,
        newName: this.newFileName
      });
    },

    openFolder(fileName, fileType) {
      console.log(fileName);
      if (fileType !== 'directory') {
        return;
      }
      this.addBreadcrumb(fileName);
    },
  },

  mixins: {
    FmBreadcrumbsMixin,
  }
}
</script>

<style scoped>
.fm-files__frame {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  width: 90%;
  height: 90%;
}

.fm-files__container {
  display: flex;
  flex-direction: row;
  background: #E0EEF5;
  width: 100%;
  height: 100%;
}

.fm-files__preview {
  background: #B3D5E7;
  width: 35%;
  height: 100%;
}

.fm-files__buttons {
  background: #86BBD8;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;

  padding: 5px 15px;
  border-bottom: 1px solid #2c3e50;

  user-select: none;
}

.fm-files__buttons-button:last-child {
  margin-left: auto;
}

.fm-files__buttons-button:last-child:active {
  transition: all 50ms;
  background: #FF0800;
}

.fm-files__main {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  width: 65%;
}

.fm-files__selected-file {
  background: rgba(255, 255, 255, 0.5);
}

.fm-files__modal-rename {
  position: absolute;
  left: 0;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);
}

.fm-files__modal-rename__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 15px;
  background: #E0EEF5;
}

.fm-files__modal-rename__container h1 {
  font-size: 24px;
  margin: 0 14px 24px;
  padding: 0;
}

.fm-files__modal-rename__container input {
  width: 85%;

  border: 1px #2F4858 solid;

  font-size: 16px;
  line-height: 24px;

  padding: 2px 4px;
}

.fm-files__modal-rename__container input:focus {
  outline: none;
}

.fm-files__modal-rename__buttons {
  display: flex;
  justify-content: space-between;
  width: calc(85% + 10px);
  margin-top: 16px;
}

.fm-files__modal-rename__buttons button {
  font-size: 16px;
  background: #33658A;
  color: #E0EEF5;
  border: none;
  padding: 8px;
  margin: 0;
}

.fm-files__modal-rename__buttons button:last-child {
  padding: 8px 30px;
}

.fm-files__modal-rename__buttons button:active {
  transition: all 50ms;
  background: #86BBD8;;
}

.fm-files__modal-rename__buttons button:focus {
  outline: none;
}
</style>