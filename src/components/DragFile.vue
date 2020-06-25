<template>
  <div
    class="drag-file"
    v-show="active"
    @dragover.prevent
    @dragenter.prevent
    @drop.prevent="onDrop"
  >
    <b-loading :is-full-page="true" :active.sync="loading" :can-cancel="false"></b-loading>

    <div class="content">
      <unicon name="file-plus" width="45" height="45" />
      <div>Drag your files here</div>
      <div class="btn-cancel" @click="() => {
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
    private loading = false;

    @Prop()
    private onCancel!: Function;

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

    .btn-cancel {
      margin-top: 20px;
      color: black;
      cursor: pointer;
      padding-bottom: 2px;

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

      .btn-cancel {
        color: white;

        &:hover {
          border-bottom-color: white;
        }
      }
    }
  }
</style>
