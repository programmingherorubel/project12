import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CommonInsTractorTitle from '../Common/CommonInsTractorTitle';

const CourseClass = () => {
    const [populer,setPopuler]= useState([])

    useEffect(()=>{
        fetch(`https://project12server-programmingherorubel.vercel.app/newcourse`)
        .then(res => res.json())
        .then(data => setPopuler(data.slice(0,6)))
    },[])

    return (
        <Container>
            <Row>
                <CommonInsTractorTitle title='popular class' ></CommonInsTractorTitle>
                    {
                        populer.map(data => <Col md={4}>
                            <div className='border border-1 m-3 p-3'>
                            <h4>{data.courseName}</h4>
                                <Row>
                                    <Col md={6}>
                                    
                                <h6 className='p-2' style={{color:'tomato'}}>{data.teachersName}</h6>
                                <span className='p-2' style={{color:'gray'}}>Available Seat <b>{data.availableSeat}</b></span>
                                    </Col>
                                    <Col md={6}>
                                        <img src={data.Img} className='img-fluid' alt="" />
                                    </Col>
                                </Row>
                            </div>
                        </Col>)
                    }
            </Row>
        </Container>
    );
};

export default CourseClass;