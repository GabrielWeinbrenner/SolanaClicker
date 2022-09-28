import { BUILDINGS } from "../data/buildings"

import { processEffect, unlockObject } from "./actions"
import { checkRequirements } from "../modules/requirement";

export const doClick = ({ store, dispatch }) => {
  dispatch(
    processEffect({
      id: "makeDishButton",
      op: "addDish",
      amount: 1,
    })
  )
}
const checkIfObjectUnlocked = ({ store, dispatch }, data, objectStore) => {
    Object.keys(data).forEach(objectId => {
      const owned = Array.isArray(objectStore)
        ? objectStore.includes(objectId)
        : objectId in objectStore;
      if (!owned) {
        let unlocked = true;
        const objectData = data[objectId];
        if (objectData.requirements) {
          unlocked = checkRequirements(store, objectData.requirements);
        }
        if (unlocked) {
          dispatch(unlockObject(objectId));
        }
      }
    });
  };
  
export const doTick = ({ store, dispatch }, delta) => {
  delta = Math.round(delta * 10) / 10

  let upgradedBuildings = Object.assign({}, BUILDINGS)
  // process building effects
  checkIfObjectUnlocked({ store, dispatch }, BUILDINGS, store.buildings)
  Object.keys(store.buildings).forEach(buildingId => {
    const building = store.buildings[buildingId]
    if (building.amount > 0) {
      const buildingData = BUILDINGS[buildingId]
      if (buildingData.onTick) {
        buildingData.onTick.forEach(effect => {
          dispatch(processEffect(effect, delta))
        })
      }}
  })
}
