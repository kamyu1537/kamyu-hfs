interface PathState {
  files: any[];
  dirs: any[];
}

export default {
  state: {
    files: [],
    dirs: [],
  } as PathState,
  mutations: {
    updateFiles(state: PathState, files: any[]) {
      state.files = files;
    },
    updateDirs(state: PathState, dirs: any[]) {
      state.dirs = dirs;
    },
  }
};
