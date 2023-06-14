import React from 'react';
import '../Style/Common.css'

const Button = ({buttonTitle}) => {
    return <div className='mx-auto text-center'> <button className='button'>{buttonTitle}</button></div>
};

export default Button;