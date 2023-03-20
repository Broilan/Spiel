import React, { useState, useEffect } from "react";
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
const { REACT_APP_SERVER_URL } = process.env;

export default function Notifications() {
  const [val,setVal]=useState('')
   const [groupFeed, setGroupFeed]= useState([])

  useEffect(() => {
  setAuthToken(localStorage.getItem('jwtToken'));
  axios.get(`${REACT_APP_SERVER_URL}/group`)
      .then((response) => {
          console.log(response.data.group);
          setGroupFeed(response.data.group);
  
      }).catch((err) => { console.log('****************ERROR', err) });
  }, []);

  return(
      <div className="main">
          <input list="data" onChange={(e)=>setVal(e.target.value)} placeholder="Search" />
          <datalist id="data">
              {groupFeed.map((idx)=><option>{idx.groupName}</option>)}
          </datalist>

          <h1>{val}</h1>
      </div>
  );
}