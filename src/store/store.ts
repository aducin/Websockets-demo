import Vue from 'vue';
import Vuex from 'vuex';
import { Scooter } from '../interfaces/interfaces';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initialised: false,
    list: Array<Scooter>(),
    updatedItems: Array<Scooter>()
  },
  getters: {
    initialised (state) {
      return state.initialised;
    },
    sortedList(state) {
      return state.list.sort((a, b) => a.name.localeCompare(b.name));
    },
    updatedItems(state) {
      return state.updatedItems;
    }
  },
  mutations: {
    addItem(state, scooter: Scooter) {
      state.list.push(scooter);
    },
    removeItem(state, scooter: Scooter) {
      state.list = state.list.filter(el => el.id !== scooter.id);
    },
    setInitialList(state, list: Scooter[]) {
      state.list = list;
      state.initialised = true;
    },
    setUpdatedItems(state, list: Scooter[]) {
      state.updatedItems = list;
    },
    updateItem(state, scooter: Scooter) {
      state.list = state.list.map((item) => {
        return item.id === scooter.id ? scooter : { ...item};
     });
    }
  },
  actions: {
    setInitialData(context, list: Scooter[]) {
      context.commit('setInitialList', list);
    },
    updateList(context, list: Scooter[]) {
      context.commit('setUpdatedItems', list);
      list.forEach((el: Scooter) => {
        if (el._change === 'add') {
          context.commit('addItem', el);
        } else if (el._change === 'remove') {
          context.commit('removeItem', el);
        } else if (el._change === 'update') {
          context.commit('updateItem', el);
        }
      });
    }
  }
})
