import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import CommonInsTractorTitle from '../Common/CommonInsTractorTitle';
import Button from '../Common/button';
import { AuthContext } from '../Provider/AuthProvider';


const EditCourse = () => {
    const { register, handleSubmit } = useForm();
    const {user}= useContext(AuthContext)
    const {id} = useParams()
    const [initialData,setInitialData] = useState({})
    useEffect(()=>{
        fetch(`https://project12server-programmingherorubel.vercel.app/newcourse/${id}`)
        .then(res => res.json())
        .then(data => setInitialData(data))
    },[id])

 
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
                Img:photo ,
                courseName:data.courseName,
                coursePrice:data.coursePrice,
                teachersName:data.teachersName,
                phone:data.phone,
                departmentEmail:data.departmentEmail,
                description:data.description,
                availableSeat:data.availableSeat,
                status:'pending'

            }
            fetch(`https://project12server-programmingherorubel.vercel.app/newcourseupdate/${id}`,{
                method:'PUT',
                headers:{
                    'content-type': 'application/json'
                },
                body:JSON.stringify(information)
            })
            .then(res => res.json())
            .then(updateData => {
                if(updateData.modifiedCount){
                    toast.success('data update successfully')
                }
            })
          })
    };

   
    return (
        <Container fluid >
        <Row>
            <Col className='mx-auto'>
                <CommonInsTractorTitle title="Edit Course" />
                <form onSubmit={handleSubmit(onSubmit)} className='p-4 border border-1'>
                    <Row>
                      
                        <Col md={4}><input defaultValue={initialData.img} type='file' className='p-2 form-control mt-3' {...register("img")} /></Col>

                        <Col md={4}><input  defaultValue={initialData.courseName} type='text' className='p-2 form-control mt-3' {...register("courseName")} /></Col>

                        <Col md={4}><input  defaultValue={initialData.coursePrice} type='number' className='p-2 form-control mt-3' {...register("coursePrice")} /></Col>

                        <Col md={4}><input value={user?.displayName} disabled type='text' className='p-2 form-control mt-3' {...register("teachersName")} /></Col>
                        
                        <Col md={4}><input defaultValue={initialData.phone} type='number' className='p-2 form-control mt-3' {...register("phone")} /></Col>

                        <Col md={4}><input defaultValue={initialData.availableSeat} type='number' className='p-2 form-control mt-3' {...register("availableSeat")} /></Col>

                        <Col md={4}><input value={user?.email} disabled className='p-2 form-control mt-3' {...register("departmentEmail")} /></Col>

                        <Col md={12}><textarea defaultValue={initialData.description} rows={5} className='p-2  form-control mt-3' {...register("description")} /></Col>
                    </Row>

                    <Button buttonTitle='Add New Course'></Button>
                </form>
            </Col>
        </Row>
    </Container>
    );
};

export default EditCourse;