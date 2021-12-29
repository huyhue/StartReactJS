import {useState, useCallback, useMemo, useReducer, useRef, createContext, useContext } from "react"
import Content from "./Content"
import ContentX from "./ContentX"
import Content2 from "./Content2"
import TodoApp from './Todo'
import './App.css'
import { ThemeContext } from './ThemeContext'

// 1. memo() => Hight order component (HOC)
// 2. useCallback()
// - reference types
// - react memo()

//useState
// 1. Init state: 0
// 2. Actions: Up (state + 1) / Down (state - 1)

//useReducer
// 1. Init state: 0
// 2. Actions: Up (state + 1) / Down (state - 1)
// 3. Reducer
// 4. Dispatch


//init state
const initState = 0

//Action
const UP_ACTION = 'up'
const DOWN_ACTION = 'down'

//Reducer
const reducer = (state, action) => {
  console.log('reducer running...')
  switch(action){
      case UP_ACTION:
        return state + 1
      case DOWN_ACTION:
        return state - 1
      default:
        throw new Error('Invalid action')
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)
  const [price, setPrice] = useState('')
  const [name, setName] = useState('')
  const [products, setProducts] = useState([])

  const [countDU, dispatch] = useReducer(reducer, initState)
  const context = useContext(ThemeContext)

  const handleSubmit = () => {
    setProducts([...products, {
      name,
      price: +price
    }])
  }

  // const total = products.reduce((result, prod) => {
  //   console.log("Tinh toan lai...");
  //   return result + prod.price
  // }, 0)

  const total = useMemo(() => {
      const result = products.reduce((result, prod) => {
        console.log("Tinh toan lai...");
        return result + prod.price
      }, 0)
    return result
  }, [products]) 

  const increase = () => {
    setCount(count + 1)
  }

  const handleIncrease = useCallback(() => {
    setCount(prevCount => prevCount + 1)
  }, [])
  
  const increase2 = () => {
    setCount2(count2 + 1)
  }

  return (
    <div style={ {padding: '10px 32px'}}>
        <button onClick={context.toggleTheme}>Toggle Theme</button>
        <ContentX/>
        

        <TodoApp/>
        <br/>
        <h1>{countDU}</h1>
        <button onClick={() => dispatch(DOWN_ACTION)}>Down</button>
        <button onClick={() => dispatch(UP_ACTION)}>Up</button><br/>
        <br/>
        <input 
            value={name}
            placeholder="Enter name..."
            onChange={e => setName(e.target.value)}
        /><br/>
        <input 
            value={price}
            placeholder="Enter price..."
            onChange={e => setPrice(e.target.value)}
        /><br/>
        <button onClick={handleSubmit}>Add</button>
        Total: {total}
        <ul>
            {products.map((product, index) => (
              <li key={index}>{product.name} - {product.price}</li>
            ))}
        </ul>

        {/* <Content count={count}/> */}
        <Content2 onIncrease={handleIncrease}/>
        <h1>{count}</h1>
        <h1>{count2}</h1>
        {/* <button onClick={increase}>Click me !</button> */}
        <button onClick={increase2}>Click me 2!</button>
    </div>
  );
}

export default App;
