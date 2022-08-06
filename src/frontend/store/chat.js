export const state = () => ({

  chats: [],


});

export const mutations = {
  SET_CHATS(state, chats) {
    state.chats = chats;
  },
};

export const actions = {
  async fetchChats({ commit }) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`api/chats`)
        .then(res => {
          commit("SET_CHATS", res.data);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  async fetchChatsReceived({ commit }) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`api/chats/received/`)
        .then(res => {
          commit("SET_CHATS", res.data);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  async fetchChatsSent({ commit }) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`api/chats/sent/`)
        .then(res => {
          commit("SET_CHATS", res.data);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  async fetchChatsTrash({ commit }) {
    return await new Promise((resolve, reject) => {
      this.$axios
        .get(`api/chats/getrash/`)
        .then(res => {
          commit("SET_CHATS", res.data);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};
