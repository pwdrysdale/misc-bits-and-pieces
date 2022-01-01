import { useState, useCallback } from "react";

export const useArray = <T,>(initialValue: T[] = []) => {
  const [value, setValue] = useState<T[]>(initialValue);

  const addItem = useCallback(
    (item: T) => {
      setValue((previous) => [...previous, item]);
    },
    [setValue]
  );

  const removeItem = useCallback(
    (item: T) => {
      setValue((previous) => previous.filter((i) => i !== item));
    },
    [setValue]
  );

  return { value, addItem, removeItem };
};
