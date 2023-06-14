import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useForm } from 'react-hook-form';
import { Col, Container, Row } from 'react-bootstrap';
import CommonInsTractorTitle from '../Common/CommonInsTractorTitle';
import Button from '../Common/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';




const Login = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/";
    const { login } = useContext(AuthContext)
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        login(data.email,data.password)
        navigate(from, { replace: true });
    };
    return (
        <Container>
            <Row>
                <CommonInsTractorTitle title='Login'></CommonInsTractorTitle>
                <Col md={7} className='mx-auto'>
                    <form onSubmit={handleSubmit(onSubmit)} className='p-4 border border-1'>      
                        <input placeholder='Enter Your Email' type='text' className='p-2 form-control mt-3' {...register("email")} />
                        <input placeholder='Enter Your password' type='password' className='p-2 form-control mt-3' {...register("password")} />
                        <Button buttonTitle='Login'></Button>
                        <p className='mt-3 text-center'>if you have no account please <Link to='/reg'>Registration</Link></p>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;