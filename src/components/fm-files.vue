<template>
  <div class="fm-files__frame">
    <div class="fm-files__buttons">
      <fm-button
          key="Вставить"
          label="Вставить"
          class="fm-files__buttons-button"
          @onButtonClick="buttonClickHandler"
          v-if="$store.getters.GET_SELECTED_FILES.length !== 0"
      />

      <fm-button
          v-for="button in buttons"
          :key="button"
          :label="button"
          class="fm-files__buttons-button"
          @onButtonClick="buttonClickHandler"
      />
    </div>
    <div class="fm-files__container">
      <loading
          :active.sync="$store.getters.GET_SHOW_LOADING"
          :can-cancel="false"
          :is-full-page="false"
          color="#33658A"
          background-color="#E0EEF5"
      />
      <div class="fm-files__scroll">
        <drag-select class="fm-files__main" attribute="attribute" @change="selectChange($event)">
          <fm-file
              v-for="file in sortedFilesToShow"
              :key="file.path"
              :file-type="file.type"
              :filename="file.name"
              :attribute="file.path"
              :class="{'fm-files__selected-file': selectedFiles.includes(file.path)}"
              @doubleClick="openItem(file.name, file.type, file.path)"
          />
        </drag-select>
      </div>
      <div class="fm-files__preview">
        <div class="fm-files__preview-content" v-if="selectedFiles.length !== 0">
          <img
              :src="previewImage"
              alt="Preview Image"
              width="50%"
              :class="{'zoom-in': canZoomIn}"
              @click="previewClick"
          />
          <div class="fm-files__preview-title"> {{ previewTitle }}</div>
          <div class="'fm-files__preview-last-modified" v-if="this.selectedFiles.length === 1">
            {{ previewLastModified }}
          </div>
          <div class="fm-files__preview-size"> {{ previewSize }}</div>
        </div>

        <div class="fm-files__preview-stub" v-else>
          Выберите что-нибудь для подробной информации
        </div>
      </div>
    </div>

    <div class="fm-files__modal" v-if="showRenameModal">
      <div class="fm-files__modal__container">
        <h1>Переименовать файл</h1>
        <input type="text" v-model="newFileName" @focus="$event.target.select()">
        <div class="fm-files__modal__buttons">
          <button @click="showRenameModal = false">Отмена</button>
          <button @click="renameFile">OK</button>
        </div>
      </div>
    </div>

    <div class="fm-files__modal" v-if="showCreateModal">
      <div class="fm-files__modal__container">
        <h1>Введите имя папки</h1>
        <input type="text" v-model="directoryName" @focus="$event.target.select()">
        <div class="fm-files__modal__buttons">
          <button @click="showCreateModal = false">Отмена</button>
          <button @click="createDirectory">OK</button>
        </div>
      </div>
    </div>

    <div class="fm-files__modal" v-show="filesToReplace[filesToReplace.length -1] === file"
         v-for="file in filesToReplace" :key="file">
      <div class="fm-files__modal__container">
        <h1>Файл с именем {{ file.split('/').pop() }} уже существует!</h1>
        <h2>Заменить существующий файл?</h2>
        <div class="fm-files__modal__buttons">
          <button @click="replacingModalHandler(file, false)">Нет</button>
          <button @click="replacingModalHandler(file, true)">
            Да
          </button>
        </div>
      </div>
    </div>

    <div class="fm-files__modal" v-if="showDeleteModal">
      <div class="fm-files__modal__container">
        <h1>Вы действительно хотите удалить {{ deleteMessage }}?</h1>
        <div class="fm-files__modal__buttons">
          <button @click="deletingModalHandler(false)">Нет</button>
          <button @click="deletingModalHandler(true)">
            Да
          </button>
        </div>
      </div>
    </div>

    <div class="fm-files__file" v-if="showFile" @click="showFile = false">
      <img :src="fileContent" v-if="isImageShowing" alt="Picture" height="90%"/>
      <div class="fm-files__file-container" v-else>
        <h1>{{ fileName }}</h1>
        <div class="fm-files__file-content">{{ fileContent }}</div>
      </div>
    </div>

  </div>
</template>

<script>
import FmButton from "@/components/fm-button";
import FmFile from "@/components/fm-file";
import DragSelect from 'drag-select-vue';
import FmBreadcrumbsMixin from '@/mixin/fm-breadcrumbs-mixin'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css'
import dayjs from 'dayjs';

