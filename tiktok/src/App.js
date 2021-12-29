import { useState } from 'react'
import Content from './Content'
import ContentSecond from './ContentSecond'

const orders = [100, 200, 350]
function App() {
  // Learn const [state, setState] = useState(initState)

  // const [counter, setCounter] = useState(1)
  const [counter, setCounter] = useState(() => {
    const total = orders.reduce((total, cur) => total + cur)
    // console.log(total);
    return total
  })

  const [info, setInfo] = useState({
    name: 'Nguyen Van A',
    age: 18,
    address: 'Ha Noi, VN'
  })

  const handleUpdate = () => {
    setInfo({
      ...info,
      bio: 'Yeu mau hong ^^'
    })
  }

  const gifts = [
    "CPU 19", "RAM 32RGB", "RGB Keyboard"
  ]

  const [gift, setGift] = useState()
  const randomGift = () => {
    const index = Math.floor(Math.random() * gifts.length)
    setGift(gifts[index])
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  
  const handleSubmit = () => {
    //CALL API
    console.log({name, email})
  }

  // Reponse from API
  const courses = [
    {
      id: 1,
      name: 'HTML, CSS'
    },
    {
      id: 2,
      name: 'Javascript'
    },
    {
      id: 3,
      name: 'ReactJS'
    }
  ]

  const [checked, setChecked] = useState(2)
  const handleSubmit1 = () => {
    //CALL API
    console.log({id: checked})
  }

  const [checked2, setChecked2] = useState([])
  // console.log(checked2)
  const handleSubmit2 = () => {
    //CALL API
    console.log({id: checked2})
  }

  const handleCheck = (id) => {
    setChecked2(prev => {
      const isChecked = checked2.includes(id)
      if(isChecked){
        return checked2.filter(item => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleIncrease = () => {
    setCounter(counter + 1)
    // setCounter(prevState => prevState + 1)
    // setCounter(prevState => prevState + 1)
    // setCounter(prevState => prevState + 1)
  }

  const [job, setJob] = useState('')
  const [jobs, setJobs] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem('jobs'))
    console.log(storageJobs);
    return storageJobs ?? []
  })
  // const [jobs, setJobs] = useState([])
  const handleTodo = () => {
    setJobs(prev => {
      const newJobs = [...prev, job]

      //Save to local storage
      const jsonJobs = JSON.stringify(newJobs)
      localStorage.setItem('jobs', jsonJobs)
      return newJobs
    })
    setJob('')
  }

  const [show, setShow] = useState(false)
  const [showSecond, setShowSecond] = useState(false)

  return (
    <div className="App" style={{padding: 20}}>
      <button onClick={() => setShow(!show)}>Toogle</button><br></br>
        {show && <Content/>}

        <button onClick={() => setShowSecond(!showSecond)}>Toogle Second</button><br></br>
        {showSecond && <ContentSecond/>}

        <h1>{counter}</h1>
        <button onClick={handleIncrease}>Increase</button>
        <h1>{JSON.stringify(info)}</h1>
        <button onClick={handleUpdate}>Update</button>
        <h1>{gift || 'Chua co phan thuong'}</h1>
        <button onClick={randomGift}>Lay thuong</button><br></br>

        <input value={name} onChange={e => setName(e.target.value)}/>
        <input value={email} onChange={e => setEmail(e.target.value)}/>
        <button onClick={() => setName('Nguyen van BBB')}>Change</button>
        <button onClick={handleSubmit}>Register</button><br></br>

        {courses.map(course => (
          <div key={course.id}>
            <input 
              type="radio"
              checked={checked === course.id} 
              onChange={() => setChecked(course.id)}
            />
            {course.name}
          </div>
        ))}
        <button onClick={handleSubmit1}>Register1</button><br></br>

        {courses.map(course => (
          <div key={course.id}>
            <input 
              type="checkbox"
              checked={checked2.includes(course.id)} 
              onChange={() => handleCheck(course.id)}
            />
            {course.name}
          </div>
        ))}
        <button onClick={handleSubmit2}>Register2</button><br></br>

        <input 
            value={job} 
            onChange={e => setJob(e.target.value)}
        />
        <button onClick={handleTodo}>Add Todo</button><br></br>
        <ul>
          {jobs.map((job, index) => (
            <li key={index}>{job}</li>
          ))}
        </ul><br></br>

        
    </div>
  );
}

export default App;
