export default {
    data() {
        return {
            breadcrumbs: ['lofod', 'projects', 'vue-filemanager'],
        }
    },

    methods: {
        setBreadcrumbs(crumbs) {
            this.breadcrumbs = [...crumbs];
        },

        moveUpBreadcrumbs() {
            this.breadcrumbs = this.breadcrumbs.slice(0, this.breadcrumbs.length - 1);
        },

        addBreadcrumb(crumb) {
            this.breadcrumbs.push(crumb);
        },

        moveToCrumb(crumb) {
            if(!this.breadcrumbs.includes(crumb)) {
                return;
            }

            this.breadcrumbs = this.breadcrumbs.slice(0, this.breadcrumbs.indexOf(crumb) + 1);
        }
    }
}