import { useCallback, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Project } from 'screens/project-list/list';
import { cleanObject } from 'utils';
import { useHttp } from './http';
import { useAsync } from './use-async';

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  // 1.方法一 指定返回值类型   方法二   类型守卫
  // return useQuery<Project[], Error>(['projects', param], () =>
  //   client('projects', { data: cleanObject(param || {}) })
  // );

  return useQuery<Project[]>(['projects', param], () => client('projects', { data: param }));
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH',
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects'), // 'projects' 和 useProjects key 保持一致  使用了缓存  并及时刷新
    }
  );
};
export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: 'POST',
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects'), // 'projects' 和 useProjects key 保持一致  使用了缓存  并及时刷新
    }
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(['project', { id }], () => client(`projects/${id}`), {
    enabled: !!id, // id 没有值时 不请求
  });
};
