import { useEffect } from "react";

const useUnmount = (unmount, conditions = []) => {
  useEffect(
    () => () => {
      if (unmount) {
        unmount();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    conditions
  );
};

export default useUnmount;
