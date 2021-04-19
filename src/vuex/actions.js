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
            await api.RENAME_FILE(path, oldName, newName);
        } catch (e) {
            console.log(e);
        }
    },

    CREATE_DIRECTORY: async (context, directoryName) => {
        try {
            await api.CREATE_DIRECTORY(context.getters.GET_BREADCRUMBS.join('/'), directoryName);
            await context.dispatch('LOAD_FILES_TO_SHOW');
        } catch (e) {
            console.log(e);
        }
    },

    PASTE: async (context) => {
        try {
            await api.PASTE(context.getters.GET_FILES_TO_PASTE, context.getters.GET_BREADCRUMBS.join('/'));
            await context.dispatch('LOAD_FILES_TO_SHOW');
            context.commit('SET_FILES_TO_PASTE', []);
        } catch (e) {
            console.log(e);
        }
    },

    DELETE: async (context) => {
      try {
          await api.DELETE(context.getters.GET_FILES_TO_DELETE);
          await context.dispatch('LOAD_FILES_TO_SHOW');
          context.commit('SET_FILES_TO_DELETE', []);
      }  catch (e) {
          console.log(e);
      }
    },
}