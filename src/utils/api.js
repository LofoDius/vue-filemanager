import axios from 'axios'

const client = axios.create({
    baseURL: '/api/',
});

export default {
    LOAD_FILES_TO_SHOW: (path) => {
        return client.post('getDirectoryItems', {path})
            .then((res) => Promise.resolve(res.data));
    },

    RENAME_FILE: ({path, oldName, newName}) => {
        return client.post('renameFile', {path, newName, oldName})
            .then((res) => Promise.resolve(res.data));
    }
}