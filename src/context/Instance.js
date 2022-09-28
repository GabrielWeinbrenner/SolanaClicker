import React, { useReducer, useEffect } from "react";
import { storeReducer } from "../reducers/reducers";
import { getInitialStore, saveStore } from "../store/store";
import { doTick } from "../actions/middlewares";
import { createContainer } from "react-tracked";

const useValue = () => useReducer(storeReducer, getInitialStore());
const { Provider, useTrackedState, useUpdate } = createContainer(useValue);

export { useTrackedState as useStore, useUpdate as useDispatch };

export const InstanceProvider = ({ children }) => {
  const StoreManager = () => {
    const store = useTrackedState();
    const dispatch = useUpdate();
    const [time, setTime] = React.useState(Date.now());

    React.useEffect(() => {
      const timer = window.setInterval(() => {
        setTime(Date.now());
      }, 1000);
      return () => {
        window.clearInterval(timer);
      };
    }, []);

    useEffect(() => {
      const delta = (1000 - (Date.now() - time)) / 1000;
      doTick({ store, dispatch }, delta);
    }, [time]); 
    return null;
  };

  return (
    <Provider>
      <StoreManager />
      {children}
    </Provider>
  );
};
