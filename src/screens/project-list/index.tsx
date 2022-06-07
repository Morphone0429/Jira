import { useState } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { useDebounce, useDocumentTitle } from 'utils';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { useUrlQueryParam } from 'utils/url';
import { stringify } from 'querystring';

const apiUrl = process.env.REACT_APP_API_URL; // 通过打包命令会读取不同的接口变量 .env

export const ProjectListScreen = () => {
  useDocumentTitle('列表', false);
  const [, setParam] = useState({
    name: '',
    personId: '',
  });

  const [param] = useUrlQueryParam(['name', 'personId']); // 返回的值类型检测  泛型  通过传入的值动态判定
  console.log('console::::::=========>', param);
  const debounceParam = useDebounce(param, 2000); // param每次都会创建新的对象 导致debounceParam 里依赖的value不同而变化

  const { isLoading, error, data: list } = useProjects(debounceParam);
  const { data: users } = useUsers(); //封装了两层  useAsync 和 useUsers
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
