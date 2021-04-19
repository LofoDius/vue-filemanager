import Vue from 'vue'

export default {
    INIT_STORE: (state) => Vue.set(state, 'breadcrumbs', ''),

    SET_FILES_TO_SHOW: (state, filesToShow) => Vue.set(state, 'filesToShow', filesToShow),

    SET_SELECTED_FILES: (state, selectedFiles) => Vue.set(state, 'selectedFiles', selectedFiles),

    SET_ACTION_TYPE: (state, actionType) => Vue.set(state, 'actionType', actionType),

    SET_BREADCRUMBS: (state, breadcrumbs) => Vue.set(state, 'breadcrumbs', breadcrumbs),

    MOVE_UP_BREADCRUMBS: (state) =>
        Vue.set(state, 'breadcrumbs', state.breadcrumbs.slice(0, state.breadcrumbs.length - 1)),

    ADD_BREADCRUMB: (state, breadcrumb) => {
        let breadcrumbs = [...state.breadcrumbs]
        breadcrumbs.push(breadcrumb)
        Vue.set(state, 'breadcrumbs', breadcrumbs)
    },

    MOVE_TO_CRUMB: (state, crumb) => {
        let breadcrumbs = [...state.breadcrumbs]
        if (!breadcrumbs.includes(crumb)) {
            return;
        }
        breadcrumbs = breadcrumbs.slice(0, breadcrumbs.indexOf(crumb) + 1);
        Vue.set(state, 'breadcrumbs', breadcrumbs)
    },

    SHOW_LOADING: (state, showing) => Vue.set(state, 'showLoading', showing),

    ADD_FILE_TO_PASTE: (state, filePath) => {
        let filesToPaste = [...state.filesToPaste];
        filesToPaste.push(filePath);
        Vue.set(state, 'filesToPaste', filesToPaste);
    },

    SET_FILES_TO_PASTE: (state, filesToPaste) => Vue.set(state, 'filesToPaste', filesToPaste),

    SET_FILES_TO_DELETE: (state, filesToDelete) => Vue.set(state, 'filesToDelete', filesToDelete),
}