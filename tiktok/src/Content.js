import { useEffect, useState } from 'react'
// 1. useEffect(callback)
// goi callback moi khi componet re render
// goi callback moi khi componet them element vao DOM
// 2. useEffect(callback, [])
// Chi goi callback 1 lan sau khi component mounted
//3. useEffect(callback, [deps])
// Callback se duoc goi lai moi khi deps thay doi
//
// -- Callback luon duoc goi sau khi component mounted
// -- Cleanup function se duoc goi lai moi khi deps thay doi

const tabs = ['posts', 'comments', 'albums']
function Content(){
    const [title, setTitle] = useState('')
    const [posts, setPosts] = useState([])
    const [type, setType] = useState('posts')
    const [showGoToTop, setShowGoToTop] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [countdown, setCountdown] = useState(180)

    // console.log(type);countdown

    useEffect(() => {
        document.title = title
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
        .then(res => res.json())
        .then(posts => {
            setPosts(posts);
        })
    }, [type])

    useEffect(() => {
        const handleScroll = () => {
            // if(window.scrollY >= 200){
            //     setShowGoToTop(true)
            // }else{
            //     setShowGoToTop(false)
            // }
            setShowGoToTop(window.scrollY >= 200)
        }
        window.addEventListener('scroll', handleScroll)

        //Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)

        //Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []) 

    useEffect(() => {
        const timeId = setInterval(() => {
            setCountdown(prevState => prevState - 1)
        }, 1000)

        return () => clearInterval(timeId)
    }, []) 
    

    return (
        <div>
            {tabs.map(tab => (
                <button
                    key={tab}
                    style={type === tab ? {
                        color: '#fff',
                        backgroundColor: '#333',
                    } : {}}
                    onClick={() => setType(tab)}>
                    {tab}
                </button>
            ))}
            <input 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                />
                {/* {console.log('REMounted')} */}
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>{post.title || post.name}</li>
                    ))}
                </ul>

                {showGoToTop && (
                    <button 
                        style={{
                            position: 'fixed',
                            right: 20,
                            bottom: 20,
                        }}
                    >Go to Top</button>
                )}
                <h1>Resize: {width}</h1>
                <h1>Countdown: {countdown}</h1>
        </div>
    )
}

export default Content