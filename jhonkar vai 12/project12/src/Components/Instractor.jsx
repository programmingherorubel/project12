import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CommonInsTractorTitle from '../Common/CommonInsTractorTitle';
import Loading from './Loading';

const Instractor = () => {
    const [loadingPage,setloadingPage]= useState(true)
    const [instractor,setInstractor] = useState([])

    useEffect(()=>{
        fetch('https://project12server-programmingherorubel.vercel.app/users')
        .then(res => res.json())
        .then(data => {
            setInstractor(data.filter((ourinstractor) => ourinstractor.role === 'instractor' ) )
            setloadingPage(false)
        })
    },[])

    console.log(instractor)
    if(loadingPage){
        return <Loading/>
    }


    return (
        <Container>
            <CommonInsTractorTitle title='OUR INSTRUCTOR'></CommonInsTractorTitle>
            <Row>
                {
                    instractor.map((teacher,index)=>{
                        return <Col md={4} sm={6} className='col-12 mb-5 ' style={{borderRadius:"50%"}}>
                            <div className=' text-center p-2 m-5'>
                                <img src={teacher.photo} className='img-fluid' style={{width:'120px',height:'120px',borderRadius:'50%'}} alt="" />
                                <h5>{teacher.name}</h5>
                                <h6><FontAwesomeIcon className='mx-2 'style={{color:'gray'}} icon={faEnvelope}/>{teacher.email}</h6>
                            </div>
                        </Col>
                    })
                }
            </Row>
        </Container>
    );
};

export default Instractor;