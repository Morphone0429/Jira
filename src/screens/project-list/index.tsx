import { useState, useEffect } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { cleanObject, useDebounce } from 'utils';
import * as qs from 'qs';
import { useMount } from '../../utils';
import { useHttp } from 'utils/http';
import styled from '@emotion/styled';

const apiUrl = process.env.REACT_APP_API_URL; // 通过打包命令会读取不同的接口变量 .env

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const debounceParam = useDebounce(param, 2000);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const client = useHttp();

  useEffect(() => {
    client('projects', {
      data: cleanObject(debounceParam),
    }).then(setList);
  }, [debounceParam]);

  useMount(() => {
    client('users').then(setUsers);
  });

  return (
    <Container>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
