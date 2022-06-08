import { createSlice } from '@reduxjs/toolkit';

interface State {
  projectModalOpen: boolean;
}

const initialState: State = {
  projectModalOpen: false,
};

export const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState, //维护的状态
  reducers: {
    openProjectModal(state, action) {
      state.projectModalOpen = true;
    },
    closeProjectModal(state, action) {
      state.projectModalOpen = false;
    },
  }, // 简化了传统reducers 写法   核心是immer.js
});
