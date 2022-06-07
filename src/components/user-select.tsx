import React from 'react';
import { useUsers } from 'utils/user';
import IdSelect from './id-select';
type IProps = React.ComponentProps<typeof IdSelect>;
const UserSelect: React.FC<IProps> = (props) => {
  const { data: users } = useUsers();
  return <IdSelect options={users || []} {...props}></IdSelect>;
};
export default UserSelect;
