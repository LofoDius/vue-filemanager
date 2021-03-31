export default {
    getBreadcrumbs: (state) => state.breadcrumbs,
    getPath: (state) => {
        let path = '';
        state.breadcrumbs.forEach((crumb) => path += '/' + crumb);
        return path;
    },

}