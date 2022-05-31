import { useEffect } from 'react';
import { Project } from 'screens/project-list/list';
import { cleanObject } from 'utils';
import { useHttp } from './http';
import { useAsync } from './use-async';

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...rest } = useAsync<Project[]>();
  const client = useHttp();

  useEffect(() => {
    run(
      client('projects', {
        data: cleanObject(param || {}),
      })
    );
  }, [param]);
  return rest;
};
