import React from 'react';
import {ScaleLoader} from 'react-spinners'

const Loading = () => {
    return (
        <div style={{width:'100%',height:'80vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <ScaleLoader color="#1A1F45" />
        </div>
    );
};

export default Loading;