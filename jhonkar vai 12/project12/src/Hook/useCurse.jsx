import { useEffect, useState } from "react"

const useCurse = ()=>{
    const [mycourse,setMyCourse] = useState([])
    const [transTacLoading,setTransTacLoading] = useState(true)
    useEffect(()=>{
        fetch('https://project12server-programmingherorubel.vercel.app/newcourse')
        .then(res => res.json())
        .then(data => {
            setMyCourse(data)
            setTransTacLoading(false)
        })
    },[])
    return [mycourse,transTacLoading]
}

export default useCurse