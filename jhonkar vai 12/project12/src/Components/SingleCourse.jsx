import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import CommonInsTractorTitle from '../Common/CommonInsTractorTitle';

const SingleCourse = () => {
    const info = useLoaderData()
    const {Img,courseName,coursePrice,teachersName,phone,departmentEmail,description,availableSeat} = info || {}
    return (
        <Container>
            <Row>
                <CommonInsTractorTitle title={courseName}></CommonInsTractorTitle>
                <Col md={6} className='mt-3 mb-4'>
                    <h3>About Of <span style={{color:'tomato'}}>{courseName}</span></h3>
                    <p style={{color:'gray'}}>{description}</p>
                </Col>
                <Col md={6} className='mt-3 mb-4'>
                    <div>
                        <img src={Img} className='img-fluid' alt="" />
                        <div className='mt-4' style={{display:'flex',justifyContent:'space-between'}}>
                            <h4 className='text-center'>Contact Info</h4>
                            <p><b>Techers Name: {teachersName}</b></p>
                        </div> <hr/>

                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <p><b>Email: {departmentEmail}</b></p>
                            <p><b>Phone: {phone}</b></p>
                        </div> <hr/>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <p><b>available Seat: {availableSeat}</b></p>
                            <p><b>Course Price: {coursePrice}</b></p>
                        </div> <hr/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SingleCourse;