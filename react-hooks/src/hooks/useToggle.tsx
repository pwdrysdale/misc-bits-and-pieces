import { useState, useCallback } from "react";

// a useToggle hook which returns a boolean value and
// a function to toggle it allowing for a specific state
export const useToggle = (
  initialValue: boolean = false
): [boolean, (arg?: any) => void] => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(
    (arg): void => {
      if (typeof arg === "boolean") {
        setValue(arg);
      } else {
        setValue(!value);
      }
    },
    [value, setValue]
  );

  return [value, toggle];
};
