import { useEffect, useRef } from "react";
import useMount from "./useMount";
import useUnmount from "./useUnmount";

const useDidUpdate = (action, conditions) => {
  const mounted = useRef(false);

  useUnmount(() => {
    mounted.current = false;
  });

  useEffect(
    () => {
      if (mounted.current) {
        action();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    conditions
  );

  useMount(() => {
    mounted.current = true;
  });
};

export default useDidUpdate;
