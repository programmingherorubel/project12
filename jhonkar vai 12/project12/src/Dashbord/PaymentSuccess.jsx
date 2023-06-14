import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import CommonInsTractorTitle from '../Common/CommonInsTractorTitle';
import { AuthContext } from '../Provider/AuthProvider';

const PaymentSuccess = () => {
    const [loading,setLoading]= useState(true)
    const [tableData,setTabaleData]= useState([])
    const {user} = useContext(AuthContext)
    
    useEffect(()=>{
        fetch(`https://project12server-programmingherorubel.vercel.app/payments/${user?.email}`)
        .then(res => res.json())
        .then(data => {
            setTabaleData(data)
            setLoading(false)
        })
    },[user?.email])


console.log(tableData)

    return (
        <Container>
            <Row>
                <CommonInsTractorTitle title='Success Payment'></CommonInsTractorTitle>
                <Col>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th className='bg-success text-center text-white py-1 border border-1'>No</th>
                                <th className='bg-success text-center text-white py-1 border border-1'>Your Email</th>
                                <th className='bg-success text-center text-white py-1 border border-1'>Transaction Id</th>
                                <th className='bg-success text-center text-white py-1 border border-1'>Price</th>
                                <th className='bg-success text-center text-white py-1 border border-1'>Date</th>
                            </tr>
                        </thead>
                        {
                            tableData.map((data , index)=> <tbody key={index}>
                                <td className='px-3 mx-3 bg-success text-white py-1 text-center border border-1'>{index + 1}</td>
                                <td className='px-3 mx-3 bg-success text-white py-1 text-center border border-1'>{data.email}</td>
                                <td className='px-3 mx-3 bg-success text-white py-1 text-center border border-1'>{data.transactionId}</td>
                                <td className='px-3 mx-3 bg-success text-white py-1 text-center border border-1'>{data.price}</td>
                                <td className='px-3 mx-3 bg-success text-white py-1 text-center border border-1'>{data.date.toLocaleString()}</td>
                            </tbody>)
                        }
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default PaymentSuccess;