import { useSearchParams } from 'react-router-dom';

// 返回页面url中 指定key的参数值
export const useUrlQueryParam = (keys: string[]) => {
  const [searchParams] = useSearchParams();
  // console.log('console::::::=========>', searchParams.get('name'));
  return [
    keys.reduce((prev: { [p: string]: string }, key) => {
      return { ...prev, [key]: searchParams.get(key) || '' };
    }, {} as { [key in string]: string }),
    searchParams,
  ] as const;
};

// // const useUrlQueryParam: (keys: string[]) => {}[] 解决类型返回问题  as const
// // as const

// const a = ['jack', 12, { gender: 'male' }]; // ts认为 a是 number|string | object   as const返回原始类型

// const b = ['12']  //const b: string[]
// const b1 = ['12'] as const  // const b1: readonly ["12"]
