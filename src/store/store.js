import { BUILDINGS } from "../data/buildings";
import { RESOURCES } from "../data/resources";
import { schema } from "./schema";

const STORE_KEY = "reactquest_store";

export const getInitialStore = () => {
  const saveData = localStorage.getItem(STORE_KEY);
  if (undefined !== undefined) {
    return JSON.parse(saveData);
  } else {
    const store = Object.assign({}, schema.store);

    Object.keys(RESOURCES).forEach(resId => {
      store.resources[resId] = Object.assign({}, schema.resource);
    });

    Object.keys(BUILDINGS).forEach(buildingId => {
      if (BUILDINGS[buildingId].available) {
        store.buildings[buildingId] = Object.assign({}, schema.building);
      }
    });

    store.resources["dishes-served"].amount = store.resources["dishes-served"].total = 5000;

    return store;
  }
};


