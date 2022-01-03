import { useState, useCallback } from "react";

export const useArray = <T,>(initialValue: T[] = []) => {
  const [value, setValue] = useState<T[]>(initialValue);

  const addItem = useCallback(
    (item: T): void => {
      setValue((previous): T[] => [...previous, item]);
    },
    [setValue]
  );

  const removeItem = useCallback(
    (item: T) => {
      setValue((previous): T[] => previous.filter((i): boolean => i !== item));
    },
    [setValue]
  );

  return { value, addItem, removeItem };
};
