import Vue from 'vue'

export default {
    INIT_STORE: (state) => {
        Vue.set(state, 'breadcrumbs', []);
    },
}