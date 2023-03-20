import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { NavLink, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListSubheader from '@mui/material/ListSubheader';

const { REACT_APP_SERVER_URL } = process.env;






const Navbar = (props) => {
    // Notification state stuff
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => {

      setShow(true);}

    //Chat modal state stuff
    const [open, setOpen] = React.useState(false);
    const handleModalOpen = () => setOpen(true);
    const handleModalClose = () => setOpen(false);
    const [notifArray, setNotifArray] = useState()
    const [person, setPerson] = useState('/static/images/avatar/5.jpg')

    const { user } = props;
    const { name } = user;

  

      useEffect(() => {
        axios.get(`${REACT_APP_SERVER_URL}/users/notifications/${name}`)
        .then(response=> {
          console.log(response)
          setNotifArray(response.data.response)
        })
      }, [show])

    return (

        
    <div>
        {/* //Chats offCanvas  */} 
        <div>
        <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Notifications</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

        <React.Fragment>
        <List sx={{ mb: 2 }}>         

          {notifArray?.map((n) => 
   
            <React.Fragment>
                <ListSubheader sx={{ bgcolor: 'white' }}>
                  Today
                </ListSubheader>


              <ListItem style={{border:"1px solid gray"}} onClick={handleModalOpen}>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText primary={n.from} secondary={n.likeCommentOrFollow == "like"? "liked your post" : null} />
              </ListItem>
            </React.Fragment>
          )}
          
        </List>
 

    </React.Fragment>
    <NavLink className="nav-link"  to="/Chats"><Button variant="dark">See all</Button></NavLink>
        </Offcanvas.Body>
      </Offcanvas>
      </div>
      {/* end of offcanvas */}

        <nav className="navbar navbar-expand-lg navbar-white bg-white" style={{ height: "55px"}}>
            <Link className="navbar-brand" to="/" >spiel</Link>
            <NavLink className="nav-link"  to="/group">groups</NavLink>

            <Button variant="none" onClick={handleShow}>Chats  </Button>
            <NavLink className="nav-link"  to="/settings">Settings</NavLink>

                {
                    props.isAuth 
                    ? 
                    <>
                        <NavLink className="nav-link"  to="/profile">profile</NavLink>
                        <NavLink className="nav-link"  to="/logout">logout</NavLink>
                        <span onClick={props.handleLogout} >↪️</span>
                        < SearchBar />
                    </>
                    : 
                    <>
                        <NavLink className="nav-link"  to="/signup">Create Account</NavLink>
                        <NavLink className="nav-link"  to="/login">Login</NavLink>
                        
                    </>
                  
                }
        </nav>
        </div>
    );
}


export default Navbar;