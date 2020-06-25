<template>
  <div class="setting" v-show="active">
    <div class="k-main">
      <div class="k-title">
        Setting
      </div>

      <div class="k-buttons">
        <a href="#" @click="onClose">
          <unicon name="multiply" fill="black" />
        </a>
      </div>

      <div class="k-content">
        <div class="k-item">
          <div class="k-subtitle">Server port:</div>
          <label>
            <input type="text" v-model="port" class="k-value" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { ipcRenderer } from 'electron';

  @Component
  export default class Setting extends Vue {
    private $buefy: any;

    @Prop({ default: false })
    private active!: boolean;

    @Prop()
    private onClose!: Function;
    private port = '';
    private timeout: any;

    get currPort() {
      return this.$store.state.server.port;
    }

    @Watch('currPort')
    updatePort() {
      this.port = this.currPort.toString();
    }

    @Watch('port')
    changePort(val: string, old: string) {
      clearTimeout(this.timeout);
      if (!old) return;

      let port = Number(val);
      if (Number.isNaN(port) || port < 0) {
        port = this.currPort;
      }

      port = Math.min(port, 65535);
      port = Math.max(port, 0);
      this.port = port.toString();
      if (this.currPort == port) return;

      this.timeout = setTimeout(() => {
        ipcRenderer.send('set-port', Number(this.port));
        this.savedToast();
      }, 2000);
    }

    savedToast() {
      this.$buefy.toast.open({
        message: `Settings saved`,
        position: 'is-bottom',
      });
    }

    mounted() {
      this.port = this.currPort.toString();
    }
  }
</script>

<style lang="scss">
  .setting {
    background: white;
    color: black;
    z-index: 2;

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .k-item {
      flex-flow: column;

      .k-subtitle {
        font-size: 18px;
      }

      .k-value {
        margin-top: 7px;
        padding: 5px;

        font-family: 'Quicksand', sans-serif !important;

        border-top: 0;
        border-right: 0;
        border-left: 0;
        border-bottom: 2px solid black;
        color: black;

        text-align: center;
        font-size: 16px;
      }
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

      .k-item {
        .k-value {
          border-bottom: 2px solid white;
          color: white;
          background-color: black !important;
        }
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
