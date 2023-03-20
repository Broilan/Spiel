import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { useHistory } from "react-router-dom";
const { REACT_APP_SERVER_URL } = process.env;

function GroupsChart(props) {
  const [groupFeed, setGroupFeed]= useState([])
  const id = props.id
  
  const history=useHistory();

  function takeTo(id) {
    history.push(`/group/${id}`)
    }

  useEffect(() => {
  setAuthToken(localStorage.getItem('jwtToken'));

  



  axios.get(`${REACT_APP_SERVER_URL}/users/${id}/group`)
      .then((response) => {
          console.log("response.data.groups", response);
          setGroupFeed(response.data.FoundGroup);
  
      }).catch((err) => { console.log('****************ERROR', err) });
  }, []);

  return (
    <div>
    <ListGroup as="ol" numbered style={{width: "300px", position: "fixed", top: "25vh",  right: "10%", cursor: "pointer"}}>
        <h1>My Groups</h1> 
           {groupFeed?.map((group) =>       <ListGroup.Item style={{border:"solid black"}}
        as="li"
        onClick={(e)=> takeTo(group._id)}
        className="d-flex justify-content-between align-items-start"
      >
    
        <div className="ms-2 me-auto">
          <div className="fw-bold" > {group.groupName}</div>
        </div>
        <Badge bg="primary" pill>
          14
        </Badge>
      </ListGroup.Item> )}
    </ListGroup>
    </div>
  );
}

export default GroupsChart;