import { useState } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { useDebounce, useDocumentTitle } from 'utils';
import styled from '@emotion/styled';
import { Button, Typography } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { useProjectsSearchParams } from './util';
import { ButtonNoPadding, Row } from 'components/lib';
import { useDispatch } from 'react-redux';
import { projectListActions } from './project-list.slice';

const apiUrl = process.env.REACT_APP_API_URL; // 通过打包命令会读取不同的接口变量 .env

export const ProjectListScreen = () => {
  useDocumentTitle('列表', false);
  // const [param, setParam] = useUrlQueryParam(['name', 'personId']); // 返回的值类型检测  泛型  通过传入的值动态判定
  // const projectsParam = { ...param, personId: Number(param.personId) || undefined };
  const [param, setParam] = useProjectsSearchParams();
  const dispatch = useDispatch();
  const debounceParam = useDebounce(param, 2000); // param每次都会创建新的对象 导致debounceParam 里依赖的value不同而变化
  const { isLoading, error, data: list, retry } = useProjects(debounceParam);
  const { data: users } = useUsers(); //封装了两层  useAsync 和 useUsers
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding
          type="link"
          onClick={() => dispatch(projectListActions.openProjectModal())}
        >
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List refresh={retry} dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
