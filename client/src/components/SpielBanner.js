import React from 'react';
import './spielbanner.css'
import { useHistory } from 'react-router-dom';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';




const SpielBanner = () => {        
     const history = useHistory()


    return (
        <div style={{position: "fixed", backgroundColor: "white", zIndex: "1", opacity: "90%", width: "30vw", height: "10.5vh", top:"5.7vh", border: "2px solid black"}}>
            <p style ={{fontWeight:"bold", fontSize: "25px", marginLeft:"10px"}}> <button style={{border:"none", backgroundColor:"white", color:"#8b45d6"}} onClick={((e) => history.push("/"))}><BsFillArrowLeftCircleFill/> </button>Spiel </p>
        </div>
    )
}

export default SpielBanner;