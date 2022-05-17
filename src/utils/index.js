// 判断值是否为0
export const isFalsy = value => (value === 0 ? false : !value);

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
