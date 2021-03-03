import { useState, useCallback, ChangeEvent, SetStateAction, Dispatch } from 'react';

type UserInputType = HTMLInputElement | HTMLTextAreaElement;

const useInput = <T extends UserInputType = HTMLInputElement>(
  initialValue: string,
): [string, (e: ChangeEvent<T>) => void, Dispatch<SetStateAction<string>>] => {
  const [value, setValue] = useState<string>(initialValue);
  const handler = useCallback((e: ChangeEvent<T>) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
