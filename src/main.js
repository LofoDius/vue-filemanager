import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import actions from '@/vuex/actions';
import mutations from "@/vuex/mutations";
import getters from "@/vuex/getters";
import Notifications from 'vue-notification';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(Notifications);

const store = new Vuex.Store({
  state: {
    breadcrumbs: [],
    filesToShow: [],
    fileToPreview: null,
    filesToPaste: [],
    filesToDelete: [],
    selectedFiles: [],
    actionType: [],
    showLoading: false,
  },
  mutations: mutations,
  getters: getters,
  actions: actions
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
