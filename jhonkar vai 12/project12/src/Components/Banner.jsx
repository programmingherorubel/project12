import React, { useEffect, useState } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import { Col, Container, Row } from 'react-bootstrap';
import Button from '../Common/button';
import withAutoplay from 'react-awesome-slider/dist/autoplay';

const Banner = () => {
    const [sliderData, setSliderData] = useState([])
    useEffect(() => {
        fetch('BannerSlidr.json')
            .then(res => res.json())
            .then(data => setSliderData(data))
    }, [])

    const AutoplaySlider = withAutoplay(AwesomeSlider);

    return (
        <Container fluid>
                <AutoplaySlider  animation="cubeAnimation">
                    {
                       sliderData.map(slider => <Container key={slider.length}>
                        <Row style={{display:'flex',alignItems:'center'}}>
                        <Col md={6}>
                            <div className='p-4'>
                                <h1>{slider.title}</h1>
                                <p style={{color:'gray'}}>{slider.description}</p>
                                <Button buttonTitle='See All Course'></Button>
                            </div>
                        </Col>
                        <Col md={6} className='text-end'><img src={slider.img} className='img-fluid' alt="" /></Col>
                        </Row>
                       </Container>)
                    }
                </AutoplaySlider>
                </Container>
    );
};

export default Banner;