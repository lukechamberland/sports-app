import React from "react";

export default function Scrollbar() {

  return (
    <div>
      <input
        type="range"
        class="custom-range"
        min="0"
        max="100"
        step="1"
        value="50"
      />
    </div>
  )
}