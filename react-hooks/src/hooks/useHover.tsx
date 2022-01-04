import { useRef, useState, useEffect, RefObject } from "react";

// react hook for hovering, returning a
// ref to the element and a boolean
// indicating if the element is hovered

// note that you must specify the type of the
// element you are hovering over
// e.g. const {ref, isHovering} = useHover<HTMLDivElement>()
export const useHover = <T extends HTMLElement>(): [RefObject<T>, boolean] => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;

    if (node) {
      node.addEventListener("mouseenter", () => setIsHovered(true));
      node.addEventListener("mouseleave", () => setIsHovered(false));
    }
    if (node) {
      return () => {
        node.removeEventListener("mouseenter", () => setIsHovered(true));
        node.removeEventListener("mouseleave", () => setIsHovered(false));
      };
    }
  });
  return [ref, isHovered];
};
