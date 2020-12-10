import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const global_store = {
  state: {},
  getters: {},
  mutations: {},
  actions: {}
};

function optionsCreator() {
  const context = require.context("./modules", true, /\.js$/);
  const modules = context.keys().reduce((total, path) => {
    const name = path.replace(/\.\/|\.js/g, "");
    total[name] = context(path).default;
    return total;
  }, {});
  return { modules, ...global_store };
}

const options = optionsCreator();
const store = new Vuex.Store({ ...options });

export default store;
