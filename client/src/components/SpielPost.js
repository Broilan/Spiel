import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import LikeButton from './LikeButton';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import Avatar from '@mui/material/Avatar';
import Comment from './Comment';
import FollowButton from './FollowButton';
import SpielBanner from './SpielBanner';
import CommentForm from './CommentForm';
import UserCard from './UserCard';
const { REACT_APP_SERVER_URL } = process.env;


const Spiel = (props) => {

  const currentUser = props.currentUser.name
  const userID = props.currentUser.id
  console.log(currentUser)
  
  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [likes, setLikes] = useState();

  const handleShow = () => setShow(true);

  const [poster, setPoster] = useState();
  const [followButton, setFollowButton] = useState()
  const [message, setMessage] = useState();
  const [group, setGroup] = useState();
  const [commentIdArray, setCommentIdArray] = useState([]);
  const [commentArray, setCommetArray] = useState([])

  const handleDelete = props.handleDelete
const history = useHistory();

  const callDelete = (e) => {
    e.preventDefault();
    handleDelete(idx.id)
  }   

  const idx = useParams()


  const likeNumber = () => {
    axios.get(`${REACT_APP_SERVER_URL}/spiel/${idx.id}` )
    .then(response => {
      setLikes(response.data.spiel[0].likes)
      console.log(likes)
   }).catch(error => console.log('===> Error', error));
        return(
   <p style={{color:"black", bottom:"20px", left: "5%", position: "absolute"}}>{likes}</p>
      )
}

function checkIfUserFollows(){
  axios.get(`${REACT_APP_SERVER_URL}/users/following/${currentUser}`)
           .then(response => {
              const following = response.data.UserFollowing
  for (let i = 0; i < following?.length; i++) {
    if (following[i].name == poster) {
       setFollowButton(false)
       break
     }else if(currentUser == poster){
       setFollowButton(false)
       break
    }
    else {
     console.log("names don't match")
    }
  }
})
}

const handleFollow = () => {
  axios.put(`${REACT_APP_SERVER_URL}/users/${currentUser}/follow/${poster}` )
  .then(response => {
    console.log(response)
   console.log(' updated ===>', response );
 })
 .catch(error => console.log('===> Error', error));
}

  const handleLike = () => {
    axios.put(`${REACT_APP_SERVER_URL}/spiel/${idx.id}/like` )
    .then(response => {
      setOpen(true)
      console.log(response)

     console.log(' updated ===>', response );
     axios.put(`${REACT_APP_SERVER_URL}/users/${currentUser}/likes/${idx.id}`)
     .then(response =>{
      console.log('response', response)
     })
   })
   .catch(error => console.log('===> Error', error));
}

const takeToProfile = () => {
  if (poster==currentUser) {
  history.push(`/profile`)
  } else {
    history.push(`/users/${poster}`)
  }
}
  
  useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        axios.get(`${REACT_APP_SERVER_URL}/spiel/${idx.id}`)
            .then((response) => {
              setFollowButton(<Button style={{background:"transparent", border: "none"}} onClick={handleFollow}><FollowButton/></Button>)
                console.log("responsedata", response.data.spiel);
                  setPoster(response.data.spiel.name) 
                   setMessage(response.data.spiel.message)
                   setGroup(response.data.spiel.group)
                   setLikes(response.data.spiel.likes)
                   setCommentIdArray(response.data.spiel.comments)
                   axios.get(`${REACT_APP_SERVER_URL}/comment/findbyid/${idx.id}`)
                   .then(response => {
                    setCommetArray(response.data.comment)
                    console.log(commentArray)
                   })
            }).catch((err) => { console.log('****************ERROR', err) });
    }, []);



  return (
    <div style={{position:"absolute", width:"100vw", left:"0px"}}>
      <UserCard id={userID}/>       
    <div  style={{display:"flex", flexDirection:"column", width:"100vw", alignItems:"center"}}>
      <SpielBanner />
      <Card style={{ cursor:"pointer", marginTop:"6.2rem", width:"30vw", borderRadius:"0px", border:"2px solid black" }}>
        <Dropdown style={{postion: "relative", left: "93%"}}>
          <Dropdown.Toggle variant="failure" id="dropdown-basic">
          </Dropdown.Toggle>
          {checkIfUserFollows()}
          <Dropdown.Menu>
            <Dropdown.Item onClick={callDelete}>Delete</Dropdown.Item>
            <Dropdown.Item onClick={handleShow}>Edit</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div style = {{display:"flex"}}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" onClick={takeToProfile} />
        <div>{followButton}</div>
        </div>
        <Card.Title>{poster}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{group}</Card.Subtitle>
        <Card.Text> {message} </Card.Text>
        <div>
          
        <Button style={{background:"transparent", border: "none"}} onClick={ handleLike}><LikeButton/>{likeNumber}</Button>
        </div>
      </Card>
      < CommentForm poster={poster} spielID={idx.id} currentUser={currentUser} group={group}/>
      <Card style={{width:"30vw", borderRadius:"0px", border:"2px solid black", display:"flex", alignItems:"center",justifyContent:"center" }}>
        <Card.Title>Replies</Card.Title>
      </Card>
      {commentArray?.map((c) => <Comment commenterName={c.name} datePosted={c.date} group={c.group} message={c.message} likes={c.likes} cOnC={c.comments} ogPostId={c.spielID} currentUser={currentUser}  />)}
      </div>
    </div>
  );
}

export default Spiel;