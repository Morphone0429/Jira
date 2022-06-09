import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

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
    openProjectModal(state) {
      state.projectModalOpen = true;
    },
    // openProjectModal(state, action) {
    //   state.projectModalOpen = true;
    // },
    closeProjectModal(state) {
      state.projectModalOpen = false;
    },
  }, // 简化了传统reducers 写法   核心是immer.js
});

export const projectListActions = projectListSlice.actions;
export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen;
