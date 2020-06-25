<template>
  <div
    class="drag-file"
    v-show="active"
    @dragover.prevent
    @dragenter.prevent
    @drop.prevent="onDrop"
  >
    <b-loading :is-full-page="true" :active.sync="loading" :can-cancel="false"></b-loading>

    <input id="select-file" type="file" style="display: none" />
    <div class="content">
      <unicon name="file-plus" width="45" height="45" />
      <div>Drag your files here</div>
      <div class="btn top" @click="() => {
        if (loading) return;
        selectFile()
      }">
        Select
      </div>
      <div class="btn" @click="() => {
        if (loading) return;
        onCancel()
      }">
        Cancel
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Prop, Component, Vue } from 'vue-property-decorator';
  import { ipcRenderer } from 'electron';

  @Component
  export default class DragFile extends Vue {
    @Prop({ default: false })
    private active!: boolean;
    private selection = false;
    private loading = false;

    @Prop()
    private onCancel!: Function;

    selectFile() {
      const input = document.getElementById('select-file') as HTMLInputElement;
      if (input) {
        this.loading = true;
        input.onchange = () => {
          // @ts-ignore
          for (let f of input.files) {
            ipcRenderer.send('add-file', f.path);
          }

          setTimeout(() => {
            ipcRenderer.send('refresh');
            this.loading = false;
            this.onCancel();
          }, 1000);
        };

        document.body.onfocus = () => {
          setTimeout(() => {
            if (this.selection && this.loading) {
              if (input.value.length < 1) {
                this.loading = false;
              }
            }
            this.selection = false;
            input.value = '';
          }, 100);
        };

        input.click();
        this.selection = true;
      }
    }

    onDrop(e: any) {
      e.preventDefault();
      this.loading = true;

      for (let f of e.dataTransfer.files) {
        ipcRenderer.send('add-file', f.path);
      }

      setTimeout(() => {
        ipcRenderer.send('refresh');
        this.loading = false;
        this.onCancel();
      }, 1000);
      return false;
    }
  }
</script>

<style lang="scss">
  .drag-file {
    background: white;
    color: black;
    z-index: 2;

    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    .content {
      margin: 30px;
      width: calc(100% - 60px);
      height: calc(100% - 60px);

      border: 1px dashed black;
      border-radius: 20px;

      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
    }

    .unicon {
      margin-bottom: 5px;
    }

    .btn {
      color: black;
      cursor: pointer;
      padding: 0 2px 2px;

      &.top {
        margin-top: 20px;
      }

      &:hover {
        padding: 0 2px;
        border-bottom: 2px solid black;
      }
    }

    @media (prefers-color-scheme: dark) {
      background: black;
      color: white;

      .content {
        border-color: white;
      }

      .unicon {
        filter: invert(1);
      }

      .btn {
        color: white;

        &:hover {
          border-bottom-color: white;
        }
      }
    }
  }
</style>
