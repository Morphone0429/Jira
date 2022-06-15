import { useMemo } from 'react';
import { useLocation } from 'react-router';
import { useProject } from 'utils/project';
import { useUrlQueryParam } from 'utils/url';

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()];

export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'typeId', 'processorId', 'tagId']);
  const projectId = useProjectIdInUrl();
  return useMemo(() => {
    return {
      projectId,
      typeId: +param.typeId || undefined,
      processorId: +param.processorId || undefined,
      tagId: +param.tagId || undefined,
      name: param.name,
    };
  }, [projectId, param]);
};

export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()];
