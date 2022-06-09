import { useState } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { useDebounce, useDocumentTitle } from 'utils';
import styled from '@emotion/styled';
import { Button, Typography } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { useProjectModal, useProjectsSearchParams } from './util';
import { ButtonNoPadding, ErrorBox, Row } from 'components/lib';

const apiUrl = process.env.REACT_APP_API_URL; // 通过打包命令会读取不同的接口变量 .env

export const ProjectListScreen = (props: {}) => {
  useDocumentTitle('列表', false);
  const [param, setParam] = useProjectsSearchParams();
  const { open } = useProjectModal();
  const debounceParam = useDebounce(param, 2000); // param每次都会创建新的对象 导致debounceParam 里依赖的value不同而变化
  const { isLoading, error, data: list } = useProjects(debounceParam);
  const { data: users } = useUsers(); //封装了两层  useAsync 和 useUsers
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type="link">
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error}></ErrorBox>
      {/* {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null} */}
      <List
        dataSource={list || []}
        users={users || []}
        loading={isLoading}
        // projectButton={props.projectButton}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
