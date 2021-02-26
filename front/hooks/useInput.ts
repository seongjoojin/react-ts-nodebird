import { useState, useCallback, ChangeEvent } from 'react';

const useInput = <T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement>(
  initialValue: string
): [string, (e: ChangeEvent<T>) => void] => {
  const [value, setValue] = useState<string>(initialValue);
  const handler = useCallback((e: ChangeEvent<T>) => {
    setValue(e.target.value);
  }, []);
  return [value, handler];
};

export default useInput;