import React from 'react';
import './groupbanner.css'

const GroupBanner = (props) => {    
    const group = props.group
    return (
        <div style={{position: "fixed", backgroundColor: "white", zIndex: "1", opacity: "90%", width: "29vw", top:"0px", border: "2px solid black"}}>
            <p style ={{fontWeight:"bold", fontSize: "25px", marginLeft:"10px"}}>Welcome to {group}</p>
            <div style={{display:"flex", flexDirection:"row", justifyContent: "center"}}>
            <button class="childx" style={{ width: "50rem", height: "36px", fontSize: "20px", fontWeight: "bold", cursor: "pointer"}}>for you</button>
            <button class="childy" style={{width: "50rem", fontSize: "20px", height: "36px", fontWeight: "bold", cursor: "pointer"}}>following</button>
            </div>
        </div>
    )
}

export default GroupBanner;