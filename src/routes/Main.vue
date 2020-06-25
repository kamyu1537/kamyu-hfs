<template>
  <div>
    <DragFile :active="addFile" :onCancel="toggleAddFile" />
    <b-loading :is-full-page="true" :active.sync="loading" :can-cancel="false"></b-loading>

    <div class="k-main">
      <div class="k-title">
        File Server
        <div class="port">({{ port }})</div>
      </div>

      <div class="k-buttons">
        <a href="#" @click="toggleAddFile">
          <unicon name="file-plus" fill="black" />
        </a>
      </div>

      <div class="k-list">
        <div class="empty" v-show="files.length < 1 && dirs.length < 1">Empty</div>
        <div class="k-item" v-for="dir in dirs" :key="dir.filename" @click="delItem(dir.filename)">
          <unicon name="folder" />
          {{ dir.filename }}
        </div>
        <div class="k-item" v-for="file in files" :key="file.filename" @click="delItem(file.filename)">
          <unicon name="file" />
          {{ file.filename }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import DragFile from '@/components/DragFile.vue';
  import { ipcRenderer } from 'electron';

  @Component({
    components: {
      DragFile
    }
  })

  export default class Main extends Vue {
    private addFile = false;
    private loading = false;

    get port() {
      return this.$store.state.server.port;
    }

    get files() {
      return this.$store.state.path.files;
    }

    get dirs() {
      return this.$store.state.path.dirs;
    }

    mounted() {
      setTimeout(() => {
        ipcRenderer.send('get-port');
        ipcRenderer.send('refresh');
      }, 500);
    }

    delItem(filename: string) {
      if (this.loading) return;

      this.loading = true;
      ipcRenderer.send('del-file', filename);
      setTimeout(() => {
        ipcRenderer.send('refresh');
        this.loading = false;
      }, 500);
    }

    toggleAddFile() {
      this.addFile = !this.addFile;
    }
  }
</script>

<style lang="scss" src="./Main.scss">
</style>
