import React from 'react';
import {PropagateLoader} from 'react-spinners'

const CommonInsTractorTitle = ({title}) => {
    return (
        <div className='mt-5 text-center mb-5'>
            <h4 className='mx-auto text-center' style={{display:'inline',borderBottom:'4px solid #1A1F45'}}>{title}</h4>
            <p className='text-center mt-2 mx-auto'><PropagateLoader color="#1A1F45" /></p>
        </div>
    );
};

export default CommonInsTractorTitle;