export const state = () => ({
  user: undefined,
  token: undefined,
  refresh: undefined,
  signature: undefined,
  error: 'Login or password incorrect!',
});

export const getters = {
  token(state) {
    const token = state.token;
    return token ? 'Token ' + token : token;
  },
};

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_REFRESH(state, refresh) {
    state.refresh = refresh;
  },
  SET_ERROR(state) {
    state.error = true;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  SET_SIGNATURE(state, signature) {
    state.signature = signature;
  },

};

export const actions = {
  async LOAD_TOKEN({ commit }) {
    const token = await localStorage.getItem('token');
    if (token) {
      this.$axios.defaults.headers.common.Authorization = 'Bearer ' + token;
      commit('SET_TOKEN', token);
    } else {
      this.$axios.defaults.headers.common.Authorization = undefined;
      commit('SET_TOKEN', undefined);
    }
  },
  async REFRESH_TOKEN({ commit }) {
    const refresh = await localStorage.getItem('refresh');
    return new Promise((resolve, reject) => {
      this.$axios
        .$post(
          'auth/jwt/refresh/',
          {
            refresh,
          },
          {
            headers: {
              Authorization: undefined,
            },
          }
        )
        .then(async (response) => {
          const token = response.access;
          if (token) {
            await localStorage.setItem('token', token);
            this.$axios.defaults.headers.common.Authorization =
              'Bearer ' + token;
            commit('SET_TOKEN', token);
          } else {
            this.$axios.defaults.headers.common.Authorization = undefined;
            commit('SET_TOKEN', undefined);
          }
          resolve(response);
        })
        .catch((error) => {
          commit('SET_ERROR', error.status);
          reject(error);
        });
    });
  },
  LOGIN({ commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post(
          'auth/jwt/create/',
          {
            email,
            password,
          },
          {
            headers: {
              Authorization: undefined,
            },
          }
        )
        .then(async (response) => {
          const token = response.access;
          const refresh = response.refresh;
          if (token) {
            await localStorage.setItem('token', token);
            await localStorage.setItem('refresh', refresh);
            this.$axios.defaults.headers.common.Authorization =
              'Bearer ' + token;
            commit('SET_TOKEN', token);
            commit('SET_REFRESH', refresh);
          } else {
            this.$axios.defaults.headers.common.Authorization = undefined;
          }

          resolve(response);
        })
        .catch((error) => {
          commit('SET_ERROR', error.response.status);
          reject(error);
        });
    });
  },
  FETCH_USER({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get('auth/users/me/')
        .then((response) => {
          commit('SET_USER', response);
          resolve(response);
        })
        .catch((error) => {
          commit('SET_ERROR', error.response.status);
          reject(error);
        });
    });
  },

  LOGOUT({ commit }) {
    return new Promise((resolve) => {
      commit('SET_USER', undefined);
      commit('SET_TOKEN', undefined);
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      delete this.$axios.defaults.headers.common.Authorization;
      resolve();
    });
  },

  REGISTER(
    { commit },
    {
      name,
      position,
      gender,
      phone,
      email,
      district,
      password,
      password_confirm,
    }
  ) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post(
          'auth/registration/register/',
          {
            name,
            position,
            gender,
            phone,
            email,
            district,
            password,
            password_confirm,
          },
          {
            headers: {
              Authorization: undefined,
            },
          }
        )
        .then(async (response) => {
          commit('SET_SIGNATURE', response.signature);
          resolve(response);
        })
        .catch((error) => {
          commit('SET_ERROR', error.response.status);
          reject(error);
        });
    });
  },

};