export default {
  name: "fm-files",
  components: {FmFile, FmButton, DragSelect, Loading},
  data() {
    return {
      buttons: ['Копировать', 'Переименовать', 'Создать папку', 'Удалить'],

      selectedFiles: [],
      filesToShow: [],

      showRenameModal: false,
      oldFileName: '',
      newFileName: '',

      directoryName: '',
      showCreateModal: false,

      showReplaceModal: false,
      filesToReplace: [],

      showDeleteModal: false,
      deleteMessage: '',

      previewTitle: '',
      previewSize: '',
      previewLastModified: '',
      previewImageSource: '',
      previewCanZoomIn: false,

      showFile: false,
      isImage: false,
      fileName: '',
    }
  },

  mounted() {
    this.$store.commit('INIT_STORE');
    this.$store.dispatch('LOAD_FILES_TO_SHOW').then(() => {
      this.filesToShow = this.$store.getters.GET_FILES_TO_SHOW;
    })
  },

  created() {
    setInterval(() => {
      this.filesToShow = this.$store.getters.GET_FILES_TO_SHOW;
    }, 1000);
  },

  computed: {
    previewImage() {
      return this.previewImageSource;
    },

    canZoomIn() {
      return this.previewCanZoomIn;
    },

    sortedFilesToShow() {
      return [...this.filesToShow].sort((a, b) => {
        if (a.type === 'directory' && b.type !== 'directory') {
          return -1;
        } else if (b.type === 'directory' && a.type !== 'directory') {
          return 1;
        }

        return 0;
      });
    },

    fileContent() {
      return this.$store.getters.GET_FILE;
    },

    isImageShowing() {
      return this.isImage;
    }
  },

  methods: {
    selectChange(event) {
      this.selectedFiles = event;
      this.previewCanZoomIn = false;
      if (event.length === 0) {
        return;
      } else if (event.length === 1) {
        let file = this.filesToShow.filter(f => f.path === event[0])[0]
        this.previewTitle = file.name;
        this.previewLastModified = dayjs(file.lastModified).format('DD.MM.YYYY, HH:mm');
        this.previewImageSource = this.getPreviewImage();

        if (file.type === 'directory') return;

        let size = file.size.toFixed(2) / 8.00;
        let divisionCounter = 0;
        while (Math.trunc(size) > 1024 && divisionCounter !== 4) {
          size = size / 1024.0;
          divisionCounter++;
        }
        switch (divisionCounter) {
          case 0: {
            this.previewSize = size.toFixed(2) + ' Байт';
            break;
          }
          case 1: {
            this.previewSize = size.toFixed(2) + ' КБайт';
            break;
          }
          case 2: {
            this.previewSize = size.toFixed(2) + ' МБайт';
            break;
          }
          case 3: {
            this.previewSize = size.toFixed(2) + ' ГБайт';
            break;
          }
          case 4: {
            this.previewSize = size.toFixed(2) + ' ТБайт';
            break;
          }
        }

        const images = ['BMP', 'ICO', 'JPEG', 'JPG', 'PNG', 'WEBP'];
        let fileExt = file.path.split('.').pop().toUpperCase();
        if (images.includes(fileExt)) {
          this.$store.dispatch('GET_FILE', file.path).then(() => {
            this.previewImageSource = `data:image/${fileExt.toLowerCase()};base64,` + this.$store.getters.GET_FILE;
            this.previewCanZoomIn = true;
          })
        }
      } else {
        this.previewTitle = 'Выбрано ' + event.length + ' элемента(ов)';
        let isDirectorySelected = false;
        let totalSize = 0.0;
        for (let i in event) {
          let file = this.filesToShow.filter(f => f.path === event[i])[0]
          if (file.type === 'directory') {
            isDirectorySelected = true;
            break;
          } else {
            totalSize += file.size;
          }
        }

        if (!isDirectorySelected) {
          totalSize /= 8.0;
          let divisionCounter = 0;
          while (Math.trunc(totalSize) > 1024 && divisionCounter !== 4) {
            totalSize = totalSize / 1024.0;
            divisionCounter++;
          }
          switch (divisionCounter) {
            case 0: {
              this.previewSize = totalSize.toFixed(2) + ' Байт';
              break;
            }
            case 1: {
              this.previewSize = totalSize.toFixed(2) + ' КБайт';
              break;
            }
            case 2: {
              this.previewSize = totalSize.toFixed(2) + ' МБайт';
              break;
            }
            case 3: {
              this.previewSize = totalSize.toFixed(2) + ' ГБайт';
              break;
            }
            case 4: {
              this.previewSize = totalSize.toFixed(2) + ' ТБайт';
              break;
            }
          }
        } else this.previewSize = '';
      }
    },

    buttonClickHandler(button) {
      if (this.selectedFiles.length === 0 && button !== 'Создать папку' && button !== 'Вставить')
        return;

      switch (button) {
        case 'Вставить': {
          let isCopyExists = false;
          let filesToCheck = this.$store.getters.GET_SELECTED_FILES;
          for (let i in filesToCheck) {
            if (this.filesToShow.filter(f => f.path === filesToCheck[i]).length !== 0) {
              this.filesToReplace.push(filesToCheck[i]);
              isCopyExists = true;
            }
            this.$store.commit('ADD_FILE_TO_PASTE', filesToCheck[i]);
          }

          if (!isCopyExists) {
            this.$store.commit('SET_FILES_TO_PASTE', filesToCheck);
            this.$store.dispatch('PASTE').then(() => {
              this.filesToShow = this.$store.getters.GET_FILES_TO_SHOW
            });
          }
          break;
        }
        case 'Копировать':
        case 'Вырезать': {
          this.$store.commit('SET_SELECTED_FILES', this.selectedFiles);
          this.$store.commit('SET_ACTION_TYPE', button);
          this.selectedFiles = [];
          break;
        }
        case 'Переименовать': {
          if (this.selectedFiles.length !== 1) {
            this.$notify({group: 'notify', text: 'Выберите только один файл для переименования'});
            return;
          } else {
            let file = this.filesToShow.find(file => file.path === this.selectedFiles[0]);

            if (file.type === 'directory') {
              this.oldFileName = file.name;
              this.newFileName = file.name;
            } else {
              let lastDotIndex = file.name.lastIndexOf('.');
              this.oldFileName = file.name.substring(0, lastDotIndex);
              this.newFileName = file.name.substring(0, lastDotIndex);
            }
            this.showRenameModal = true;
          }
          break;
        }
        case 'Удалить': {
          if (this.selectedFiles.length === 1) {
            this.deleteMessage = this.selectedFiles[0].split('/').pop();
          } else {
            this.deleteMessage = this.selectedFiles.length + ' файла(ов)';
          }

          this.$store.commit('SET_FILES_TO_DELETE', this.selectedFiles);
          this.showDeleteModal = true;
          break;
        }
        case 'Создать папку': {
          this.directoryName = '';
          this.showCreateModal = true;
          break;
        }
        default: {
          break;
        }
      }
    },

    createDirectory() {
      this.showCreateModal = false;
      if (this.filesToShow.filter(file => file.name === this.directoryName).length !== 0) {
        this.$notify({group: 'notify', text: 'Такое имя уже используется!'});
        return;
      }
      this.$store.dispatch('CREATE_DIRECTORY', this.directoryName);
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

    openItem(fileName, fileType, filePath) {
      if (fileType === 'directory') {
        this.addBreadcrumb(fileName);
        this.selectedFiles = [];
        this.filesToShow = this.$store.getters.GET_FILES_TO_SHOW;
        return;
      }

      this.$store.dispatch('GET_FILE', filePath).then(() => {
        const images = ['BMP', 'ICO', 'JPEG', 'JPG', 'PNG', 'WEBP'];
        const files = ['C', 'CFG', 'CS', 'CSS', 'HTML', 'INI', 'LOG', 'PHP', 'SQL', 'TXT', 'JS', 'VUE', 'JSON',
          'KT', 'JAVA', 'XML'];

        let fileExt = filePath.split('.');
        fileExt = fileExt[fileExt.length - 1].toUpperCase();

        if (images.includes(fileExt)) {
          this.isImage = true;
          let fileContent = this.$store.getters.GET_FILE;
          fileContent = `data:image/${fileType.toLowerCase()};base64,` + fileContent;
          this.$store.commit('SET_FILE', fileContent);
        } else if (files.includes(fileExt)) {
          this.isImage = false;
          this.fileName = fileName;
        } else {
          this.$notify({group: 'notify', text: 'Файлы с таким расширением не поддерживаются'});
          return;
        }
        this.showFile = true;
      })
    },

    replacingModalHandler(filePath, choice) {
      this.filesToReplace = this.filesToReplace.filter(f => f !== filePath);
      if (choice) {
        this.$store.commit('ADD_FILE_TO_PASTE', filePath);
        if (this.filesToReplace.length === 0) {
          this.$store.dispatch('PASTE')
        }
      }
    },

    deletingModalHandler(choice) {
      this.showDeleteModal = false;
      if (choice) {
        this.$store.dispatch('DELETE').then(() => {
          this.filesToShow = this.$store.getters.GET_FILES_TO_SHOW;
        });
      } else {
        this.$store.commit('SET_FILES_TO_DELETE', []);
      }
    },

    getPreviewImage() {
      if (this.selectedFiles.length === 1) {
        let file = this.filesToShow.filter(f => f.path === this.selectedFiles[0])

        if (file.length === 0) return;
        else file = file[0];

        switch (file.type) {
          case 'directory': {
            return '/fileTypeIcons/directory.png';
          }
          case 'unknown': {
            return '/fileTypeIcons/unknown.png';
          }
          default: {
            return `/fileTypeIcons/${file.type}.png`
          }
        }
      } else {
        return '/fileTypeIcons/many.png'
      }
    },

    previewClick() {
      if (this.previewCanZoomIn === false) return;

      let file = this.filesToShow.filter(f => f.path === this.selectedFiles[0]).pop();
      this.openItem(file.name, file.type, file.path);
    }
  },

  watch: {
    filesToShow() {
      this.$store.commit("SHOW_LOADING", false);
    },
    '$store.state.breadcrumbs'() {
      this.showFile = false;
      this.showDeleteModal = false;
      this.showReplaceModal = false;
      this.showCreateModal = false;
      this.showRenameModal = false;
    }
  },

  mixins: [
    FmBreadcrumbsMixin,
  ]
}
</script>

<style scoped>
.fm-files__frame {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 5vh auto;
  width: 90%;
  height: 60%;
}

.fm-files__container {
  display: flex;
  flex-direction: row;
  background: #E0EEF5;
  width: 100%;
  height: calc(100% - 1vh - 45px);
  overflow: hidden;
}

.fm-files__preview {
  background: #B3D5E7;
  width: 25%;
  height: 100%;
}

.fm-files__buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;

  padding: 5px 15px;
  border-bottom: 1px solid #2c3e50;
  background: #86BBD8;
  user-select: none;
}

