import React from 'react';
import { Kanban } from 'types/kanban';
import { useTasks } from 'utils/task';
import { useTaskTypes } from 'utils/task-type';
import { useKanbansQueryKey, useTasksModal, useTasksSearchParams } from './util';
import bugIcon from 'assets/bug.svg';
import taskIcon from 'assets/task.svg';
import styled from '@emotion/styled';
import { Button, Card, Modal } from 'antd';
import CreateTask from './create-task';
import { Task } from 'types/task';
import Mark from 'components/mark';
import { Row } from 'components/lib';
import { useDeleteKanban } from 'utils/kanban';

interface IProps {
  kanban: Kanban;
}

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) return null;
  return <img src={name === 'task' ? taskIcon : bugIcon} alt=""></img>;
};

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal();
  const { name: keyword } = useTasksSearchParams();

  return (
    <Card style={{ marginBottom: '0.5rem', cursor: 'pointer' }} key={task.id} onClick={() => startEdit(task.id)}>
      <p>
        <Mark keyword={keyword} name={task.name} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

const KanbanColumn: React.FC<IProps> = (props) => {
  const { kanban } = props;
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  const { mutateAsync } = useDeleteKanban(useKanbansQueryKey());

  const handleDelteKanban = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除看板吗',
      onOk() {
        return mutateAsync({ id: kanban.id });
      },
    });
  };

  return (
    <Container>
      <Row>
        <h3>{kanban.name}</h3>
        <Button type="link" onClick={handleDelteKanban}>
          删除
        </Button>
      </Row>

      <TaskContainer>
        {tasks?.map((task) => (
          <TaskCard task={task} />
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </Container>
  );
};
export default KanbanColumn;

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none; // 隐藏滚动条
  }
`;
