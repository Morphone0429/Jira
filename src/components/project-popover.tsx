import styled from '@emotion/styled';
import { Popover, Typography, List, Divider, Button } from 'antd';
import React from 'react';
import { useProjects } from 'utils/project';
interface IProps {}
const ProjectPopoverr: React.FC<IProps> = (props) => {
  //const {  } = props;
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
      <Button type="link">创建项目</Button>
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
