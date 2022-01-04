import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  MutableRefObject,
  RefObject,
  DetailedHTMLProps,
  HTMLAttributes,
  useMemo,
} from "react";

type HoverData<T extends HTMLElement> = {
  hoverProps: DetailedHTMLProps<HTMLAttributes<T>, T>;
  isHovered: boolean;
};

export const useHover = <T extends HTMLElement>(): [
  DetailedHTMLProps<HTMLAttributes<T>, T>,
  boolean
] => {
  const [isHovered, setIsHovered] = useState(false);

  const hoverProps: DetailedHTMLProps<HTMLAttributes<T>, T> = useMemo(
    () => ({
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    }),
    [setIsHovered]
  );

  return [hoverProps, isHovered];
};
