import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { GoGear } from 'react-icons/go';

const { REACT_APP_SERVER_URL } = process.env;

function UserCard(props) {
  const [name, setName] = useState('loading...')
  const [bio, setBio] = useState('loading...')
  const [email, setEmail] = useState('loading...')
  const [followersNumber, setFollowersNumber] = useState('loading...')
  const [followingNumber, setFollowingNumber] = useState('loading...')
  const id = props.id


  const [newName, setNewName] = useState('');
  const [newBio, setNewBio] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [person, setPerson] = useState('/static/images/avatar/5.jpg')
  const handleShow = () => setShow(true);

  
  const handleUpdate = () => {
    setName(newName)
    setBio(newBio)
    setEmail(newEmail)
const data = { name, bio, email
}
setAuthToken(localStorage.getItem('jwtToken'));
axios.put(`${REACT_APP_SERVER_URL}/users/${id}`, data )
  .then(response => {
     console.log(response)

    console.log(' updated ===>', response );
  })
  .catch(error => console.log('===> Error', error));
  }

  const handleNewBio = (e) => {
    console.log(e.target.value)
    setNewBio(e.target.value);
  }

  const handleNewName = (e) => {
    setNewName(e.target.value);
  }

  const handleNewEmail = (e) => {
    setNewEmail(e.target.value);
  } 
  
  useEffect  (()  =>  {
    setAuthToken(localStorage.getItem('jwtToken'));
    axios.get(`${REACT_APP_SERVER_URL}/users/${id}` )
    .then(response => {
      const name = response.data.user.name
      setBio(response.data.user.bio)
      setName(response.data.user.name)
      setEmail(response.data.user.email)
       console.log("ayeee", response)
       axios.get(`${REACT_APP_SERVER_URL}/users/followers/${name}`)
       .then(response => {
         const followersNum = response.data.UserFollowers.length
        setFollowersNumber(followersNum)
        axios.get(`${REACT_APP_SERVER_URL}/users/following/${name}`)
       .then(response => { 
        const followingNum = response.data.UserFollowing.length
        setFollowingNumber(followingNum)
    }) 
  })
})
    .catch(error => console.log('===> Error', error));
  }, []);



  return (
    <div>
    <Card style={{ position: "fixed", top:"11vh", left:"70%", width: '25rem', height:"450px", padding: "10px", border:"solid black" }}>
      <Card.Body>
      <ListItem>
        <ListItemAvatar>
            <Avatar alt="Profile Picture" src={person} />
              </ListItemAvatar>
              <ListItemText primary={name} secondary={email} />
                </ListItem>
        <Card.Text>
        {bio}
        </Card.Text>
        <Dropdown>
          <Dropdown.Toggle variant='none' id="dropdown-basic">{<GoGear />}
          </Dropdown.Toggle>

          <Dropdown.Menu>
          <Dropdown.Item onClick={handleShow} >Edit Info</Dropdown.Item>
            <Dropdown.Item >See Settings</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div style={{display: "flex"}}>
        <ListItemText primary="followers" secondary={followersNumber} />
        <ListItemText primary="following" secondary={followingNumber} />
        </div>
      </Card.Body>
    </Card>

<Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
  <Modal.Title>Editing Spiel</Modal.Title>
</Modal.Header>
<Modal.Body>
  <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label >New Name</Form.Label>
      <Form.Control onChange={handleNewName} value={name} type="Name" placeholder="Enter Name" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label >New Email</Form.Label>
      <Form.Control onChange={handleNewEmail}  value={email} type="Email" placeholder="Enter Email" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label >New Bio</Form.Label>
      <Form.Control onChange={handleNewBio} value={bio} placeholder="Enter Bio" />
    </Form.Group>
  </Form>
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={handleClose}>
    Close
  </Button>
  <Button variant="primary" onClick={handleUpdate}>
    Save Changes
  </Button>
</Modal.Footer>
</Modal>
</div>
  );
}

export default UserCard;