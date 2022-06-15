import { useCallback, useEffect } from 'react';
import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query';
import { Project } from 'screens/project-list/list';
import { useProjectsSearchParams } from 'screens/project-list/util';
import { cleanObject } from 'utils';
import { useHttp } from './http';
import { useAsync } from './use-async';
import { useAddConfig, useDeleteConfig, useEditConfig } from './use-optimistic-options';

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  // 1.方法一 指定返回值类型   方法二   类型守卫
  // return useQuery<Project[], Error>(['projects', param], () =>
  //   client('projects', { data: cleanObject(param || {}) })
  // );

  return useQuery<Project[]>(['projects', param], () => client('projects', { data: param }));
};

// export const useEditProject = () => {
//   const client = useHttp();
//   const queryClient = useQueryClient();
//   const [searchParams] = useProjectsSearchParams();
//   const queryKey = ['projects', searchParams];
//   return useMutation(
//     (params: Partial<Project>) =>
//       client(`projects/${params.id}`, {
//         data: params,
//         method: 'PATCH',
//       }),
//     {
//       // onSuccess: () => queryClient.invalidateQueries('projects'), // 'projects' 和 useProjects key 保持一致  使用了缓存  并及时刷新
//       onSuccess: () => queryClient.invalidateQueries(queryKey), // 'projects' 和 useProjects key 保持一致  使用了缓存  并及时刷新
//       async onMutate(target) {
//         // 在请求回来之前就进行更新  onMutate只要useMutation一调用 就会执行
//         const previousItems = queryClient.getQueryData(queryKey);
//         queryClient.setQueryData(queryKey, (old?: Project[]) => {
//           return (
//             old?.map((project) =>
//               project.id === target.id ? { ...project, ...target } : project
//             ) || []
//           );
//         });
//         return { previousItems };
//       },
//       onError(error, newItem, context) {
//         // 请求出错时  状态回滚
//         queryClient.setQueryData(
//           queryKey,
//           (context as { previousItems: Project[] }).previousItems
//         );
//       },
//     }
//   );
// };

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH',
      }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: 'POST',
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey)
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(['project', { id }], () => client(`projects/${id}`), {
    enabled: !!id, // id 没有值时 不请求
  });
};
