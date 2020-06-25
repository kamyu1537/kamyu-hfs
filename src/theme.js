import Buefy from 'buefy';
import Vue from 'vue';
import Unicon from 'vue-unicons';
import 'buefy/dist/buefy.min.css';

import {uniFolder, uniFolderPlus, uniFile, uniFilePlus, uniFolderTimes, uniFileTimes, uniTrash} from 'vue-unicons/src/icons';

Unicon.add([
  uniFolder,
  uniFolderPlus,
  uniFile,
  uniFilePlus,
  uniFolderTimes,
  uniFileTimes,
  uniTrash]);

Vue.use(Unicon);
Vue.use(Buefy);

