// a function that generates a Vue store module with api calls for CRUD
import axios from 'axios';

interface HasID {
  id: string | number;
}

const generateStoreWithAPI = <T extends HasID>(moduleName: string) => {
  const store = {
    namespaced: true,
    state: {
      items: [] as T[]
    },
    mutations: {
      add(state: any, item: T) {
        state.items.push(item);
      },
      remove(state: any, id: string | number) {
        state.items = state.items.filter(item => item.id !== id);
      },
      edit(state: any, newItem: T) {
        state.items = state.items.map(item => item.id === newItem.id ? newItem : item);
      },
      setItems(state: any, items: T[]) {
        state.items = items;
      },
      clearItems(state: any) {
        state.items = [];
      }
    },
    actions: {
      async add({ commit }, item: Omit<T, 'id'>) {
        const res =await  axios.post(`/${moduleName}`, item)
        if (res.status === 200) {
          commit('add', res.data);
        } else {
          console.error(res);
        }
      },
      async remove({ commit }, id: string | number) {
        const res = await axios.delete(`/${moduleName}/${id}`);
        if (res.status === 200) {
          commit('remove', id);
        } else {
          console.error(res);
        }
      },
      async edit({ commit }, newItem: T) {
        const res = await axios.put(`/${moduleName}/${newItem.id}`, newItem);
        if (res.status === 200) {
          commit('edit', newItem);
        } else {
          console.error(res);
        }
      },
      async fetchItems({ commit }) {
        const res = await axios.get(`/${moduleName}`);
        if (res.status === 200) {
          commit('setItems', res.data);
        } else {
          console.error(res);
        }
      }
    },
    getters: {
      all(state: any) {
        return state.items;
      },
      getById(state: any) {
        return (id: string | number) => state.items.find(item => item.id === id);
      },
      getByProp(state: any) {
        return (prop: string, value: any) => state.items.filter(item => item[prop] === value);
      }
    }
  };
  return store;
};


