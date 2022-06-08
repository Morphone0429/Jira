import { useCallback, useState } from 'react';
import { useMountedRef } from 'utils';

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success';
}
const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  // useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数

  const [retry, setRetry] = useState(() => () => {});
  const mountedRef = useMountedRef();
  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        stat: 'success',
        error: null,
      }),
    []
  );

  const setError = useCallback(
    (error: Error) =>
      setState({
        data: null,
        stat: 'error',
        error: error,
      }),
    []
  );

  // run 用来触发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error('请传入 Promise 对象');
      }

      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });

      // setState({ ...state, stat: 'loading' });  //依赖state 会引起无限循环问题  使用setState((prevState)=>())函数解决  prevState-->此时此刻的state
      setState((prevState) => ({ ...prevState, stat: 'loading' }));

      return (
        promise
          .then((data) => {
            if (mountedRef.current) {
              setData(data);
            }
            return data;
          })
          //catch会消化异常，如果不主动抛出，外面是接收不到异常的
          .catch((error) => {
            setError(error);
            if (config.throwOnError) return Promise.reject(error);
            return error;
          })
      );
    },
    [config.throwOnError, mountedRef, setData, setError]
  );

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
