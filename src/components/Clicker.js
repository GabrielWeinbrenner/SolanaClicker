import React from "react";
import { useStore, useDispatch } from "../context/Instance";

import { doClick } from "../actions/middlewares";

export const Clicker = () => {
  const store = useStore();
  const dispatch = useDispatch();
  return (
    <div>
      <button
        style={{ padding: "1em" }}
        onClick={() => doClick({ store, dispatch })}
      >
        Serve Dish To Customer +1
      </button>
    </div>
  );
};

