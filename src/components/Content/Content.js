import React, { Component } from 'react'
import './Content.scss'

const contentStyle = {
    backgroundColor: 'var(--main-title-text-color)',
    color: 'var(--main-text-color)',
    minHeight:'80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
}

const initialState = {
    currentVal: '0',
    prevVal: '0',
    formula: '',
    currentSign: '',
    lastClicked: '',
}

const isOperator = /[x/+‑]/
const endsWithOperator = /[x+‑/]$/


export default class Calculator extends Component {
    state = initialState;

    maxDigitLimit = () => {
        this.setState({
            currentVal: 'Digit Limit Reached',
            prevVal: this.state.currentVal
        })

        setTimeout(() => this.setState({currentVal: this.state.prevVal}), 1000)
    }

    handleEvaluate = () => {
        if (!this.state.currentVal.includes('Limit')) {
          let expression = this.state.formula;
          if (endsWithOperator.test(expression)) expression = expression.slice(0, -1);
          expression = expression.replace(/x/g, "*").replace(/‑/g, "-");
          // eslint-disable-next-line no-eval
          let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
          this.setState({
            currentVal: answer.toString(),
            formula: expression.replace(/\*/g, '⋅').replace(/-/g, '‑') + '=' + answer,
            prevVal: answer,
            evaluated: true });
        }
      }

    handleOperations = (e) => {
        const value = e.target.innerText;
        if (!this.state.currentVal.includes('Limit')) {
            this.setState({ currentVal: value, evaluated: false });
            if (this.state.formula.includes('=')) {
              this.setState({ formula: this.state.prevVal + value }); // comment 1
            } else {
              this.setState({
                prevVal: !isOperator.test(this.state.currentVal) ?
                this.state.formula :
                this.state.prevVal,
                formula: !isOperator.test(this.state.currentVal) ?
                this.state.formula + value :
                this.state.prevVal + value });
            }
          }
    }

    handleDecimal = () => {
        if (this.state.evaluated === true) {
            this.setState({
            currentVal: '0.',
            formula: '0.',
            evaluated: false });
        } else if (!this.state.currentVal.includes('.') && !this.state.currentVal.includes('Limit')) {
            this.setState({ evaluated: false });
            if (this.state.currentVal.length > 21) {
            this.maxDigitWarning();
            } else if (endsWithOperator.test(this.state.formula) || (this.state.currentVal === '0' && this.state.formula === '')) {
            this.setState({
                currentVal: '0.',
                formula: this.state.formula + '0.' });
            } else {
            this.setState({
                currentVal: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + '.',
                formula: this.state.formula + '.' });
            }
        }
    }

    handleNumbers = (e) => {
        const value = e.target.innerText;
        if (!this.state.currentVal.includes('Limit'))
            this.setState({evaluated: false})
            if(this.state.currentVal.length > 21) this.maxDigitLimit()
            else if (this.state.evaluated === true) {
                this.setState({
                    currentVal: value,
                    formula: value !== '0' ? value : ''
                })
            } else {
                this.setState({
                    currentVal:
                    this.state.currentVal === '0' ||
                    isOperator.test(this.state.currentVal) ?
                    value : this.state.currentVal + value,
                    formula:
                    this.state.currentVal === '0' && value === '0' ?
                    this.state.formula :
                    /([^.0-9]0)$/.test(this.state.formula) ?
                    this.state.formula.slice(0, -1) + value :
                    this.state.formula + value });
            }
    }

    initialize = () => {
        this.setState(initialState);
    }

    render() {
        const currentVal = this.state.currentVal;
        const formula = this.state.formula;
        return (
            <div id="content" style={contentStyle} >
                <div id="calculator">
                    <div className="row__display">
                        <div id="formulaDisplay">{formula}</div>
                        <div id="display">{currentVal}</div>
                    </div>
                    <div className="row">
                        <div id="clear" className="btn__double_hor btn__clear" onClick={this.initialize}>AC</div>
                        <div id="divide" className="btn__single btn__operation" onClick={this.handleOperations}>/</div>
                        <div id="multiply" className="btn__single btn__operation" onClick={this.handleOperations}>x</div>
                    </div>
                    <div className="row">
                        <div id="seven" className="btn__single btn__number" onClick={this.handleNumbers}>7</div>
                        <div id="eight" className="btn__single btn__number" onClick={this.handleNumbers}>8</div>
                        <div id="nine" className="btn__single btn__number" onClick={this.handleNumbers}>9</div>
                        <div id="substract" className="btn__single btn__operation" onClick={this.handleOperations}>-</div>
                    </div>
                    <div className="row">
                        <div id="four" className="btn__single btn__number" onClick={this.handleNumbers}>4</div>
                        <div id="five" className="btn__single btn__number" onClick={this.handleNumbers}>5</div>
                        <div id="six" className="btn__single btn__number" onClick={this.handleNumbers}>6</div>
                        <div id="add" className="btn__single btn__operation" onClick={this.handleOperations}>+</div>
                    </div>
                    <div className="row__double">
                        <div id="one" className="btn__single btn__number"onClick={this.handleNumbers}>1</div>
                        <div id="two" className="btn__single btn__number" onClick={this.handleNumbers}>2</div>
                        <div id="three" className="btn__single btn__number" onClick={this.handleNumbers}>3</div>
                        <div id="equals" className="btn__double_ver btn__equals" onClick={this.handleEvaluate}>=</div>
                        <div id="zero" className="btn__double_hor btn__number" onClick={this.handleNumbers}>0</div>
                        <div id="decimal" className="btn__single btn__number" onClick={this.handleDecimal}>.</div>
                    </div>
                </div>
            </div>
        )
    }
}

