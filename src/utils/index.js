import { useState, useEffect } from 'react';

// 判断值是否为0
export const isFalsy = value => (value === 0 ? false : !value);

// 清除对象中value为空的key-value
export const cleanObject = object => {
  // Object.assign({},object) 1
  const result = { ...object };
  Object.keys(result).forEach(key => {
    const value = object[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });

  return result;
};

// 自定义hook  以use开头
export const useMount = callback => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value, delay) => {
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
