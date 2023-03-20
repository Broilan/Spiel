import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import GroupHomeBanner from './GroupHomeBanner';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import React, { useState, useEffect } from 'react';
import GroupCard from './GroupCard';
import UserCard from './UserCard';
const { REACT_APP_SERVER_URL } = process.env;


const Group = () => {

const [groupFeed, setGroupFeed]= useState([])

    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        axios.get(`${REACT_APP_SERVER_URL}/group`)
            .then((response) => {
                console.log(response.data.group);
                setGroupFeed(response.data.group);
        
            }).catch((err) => { console.log('****************ERROR', err) });
        }, []);
        
        
        const groupDelete = (id) => {
        
            setAuthToken(localStorage.getItem('jwtToken'));
            axios.delete(`${REACT_APP_SERVER_URL}/group/${id}`)
        
              .then(response => {
        
                console.log(' deleted ===>', response );
                setGroupFeed(response.data.group)
              })
              .catch(error => console.log('===> Error', error));
          }
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>


            
                <Dropdown style={{position:"absolute", right:"30vw"}}>
      <Dropdown.Toggle variant="none" id="dropdown-basic">
      <Badge pill bg="dark"> Sort </Badge>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">All Groups</Dropdown.Item>
        <Dropdown.Item href="#/action-2">My groups</Dropdown.Item>
        <Dropdown.Item href="#/action-3">A-Z</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <UserCard />
<GroupHomeBanner/>
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginTop:"6.4rem" }}>
    {groupFeed.map((gf, idx) => <GroupCard  groupFeed={groupFeed} groupDelete={groupDelete} id={gf._id} key={idx} users={gf.users} group={gf.groupName} description={gf.description} />)} 
    </div>  
        </div>
    )
}

export default Group;