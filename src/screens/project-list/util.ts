import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProject } from 'utils/project';
import { useUrlQueryParam } from 'utils/url';

// 项目列表搜索参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId']); // 返回的值类型检测  泛型  通过传入的值动态判定
  return [
    useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
    setParam,
  ] as const;
};

//返回turble  使用as const  使用的时候可以随意命名
// 一般三个以上元素返回用对象  三个以下用 turble
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate']); // 判断是否创建
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId']); // 判断是否编辑

  const { data: editingProject, isLoading } = useProject(Number(editingProjectId));

  const open = () => setProjectCreate({ projectCreate: true });

  const [_, setUrlParam] = useSearchParams();
  // const close = () => {
  //   setEditingProjectId({ editingProjectId: '' });
  //   setProjectCreate({ projectCreate: '' });
  //   // console.log('console::::::=========>projectCreate', projectCreate);
  // };
  const close = () => setUrlParam({ projectCreate: '', editingProjectId: '' });

  const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id });

  // return [projectCreate === 'true', open, close] as const;
  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
