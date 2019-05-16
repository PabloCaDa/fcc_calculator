import React, { Component } from 'react'
import './Content.scss'
import Displays from './Displays/Displays'
import Controls from './Controls/Controls'

const contentStyle = {
    backgroundColor: '#dbdbdb',
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

const isOperator = /[x/+-]/
const endsWithOperator = /[x+-/]$/

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
              this.setState({ formula: this.state.prevVal + value });
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
                    <Displays formula={formula} display={currentVal}/>
                    <Controls 
                        initialize={this.initialize}
                        handleOps={this.handleOperations}
                        handleNums={this.handleNumbers}
                        handleDec={this.handleDecimal}
                        handleEva={this.handleEvaluate}
                    />
                </div>
            </div>
        )
    }
}

