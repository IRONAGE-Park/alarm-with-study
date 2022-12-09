import { type RefObject, useEffect } from "react";
// React module

const useOutsideClick = (ref: RefObject<HTMLElement>, onClick = () => {}) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Element)) {
        onClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClick, ref]);
};

export default useOutsideClick;
