import * as actions from "./actions";
import * as getters from "./getters";
import * as mutations from "./mutations";
import state from "./state";

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
