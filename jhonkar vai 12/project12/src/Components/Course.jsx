import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CommonInsTractorTitle from '../Common/CommonInsTractorTitle';
import useCurse from '../Hook/useCurse';
import CourseCard from './CourseCard';
import Loading from './Loading';


const Course = () => {
    const [mycourse,transTacLoading] = useCurse()

    if(transTacLoading){
        return  <Loading/>
        
    }

    const totalCourseData =  mycourse.filter(course => course.status === 'approved')

    return (
        <Container fluid>
            <CommonInsTractorTitle title='Our Course'></CommonInsTractorTitle>
            <Row className='mt-5 mb-5'>
                    {
                        totalCourseData.map(course => <Col lg={3} md={4} sm={6} className='mt-5' key={course._id}>
                            <CourseCard course={course}></CourseCard>
                        </Col>)
                    }
            </Row>
        </Container>
    );
};

export default Course;


   // .then(data => setAllCourse(data.slice(0,8)))