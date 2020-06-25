<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class App extends Vue {
  }
</script>

<style lang="scss">
  ::-webkit-scrollbar {
    width: 0;
  }

  body {
    font-family: 'Quicksand', sans-serif !important;
    user-select: none;
    font-weight: 600;
  }
</style>
