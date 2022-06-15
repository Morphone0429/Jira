import { QueryKey, useMutation, useQuery } from 'react-query';
import { Task } from 'types/task';
import { useHttp } from './http';
import { useAddConfig, useEditConfig } from './use-optimistic-options';

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(['tasks', param], () => client('tasks', { data: param }));
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: 'POST',
      }),
    useAddConfig(queryKey)
  );
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        data: params,
        method: 'PATCH',
      }),
    useEditConfig(queryKey)
  );
};

// 获取详情
export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(['task', { id }], () => client(`tasks/${id}`), {
    enabled: !!id, // id 没有值时 不请求
  });
};
