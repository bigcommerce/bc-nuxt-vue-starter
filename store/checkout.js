export const state = () => ({
  isLoading: false,
  personalDetails: null
});

export const getters = {
  isLoading(state) {
    return state.isLoading;
  },
  personalDetails(state) {
    return state.personalDetails;
  }
};

export const mutations = {
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  },
  SET_PERSONAL_DETAILS(state, personalDetails) {
    state.personalDetails = personalDetails;
  }
};

export const actions = {};
