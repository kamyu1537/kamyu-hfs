import Buefy from 'buefy';
import Vue from 'vue';
import Unicon from 'vue-unicons';
import 'buefy/dist/buefy.min.css';

import {uniFolder, uniFile, uniFilePlus, uniSetting, uniMultiply} from 'vue-unicons/src/icons';

Unicon.add([
  uniFolder,
  uniSetting,
  uniFile,
  uniFilePlus,
  uniMultiply]);

Vue.use(Unicon);
Vue.use(Buefy);

