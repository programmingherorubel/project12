import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from '../Common/Button';
import '../Style/Banner2.css'

const Banner2 = () => {
    return (
        <div className='extraBanner'>
            <Container fluid>
                <Container>
                    <Row>
                        <Col md={10} className='mx-auto'>
                            <div className='content'>
                            <h1 style={{color:'gray'}} className='text-center'>Languages are keys that open doors to new worlds and grant us a diverse perspective</h1>
                            <div>
                                <input type="text" className='w-100 form-control border-border-1'style={{background:'transparent'}} />
                                <Button buttonTitle="Subscribe"></Button>
                            </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </div>
    );
};

export default Banner2;