import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Avatar from '@mui/material/Avatar';
import Card from 'react-bootstrap/Card';

function ProfileNav(props) {
    const likeFeed = props.likeFeed
    const regularFeed = props.regularFeed
    const commentFeed = props.commentFeed
    const followersFeed = props.followersFeed
    const followingFeed = props.followingFeed
    const groupFeed = props.groupFeed
    const bookmarkFeed= props.bookmarkFeed
    const name = props.name
    const selectedFeed = props.selectedFeed

  return (
    <>
    <div style={{position:'relative',display:"flex", justifyContent:"center", top:"6.5vh" }}>
 <Card style={{borderRadius:"0px", border:"1.8px solid black"}}>

<div style={{position:"relative", display:"flex", flexDirection:"column", top: "-25px"}}>
<div style={{display: "flex"}}>
<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" style={{marginRight:"5px", zIndex:"20"}} />

</div>
<Card.Title>{name}</Card.Title>
<Card.Subtitle className="mb-2 text-muted">email</Card.Subtitle>
<Card.Text> bio </Card.Text>

</div>
<Navbar bg="dark" variant="dark" style={{width: "33vw"}}>
        <Container>
          <Nav className="me-auto">
            <Nav.Link onClick={regularFeed}> posts</Nav.Link>
            <Nav.Link onClick={likeFeed}>likes</Nav.Link>
            <Nav.Link onClick={commentFeed}>comments</Nav.Link>
            <Nav.Link onClick={followersFeed}>followers</Nav.Link>
            <Nav.Link onClick={followingFeed}>following</Nav.Link>
            <Nav.Link onClick={groupFeed}>groups</Nav.Link>
            {window.location.pathname=="/profile"? <Nav.Link onClick={bookmarkFeed}>bookmarks</Nav.Link> : null}
          </Nav>
        </Container>
      </Navbar>
  <Card style={{borderRadius:"0px", display:"flex", alignItems:"center"}}>
<Card.Title >{selectedFeed}</Card.Title>
</Card>
</Card>


</div>
    </>
  );
}



export default ProfileNav;