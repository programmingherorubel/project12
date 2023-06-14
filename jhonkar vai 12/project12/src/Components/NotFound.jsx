import React from 'react';
import '../Style/NotFound.css'
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <>
      <div className="not-found">
      <div className="animation">
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'10vh'}} className="box"><h1 className='text-white'>4</h1></div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'10vh'}} className="box"><h1 className='text-white'>0</h1></div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'10vh'}} className="box"><h1 className='text-white'>4</h1></div>
      </div>
      <p className="description"><Link to='/' style={{color:'gray',fontSize:'100px',textDecoration:'none'}}>Home</Link></p>
    </div> 
    </>
  );
};

export default NotFound;