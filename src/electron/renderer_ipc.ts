import { ipcRenderer } from 'electron';
import store from '@/store';

ipcRenderer.on('update', (event, data) => {
  store.commit('updateFiles', data.files);
  store.commit('updateDirs', data.dirs);
});

ipcRenderer.on('get-port', (event, port) => {
  store.commit('setPort', port);
});
