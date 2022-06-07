import { useCallback, useEffect } from 'react';
import { Project } from 'screens/project-list/list';
import { cleanObject } from 'utils';
import { useHttp } from './http';
import { useAsync } from './use-async';

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...rest } = useAsync<Project[]>();
  const client = useHttp();

  const fetechProjects = useCallback(
    () => client('projects', { data: cleanObject(param || {}) }),
    [client, param]
  );

  useEffect(() => {
    run(fetechProjects(), {
      retry: fetechProjects,
    });
  }, [param, run, fetechProjects]);
  return rest;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH',
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};
export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'POST',
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};
