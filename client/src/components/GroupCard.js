import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

import ViewGroupButton from './ViewGroupButton'; 

function GroupCard(props) {
    const description = props.description
    const group = props.group
    const users = props.users
    
    const id = props.id



  return ( 
    <div>
<Card style={{ cursor:"pointer", position: "relative", borderRadius: "0px", border:"2px solid black", width:"30vw", left:"0.5rem" }}>

<div style={{position:"relative", display:"flex", flexDirection:"column", }}>
<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"style={{marginRight:"5px"}} />
<Card.Title>{group}</Card.Title>
<Card.Subtitle className="mb-2 text-muted">{users.length}</Card.Subtitle>
<Card.Text> {description} </Card.Text>
</div>
<Link to={`/group/${id}`} ><Button style={{background:"transparent", border: "none"}}><ViewGroupButton/></Button></Link>
</Card>
</div>
  );
}



export default GroupCard;
