import type { ChangeEvent } from 'react';
import { useEffect, useRef } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, AppState } from '@app/state/store';
import { CallbackFuncAny } from '@app/types';

export const useForm =
  <TContent>(defaultValues: TContent) =>
  (handler: (content: TContent) => void) =>
  async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.persist();

    const form = event.target as HTMLFormElement;
    const elements = Array.from(form.elements) as HTMLInputElement[];
    const data = elements
      .filter((element) => element.hasAttribute('name'))
      .reduce(
        (object, element) => ({
          ...object,
          [`${element.getAttribute('name')}`]: element.value,
        }),
        defaultValues
      );
    await handler(data);
    form.reset();
  };

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback: CallbackFuncAny, delay: number) => {
  const savedCallback = useRef<CallbackFuncAny>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    const handler = (...args: any) => savedCallback.current?.apply(null, args);
    if (delay !== null) {
      const id = setInterval(handler, delay);
      return () => clearInterval(id);
    }
    return undefined;
  }, [delay]);
};

// Use throughout app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
