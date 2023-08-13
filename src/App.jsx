import { useState } from 'react'
import './App.css'

function App() {

  const [current, setCurrent] = useState('')
  const [previous, setPrevious] = useState('')
  const [operations, setOperations] = useState('')

  const calculatorBtn = (el) => {
    const value = el.target.getAttribute('data');
    // if (value === '.' && previous.includes('.')) {
    //   return;
    // }
    setCurrent(current + value)
  }

  const deleteOne = () => {
    setCurrent(String(current).slice(0, -1))
  }

  const allClear = () => {
    setCurrent('');
    setOperations('');
    setPrevious('');
  }

  const handleOperation = (el) => {
    if (current === '') {
      return;
    } else if (previous !== '') {
      let value = compute();
      setPrevious(value)
    } else {
      setPrevious(current)
    }
    setCurrent('')
    setOperations(el.target.getAttribute('data'))
  }

  const giveResult = () => {
    let value = compute();
    if (value === undefined && value === null) {
      return;
    }
    setCurrent(value)
    setPrevious('')
    setOperations('')

  }

  const compute = () => {
    let result;
    let previousNum = parseFloat(previous)
    let currentNum = parseFloat(current)
    if (isNaN(previousNum) || isNaN(currentNum)) {
      return;
    }
    switch (operations) {
      case '÷':
        if (currentNum === 0) {
          return "Error: Division by zero";
        }
        result = previousNum / currentNum;
        break;
      case '+':
        result = previousNum + currentNum;
        break;
      case '-':
        result = previousNum - currentNum;
        break;
      case 'x':
        result = previousNum * currentNum;
        break;
      default:
        return;
    }
    return result
  }

  return (
    <>
      <div className='container'>
        <div className='calc'>
          <div className='input'>
            <h1>{previous} {operations}</h1>
            <h1 style={{ marginLeft: '8px' }}>{current}</h1>
          </div>
          <div>
            <button style={{ backgroundColor: '#e2e2e2', width: '180px' }} onClick={allClear}>
              AC
            </button>
            <button style={{ backgroundColor: '#e2e2e2' }} onClick={deleteOne}>
              <i className='fa-solid fa-arrow-left'></i>
            </button>
            <button data={'÷'} style={{ backgroundColor: '#f17600' }} onClick={handleOperation}>
              ÷
            </button>
          </div>
          <div>
            <button data={7} onClick={calculatorBtn}>7</button>
            <button data={8} onClick={calculatorBtn}>8</button>
            <button data={9} onClick={calculatorBtn}>9</button>
            <button data={'x'} style={{ backgroundColor: '#f17600' }} onClick={handleOperation}>
              x
            </button>
          </div>
          <div>
            <button data={4} onClick={calculatorBtn}>4</button>
            <button data={5} onClick={calculatorBtn}>5</button>
            <button data={6} onClick={calculatorBtn}>6</button>
            <button data={'-'} style={{ backgroundColor: '#f17600' }} onClick={handleOperation}>
              -
            </button>
          </div>
          <div>
            <button data={1} onClick={calculatorBtn}>1</button>
            <button data={2} onClick={calculatorBtn}>2</button>
            <button data={3} onClick={calculatorBtn}>3</button>
            <button data={'+'} style={{ backgroundColor: '#f17600' }} onClick={handleOperation}>
              +
            </button>
          </div>
          <div>
            <button style={{ width: '180px' }} data={0} onClick={calculatorBtn}>
              0
            </button>
            <button data={'.'} onClick={calculatorBtn}>.</button>
            <button style={{ backgroundColor: '#f17600' }} onClick={giveResult}>
              =
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
