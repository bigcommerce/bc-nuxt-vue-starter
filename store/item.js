export const state = () => ({
  item: ''
});

export const getters = {
  item(state) {
    return state.item;
  }
};

export const mutations = {
  SET_ITEM(state, data) {}
};

export const actions = {
  async loadItemById({ commit }, itemId) {
    commit('SET_ITEM', itemId);
  }
};
