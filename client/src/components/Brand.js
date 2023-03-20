import React from 'react';
import { Link } from 'react-router-dom';


const Brand = () => {

        

    return (
        <div style={{position:"relative", left:"-7rem", marginTop:"10px"}}>
             <Link className="navbar-brand" to="/" ><div style={{fontWeight:"bold", backgroundColor:"#8b45d6", fontSize:"20px", borderRadius:"200rem", color:"white", width:"3.5rem", height:"3.5rem", paddingLeft:"7px", paddingBottom:"20px"}}>spiel</div></Link>
        </div>
    )
}

export default Brand;