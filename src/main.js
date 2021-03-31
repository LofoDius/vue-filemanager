import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

Vue.use(Vuex);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    breadcrumbs: [],
  }
})

new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')
