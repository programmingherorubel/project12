import React from 'react';
import Banner from './Banner';
import Banner2 from './Banner2';
import Instractor from './Instractor';
import CourseClass from './CourseClass';

const Home = () => {
    return (
        <>
            <Banner />
            <Instractor/>
            <Banner2/>
            <CourseClass></CourseClass>
            
        </>
    );
};

export default Home;