import { actions } from "../actions/actions"
import { canAfford } from "../modules/utils"

import { BUILDINGS } from "../data/buildings"

import cloneDeep from "lodash.clonedeep"
import { schema } from "../store/schema"
import { checkRequirements } from "../modules/requirement"

export const storeReducer = (store, action) => {
  switch (action.type) {
    case actions.PURCHASE_OBJECT: {
      const { id } = action
      let amountOwned = id in BUILDINGS ? store.buildings[id].amount : 1
      const [canBuy, costs] = canAfford(id, amountOwned, store.resources)

      if (canBuy) {
        const expendedResources = cloneDeep(store.resources)
        costs.forEach((cost) => {
          expendedResources[cost.id].amount -= cost.amount
        })
        if (id in BUILDINGS) {
          const updatedBuildings = cloneDeep(store.buildings)
          updatedBuildings[id].amount += 1
          return {
            ...store,
            resources: expendedResources,
            buildings: updatedBuildings,
          }
        }
      }
      return store
    }
    case actions.UNLOCK_OBJECT: {
      const { id } = action
      if (id in BUILDINGS) {
        return {
          ...store,
          buildings: {
            ...store.buildings,
            [id]: Object.assign({}, schema.building),
          },
        }
      }
      return store
    }

    case actions.PROCESS_EFFECT: {
      const { id, op, amount, req, rate } = action
      const { delta } = action
      if (req) {
        if (!checkRequirements(store, req)) {
          return store
        }
      }

      const updatedResources = cloneDeep(store.resources)
      
      if (op === "addDish") {
        updatedResources["dishes-served"].amount += amount * delta
        updatedResources["dishes-served"].total += amount * delta
      }
      if (rate) updatedResources[id].rate = amount * delta
      return { ...store, resources: updatedResources }
    }
    default:
      console.error(`🛑 Unknown action dispatched!`, action)
  }
}
