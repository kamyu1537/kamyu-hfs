interface ServerState {
  port: number;
}

export default {
  state: {
    port: 0
  } as ServerState,
  mutations: {
    setPort(state: ServerState, port: number) {
      state.port = port;
    }
  }
};
