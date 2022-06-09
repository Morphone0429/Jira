import { User } from './search-panel';
import { Dropdown, Menu, Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Pin from 'components/pin';
import { useEditProject } from 'utils/project';
import { ButtonNoPadding } from 'components/lib';
import { useProjectModal } from './util';
interface ListProps extends TableProps<Project> {
  // list: Project[];
  users: User[];
  // refresh?: () => void;
  // setProjectModalOpen: (isOpen: boolean) => void;
  // projectButton: JSX.Element;
}
export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}
// 函数柯里化

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const { open } = useProjectModal();
  // const pinProject = (id: number, pin: boolean) => mutate({ id, pin });
  // 函数柯里化
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  const menu = (
    <Menu
      items={[
        {
          key: 'edit',
          label: (
            <ButtonNoPadding type="link" onClick={open}>
              编辑
            </ButtonNoPadding>
          ),
        },
        {
          key: 'delete',
          label: (
            <ButtonNoPadding type="link" onClick={open}>
              删除
            </ButtonNoPadding>
          ),
        },
      ]}
    />
  );
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true}></Pin>,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                // project.id, pin 获取的时机不一样  可以用柯里化
                // project.id在还没有定义函数时就知道  pin在参数传递时知道
                // onCheckedChange={(pin) => pinProject(project.id, pin)}
                onCheckedChange={pinProject(project.id)}
              ></Pin>
            );
          },
        },
        {
          title: '名称',
          // dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={project.id + ''}>{project.name}</Link>;
          },
        },
        {
          title: '部门',
          dataIndex: 'organization',
        },
        {
          title: '负责人',
          render(value, project) {
            return (
              <span>{users.find((user) => user.id === project.personId)?.name || '未知'}</span>
            );
          },
        },
        {
          title: '创建时间',
          render(value, project) {
            return (
              <span>
                {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return (
              <Dropdown overlay={menu}>
                <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      // dataSource={list}
      rowKey={'id'}
      {...props}
    ></Table>
  );
};
