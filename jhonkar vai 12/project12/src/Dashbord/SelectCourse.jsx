import { faDollar, faEnvelope, faSuitcase, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import CommonInsTractorTitle from '../Common/CommonInsTractorTitle';
import Loading from '../Components/Loading';
import { AuthContext } from '../Provider/AuthProvider';

const SelectCourse = () => {
	const { user } = useContext(AuthContext)
	const { data = [], refetch, isLoading } = useQuery(
		["classes"],
		async () => {
			const res = await axios.get(`https://project12server-programmingherorubel.vercel.app/addtocart/${user?.email}`);
			return res.data;
		}
	);

	if (isLoading) {
		return <Loading />
	}


	return (
		<Container>
			<Row>
				<CommonInsTractorTitle title='Select Item' ></CommonInsTractorTitle>
				<Col>
					<Table responsive className='w-100'>
						<thead>
							<tr>
								<th>Course Name</th>
								<th>Teachers Name</th>
								<th>Teachers Email</th>
								<th> Price</th>
								<th> Pay</th>
							</tr>
						</thead>
						{
							data.map(tableData => <tbody>
								<tr>
									<td><FontAwesomeIcon style={{color:'gray'}} icon={faSuitcase} className='mx-1'></FontAwesomeIcon>{tableData.courseName}</td>
									<td><FontAwesomeIcon style={{color:'gray'}} className='mx-1' icon={faUser}/>{tableData.teachersName}</td>
									<td><FontAwesomeIcon style={{color:'gray'}} className='mx-1' icon={faEnvelope}/>{tableData.eamil}</td>
									<td><FontAwesomeIcon style={{color:'gray'}} className='mx-1' icon={faDollar}/>{tableData.price}</td>
									<td>
										<Link to={`/dashbord/pyment/${tableData._id}`}><i style={{fontSize:'30px',color:'gray'}} class="mx-1 fa-brands fa-stripe"></i>
										</Link>
									</td>
								</tr>
							</tbody>)
						}
					</Table>
				</Col>
			</Row>
		</Container>
	);
};

export default SelectCourse;