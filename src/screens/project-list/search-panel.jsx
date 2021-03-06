import { useState, useEffect } from 'react';
export const SearchPanel = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });

  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch('').then(async res => {
      if (res.ok) {
        setList(await res.json());
      }
    });
  }, [param]);

  return (
    <form action=''>
      <input
        type='text'
        value={param.name}
        onChange={e =>
          setParam({
            ...param,
            name: e.target.value,
          })
        }
      />
      <select
        value={param.personId}
        onChange={evt =>
          setParam({
            ...param,
            personId: evt.target.value,
          })
        }
      >
        <option value={''}>负责人</option>
        {users.map(user => (
          <option value={user.id}>{user.name}</option>
        ))}
      </select>
    </form>
  );
};
