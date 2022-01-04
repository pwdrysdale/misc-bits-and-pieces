import { useCallback, useEffect } from "react";

// react hook to use a key
// keys are from event.key from https://keycode.info/
// callback should be a function
// condtion is of course, optional

export const useKey = (
  key: string,
  callback: () => void,
  condition: boolean = true
): void => {
  const handler = useCallback(
    (event: KeyboardEvent) => {
      if (condition) {
        if (event.key === key) {
          callback();
        }
      }
    },
    [key, callback, condition]
  );

  useEffect(() => {
    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [handler]);
};
