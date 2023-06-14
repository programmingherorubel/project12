import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '../Components/Loading';
import useAdmin from '../Hook/useAdmin';
import { AuthContext } from '../Provider/AuthProvider';

const AdminRouter = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const [admin] = useAdmin()
    

    if(loading){
        return <Loading/>
    }

    if(user?.email && admin){
        return children
    }

    return <Navigate to='/' ></Navigate>
};

export default AdminRouter;