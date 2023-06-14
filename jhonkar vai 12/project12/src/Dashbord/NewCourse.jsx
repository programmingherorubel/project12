import axios from 'axios';
import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import CommonInsTractorTitle from '../Common/CommonInsTractorTitle';
import Button from '../Common/button';
import { AuthContext } from '../Provider/AuthProvider';

const NewCourse = () => {
    const { register, handleSubmit } = useForm();
    const {user}= useContext(AuthContext)
    
    const onSubmit = data => {
        const api_Key = `5528744d6a1a320dde7b1fb03bf1f442`
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
            const photo = info.data.display_url
            const information = {
                Img:photo,
                courseName:data.courseName,
                coursePrice:data.coursePrice,
                teachersName:user?.displayName,
                phone:data.phone,
                departmentEmail:user?.email,
                description:data.description,
                availableSeat:data.availableSeat,
                status:'pending'

            }
           axios.post(`https://project12server-programmingherorubel.vercel.app/newcourse`,information)
           .then (res => {
            alert('success')
           })
            
          })

    };
    return (
        <Container fluid >
            <Row>
                <Col className='mx-auto'>
                    <CommonInsTractorTitle title="Add New Course" />
                    <form onSubmit={handleSubmit(onSubmit)} className='p-4 border border-1'>
                        <Row>
                          
                            <Col md={4}><input placeholder='Img' type='file' className='p-2 form-control mt-3' {...register("img")} /></Col>

                            <Col md={4}><input placeholder='courseName' type='text' className='p-2 form-control mt-3' {...register("courseName")} /></Col>

                            <Col md={4}><input placeholder='coursePrice' type='number' className='p-2 form-control mt-3' {...register("coursePrice")} /></Col>

                            <Col md={4}><input value={user?.displayName} disabled type='text' className='p-2 form-control mt-3' {...register("teachersName")} /></Col>
                            
                            <Col md={4}><input placeholder='Phone Number' type='number' className='p-2 form-control mt-3' {...register("phone")} /></Col>

                            <Col md={4}><input placeholder='availableSeat' type='number' className='p-2 form-control mt-3' {...register("availableSeat")} /></Col>

                            <Col md={4}><input value={user?.email} disabled className='p-2 form-control mt-3' {...register("departmentEmail")} /></Col>

                            <Col md={12}><textarea placeholder='description' rows={5} className='p-2  form-control mt-3' {...register("description")} /></Col>
                        </Row>

                        <Button buttonTitle='Add New Course'></Button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default NewCourse;