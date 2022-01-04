import { FC, useCallback, useMemo } from "react";

let renders = 0;
const UseMemoExample: FC = () => {
  // as this is a non primitive value, it will be re-rendered every time
  // hence the useMemo hook
  const numbers = useMemo(
    (): number[] => [2, 1, 3, 5, 6, 1, 3, 5, 1, 5, 7, 1],
    []
  );

  // save the function!
  const sortData = useCallback((data: number[]): number[] => {
    renders++;
    console.log(`useMemoSorts: ${renders}`);
    return data.sort((a: number, b: number) => {
      return a - b;
    });
  }, []);

  // save the sorted values
  const sortedNumbers = useMemo(
    (): number[] => sortData(numbers),
    [numbers, sortData]
  );

  // can even memoize the jsx for the render
  const sortedNumbersRender = useMemo(
    () => sortedNumbers.map((n: number) => <li>{n}</li>),
    [sortedNumbers]
  );

  return <ol>{sortedNumbersRender}</ol>;
};

export default UseMemoExample;
