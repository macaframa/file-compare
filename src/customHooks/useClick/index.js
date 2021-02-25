import { useRef } from "react";

const useClick = () => {
  const htmlElRef = useRef(null);
  const setClick = () => {
    htmlElRef.current && htmlElRef.current.click();
  };

  return [htmlElRef, setClick];
};

export default useClick;
