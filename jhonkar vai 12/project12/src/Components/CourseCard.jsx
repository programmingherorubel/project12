import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const CourseCard = ({course}) => {
    const {Img,courseName,availableSeat,_id,teachersName,departmentEmail,coursePrice} = course || {}
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const handelSelect = (course)=>{
        const readyToSend = confirm('are you sure you want to join this course ?')
        const userEmail =  user?.email
        if(readyToSend){
            const informatino = {
                Id:course._id,
                img:course.Img,
                courseName:course.courseName,
                cousrseSeat:course.availableSeat,
                teachersName:course.teachersName,
                eamil: course.departmentEmail,
                price: course.coursePrice,
                userEmail
            }
            fetch(`https://project12server-programmingherorubel.vercel.app/addtocart`,{
                method:'POST',
                headers:{
                    'content-type': 'application/json'
                },
                body:JSON.stringify(informatino)
            })
            .then(res => res.json())
            .then(data => {
                if(data.insertedId){
                    toast('added successfully')
                }
            })
            
        }
    }

    const loginHandeler = ()=>{
        toast.error((t) => (
            <span>
              Please  {navigate("/login", { state: { from: location } }) }Login
            </span>
          ));
    }
    return (
        <div className='m-3'>
            <Link style={{textDecoration:'none'}} to={`/course/${_id}`}>
            <img src={Img} className='img-fluid' alt='' />
            <div className='p-2' style={{display:'flex',justifyContent:'space-between'}}>
                <h6 className='mx-2' style={{color:'gray'}}>{courseName}</h6>
                <h6 className='mx-2' style={{color:'gray'}}>Available<span  style={{color:'#1A1F45'}}>{availableSeat}</span></h6>
            </div>
            </Link>
            {
            user?.email  ? <button  onClick={()=>handelSelect(course)} className='button'>Select Class</button>
            :
            <button onClick={()=>loginHandeler()} className='button'>Select Class</button>    
            }
        </div>
    );
};

export default CourseCard;