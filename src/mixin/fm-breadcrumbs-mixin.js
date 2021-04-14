export default {
    data() {
        return {
            breadcrumbs: [],
        }
    },

    methods: {
        setBreadcrumbs(crumbs) {
            this.breadcrumbs = [...crumbs];

            this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs);
            this.$store.dispatch('LOAD_FILES_TO_SHOW');
        },

        moveUpBreadcrumbs() {
            this.breadcrumbs = this.breadcrumbs.slice(0, this.breadcrumbs.length - 1);

            this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs);
            this.$store.dispatch('LOAD_FILES_TO_SHOW');
        },

        addBreadcrumb(crumb) {
            this.breadcrumbs.push(crumb);

            this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs);
            this.$store.dispatch('LOAD_FILES_TO_SHOW');
        },

        moveToCrumb(crumb) {
            if(!this.breadcrumbs.includes(crumb)) {
                return;
            }

            this.breadcrumbs = this.breadcrumbs.slice(0, this.breadcrumbs.indexOf(crumb) + 1);

            this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs);
            this.$store.dispatch('LOAD_FILES_TO_SHOW');
        },

        moveToHome() {
            this.breadcrumbs = [];

            this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs);
            this.$store.dispatch('LOAD_FILES_TO_SHOW');
        }
    }
}