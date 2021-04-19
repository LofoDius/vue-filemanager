export default {
    GET_FILES_TO_SHOW: (state) => state.filesToShow,
    GET_BREADCRUMBS: (state) => [...state.breadcrumbs],
    GET_SHOW_LOADING: (state) => state.showLoading,
    GET_SELECTED_FILES: (state) => state.selectedFiles,
    GET_FILES_TO_PASTE: (state) => state.filesToPaste,
}