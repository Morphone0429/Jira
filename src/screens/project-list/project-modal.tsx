import { Button, Drawer } from 'antd';
import React from 'react';
import { useProjectModal } from './util';
interface IProps {}
const ProjectModal: React.FC<IProps> = (props) => {
  // const {  } = props;
  const { projectModalOpen, close } = useProjectModal();

  return (
    <Drawer visible={projectModalOpen} width={'100%'} onClose={close}>
      <h1>project modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
export default ProjectModal;
