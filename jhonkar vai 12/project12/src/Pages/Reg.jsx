import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useForm } from 'react-hook-form';
import { Col, Container, Row } from 'react-bootstrap';
import CommonInsTractorTitle from '../Common/CommonInsTractorTitle';
import Button from '../Common/button';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Reg = () => {
    const { newWebUser,googleSingIn} = useContext(AuthContext)
    const { register, handleSubmit,formState: { errors } } = useForm();
    const api_Key = `5528744d6a1a320dde7b1fb03bf1f442`
    const onSubmit = data => {
        if(data.password !== data.passwordconfirm){
            toast.error('password did not matched!')
            return 
        }
        const image = data.img[0]
        const formData = new FormData()
        formData.append('image',image)
        const url = `https://api.imgbb.com/1/upload?key=${api_Key}`
        fetch(url,{
            method:'POST',
            body:formData
          })
          .then(res => res.json())
          .then(info => {
            const photo = (info.data.display_url)
            newWebUser(data.email,data.password,data.name,photo)
            console.log(data.email,data.password,data.name,photo)
          })
    };

   
    
    return (
        <Container>
            <Row>
                <CommonInsTractorTitle title='Registration'></CommonInsTractorTitle>
                <Col md={7} className='mx-auto'>
                    <form onSubmit={handleSubmit(onSubmit)} className='p-4 border border-1'>
                        <input  placeholder='Enter Your Name' type='text' className='p-2 form-control mt-3' {...register("name")} />
                        <input placeholder='Enter Your Name' type='file' className='p-2 form-control mt-3' {...register("img")} />
                        <input placeholder='Enter Your Email' type='email' className='p-2 form-control mt-3' {...register("email")} />
                        <input placeholder='Password' type='password' className='p-2 form-control mt-3' {...register("password",{pattern: {value: /^(?=.*[A-Z]).+$/,message: 'Last name must only contain letters (A-Z).'}})} />{errors.password && <span style={{color:'red'}}>{errors.password.message}</span>}
                        <input placeholder='Enter Your password' type='password' className='p-2 form-control mt-3' {...register("passwordconfirm")} />
                        <Button buttonTitle='Registration'></Button>
                        <p className='mt-3 text-center'>if you have an Account please <Link to='/login'>Registration</Link></p>
                    </form>

                   <div onClick={()=>googleSingIn()}> <Button  buttonTitle='sing in with google'></Button></div>
                </Col>
            </Row>
        </Container>

    );
};

export default Reg;