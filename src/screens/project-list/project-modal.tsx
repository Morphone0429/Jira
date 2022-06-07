import { Button, Drawer } from 'antd';
import React from 'react';
interface IProps {
  projectModalOpen: boolean;
  onClose: () => void;
}
const ProjectModal: React.FC<IProps> = (props) => {
  const { projectModalOpen, onClose } = props;
  return (
    <Drawer visible={projectModalOpen} width={'100%'} onClose={onClose}>
      <h1>project modal</h1>
      <Button onClick={onClose}>关闭</Button>
    </Drawer>
  );
};
export default ProjectModal;
