import { yiyan } from './../api/other';

export const count = {
  state: 0,
  reducers: {
    increment: s => s + 1,
  },
  effects: dispatch => ({
    async asyncIncrement() {
      await new Promise(resolve => {
        setTimeout(resolve, 1000);
      });
      dispatch.count.increment();
    },
  }),
};

// 一言 rematch
export const saying = {
  state: {},
  reducers: {
    set: (state, payload) => (state = payload),
  },
  effects: dispatch => ({
    async getYiyan() {
      const resp = await yiyan();
      dispatch.saying.set(resp);
    },
  }),
};
