import {useReducer, useRef } from "react"
import reducerTodo, {initStateTodo } from './reducer'
import {setJob, addJob, deleteJob } from './actions'
import logger from './logger'

function App() {
  const [stateTodo, dispatchTodo] = useReducer(logger(reducerTodo), initStateTodo)
  const {job, jobs} = stateTodo

  const inputRef = useRef()

  const handleSubmitTodo = () => {
      dispatchTodo(addJob(job))
      dispatchTodo(setJob(''))

      inputRef.current.focus()
  }

  return (
    <div style={ {padding: '10px 32px'}}>
        <h3>Todo Reducer</h3>
        <input 
            ref={inputRef}
            value={job}
            placeholder="Enter todo..."
            onChange={e => dispatchTodo(setJob(e.target.value)) }
        /><br/>
        <button onClick={handleSubmitTodo}>Add</button>
        <ul>
            {jobs.map((job, index) => (
              <li key={index}>{job}  
                  <span onClick={() => dispatchTodo(deleteJob(index))}>
                      &times;
                  </span>
               </li>
            ))}
        </ul>
      <br/>

    </div>
  );
}

export default App;
