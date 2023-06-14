export const useInstrator = ()=>{
    const [ourInstractor,setOurInsTractor] = useState([])
    const [instractorLoading,setInstractorLoading] = useState(true)
    useEffect(()=>{
        fetch('https://project12server-programmingherorubel.vercel.app/instractor')
        .then(res => res.json())
        .then(data => {
            setOurInsTractor(data)
            setInstractorLoading(false)
        })
    },[])
    return [ourInstractor,instractorLoading]
}