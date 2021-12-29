import { useRef, useEffect, useLayoutEffect, useState } from 'react'

//1. useEffect(callback)
// goi callback moi khi componet re render
// goi callback moi khi componet them element vao DOM
//2. useEffect(callback, [])
// Chi goi callback 1 lan sau khi component mounted
//3. useEffect(callback, [deps])
// Callback se duoc goi lai moi khi deps thay doi
//
// -- Callback luon duoc goi sau khi component mounted
// -- Cleanup function luon duoc goi truoc khi component mounted
// -- Cleanup function luon duoc goi truoc khi callback duoc goi

// useEffect
// 1. Cap nhat lai state
// 2. Cap nhap DOM (mutated)
// 3. Render lai UI
// 4. Goi cleanup neu deps thay doi
// 5. Goi useEffect callback

// useLayoutEffect
// 1. Cap nhat lai state
// 2. Cap nhap DOM (mutated)
// 3. Goi cleanup neu deps thay doi (sync)
// 4. Goi useEffect callback (sync)
// 5. Render lai UI

// useRef
// Luu cac gia tri cua mot tham chieu ben ngoai
// function component

const lessons = [
    {
        id: 1,
        name: "Bai tap 1, lam sao de ngu hon"
    },
    {
        id: 2,
        name: "Bai tap 2, gia huy ngu si dan don"
    },
    {
        id: 3,
        name: "Bai tap 3, khong ai ngu bang huy hue"
    }
]
function ContentSecond(){
    const [count, setCount] = useState(1)
    const [countL, setCountL] = useState(0)
    const [countSS, setCountSS] = useState(60)
    const [avatar, setAvatar] = useState()
    const [lessonId, setLessonId] = useState(1)

    useEffect(() => {
        const handleComment = ({ detail }) => {
            console.log(detail);
        }

        window.addEventListener(`lesson-${lessonId}`, handleComment);

        //Cleanup function
        return () => {
            window.removeEventListener(`lesson-${lessonId}`, handleComment);
        }
    }, [lessonId])

    useEffect(() => {
        console.log(`Mounted or re-render lan ${count}`)

        //Cleanup function
        return () => {
            console.log(`Cleanup lan ${count}`)
        }
    }, [count])

    useEffect(() => {
        //Cleanup function
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    }, [avatar])

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file)
        setAvatar(file)
    }

    useEffect(() => {
        if(countL > 3){
            setCountL(0)
        }
    }, [countL])

    const handleRun = () => {
        setCountL(countL+1)
    }

    const timeId = useRef()
    const prevCount = useRef()
    const h1ref = useRef()

    useEffect(() => {
        prevCount.current = countSS
    },[countSS])

    useEffect(() => {
        console.log(h1ref.current);
    })

    const handleStart = () =>{
        timeId.current = setInterval(() => {
            setCountSS(prevCount => prevCount-1)
        }, 1000)

        console.log('Start -> ', timeId.current);
    }

    const handleStop = () =>{
        clearInterval(timeId.current);
        console.log('Stop -> ', timeId.current);
    }

    console.log(countSS, prevCount.current);

    return (
        <div>
            <ul>
                {lessons.map(lesson => (
                    <li
                        key={lesson.id}
                        style={{
                            color: lessonId === lesson.id ?
                                'red' : '#333'
                        }}
                        onClick={() => setLessonId(lesson.id)}
                    >
                        {lesson.name}
                    </li>
                ))}
            </ul>
            <input
                type="file"
                onChange={handlePreviewAvatar}
            />
            {avatar && (
                <img src={avatar.preview} alt="" width="80%"/>
            )}
            <h1>{count}</h1>
            <button onClick={() => setCount(count+1)}>
                Click me !
            </button>
            <h1>{countL}</h1>
            <button onClick={handleRun}>
                Run
            </button>
            <h1 ref={h1ref}>{countSS}</h1>
            <button onClick={handleStart}> Start </button>
            <button onClick={handleStop}> Stop </button>
        </div>
    )
}

export default ContentSecond