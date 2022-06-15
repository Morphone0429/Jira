import React from 'react';
import { Kanban } from 'types/kanban';
import { useTasks } from 'utils/task';
import { useTasksSearchParams } from './util';
interface IProps {
  kanban: Kanban;
}
const KanbanColumn: React.FC<IProps> = (props) => {
  const { kanban } = props;
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <div>
      <h3>{kanban.name}</h3>
      {tasks?.map((task) => (
        <div key={task.id}>{task.name}</div>
      ))}
    </div>
  );
};
export default KanbanColumn;
