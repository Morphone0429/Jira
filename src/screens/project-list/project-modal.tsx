import { Button, Drawer } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projectListActions, selectProjectModalOpen } from './project-list.slice';
interface IProps {}
const ProjectModal: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen); //使用store 数据  useSelector读取root状态树 数据
  return (
    <Drawer
      visible={projectModalOpen}
      width={'100%'}
      onClose={() => dispatch(projectListActions.closeProjectModal())}
    >
      <h1>project modal</h1>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>关闭</Button>
    </Drawer>
  );
};
export default ProjectModal;
