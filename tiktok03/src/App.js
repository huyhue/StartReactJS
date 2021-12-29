
import { useEffect, useRef } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { useStore, actions } from './store'
import Video from './video'
import Heading from './components/Heading'
import Paragragh from './components/Paragragh'
import GlobalStyles from './components/GlobalStyles'
import Button from './components/Button'

import Home from './pages/Home'
import Contact from './pages/Contact'
import News from './pages/News'

function App() {
  const [state, dispatch] = useStore()
  const { todos, todoInput } = state
  const videoRef = useRef()

  const handleAdd = () => {
    dispatch(actions.addTodo(todoInput))
  }

  useEffect(() => {
    console.log(videoRef.current)
  })

  const handlePlay = () => {
    // console.log(videoRef.current.remove())
        videoRef.current.play()
  }

  const handlePause = () => {
        videoRef.current.pause()
  }
  
  return (
    <div className="App">
        <nav>
          <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/news">News</Link>
            </li>
            <li>
                <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>


      <GlobalStyles>
      <Button primary/>
        <Heading/>
        <Paragragh/>
      </GlobalStyles>
        <Video ref={videoRef} />
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
         <br/>

        <input 
            value={todoInput}
            placeholder="Enter todo..."
            onChange={e => {
              dispatch(actions.setTodoInput(e.target.value))
            }}
        />
        <button onClick={handleAdd}>Add</button>
        {
          todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))
        }
    </div>
  );
}

export default App;
