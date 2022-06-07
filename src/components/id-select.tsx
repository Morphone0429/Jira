import React from 'react';
import { Raw } from 'types';
import { Select } from 'antd';
// type IProps = {
//   value: Raw | null | undefined;
//   onChange: (value?: number) => void; // 传出去的值类型为number  保证行为一致
//   defaultOptionName?: string;
//   options?: { name: string; id: number }[];
// } & SelectProps;

type SelectProps = React.ComponentProps<typeof Select>;
interface IProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void; // 传出去的值类型为number  保证行为一致
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

/**
 * value  可以传入多种类型的值
 *
 * onChange只会回调 number /undefined 类型
 * 当 isNaN (Number(valve)）为true的时候,代表选择默认类型
 * 当选择默认类型的时候,onChange会回调undefined
 *
 * 透传 rest props   1.props & SelectProps  2. ts React.ComponentProps<typeof Select>获取组件Select类型
 * */
const IdSelect: React.FC<IProps> = (props) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null}
      {options?.map((option) => (
        <Select.Option value={option.id} key={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => {
  return isNaN(Number(value)) ? 0 : Number(value);
};

export default IdSelect;
