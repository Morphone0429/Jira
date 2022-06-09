import { Button, Drawer, Form, Spin } from 'antd';
import React from 'react';
import { useProjectModal } from './util';
interface IProps {}
const ProjectModal: React.FC<IProps> = (props) => {
  // const {  } = props;
  const { projectModalOpen, close, editingProject, isLoading } = useProjectModal();
  const title = editingProject ? '编辑项目' : '创建项目';
  return (
    <Drawer visible={projectModalOpen} width={'100%'} onClose={close}>
      {isLoading ? (
        <Spin size="large"></Spin>
      ) : (
        <>
          <h1>{title}</h1>
          <Form layout={'vertical'} style={{ width: '40rem' }}></Form>
        </>
      )}
      <h1>project modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
export default ProjectModal;
