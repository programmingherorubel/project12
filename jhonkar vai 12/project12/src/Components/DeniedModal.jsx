import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-hot-toast';

const DeniedModal = ({handleClose,show,courseId,refetch}) => {
    const [deniedValue,setValueDenied] = useState('')
    const handelSubmit = ()=>{
        const information = {
            feedback:deniedValue,
        }
        fetch(`https://project12server-programmingherorubel.vercel.app/feedback/${courseId}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(information)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            toast('feedback submited!')
        }) 
    }

    
    const handelDenied = (id) => {
        const url = `https://project12server-programmingherorubel.vercel.app/newcourse/denied/${id}`;
            fetch(url, {
                method: 'PUT'
            })
                .then(res => res.json())
                .then(data => {
                    refetch()
                    handleClose()
                })
    }

    return (
        <Modal size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered show={show} onHide={handleClose}> 
        <Modal.Header closeButton>
          <Modal.Title className='text-danger'>Are you sure you want to Denied This Course ? </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className='p-2'>
                <textarea onChange={(e)=>setValueDenied(e.target.value)} className='form-control' placeholder='Why you Denied This course ? ' cols="30" rows="4"></textarea>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>handelDenied(courseId)}>
            Denied
          </Button>
          <Button variant="primary"  onClick={()=>handelSubmit()}>
            Submit Feedback
          </Button>
        </Modal.Footer>
      </Modal>
    );
};

export default DeniedModal;