import { User } from './search-panel';
import { Table } from 'antd';
import { spawn } from 'child_process';
import dayjs from 'dayjs';
interface ListProps {
  list: Project[];
  users: User[];
}
interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}
export const List = ({ list, users }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: '名称',
          // key: 'name',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: '部门',
          // key: 'organization',
          dataIndex: 'organization',
        },
        {
          title: '负责人',
          // key: 'personId',
          render(value, project) {
            return <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>;
          },
        },
        {
          title: '创建时间',
          // key: 'created',
          render(value, project) {
            return <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}</span>;
          },
        },
      ]}
      dataSource={list}
      // rowKey=
    ></Table>
  );
};
