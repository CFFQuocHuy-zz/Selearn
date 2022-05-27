import { useCallback, useEffect, useReducer, useRef, useState } from 'react';

interface State<T> {
  data?: T;
  error?: Error;
}

type Cache<T> = { [url: string]: T };

type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error };

const validating = (params: any) => {
  const newParams = { ...params };
  for (const key in newParams) {
    if (typeof newParams[key] === 'object') newParams[key] = JSON.stringify(newParams[key]);
  }
  return newParams;
};

function useFetch<T = unknown>({ url, api, params }: { url?: string; api?: any; params?: any }) {
  const cache = useRef<Cache<T>>({});

  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState };
      case 'fetched':
        return { ...initialState, data: action.payload };
      case 'error':
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const [reFetch, setRefetch] = useState(false);

  const handleReFetch = useCallback(() => {
    setRefetch((preState) => !preState);
  }, []);

  useEffect(() => {
    if (!url) return;
    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: 'loading' });

      if (cache.current[url] && !params) {
        dispatch({ type: 'fetched', payload: cache.current[url] });
        return;
      }

      try {
        const response = await api(validating(params));

        cache.current[url] = response;
        if (cancelRequest.current) return;

        dispatch({ type: 'fetched', payload: response });
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({ type: 'error', payload: error as Error });
      }
    };

    void fetchData();

    return () => {
      cancelRequest.current = true;
    };
  }, [url, params, reFetch]);

  return { state, handleReFetch };
}

export default useFetch;
