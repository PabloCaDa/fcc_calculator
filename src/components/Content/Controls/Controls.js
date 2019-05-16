import React from 'react'

const Controls = (props) => {
  return (
    <div className="controls__grid">
        <div className="row">
            <div id="clear" className="btn__double_hor btn__clear" onClick={props.initialize}>AC</div>
            <div id="divide" className="btn__single btn__operation" onClick={props.handleOps}>/</div>
            <div id="multiply" className="btn__single btn__operation" onClick={props.handleOps}>x</div>
        </div>
        <div className="row">
            <div id="seven" className="btn__single btn__number" onClick={props.handleNums}>7</div>
            <div id="eight" className="btn__single btn__number" onClick={props.handleNums}>8</div>
            <div id="nine" className="btn__single btn__number" onClick={props.handleNums}>9</div>
            <div id="subtract" className="btn__single btn__operation" onClick={props.handleOps}>-</div>
        </div>
        <div className="row">
            <div id="four" className="btn__single btn__number" onClick={props.handleNums}>4</div>
            <div id="five" className="btn__single btn__number" onClick={props.handleNums}>5</div>
            <div id="six" className="btn__single btn__number" onClick={props.handleNums}>6</div>
            <div id="add" className="btn__single btn__operation" onClick={props.handleOps}>+</div>
        </div>
        <div className="row__double">
            <div id="one" className="btn__single btn__number"onClick={props.handleNums}>1</div>
            <div id="two" className="btn__single btn__number" onClick={props.handleNums}>2</div>
            <div id="three" className="btn__single btn__number" onClick={props.handleNums}>3</div>
            <div id="equals" className="btn__double_ver btn__equals" onClick={props.handleEva}>=</div>
            <div id="zero" className="btn__double_hor btn__number" onClick={props.handleNums}>0</div>
            <div id="decimal" className="btn__single btn__number" onClick={props.handleDec}>.</div>
        </div>
    </div>
  )
}

export default Controls
