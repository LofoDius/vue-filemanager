import api from '@/utils/api'

export default {
    LOAD_FILES_TO_SHOW: async (context) => {
        try {
            let files = await api.LOAD_FILES_TO_SHOW((context.getters.GET_BREADCRUMBS).join('/'));
            context.commit('SET_FILES_TO_SHOW', files);
        } catch (e) {
            console.log(e);
        }
    },

    RENAME_FILE: async (context, path, oldName, newName) => {
        try {
            let res = await api.RENAME_FILE(path, oldName, newName);
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
}