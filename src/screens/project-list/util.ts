import { useUrlQueryParam } from 'utils/url';

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId']); // 返回的值类型检测  泛型  通过传入的值动态判定
  return [{ ...param, personId: Number(param.personId) || undefined }, setParam] as const;
};
