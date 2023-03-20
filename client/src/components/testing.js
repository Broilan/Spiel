import React from 'react';
import Avatar from '@mui/material/Avatar';


const Testing = () => {
    
    const fakeArray =["xys", "xys", "xys"]

    return (


        <div>
 
 <div className="row mt-4" style={{ position: 'absolute', height: "50px", width: "60.2vw", top: "30px" }}>
                <div style={{ backgroundColor: "white",  position: 'absolute', height: "15vh", width: "35vw", top: "30px" }}>
                    <div>
                        <form>
                            <div className="form-group">
                            <input list="data" placeholder="Search Groups" />
                                <datalist id="data">
                                    {fakeArray.map((idx)=><div><option>{idx}</option></div>)}
                                </datalist>
                            </div>
                            <div >
                                <input type="message" name="message" value="Whats Happening?" className="form-control" />
                            </div>
                            <input type="submit" className="btn btn-primary float-right" value="spiel" style={{borderRadius:"110px", fontWeight:'bold'}} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testing;