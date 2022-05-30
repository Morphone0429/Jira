import { useState, useEffect } from 'react';

// 判断值是否为0
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) => value === undefined || value === null || value === '';

// object: object  返回的是一个空对象
// let a: object
// a= {name: 'hha'}
// a= () =>{}
// a= new RegExp('')

// 清除对象中value为空的key-value
export const cleanObject = (object: { [key: string]: unknown }) => {
  // Object.assign({},object) 1
  const result = { ...object };
  Object.keys(result).forEach(key => {
    const value = object[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });

  return result;
};

// 自定义hook  以use开头
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // todo 依赖项里加上callback  会造成无限循环  这个和useCallback 和 useMemo 有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次在value变化以后 设置一个定时器
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // 清理定时器
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
    add: (item: T) => {
      setValue([...value, item]);
    },
  };
};
