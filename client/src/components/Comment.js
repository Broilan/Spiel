import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Avatar from '@mui/material/Avatar';
import CommentButton from './CommentButton';
import LikeButton from './LikeButton';
import Button from 'react-bootstrap/Button';


const Comment = (props) => {
  const commenterName = props.commenterName
  const currentUser = props.currentUser
  const group = props.group
  const message = props.message

  const history = useHistory()

  const handleLike = () => {

  }

  const likeNumber = () => {

  }

  const takeToProfile = () => {
    if (commenterName==currentUser) {
    history.push(`/profile`)
    } else {
      history.push(`/users/${commenterName}`)
    }
  }


    
    return (
    <div>
        <Card style={{ borderRadius:"0px", width:"30vw", border:'2px solid black' }}>
          <Card.Body>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" onClick={takeToProfile} />
            <Card.Title>{commenterName}</Card.Title>
            <Card.Subtitle>{group}</Card.Subtitle>
            <Card.Text>
            {message}
            </Card.Text>
            <Button style={{background:"transparent", border: "none"}} onClick={ handleLike}><LikeButton/>{likeNumber}</Button>
            <Button style={{background: "transparent", border:"none"}}> <CommentButton/> </Button> 
          </Card.Body>
        </Card>
    </div>
      );
    }

export default Comment;