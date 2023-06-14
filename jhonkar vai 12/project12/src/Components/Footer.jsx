import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {PropagateLoader} from 'react-spinners'

const Footer = () => {
    return (
        <footer style={{background:'#1A1F45'}} className='p-3'>
            <Container>
            <div className='mt-5 text-center mb-5'>
            <h4 className='mx-auto text-center' style={{color:'white',display:'inline',borderBottom:'4px solid white'}}>Contact Us </h4>
            <p className='text-center mt-2 mx-auto'><PropagateLoader color="#FFFFFF" /></p>
        </div>
                <Row>
                    <Col md={4} className='mt-3 mx-auto'>
                        <h2 style={{fontFamily: "'Berkshire Swash', cursive",color:'white'}}>
                            foreign Language
                        </h2> 
                        <h5 className='text-white'>Get in Touch</h5>
                        <h6 className='text-white'>foreignlanguage@gmail.com</h6>
                        <h6 className='text-white'>Dresdener Str.22 </h6>
                       
                    </Col>
                    <Col md={4} className='mt-3 mx-auto'>
                        <ul className='text-center'>
                            <li style={{listStyle:'none'}} className='mt-3'><Link style={{textDecoration:'none',color:'white'}} to='/login'>Login</Link></li>
                            <li style={{listStyle:'none'}} className='mt-3'><Link style={{textDecoration:'none',color:'white'}} to='/reg'>SingUp</Link></li>
                            <li style={{listStyle:'none'}} className='mt-3'><Link style={{textDecoration:'none',color:'white'}} to='/course'>Our Course</Link></li>
                        </ul>
                    </Col>

                    <Col md={4} className='mt-3 mx-auto text-center'>
                    <ul style={{display:'flex',gap:'20px'}}>
                            <li style={{listStyle:'none'}}><i style={{fontSize:'22px',color:'white'}} className="mt-2 fa-brands fa-facebook"></i></li>
                            <li style={{listStyle:'none'}}><i style={{fontSize:'22px',color:'white'}} className="mt-2 fa-brands fa-instagram"></i></li>
                            <li style={{listStyle:'none'}}><i style={{fontSize:'22px',color:'white'}} className="mt-2 fa-brands fa-twitter"></i></li>
                            <li style={{listStyle:'none'}}><i style={{fontSize:'22px',color:'white'}} className="mt-2 fa-brands fa-google-plus-g"></i></li>
                        </ul>
                        <input type="text" className='form-control rounded-0' />
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;