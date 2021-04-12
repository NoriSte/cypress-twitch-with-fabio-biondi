import { useCallback, useEffect, useRef, useState } from "react";

export const useDelayedShow = (delay = 300) => {
  const [visible, setVisible] = useState(false);
  const timer = useRef();

  const show = useCallback(() => {
    timer.current = setTimeout(() => setVisible(true), delay);
  }, []);

  const hide = useCallback(() => {
    timer.current && clearTimeout(timer.current);
    setVisible(false);
  }, []);

  useEffect(() => {
    return () => {
      timer.current && clearTimeout(timer.current);
    };
  }, []);

  return {
    show,
    hide,
    visible,
  };
};
