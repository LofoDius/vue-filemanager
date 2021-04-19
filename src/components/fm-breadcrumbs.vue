<template>
  <div class="fm-breadcrumbs">
    <div class="fm-breadcrumbs__home-button" @click="this.moveToHome"></div>
    <div class="fm-breadcrumbs__path-elem"
         v-for="folder in path"
         :key="folder"
         @click="moveToCrumb(folder)"
    >
      {{ folder }}
    </div>
  </div>
</template>

<script>
  import FmBreadcrumbsMixin from "@/mixin/fm-breadcrumbs-mixin";

  export default {
    name: "fm-breadcrumbs",

    mixins: [
      FmBreadcrumbsMixin,
    ],

    computed: {
      path() {
        return this.$store.getters.GET_BREADCRUMBS
      },
    },

    watch: {
      '$store.state.breadcrumbs': function () {
        this.$store.commit('SHOW_LOADING', true);
        this.$store.dispatch('LOAD_FILES_TO_SHOW');
      }
    }
  }
</script>

<style scoped>
  .fm-breadcrumbs {
    display: flex;
    align-items: center;
    margin: 0 auto;
    height: calc(30px + 2vh);
    width: 90%;
  }

  .fm-breadcrumbs__home-button {
    height: calc(30px + 2vh);
    width: calc(18px + 3vw);

    margin: 0;
    padding-right: 10px;

    cursor: pointer;

    background: #2F4858 url("../assets/home.svg") no-repeat 35% 50%;
    background-size: calc(18px + 1vh);
    clip-path: polygon(0 0, calc(100% - 23px) 0, 100% 50%, calc(100% - 23px) 100%, 0 100%);
  }

  .fm-breadcrumbs__home-button:focus {
    outline: none;
  }

  .fm-breadcrumbs__home-button:hover {
    background: #315771 url("../assets/home.svg") no-repeat 35% 50%;
  }

  .fm-breadcrumbs__path-elem {
    transition: all 0.2s .200ms;
    display: flex;
    align-items: center;

    height: calc(24px + 2vh);

    margin-left: -10px;
    padding: 0 25px 0 30px;

    color: #E0EEF5;
    font-size: calc(15px + 1vh);
    background-color: #33658A;

    cursor: pointer;
    user-select: none;

    border: none;
    clip-path: polygon(calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%, 0 0);
  }

  .fm-breadcrumbs__path-elem:focus {
    outline: none;
  }

  .fm-breadcrumbs__path-elem:hover {
    transition: all 0.2s .200ms;
    height: calc(30px + 2vh);
    margin-left: -13px;
    margin-right: -3px;
    padding-right: 28px;
    padding-left: 33px;
    clip-path: polygon(calc(100% - 23px) 0, 100% 50%, calc(100% - 23px) 100%, 0 100%, 23px 50%, 0 0);
  }
</style>