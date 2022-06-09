import { useMemo } from 'react';
import { useUrlQueryParam } from 'utils/url';

// 项目列表搜索参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId']); // 返回的值类型检测  泛型  通过传入的值动态判定
  return [
    useMemo(() => {
      return { ...param, personId: Number(param.personId) || undefined };
    }, [param]),
    setParam,
  ] as const;
};

//返回turble  使用as const  使用的时候可以随意命名
// 一般三个以上元素返回用对象  三个以下用 turble
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate']);
  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({ projectCreate: undefined });

  // return [projectCreate === 'true', open, close] as const;
  return {
    projectModalOpen: projectCreate === 'true',
    open,
    close,
  };
};
