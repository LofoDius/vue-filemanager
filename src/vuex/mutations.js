import Vue from 'vue'

export default {
    INIT_STORE: (state) => {
        Vue.set(state, 'breadcrumbs', '');
    },

    SET_FILES_TO_SHOW: (state, filesToShow) => {
        Vue.set(state, 'filesToShow', filesToShow);
    },

    SET_SELECTED_FILES: (state, selectedFiles) => {
        Vue.set(state, 'selectedFiles', selectedFiles);
    },

    SET_ACTION_TYPE: (state, actionType) => {
        Vue.set(state, 'actionType', actionType);
    },

    SET_BREADCRUMBS: (state, breadcrumbs) => {
        Vue.set(state, 'breadcrumbs', breadcrumbs);
    },
}