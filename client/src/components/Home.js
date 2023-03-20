import React from 'react';
import UserSpiel from "./UserSpiel"
import UserCard from './UserCard';
import './home.css'

const Home = (props) => {

   const { name, id, email } = props.user;
        

    return (
        <div className='home'>
             <div className='spielFeed'>
            < UserSpiel  name={name} id={id}/>
            </div>
            <UserCard name={name} email={email} id={id}/>
        </div>
    )
}

export default Home;