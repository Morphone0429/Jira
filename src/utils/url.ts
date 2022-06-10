import { useMemo } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { cleanObject } from 'utils';

// 返回页面url中 指定key的参数值
// 返回的值类型检测  泛型  通过传入的值动态判定

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log('console::::::=========>', searchParams.get('name'));
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || '' };
        }, {} as { [key in K]: string }),
      [searchParams]
    ),
    // setSearchParams,
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParams(o);
    },
  ] as const;
};

// 当obj 是 setState 返回时，不会引起无线循环   所以keys 不能作为依赖

// export const useUrlQueryParam = <K extends string>(keys: K[]) => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   // console.log('console::::::=========>', searchParams.get('name'));
//   return [
//     keys.reduce((prev, key) => {
//       return { ...prev, [key]: searchParams.get(key) || '' };
//     }, {} as { [key in K]: string }),
//     setSearchParams,
//   ] as const;
// };
/** 
 * keys.reduce((prev, key) => {
      return { ...prev, [key]: searchParams.get(key) || '' };
    }, {} as { [key in K]: string }), 每次都返回新的对象  导致无线循环
 * 
 * */

// // const useUrlQueryParam: (keys: string[]) => {}[] 解决类型返回问题  as const
// // as const

// const a = ['jack', 12, { gender: 'male' }]; // ts认为 a是 number|string | object   as const返回原始类型

// const b = ['12']  //const b: string[]
// const b1 = ['12'] as const  // const b1: readonly ["12"]

// Object.fromEntries   iterator [] ,{} 可以用for of 遍历
