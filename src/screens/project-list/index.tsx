import { useState, useEffect } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { cleanObject, useDebounce } from 'utils';
import { useMount } from '../../utils';
import { useHttp } from 'utils/http';
import styled from '@emotion/styled';
import { Typography } from 'antd';

const apiUrl = process.env.REACT_APP_API_URL; // 通过打包命令会读取不同的接口变量 .env

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const debounceParam = useDebounce(param, 2000);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null); //异常处理
  const client = useHttp();

  useEffect(() => {
    setLoading(true);
    client('projects', {
      data: cleanObject(debounceParam),
    })
      .then(setList)
      .catch(error => {
        setError(error);
        setList([]);
      })
      .finally(() => setLoading(false));
  }, [debounceParam]);

  useMount(() => {
    client('users').then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      {error ? <Typography.Text type='danger'>{error.message}</Typography.Text> : null}
      <List dataSource={list} users={users} loading={loading} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
