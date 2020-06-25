import { Component, Vue } from 'vue-property-decorator';
import DragFile from '@/components/DragFile.vue';
import { clipboard, ipcRenderer } from 'electron';
import Setting from '@/components/Setting.vue';

let interval: any;

@Component({
  components: {
    DragFile,
    Setting
  }
})
export default class Main extends Vue {
  private $buefy: any;
  private loading = false;

  private addFile = false;
  private setting = false;

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
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        ipcRenderer.send('get-port');
      }, 1000);

      ipcRenderer.send('get-port');
      ipcRenderer.send('refresh');
    }, 500);
  }

  copyLink(filename: string) {
    clipboard.writeText('http://localhost:' + this.port + '/' + filename);
    this.$buefy.toast.open({
      message: `Link copied`,
      position: 'is-bottom',
    });
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

  toggleSetting() {
    this.setting = !this.setting;
  }
}
