import React from 'react'

const Displays = (props) => {
  return (
    <div className="row__display">
        <div id="formulaDisplay">{props.formula}</div>
        <div id="display">{props.display}</div>
    </div>
  )
}

export default Displays
