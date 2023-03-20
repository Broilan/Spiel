import React from 'react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import './grouphomebanner.css'
const { REACT_APP_SERVER_URL } = process.env;

const GroupHomeBanner = (props) => {      
    
    const [show, setShow] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [groupFeed, setGroupFeed]= useState(props.groupFeed)
    
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const handleGroup = (e) => {
        setGroupName(e.target.value);
    }
    
    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const postGroup = (e) => {
        e.preventDefault();
    const newGroup = { groupName, description };
    setAuthToken(localStorage.getItem('jwtToken'));
    axios.post(`${REACT_APP_SERVER_URL}/group`, newGroup)
    
        .then(response => {
    
            console.log('===> Yay, new spiel', newGroup);
            console.log(response);
            setGroupFeed(response.data.group)
    
        })
        .catch(error => console.log('===> Error', error));
    }

    return (
        <div style={{position: "fixed", backgroundColor: "white", zIndex: "1", opacity: "90%", width: "30vw", border: "2px solid black", top:"0px"}}>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>New Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>    <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Group Name</Form.Label>
            <Form.Control onChange={handleGroup} type="email" placeholder="New Group" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Group Description</Form.Label>
            <Form.Control onChange={handleDescription} as="textarea" rows={3} />
          </Form.Group>
          
        </Form></Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
        Close
        </Button>
        <Button variant="secondary" onClick={postGroup}>
        Submit
        </Button>
        </Modal.Footer>
        </Modal>


        <div>
            <p style ={{fontWeight:"bold", fontSize: "25px", marginLeft:"10px"}}>Groups</p>
            <div style={{display:"flex", flexDirection:"row", justifyContent: "center"}}>
            <button class="childx" style={{ width: "50rem", height: "36px", fontSize: "20px", fontWeight: "bold", cursor: "pointer"}}>for you</button>
            <button onClick={handleShow} class="childx" style={{ width: "50rem", height: "36px", fontSize: "20px", fontWeight: "bold", cursor: "pointer"}}>create group</button>
            <button class="childy" style={{width: "50rem", fontSize: "20px", height: "36px", fontWeight: "bold", cursor: "pointer"}}>following</button>
            </div>
        </div>
        </div>
    )
}

export default GroupHomeBanner;