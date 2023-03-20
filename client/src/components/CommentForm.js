import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import SpielButton from './SpielButton'
import setAuthToken from '../utils/setAuthToken';
import Emoticons from './Emoticons';
import { useParams } from 'react-router-dom';
const { REACT_APP_SERVER_URL } = process.env;




// import Comment from "./Comment";


const CommentForm = (props) => {
 const poster = props.poster
 const name = props.currentUser
 const group = props.group

 const idx=useParams().id


 const [postButton, setPostButton] = useState('')

 const  handleNewComment =  (e) => {
    console.log(e.target.value)
    const comment = e.target.value
    console.log("val", comment)
    setPostButton(<Button variant="primary"  style={{ background: "transparent", border:"none" }} onClick={(e)=> handleComment(name, idx, group, comment)}>
      <SpielButton/>
    </Button>)
    console.log("new message", comment)
  }

  const handleComment = ( name, idx, group, comment) => {
    const data = { name, group, comment
    }
    setAuthToken(localStorage.getItem('jwtToken'));
    console.log("a;sdljfjsdka", comment)
    axios.post(`${REACT_APP_SERVER_URL}/comment/${idx}`, data  )
    .then(response => {
      console.log(response)
     axios.put(`${REACT_APP_SERVER_URL}/comment/${idx}/comment`)
     console.log(' updated ===>', response );
   })
   .catch(error => console.log('===> Error', error));
  }

  return (
 
    <div>
      <Card style={{ cursor:"pointer", width:"30vw", borderRadius:"0px", border:"2px solid black", borderTop: "none", padding:"1rem"}}>
        <p>replying to @{poster}</p>
        <div style = {{display:"flex"}}>
            
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <form>
            <input onChange={handleNewComment} type="message" style={{width:"500px", fontSize:"20px", border:"none"}}/>
        </form>
        </div>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
        <Emoticons/>
        {postButton}
         </div>
      </Card>
      </div>
  );
}

export default CommentForm;