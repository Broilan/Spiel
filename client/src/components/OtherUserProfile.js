import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import ProfileNav from './ProfileNav';
import LikeButton from './LikeButton';
import Avatar from '@mui/material/Avatar';
import FollowButton from './FollowButton';
import "./profile.css"
import ProfileBanner from './ProfileBanner';
import CommentButton from './CommentButton';
import { BsArrowUpCircleFill } from 'react-icons/bs';




const OtherUserProfile = (props) => {

    const { REACT_APP_SERVER_URL } = process.env;

    const [selectedFeed, setSelectedFeed] = useState()

    //array of corresponding id's return from the use effect
    const [spielsArray, setSpielsArray] = useState([])
    const [followersArray, setFollowerArray] = useState([])
    const [followingArray, setFollowingArray] = useState([])
    const [groupsArray, setGroupsArray]= useState([])
    const [likedPostsArray, setLikedPostsArray]= useState([])
    const [buttons, setButtons] = useState()
    const [id, setID] = useState()
    
    const history = useHistory()
    const [currentFeed, setCurrentFeed] = useState([])

    const name = useParams().name

    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        axios.get(`${REACT_APP_SERVER_URL}/users/name/${name}`)
        .then((response) => {
            const info = response.data.user
            setID(info[0]._id)
            setSpielsArray(info[0].spiels)
            setFollowerArray(info[0].followers)
            setFollowingArray(info[0].following)
            setGroupsArray(info[0].groups)
            setLikedPostsArray(info[0].likedPosts)
            setSelectedFeed(`Posts`)
            setButtons(<div><Button style={{background:"transparent", border: "none"}} onClick={ handleLike}><LikeButton/>{likeNumber}</Button>
                       <Button style={{background: "transparent", border:"none"}}> <CommentButton/> </Button></div>)
        })
    }, [])

    useEffect(() => {
        const sArray = []
        spielsArray.map((s) => {
            axios.get(`${REACT_APP_SERVER_URL}/spiel/${s}`)
            .then((response) => {
                sArray.push(response.data.spiel)
                setCurrentFeed(sArray)
            })
})
    }, [spielsArray])



    const likeFeed = () => {
        setAuthToken(localStorage.getItem('jwtToken'));
       axios.get(`${REACT_APP_SERVER_URL}/users/likes/${id}`)
        .then((response) => {
            setCurrentFeed(response.data.Spiels);
         setSelectedFeed(`likes`)
         setButtons(<div><Button style={{background:"transparent", border: "none"}} onClick={ handleLike}><LikeButton/>{likeNumber}</Button>
         <Button style={{background: "transparent", border:"none"}}> <CommentButton/> </Button></div>)
        }).catch((err) => { console.log('****************ERROR', err) });
}

const commentFeed = () => {
setAuthToken(localStorage.getItem('jwtToken'));
axios.get(`${REACT_APP_SERVER_URL}/comment/${name}`)
.then((response) => {
    setCurrentFeed(response.data.comment);
 setSelectedFeed(`comments`)
 setButtons(<div><Button style={{background:"transparent", border: "none"}} onClick={ handleLike}><LikeButton/>{likeNumber}</Button>
                       <Button style={{background: "transparent", border:"none"}}> <CommentButton/> </Button></div>)
}).catch((err) => { console.log('****************ERROR', err) });
}

const followingFeed = () => {
setAuthToken(localStorage.getItem('jwtToken'));
axios.get(`${REACT_APP_SERVER_URL}/users/following/${name}`)
.then((response) => {
    setCurrentFeed(response.data.UserFollowing);
setSelectedFeed(`following`)
setButtons(<Button style={{background:"transparent", border: "none", position:'relative', left:"80%", bottom:"5rem"}} onClick={(e) => handleFollow(response.data.UserFollowers.name)}><FollowButton/></Button>)
}).catch((err) => { console.log('****************ERROR', err) });
}

