import { useState } from "react";

const useArray = (init) => {
  const [state, setState] = useState(init);

  const push = (item) => {
    setState((prev) => [...prev, item]);
  };

  const clear = () => {
    setState([]);
  };

  return {
    state,
    push,
    clear,
  };
};

export default useArray;
