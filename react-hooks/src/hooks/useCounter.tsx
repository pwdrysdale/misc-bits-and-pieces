import { useCallback, useState } from "react";

export const useCounter = (
  initialValue: number = 0,
  change: number = 1,
  min: number | undefined = undefined,
  max: number | undefined = undefined
) => {
  const [value, setValue] = useState(initialValue);

  const increment = useCallback(() => {
    let newValue: number = value + change;
    if (max !== undefined && value + change > max) {
      newValue = max;
    }
    setValue(newValue);
  }, [value, setValue, change, max]);

  const decrement = useCallback(() => {
    let newValue: number = value - change;
    if (min !== undefined && value - change < min) {
      newValue = min;
    }
    setValue(newValue);
  }, [value, setValue, change, min]);

  return { value, increment, decrement };
};
