export default {
    methods: {
        setBreadcrumbs(crumbs) {
            this.$store.commit('SET_BREADCRUMBS', crumbs);
        },

        moveUpBreadcrumbs() {
            this.$store.commit('MOVE_UP_BREADCRUMBS');
        },

        addBreadcrumb(crumb) {
            this.$store.commit('ADD_BREADCRUMB', crumb);
        },

        moveToCrumb(crumb) {
            this.$store.commit('MOVE_TO_CRUMB', crumb)
        },

        moveToHome() {
            this.$store.commit('SET_BREADCRUMBS', []);
        }
    }
}