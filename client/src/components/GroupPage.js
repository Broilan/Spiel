import React, { useState, useEffect } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { useParams, useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import Avatar from '@mui/material/Avatar';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import GroupBanner from './GroupBanner';
const { REACT_APP_SERVER_URL } = process.env;


const GroupPage = (props) => {
    const [open, setOpen] = React.useState(false);
    const [openY, setOpenY] = useState(false)
    const [show, setShow] = useState(false);
    const [likes, setLikes]= useState()
    const { idx } = useParams();
    const { user } = props;
   const { name, id,} = user;
    const [message, setMessage] = useState('');
    const [group, setGroup] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [feed, setFeed] = useState([]);
    const [person, setPerson] = useState('/static/images/avatar/5.jpg')


    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history=useHistory();

    function postredir(idy) {
        history.push(`/spiel/post/${idy}`)
        }

    const handleMessage = (e) => {
        setMessage(e.target.value);
    }

    const handleNewMessage = (e) => {
        setNewMessage(e.target.value);
      }

      function userCheck(mapname){
        if (name===mapname){
          return <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
        }else {
          return
        }
      }

      const likeNumber = (spielID) => {
        axios.get(`${REACT_APP_SERVER_URL}/spiel/${spielID}` )
        .then(response => {

          setLikes(response.data.spiel[0].likes)
       }).catch(error => console.log('===> Error', error));
            return(
       <p style={{color:"black", bottom:"20px", left: "5%", position: "absolute"}}>{likes}</p>
          )
    }
    
    const handleLike = (spielID) => {
      axios.put(`${REACT_APP_SERVER_URL}/spiel/${spielID}/like` )
      .then(response => {
        setOpenY(true)
        console.log(response)
    
       console.log(' updated ===>', response );
     })
     .catch(error => console.log('===> Error', error));
    }

      const handleAssociation = (e) => {
        console.log("func 2")
        e.preventDefault();

        const userToSpiel = { name, group, message };
        setAuthToken(localStorage.getItem('jwtToken'));
        axios.put(`${REACT_APP_SERVER_URL}/users/${id}`, userToSpiel)

            .then(response => {

                console.log('===> Yay, new spiel', userToSpiel);
                console.log(response);
                setFeed(response.data)

            })
            .catch(error => console.log('===> Error', error));
    }
    

      const handleUpdate = (id) => {
        setMessage(newMessage)
    const data = { name, group, message
    }

    setAuthToken(localStorage.getItem('jwtToken'));
    
    axios.put(`${REACT_APP_SERVER_URL}/spiel/${id}`, data )
      .then(response => {
         console.log(response)

        console.log(' updated ===>', response );
      })
      .catch(error => console.log('===> Error', error));
  }

  function  handleSubmit(e) {
    e.preventDefault();
    const newSpiel = { name, group, message };
    setAuthToken(localStorage.getItem('jwtToken'));
      axios.post(`${REACT_APP_SERVER_URL}/spiel`, newSpiel)
        .then(response => {
            console.log('===> Yay, new spiel', response);
            const data = (response.data.spielID)
                console.log("data", data)
                axios.put(`${REACT_APP_SERVER_URL}/group/${group}/spiels/${data}`, newSpiel)
                .then(response => {
                    console.log("responseY", response);
                    postredir(data)
                })
                .catch(error => console.log('===> Error', error));
        })
        .catch(error => console.log('===> Error', error)); 
}

    const handleDelete = (id) => {

        setAuthToken(localStorage.getItem('jwtToken'));
        axios.delete(`${REACT_APP_SERVER_URL}/spiel/${id}`)
    
          .then(response => {
    
            console.log(' deleted ===>', response );
    
          })
          .catch(error => console.log('===> Error', error));
      }

    const handleJoin = (e) => {
        e.preventDefault();

        const newGroup = { idx };

        setAuthToken(localStorage.getItem('jwtToken'));
        axios.put(`${REACT_APP_SERVER_URL}/users/${id}/group/${idx}`, newGroup)

            .then(response => {
                axios.put(`${REACT_APP_SERVER_URL}/group/${idx}/users/${id}`)

                console.log('===> Yay, a new user joined', "user===>", id, "group===>", newGroup);
                console.log(response);
                setFeed(response.data.spiel)

            })
            .catch(error => console.log('===> Error', error));
    }


    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        axios.get(`${REACT_APP_SERVER_URL}/group/${idx}`)
            .then((response) => {
                console.log(response)
                setFeed(response.data.groupSpiels)
                console.log("feed===>", response.data.groupSpiels)
                console.log("feed===>", feed)
                setGroup(response.data.foundGroup.groupName);
                console.log(group);

            }).catch((err) => { console.log('****************ERROR', err) });
    }, []);

 function twoFuncs(e) {
    handleJoin(e)
    setOpen(true)
 }

 const callFunctions = (e) => {
    handleSubmit(e);
    handleAssociation(e);
}


    return (
            <div>
            <input onClick={twoFuncs} type="submit" className="btn btn-primary float-right" value={`Join ${group}`} />
            <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2, zIndex: 100, position: 'absolute', }}
        >
          You joined {group}!
        </Alert>
      </Collapse>
    </Box>
    <Box sx={{ width: '100%' }}>
      <Collapse in={openY}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenY(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2, zIndex: 100, position: 'absolute', }}
        >
          Post liked!
        </Alert>
      </Collapse>
    </Box>
    
    
                <div style ={{display:"flex", flexDirection:"column", alignItems:"center", marginTop:"6.5rem"}}>
                  <GroupBanner  group={group}/>
                    <div className="card card-body" style={{borderRadius: "0px", border:"2px solid black", width: '29vw', justifySelf:"center", alignSelf:"center"}}>
                    
                        <form >
                         
                            <div className="form-group"> 
                            
                            <ListItem>
                              
                            <ListItemAvatar>
                                    <Avatar alt="Profile Picture" src={person} />
                                    </ListItemAvatar>
                                    <ListItemText primary={name} />
        <ListItemText secondary={`group selected: ${group}`}/>
                                </ListItem>
                                
                            </div>
                            
                            <div className="form-group">
                                <input type="message" name="message" value={message} onChange={handleMessage} className="form-control" />
                            </div>
                            <input onClick={callFunctions 
                            } type="submit" className="btn btn-primary float-right" value="spiel" style={{borderRadius:"110px", fontWeight:'bold'}} />
                        </form>
                    </div>
        {feed?.map((f, idx) =>         <div style ={{justifySelf:"center", alignSelf:"center"}}><Card style={{ borderRadius: "0px", border:"2px solid black", width: '29vw' }}>
        <Dropdown style={{position: "relative", left: "93%"}}>
          <Dropdown.Toggle variant="failure" id="dropdown-basic">
          </Dropdown.Toggle>

          <Dropdown.Menu>
          <Dropdown.Item onClick={(e)=> postredir(f._id)}>See Post</Dropdown.Item>
              {userCheck(f.name)}
            <Dropdown.Item onClick={handleShow}>Edit</Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Card.Title>{f.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{f.group}</Card.Subtitle>
        <Card.Text> {f.message} </Card.Text>
        <div>
        <Button style={{background:"transparent", border: "none"}} onClick={(e)=> handleLike(f._id)}><LikeButton/>{likeNumber()}</Button>
        <Button style={{background: "transparent", border:"none"}} onClick={handleClose}> <CommentButton/> </Button> 
        </div>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editing Spiel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <h1>{f.name}</h1>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label >Message</Form.Label>
              <Form.Control onChange={handleNewMessage} type="Message" placeholder="Enter Message" />
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
      </Modal></div>)}</div>
    
    </div>
    )
}

export default GroupPage;

