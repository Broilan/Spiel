import React, { useState, useEffect, forceUpdate } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import Spiel from './Spiel'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useHistory } from 'react-router-dom';
import HomeBanner from './HomeBanner';
import Dropdown from 'react-bootstrap/Dropdown';

const { REACT_APP_SERVER_URL } = process.env;




const UserSpiel = (props) => {
    const [groupFeed, setGroupFeed]= useState([])
    const [name, setName] = useState(props.name);
    const id = props.id
    const [person, setPerson] = useState('/static/images/avatar/5.jpg')


    const [message, setMessage] = useState('');
    const [group, setGroup] = useState('');
    const [feed, setFeed] = useState(["nothing to see here yet!"]);
    const history=useHistory();


   //calling the functions 
 
    
    function callHistory(idy) {
        history.push(`/spiel/post/${idy}`)
        }


    const handleMessage = (e) => {
        setMessage(e.target.value);
    }

    //submits spiel to the database and posts it to the feed
     function  handleSubmit(e) {
        console.log("func 1")
        e.preventDefault();
        const newSpiel = { name, group, message };
        setAuthToken(localStorage.getItem('jwtToken'));
          axios.post(`${REACT_APP_SERVER_URL}/spiel`, newSpiel)
            .then(response => {
                console.log('===> Yay, new spiel', newSpiel);
                const data = (response.data.spielID)
                    console.log("data", data)
                    axios.put(`${REACT_APP_SERVER_URL}/group/${group}/spiels/${data}`, newSpiel)
                    .then(response => {
                        console.log("responseY", response);
                        axios.put(`${REACT_APP_SERVER_URL}/users/${id}/spiels/${data}`, newSpiel)
                    }).then(response => {
                        console.log(response)
                        console.log("my iddddddddddd", id)
                        callHistory(data)
                    })
                    .catch(error => console.log('===> Error', error));
            })
            .catch(error => console.log('===> Error', error)); 
    }


    //association posted spiel to a user via the database
    const handleAssociation = (e) => {
        console.log("func 2")
        e.preventDefault();

        const userToSpiel = { name, group, message };
        setAuthToken(localStorage.getItem('jwtToken'));
        axios.put(`${REACT_APP_SERVER_URL}/users/${id}/spiels`, userToSpiel)

            .then(response => {

                console.log('===> Yay, new spiel', userToSpiel);
                console.log(response);
                setFeed(response.data)

            })
            .catch(error => console.log('===> Error', error));
    }

 

    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        axios.get(`${REACT_APP_SERVER_URL}/group`)
            .then((response) => {
                setGroupFeed(response.data.group);
        
            }).catch((err) => { console.log('****************ERROR', err) });
        }, []);

    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        axios.get(`${REACT_APP_SERVER_URL}/spiel`)
            .then((response) => {                
                setFeed(response.data.spiel);
            console.log(feed)
            }).catch((err) => { console.log('****************ERROR', err) });
    }, []);

    const followingFeed = () => {
        setAuthToken(localStorage.getItem('jwtToken'));
        axios.get(`${REACT_APP_SERVER_URL}/users/following/${name}`)
          .then((response) => {
            const fIdFeed =[]
            const fFeed= []
         const responseData =response.data.UserFollowing
         responseData.map((u) =>u.spiels.map((s) => fIdFeed.push(s))) 
         fIdFeed.map((s) => (axios.get(`${REACT_APP_SERVER_URL}/spiel/${s}`)
         .then((response) => {
            if (response.data.spiel==null) {
                return 
            }else {
             fFeed.push(response.data.spiel)
              setFeed(fFeed)   
            }    
         })
         ))
            
    
         console.log("feed after set", feed)
        }).catch((err) => { console.log('****************ERROR', err) });
      }
      

    const handleDelete = (id) => {

        setAuthToken(localStorage.getItem('jwtToken'));
        axios.delete(`${REACT_APP_SERVER_URL}/spiel/${id}`)
    
          .then(response => {
    
            console.log(' deleted ===>', response );
            setFeed(response.data.spiel)
    
          })
          .catch(error => console.log('===> Error', error));
      }

    const callFunctions = (e) => {
        handleAssociation(e);
        handleSubmit(e);
        
    }

    return (
        <div>
            <HomeBanner followingFeed={followingFeed} />
            <div >
                <div>
                    
                    <div className="card card-body" style={{borderRadius: "0px", border:"3px solid black"}}>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                            <ListItem>
                            <ListItemAvatar>
                                    <Avatar alt="Profile Picture" src={person} />
                                    </ListItemAvatar>
                                    <ListItemText primary={name} secondary={       
                                    
                                    <Dropdown>select a group
          <Dropdown.Toggle variant="failure" id="dropdown-basic"> </Dropdown.Toggle>
         
            
          <Dropdown.Menu>
          <input list="data" value={group} onChange={(e)=>setGroup(e.target.value)} placeholder="Search Groups" />
            <datalist id="data">
                {groupFeed.map((idx)=><div><option>{idx.groupName}</option></div>)}
            </datalist>
          </Dropdown.Menu>
        </Dropdown>}/>
        <ListItemText secondary={`group selected: ${group}`}/>
                                </ListItem>
                            </div>
                            <div className="form-group">
                                <input type="message" name="message" value={message} onChange={handleMessage} className="form-control" />
                            </div>
                            <input onClick={callFunctions 
                            } type="submit" className="btn btn-primary float-right" value="spiel" style={{borderRadius:"110px", fontWeight:'bold'}} />
                        </form>
                    </div>
                </div>
            </div>
            {feed?.map((f, idx) =>  <Spiel handleDelete={handleDelete} id={id} username={name} spielID={f._id} key={idx} name={f.name} message={f.message} group={f.group} />, console.log(feed))}
        </div>
    );
}


export default UserSpiel;