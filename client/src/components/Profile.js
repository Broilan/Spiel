import React, { useState, useEffect } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import UserCard from './UserCard';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import GroupsChart from './GroupsChart';
import ProfileNav from './ProfileNav';
import LikeButton from './LikeButton';
import Avatar from '@mui/material/Avatar';
import FollowButton from './FollowButton';
import "./profile.css"
import UnfollowButton from './UnfollowButton';
import CommentButton from './CommentButton';
import { useHistory } from 'react-router-dom';
import ProfileBanner from './ProfileBanner';
import { BsArrowUpCircleFill } from 'react-icons/bs';


const Profile = (props) => {
    const [image, setImage] = useState(props.user.image); 
   const { handleLogout, user } = props;
   const { name, id, email, exp } = user;
   const [selectedFeed, setSelectedFeed] = useState()
   const [userCard, setUserCard] = useState()
   const [buttons, setButtons] = useState()
   const [followers, setFollowers] = useState([])
   const [following, setFollowing] = useState([])
   const [profileFeed, setProfileFeed]= useState([])
   const history = useHistory();
   
   const expirationTime = new Date(exp * 1000);
   const { REACT_APP_SERVER_URL } = process.env;
   let currentTime = Date.now();


      useEffect  (()  =>  {
      setAuthToken(localStorage.getItem('jwtToken'));
       axios.get(`${REACT_APP_SERVER_URL}/users/${id}/spiels`)
        .then((response) => {
         setProfileFeed(response.data.Spiels);
         setSelectedFeed('My Posts')
            console.log("response.data", response.data.Spiels);
            console.log("profile feed", profileFeed)
           axios.get(`${REACT_APP_SERVER_URL}/users/followers/${name}`)
           .then(response => {
            const followersData = response.data.UserFollowers
           setFollowers(followersData)
            const followersNum = response.data.UserFollowers.length
            axios.get(`${REACT_APP_SERVER_URL}/users/following/${name}`)
           .then(response => {
            const followingData = response.data.UserFollowing
            setFollowing(followingData)
            const followingNum = response.data.UserFollowing.length
            setUserCard(<UserCard style={{position: "absolute"}}name={name} email={email} id={id} followingNumber={followingNum} followersNumber={followersNum} />)
            setButtons(<div><Button style={{background:"transparent", border: "none"}} onClick={ handleLike}><LikeButton/>{likeNumber}</Button>
                       <Button style={{background: "transparent", border:"none"}}> <CommentButton/> </Button></div>)
           })
           
        }).catch((err) => { console.log('****************ERROR', err) });
    })
  }, []);

  
const handleFollow = (feedName) => {
  axios.put(`${REACT_APP_SERVER_URL}/users/${name}/follow/${feedName}` )
  .then(response => {

    console.log(response)
   console.log(' updated ===>', response );
 })
 .catch(error => console.log('===> Error', error));
}

    const likeFeed = () => {
              setAuthToken(localStorage.getItem('jwtToken'));
             axios.get(`${REACT_APP_SERVER_URL}/users/likes/${id}`)
              .then((response) => {
               setProfileFeed(response.data.Spiels);
               setButtons(<div><Button style={{background:"transparent", border: "none"}} onClick={ handleLike}><LikeButton/>{likeNumber}</Button>
                       <Button style={{background: "transparent", border:"none"}}> <CommentButton/> </Button></div>)
               setSelectedFeed('Likes')
              }).catch((err) => { console.log('****************ERROR', err) });
    }

    const  bookmarkFeed =  () => {
      setAuthToken(localStorage.getItem('jwtToken'));
     axios.get(`${REACT_APP_SERVER_URL}/users/bookmarks/${id}`)
     .then(response => {
      const sArray = []
      response.data.response.map((r) => sArray.push(r.spiel))
       setProfileFeed(sArray);
       console.log(profileFeed)
     })
             
           setButtons(<div><Button style={{background:"transparent", border: "none"}} onClick={ handleLike}><LikeButton/>{likeNumber}</Button>
               <Button style={{background: "transparent", border:"none"}}> <CommentButton/> </Button></div>)
       setSelectedFeed('Bookmarks')
}

    const commentFeed = () => {
      setAuthToken(localStorage.getItem('jwtToken'));
     axios.get(`${REACT_APP_SERVER_URL}/comment/${name}`)
      .then((response) => {
       setProfileFeed(response.data.comment);
       setButtons(<div><Button style={{background:"transparent", border: "none"}} onClick={ handleLike}><LikeButton/>{likeNumber}</Button>
                       <Button style={{background: "transparent", border:"none"}}> <CommentButton/> </Button></div>)
       setSelectedFeed('Comments')
      }).catch((err) => { console.log('****************ERROR', err) });
}

const followingFeed = () => {
  setAuthToken(localStorage.getItem('jwtToken'));
  axios.get(`${REACT_APP_SERVER_URL}/users/following/${name}`)
    .then((response) => {
   setProfileFeed(response.data.UserFollowing);
   setSelectedFeed('Following')
   setButtons(<Button style={{background:"transparent", border: "none", position:'relative', left:"80%", bottom:"5rem"}} onClick={(e) => handleFollow(response.data.UserFollowers.name)}><UnfollowButton/></Button>)
  }).catch((err) => { console.log('****************ERROR', err) });
}

const followersFeed = () => {
  setAuthToken(localStorage.getItem('jwtToken'));
  axios.get(`${REACT_APP_SERVER_URL}/users/followers/${name}`)
  .then((response) => {
    console.log(response)
   setProfileFeed(response.data.UserFollowers);
   setSelectedFeed('Followers')
   setButtons(<Button style={{background:"transparent", border: "none", position:'relative', left:"80%", bottom:"5rem"}} onClick={(e) => handleFollow(response.data.UserFollowers.name)}><FollowButton/></Button>)
  }).catch((err) => { console.log('****************ERROR', err) });
}


    const regularFeed = () => {
        setAuthToken(localStorage.getItem('jwtToken'));
        axios.get(`${REACT_APP_SERVER_URL}/users/${id}/spiels`)
         .then((response) => {
          setProfileFeed(response.data.Spiels);
          setSelectedFeed('Posts')
             console.log("response.data", response.data.Spiels);
             console.log("profile feed", profileFeed)
             setButtons(<div><Button style={{background:"transparent", border: "none"}} onClick={ handleLike}><LikeButton/>{likeNumber}</Button>
             <Button style={{background: "transparent", border:"none"}}> <CommentButton/> </Button></div>)
     
         }).catch((err) => { console.log('****************ERROR', err) });
}






   // make a condition that compares exp and current time
   if (currentTime >= expirationTime) {
       handleLogout();
       alert('Session has ended. Please login to continue.');
   }

   const handleNewImage = (e) => {
    const path = e.target.files[0].name
    console.log(id)
    setImage(e.target.files[0].name)
    console.log(path)
    console.log(image)
setAuthToken(localStorage.getItem('jwtToken'));
axios.get(`${REACT_APP_SERVER_URL}/users/${id}`, path )
  .then(response => {
    
     console.log(response)
     console.log(user)

    console.log(' updated ===>', response );
  })
  .catch(error => console.log('===> Error', error));
}

const groupFeed = (groupName) => {
  setAuthToken(localStorage.getItem('jwtToken'));
  axios.get(`${REACT_APP_SERVER_URL}/users/groups/${name}/groups`)
   .then((response) => {
      console.log(response)
    setProfileFeed(response.data.groups);
    setSelectedFeed(`groups`)
    setButtons(<Button style={{position:"relative", left:"90%", background:"transparent", border: "none", color:"#8b45d6", fontSize:"1.5rem", margin:"none"}} onClick={(e) => history.push(`/group/group/${groupName}`)}><BsArrowUpCircleFill />{likeNumber}</Button>)
       console.log("response.data", response.data.Spiels);


   }).catch((err) => { console.log('****************ERROR', err) });
}

const handleLike = () => {

}

const likeNumber = () => {

}






    
    return (
      <div style={{position: "absolute", width: '100vw', left: "1.5rem", display:"flex", flexDirection:'column', alignItems:"center"}}>
        <ProfileBanner name={name}/>
      <ProfileNav bookmarkFeed={bookmarkFeed} selectedFeed={selectedFeed} followingFeed={followingFeed} groupFeed={groupFeed} followersFeed={followersFeed} name={name} regularFeed={regularFeed} commentFeed={commentFeed} likeFeed={likeFeed} id={props.user.id}/>
      <div className="home">
         
      {profileFeed?profileFeed.map((idx) =>   <div >  <Card className="spielFeed"style={{position:"relative", border:"1.8px solid black", borderRadius:'0px', width:"33vw", height:"15vh"}}>
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
      <GroupsChart id={id} />
      {userCard}
      </div>
        
    );

}

export default Profile;

