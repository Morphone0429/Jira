import React from 'react';
import { useTaskTypes } from 'utils/task-type';
import IdSelect from './id-select';
type IProps = React.ComponentProps<typeof IdSelect>;
const TaskTypeSelect: React.FC<IProps> = (props) => {
  const { data: taskTypes } = useTaskTypes();
  return <IdSelect options={taskTypes || []} {...props}></IdSelect>;
};
export default TaskTypeSelect;
