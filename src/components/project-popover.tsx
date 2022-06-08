import styled from '@emotion/styled';
import { Popover, Typography, List, Divider } from 'antd';
import React from 'react';
import { useProjects } from 'utils/project';
import { ButtonNoPadding } from './lib';
interface IProps {
  setProjectModalOpen: (isOpen: boolean) => void;
}
const ProjectPopoverr: React.FC<IProps> = (props) => {
  const { setProjectModalOpen } = props;
  const { data: projects, isLoading } = useProjects();

  const pinnedProjects = projects?.filter((project) => project.pin);
  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding type="link" onClick={() => setProjectModalOpen(true)}>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover placement={'bottom'} content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;

export default ProjectPopoverr;
