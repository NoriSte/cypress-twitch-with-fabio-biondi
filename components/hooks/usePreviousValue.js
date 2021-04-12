import { useEffect, useRef } from "react";

const usePreviousValue = (value) => {
  const prevValue = useRef();

  useEffect(() => {
    prevValue.current = value;

    return () => {
      prevValue.current = undefined;
    };
  });

  return prevValue.current;
};
export default usePreviousValue;
