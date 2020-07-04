import React from 'react';
import ReactDOM from 'react-dom';
import ScaleText from "react-scale-text";
import './index.css';

function DecBtn(props) {
  return (
  <button className="btn btn-s dec-btn" onClick={props.onClick}>
    {props.value}
  </button>
  );
}

function FuncBtn(props) {
  return (
    <button className="btn btn-s func-btn" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function OpBtn(props) {
  return (
    <button className="btn btn-s op-btn" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function NumBtn(props) {
  return (
  <button className="btn btn-s num-btn" onClick={props.onClick}>
    {props.value}
  </button>
  );
}

function NumBtnLarge(props) {
  return (
  <button className="btn btn-m num-btn" onClick={props.onClick}>
    {props.value}
  </button>
  );
}

function CalcDisplay(props) {
  const maxStrLen = 10;
  const val = props.value.toString().substring(0, maxStrLen);

  return (
    <div className="calc-display">
      <ScaleText>
        <p className="calc-value">
          {val}
       </p>
      </ScaleText>
    </div>
  );
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    // result: final result
    // value: value shown currently on display
    this.state = {
      result: "0",
      operator: "",
      value: "0",
    }
  }

  valueClicked(v) {
    let value = this.state.value;

    if (isNaN(parseInt(value))) {
      // Sometimes an operator is left in value, just make it zero.
      value = "0";
    }

    if (value === "0") {
      if (v === 0) {
        // 0 === 00 === 000 ..., do nothing
        value = "0";
      }
      if (v === ".") {
        value = "0.";
      }
      if (!isNaN(parseInt(v)) && parseInt(v) > 0 && parseInt(v) < 10) {
        value = v;
      }
    } else if (value.indexOf(".") !== -1 && v === ".") {
      // can't have multiple decimals, do nothing
      //value = value;
    } else {
      value = value + v;
    }

    this.setState({ value: value });
  }

  add() {
    const result = parseFloat(this.state.result) + parseFloat(this.state.value);

    this.setState({ result: result.toString(), operator: "", value: result.toString() });
  }

  subtract() {
    const result = parseFloat(this.state.result) - parseFloat(this.state.value);

    this.setState({ result: result.toString(), operator: "", value: result.toString() });
  }

  divide() {
    const result = parseFloat(this.state.result) / parseFloat(this.state.value);

    this.setState({ result: result.toString(), operator: "", value: result.toString() });
  }

  multiply() {
    const result = parseFloat(this.state.result) * parseFloat(this.state.value);

    this.setState({ result: result.toString(), operator: "", value: result.toString() });
  }

  modulus() {
    const result = parseFloat(this.state.result) % parseFloat(this.state.value);

    this.setState({ result: result.toString(), operator: "", value: result.toString() });
  }

  negate() {
    const value = -1 * parseFloat(this.state.value);

    this.setState({ value: value.toString() });
  }

  setOperator(op) {
    /* if (this.state.operator != "") {
         this.calculate(); // allow for chaining operations
       }
    */
    this.setState({ result: this.state.value, operator: op, value: op })
  }

  calculate() {
    console.log("calculate():");
    console.log(this.state);

    switch(this.state.operator) {
      case "%":
        this.modulus();
        break;
      case "÷":
        this.divide();
        break;
      case "×":
        this.multiply();
        break;
      case "-":
        this.subtract();
        break;
      case "+":
        this.add();
        break;
      default:
        //ignore
        break;
    }
  }

  reset() {
    this.setState({ result: "0", operator: "", value: "0" });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.calculate();
    }
  }

  render() {
    return (
      <div className="calculator">
        <CalcDisplay value={this.state.value} />
        <div className="calc-buttons">
          <div className="btn-row">
            <OpBtn value={"AC"} onClick={() => this.reset()} />
            <OpBtn value={"+/-"} onClick={() => this.negate()} />
            <OpBtn value={"%"} onClick={() => this.setOperator("%")} />
            <FuncBtn value={"÷"} onClick={() => this.setOperator("÷")} />
          </div>
          <div className="btn-row">
            <NumBtn value={"7"} onClick={() => this.valueClicked("7")} />
            <NumBtn value={"8"} onClick={() => this.valueClicked("8")} />
            <NumBtn value={"9"} onClick={() => this.valueClicked("9")} />
            <FuncBtn value={"×"} onClick={() => this.setOperator("×")} />
          </div>
          <div className="btn-row">
            <NumBtn value={"4"} onClick={() => this.valueClicked("4")} />
            <NumBtn value={"5"} onClick={() => this.valueClicked("5")} />
            <NumBtn value={"6"} onClick={() => this.valueClicked("6")} />
            <FuncBtn value={"-"} onClick={() => this.setOperator("-")} />
          </div>
          <div className="btn-row">
            <NumBtn value={"1"} onClick={() => this.valueClicked("1")} />
            <NumBtn value={"2"} onClick={() => this.valueClicked("2")} />
            <NumBtn value={"3"} onClick={() => this.valueClicked("3")} />
            <FuncBtn value={"+"} onClick={() => this.setOperator("+")} />
          </div>
          <div className="btn-row">
            <NumBtnLarge value={"0"} onClick={() => this.valueClicked("0")} />
            <DecBtn value={"."} onClick={() => this.valueClicked(".")} />
            <FuncBtn value={"="} onClick={() => this.calculate()} />
          </div>
        </div>
      </div>
    );

  }
}

ReactDOM.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>,
  document.getElementById('root')
);
