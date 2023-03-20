import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from "react-router-dom";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FollowButton from './FollowButton';
import { BsBookmark } from 'react-icons/bs';
import { BsBookmarkFill } from 'react-icons/bs';


const { REACT_APP_SERVER_URL } = process.env;
const Spiel = (props) => {

  const [open, setOpen] = React.useState(false);
  
  const [show, setShow] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [newGroup, setNewGroup] = useState('');
  const [modalType, setModalType] = useState('')
 const [followNum, setFollowNum] = useState(0)
  const name = props.name
  const userID = props.id
  const username=props.username
  const [message, setMessage] = useState(props.message);
  const [group, setGroup] = useState(props.group);
  const [likes, setLikes] = useState()
  const [which, setWhich] = useState('')
  const [postButton, setPostButton] = useState('')
  const [followButton, setFollowButton] = useState()
  const [bookmark, setBookmark] = useState()

  const [formGroup, setFormGroup] = useState('')
  const [editOrPost, setEditOrPost] = useState()
  const [person, setPerson] = useState('/static/images/avatar/5.jpg')
    const spielID = props.spielID
  const handleDelete = props.handleDelete
  const history=useHistory();


  function userCheck(){
    if (username==name){
      return <Dropdown.Item onClick={callDelete}>Delete</Dropdown.Item>
    }else {
      return
    }
  }

  function checkIfUserFollows(name){
    axios.get(`${REACT_APP_SERVER_URL}/users/following/${username}`)
             .then(response => {
                const following = response.data.UserFollowing
    for (let i = 0; i < following?.length; i++) {
      if (following[i].name == name) {
         setFollowButton(false)
         break
       }else if(name == username){
         setFollowButton(false)
         break
      }
      else {
       console.log("names don't match")
      }
    }
  })
  }

  function checkIfUserBookmarked(){
    axios.get(`${REACT_APP_SERVER_URL}/users/bookmarks/${userID}`)
             .then(response => {
              const bookmarkArray = response.data.response
              console.log("bookmark array", bookmarkArray)
              for (let i = 0; i < bookmarkArray?.length; i++) {
                console.log(bookmarkArray[i].spiel.spielID, spielID)
                if (bookmarkArray[i].spiel.spielID == spielID ) {
                  console.log("match")
                   setBookmark(<button type="button" onClick={undoBookmark}style={{border:"none", backgroundColor:"white"}}><BsBookmarkFill style={{zIndex:"100",fontSize:"20px", position:"relative", left:"47%"}}/></button>)
                   break
                 } else {
                 console.log("names don't match")
                }
              }
  })
  }

  useEffect(() => {
    checkIfUserBookmarked()
    setBookmark(<button type="button" onClick={handleBookmark}style={{border:"none", backgroundColor:"white"}}><BsBookmark style={{zIndex:"100",fontSize:"20px", position:"relative", left:"47%"}}/></button>)
  setFollowButton(<Button style={{background:"transparent", border: "none"}} onClick={handleFollow}><FollowButton/></Button>)
}, [])

function handleBookmark() {
  const data = {name, group, message, spielID}
  setBookmark(<button type="button" onClick={undoBookmark}style={{border:"none", backgroundColor:"white"}}><BsBookmarkFill style={{zIndex:"100",fontSize:"20px", position:"relative", left:"47%"}}/></button>)
  axios.put(`${REACT_APP_SERVER_URL}/users/bookmark/${userID}/${spielID}`, data)
  .then(response => {
    console.log(response)
  })
  
}

function undoBookmark() {
    setBookmark(<button type="button" onClick={handleBookmark}style={{border:"none", backgroundColor:"white"}}><BsBookmark style={{zIndex:"100",fontSize:"20px", position:"relative", left:"47%"}}/></button>)
    axios.put(`${REACT_APP_SERVER_URL}/users/remove/bookmark/${userID}/${spielID}`)
    axios.delete(`${REACT_APP_SERVER_URL}/users/bookmark/remove/${userID}/${spielID}`)
    .then(response => {
      console.log("delete respone", response)
    })
}


  function postredir() {
  history.push(`/spiel/post/${spielID}`)
  }

  const handleNewMessage = (e) => {
    console.log(e.target.value)
    console.log(e)
    console.log("new message", newMessage)
  }

  
  const  handleNewComment =  (e) => {
    console.log(e.target.value)
    const comment = e.target.value
    console.log("val", comment)
    setPostButton(<Button variant="primary" onClick={(e)=> handleComment(username, name, spielID, group, comment)}>
      Post Comment
    </Button>)
    console.log("new message", comment)
  }


  const handleNewGroup = (e) => {
    console.log(e.target.value)
    setNewGroup(e.target.value);
  }

  const callDelete = (e) => {
    e.preventDefault();
    handleDelete(spielID)
  }  
    const handleClose = () => setShow(false);

  const handleShowA = () => {
    setShow(true);
    setModalType("Editing")
    setEditOrPost(<Form.Control onChange={handleNewGroup} type="Group" placeholder="Enter Group" />)
    setPostButton(<Button variant="primary" onClick={handleUpdate}>
    Save Changes
  </Button>)
  setFormGroup(<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label >Message</Form.Label>
  <Form.Control onChange={(e) => handleNewMessage(e)} type="Message" placeholder="Enter Message" />
</Form.Group>)
    setWhich('group')
    }

    const handleShowB = () => {
      setShow(true);
      setModalType("Commenting")
      setEditOrPost(<ListItem>
        <ListItemAvatar>
          <Avatar alt="Profile Picture" src={person} />
        </ListItemAvatar>
        <ListItemText primary={name} secondary={group} />
        <ListItemText secondary={message} />
      </ListItem>)
      setFormGroup(<Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label >Message</Form.Label>
      <Form.Control onChange={handleNewComment} type="Message" placeholder="Enter Message" />
    </Form.Group>)
      
      setWhich('Post:')
      }


  const likeNumber = (spielID) => {
    axios.get(`${REACT_APP_SERVER_URL}/spiel/${spielID}` )
    .then(response => {
      setLikes(response.data.spiel.likes)
   }).catch(error => console.log('===> Error', error));
        return(
   <p style={{color:"black", bottom:"20px", left: "5%", position: "absolute"}}>{likes}</p>
      )
}



  const handleUpdate = (spielID) => {
        setGroup(newGroup)
    const data = { name, group, message
    }
    
    axios.put(`${REACT_APP_SERVER_URL}/spiel/${spielID}`, data )
      .then(response => {
         console.log(response)

        console.log(' updated ===>', response );
      }) 
  }

  const handleComment = (name, other, spielID, group, comment) => {
    const data = { name, group, comment
    }
    setAuthToken(localStorage.getItem('jwtToken'));
    console.log("a;sdljfjsdka", comment)
    axios.post(`${REACT_APP_SERVER_URL}/comment/${spielID}`, data  )
    .then(response => {
      setOpen(true)
      console.log(response)
     axios.put(`${REACT_APP_SERVER_URL}/comment/${spielID}/comment`)
     console.log(' updated ===>', response );
     const likeCommentOrFollow ='comment'
     const content = "commented on your post!"
     const data = {likeCommentOrFollow, content}
     axios.post(`${REACT_APP_SERVER_URL}/notifications/${name}/${other}/${spielID}`, data)
   })
   .catch(error => console.log('===> Error', error));
}

  
  const handleLike = (spielID) => {
    axios.put(`${REACT_APP_SERVER_URL}/spiel/${spielID}/like` )
    .then(response => {
      setOpen(true)
      console.log(response)

     console.log(' updated ===>', response ); 
     const likeCommentOrFollow ='like'
     const content = "liked your post!"
     const data = {likeCommentOrFollow, content}
    axios.post(`${REACT_APP_SERVER_URL}/notifications/${username}/${name}/${spielID}`, data)
     axios.put(`${REACT_APP_SERVER_URL}/users/${username}/likes/${spielID}`)

     .then(response => {
      console.log(response)
     })
   })
   .catch(error => console.log('===> Error', error));
}

const handleFollow = () => {
  axios.put(`${REACT_APP_SERVER_URL}/users/${username}/follow/${name}` )
  .then(response => {
    setOpen(true)
    console.log(response)
   console.log(' updated ===>', response );
   const likeCommentOrFollow ='follow'
   const content = `followed you!`
   const data = {likeCommentOrFollow, content}
   axios.post(`${REACT_APP_SERVER_URL}/notifications/${username}/${name}/${spielID}`, data)
 })
 .catch(error => console.log('===> Error', error));
}

const takeToProfile = () => {
  if (username==name) {
  history.push(`/profile`)
  } else {
    history.push(`users/${name}`)
  }
}



  return (
    <div  style={{ position: "relative"}}>
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
          Post Liked!
        </Alert>
      </Collapse>
    </Box>
      
      <Card style={{ cursor:"pointer", position: "relative", maxHeight: "500px", borderRadius: "0px", paddingLeft: "10px", border:"2px solid black" }}>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"space-evenly"}}>
        <Dropdown style={{ left: "93%"}}>
          <Dropdown.Toggle variant="failure" id="dropdown-basic">
          </Dropdown.Toggle>
            
          <Dropdown.Menu>
          <Dropdown.Item onClick={postredir}>See Post</Dropdown.Item>
            <Dropdown.Item onClick={handleShowA}>Edit</Dropdown.Item>
          {userCheck()}
          </Dropdown.Menu>
        </Dropdown>
        {bookmark}
        </div>
        <div style={{position:"relative", display:"flex", flexDirection:"column", top: "-25px"}}>
        <div style={{display: "flex",}}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" onClick={takeToProfile} style={{marginRight:"5px"}} />
        {checkIfUserFollows(name)}
        {followButton}
        </div>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{group}</Card.Subtitle>
        <Card.Text> {message} </Card.Text>
        </div>
        <div>
        <Button style={{background:"transparent", border: "none"}} onClick={(e)=> handleLike(spielID)}><LikeButton/>{likeNumber(spielID)}</Button>
        <Button style={{background: "transparent", border:"none"}} onClick={handleShowB}> <CommentButton/> </Button> 
        </div>
          
      </Card>

      <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{modalType}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <h1>{username}</h1>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label >{which}</Form.Label>
          {editOrPost}
        </Form.Group>
        {formGroup}
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      {postButton}
    </Modal.Footer>
  </Modal>
    </div>
  );
}

export default Spiel;