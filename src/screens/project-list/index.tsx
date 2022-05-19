import { useState, useEffect } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { cleanObject, useDebounce } from 'utils';
import * as qs from 'qs';
import { useMount } from '../../utils';

const apiUrl = process.env.REACT_APP_API_URL; // 通过打包命令会读取不同的接口变量 .env

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const debounceParam = useDebounce(param, 2000);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // fetch(`${apiUrl}/projects?name=${param.name}&personId=${param.personId}`);
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async res => {
      if (res.ok) {
        setList(await res.json());
      }
    });
  }, [debounceParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async res => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
