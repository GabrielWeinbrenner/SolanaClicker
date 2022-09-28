import React from "react"
import { useStore } from "../context/Instance"


export const Resources = () => {
  const { resources } = useStore()
  return (
    <div
      style={{ fontSize: "x-large", display: "flex", justifyContent: "center" }}
    >
      <p title="Dishes Served" style={{ padding: "0.25em" }}>
        🍽 {resources[ "dishes-served" ].amount}
        <span style={{ fontSize: "small" }}>
          ({resources.rate > 0 ? resources.rate.toFixed(1) : "0.0"}
          /s)
        </span>
      </p>
    </div>
  )
}