.fm-files__buttons-button:last-child {
  margin-left: auto;
}

.fm-files__buttons-button:last-child:active {
  transition: all 50ms;
  background: #FF0800;
}

.fm-files__scroll {
  overflow: auto;
  width: 75%;
}

.fm-files__main {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
}

.fm-files__selected-file {
  background: rgba(255, 255, 255, 0.5);
}

.fm-files__modal {
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

.fm-files__modal__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 15px;
  background: #E0EEF5;
}

.fm-files__modal__container h1 {
  font-size: 24px;
  margin: 0 14px 24px;
  padding: 0;
}

.fm-files__modal__container input {
  width: 85%;

  border: 1px #2F4858 solid;

  font-size: 16px;
  line-height: 24px;

  padding: 2px 4px;
}

.fm-files__modal__container input:focus {
  outline: none;
}

.fm-files__modal__buttons {
  display: flex;
  justify-content: space-between;
  width: calc(85% + 10px);
  margin-top: 16px;
}

.fm-files__modal__buttons button {
  font-size: 16px;
  background: #33658A;
  color: #E0EEF5;
  border: none;
  padding: 8px;
  margin: 0;
}

.fm-files__modal__buttons button:last-child {
  padding: 8px 30px;
}

.fm-files__modal__buttons button:active {
  transition: all 50ms;
  background: #86BBD8;;
}

.fm-files__modal__buttons button:focus {
  outline: none;
}

.fm-files__preview-stub {
  display: flex;
  width: 70%;
  height: 100%;
  margin: auto auto;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #33658A;
}

.fm-files__preview-content img {
  margin-top: 15px;
}

.zoom-in {
  cursor: zoom-in;
}

.fm-files__file {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.fm-files__file-container {
  width: 60%;
  height: 80%;

  padding: 15px;

  background: #E0EEF5;
  font-size: 16px;
  text-align: start;
  overflow: auto;
  white-space: pre-wrap;
}

.fm-files__file-container h1 {
  margin: 15px 20px 30px;
  padding: 0 0 5px;
  border-bottom: 1px solid #2c3e50;
}

.fm-files__file-content {
  margin-left: 20px;
}
</style>