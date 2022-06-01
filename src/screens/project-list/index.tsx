import { useState, useEffect } from 'react';
import { SearchPanel } from './search-panel';
import { List, Project } from './list';
import { cleanObject, useDebounce, useDocumentTitle } from 'utils';
import { useMount } from '../../utils';
import { useHttp } from 'utils/http';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useAsync } from 'utils/use-async';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';

const apiUrl = process.env.REACT_APP_API_URL; // 通过打包命令会读取不同的接口变量 .env

export const ProjectListScreen = () => {
  useDocumentTitle('列表', false);
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const debounceParam = useDebounce(param, 2000);
  // const [users, setUsers] = useState([]);

  const { isLoading, error, data: list } = useProjects(debounceParam);
  const { data: users } = useUsers(); //封装了两层  useAsync 和 useUsers
  // const { run, isLoading, error, data: list } = useAsync<Project[]>();
  // const client = useHttp();

  // useEffect(() => {
  //   run(
  //     client('projects', {
  //       data: cleanObject(debounceParam),
  //     })
  //   );
  // }, [debounceParam]);

  // useMount(() => {
  //   client('users').then(setUsers);
  // });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
