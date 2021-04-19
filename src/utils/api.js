import axios from 'axios'

const client = axios.create({
    baseURL: '/api/',
});

export default {
    LOAD_FILES_TO_SHOW: (path) => {
        return client.post('getDirectoryItems', {path})
            .then((res) => Promise.resolve(res.data));
    },

    RENAME_FILE: ({path, newName, oldName}) => {
        return client.post('renameFile', {path, newName, oldName})
            .then((res) => Promise.resolve(res.data));
    },

    CREATE_DIRECTORY: (path, directoryName) => {
        return client.post('createDirectory', {path, directoryName}).then((res) => Promise.resolve(res.data));
    },

    PASTE: (filesToPaste, pathToPaste) => {
        return client.post('paste', {filesToPaste, pathToPaste}).then((res) => Promise.resolve(res.data))
    }
}