import { useState, useCallback } from 'react';

const useInput = (
  initailValue: string
): [string, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState<string>(initailValue);
  const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);
  return [value, handler];
};

export default useInput;