const followersFeed = () => {
setAuthToken(localStorage.getItem('jwtToken'));
axios.get(`${REACT_APP_SERVER_URL}/users/followers/${name}`)
.then((response) => {
console.log(response)
setCurrentFeed(response.data.UserFollowers);
setSelectedFeed(`followers`)
setButtons(<Button style={{background:"transparent", border: "none", position:'relative', left:"80%", bottom:"5rem"}} onClick={(e) => handleFollow(response.data.UserFollowers.name)}><FollowButton/></Button>)
}).catch((err) => { console.log('****************ERROR', err) });
}


const regularFeed = () => {
  setAuthToken(localStorage.getItem('jwtToken'));
  axios.get(`${REACT_APP_SERVER_URL}/users/${id}/spiels`)
   .then((response) => {
    setCurrentFeed(response.data.Spiels);
    setSelectedFeed(`Posts`)
       console.log("response.data", response.data.Spiels);
       setButtons(<div><Button style={{background:"transparent", border: "none"}} onClick={ handleLike}><LikeButton/>{likeNumber}</Button>
                       <Button style={{background: "transparent", border:"none"}}> <CommentButton/> </Button></div>)

   }).catch((err) => { console.log('****************ERROR', err) });
}

const groupFeed = (groupName) => {
    setAuthToken(localStorage.getItem('jwtToken'));
    axios.get(`${REACT_APP_SERVER_URL}/users/groups/${name}/groups`)
     .then((response) => {
        console.log(response)
      setCurrentFeed(response.data.groups);
      setSelectedFeed(`groups`)
      setButtons(<Button style={{position:"relative", left:"90%", background:"transparent", border: "none", color:"#8b45d6", fontSize:"1.5rem", margin:"none"}} onClick={(e) => history.push(`/group/group/${groupName}`)}><BsArrowUpCircleFill />{likeNumber}</Button>)
         console.log("response.data", response.data.Spiels);
  
  
     }).catch((err) => { console.log('****************ERROR', err) });
  }

  const handleLike = () => {

  }
  
  const likeNumber = () => {
  
  }

  
  const handleFollow = (feedName) => {
    axios.put(`${REACT_APP_SERVER_URL}/users/${name}/follow/${feedName}` )
    .then(response => {
  
      console.log(response)
     console.log(' updated ===>', response );
   })
   .catch(error => console.log('===> Error', error));
  }

    return (
        <div style={{position: "absolute", width: '100vw', left: "2rem", display: "flex", flexDirection: "column", alignItems:"center"}}>
            <ProfileBanner name={name}/>
        <ProfileNav currentFeed={currentFeed} selectedFeed={selectedFeed} followingFeed={followingFeed} followersFeed={followersFeed} name={name} regularFeed={regularFeed} commentFeed={commentFeed} likeFeed={likeFeed} groupFeed={groupFeed} id={id}/>
        <div className="home">
            
        {currentFeed?currentFeed.map((idx) =>   <div >  <Card className="spielFeed"style={{position:"relative", border:"1.8px solid black", borderRadius:'0px', width:"33vw", height:"15vh"}}>
      <Card.Body >
        <div style={{display:"flex", position:"relative", bottom:"8px"}}>
      <Avatar style= {{marginRight:"7.5px", marginBottom:"5px"}}alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Card.Title>{idx.name? idx.name : idx.groupName}</Card.Title>
        </div>
        <Card.Subtitle style={{position:"relative", bottom:"8px"}} className="mb-2 text-muted">{idx.group? idx.group : idx.users ? idx.users.length + " users": idx.bio }  </Card.Subtitle>
        <Card.Text style={{position:"relative", bottom:"8px", marginBottom:"15px"}}>
          {idx.following? <p style={{fontWeight:"bold"}}>following: {idx.following.length} <br></br>followers: {idx.followers.length}</p>: idx.message? idx.message : idx.spiels? idx.spiels.length + " spiels" : <p>nothing to see here yet!</p> } 
        </Card.Text>
        <div style={{position:"relative", bottom:"30px"}}>{buttons}</div>
      </Card.Body>
    </Card></div>) : <p>"nothing to see here yet!"</p>}
        </div>
        </div>
    )
}

export default OtherUserProfile;