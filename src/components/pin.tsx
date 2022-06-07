import React from 'react';
import { Rate } from 'antd';
interface IProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}
const Pin: React.FC<IProps> = (props) => {
  const { checked, onCheckedChange, ...restProps } = props;
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
      {...restProps}
    ></Rate>
  );
};
export default Pin;
