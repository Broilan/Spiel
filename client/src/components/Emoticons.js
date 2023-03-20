import React from 'react';
import { GoFileMedia } from 'react-icons/go';
import { AiOutlineFileGif } from 'react-icons/ai';
import { VscSmiley } from 'react-icons/vsc';

const Emoticons = () => {

        

    return (
        <div style={{display:"flex", flexDirection:"row", color:"#8b45d6", fontSize:"1.2rem", alignItems:"flex-end"}}>
                <GoFileMedia />
                <AiOutlineFileGif />
                <VscSmiley />
        </div>
    )
}

export default Emoticons;