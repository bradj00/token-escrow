import React, {useState, useContext} from 'react'
import { generalContext } from '../App';



const P1AssetBox = () => {


  const {clickedFinalize, setclickedFinalize} = useContext(generalContext);

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center',marginTop:'50vh'}}>
        <div style={{paddingLeft:'0.5vw', display:'flex', justifyContent:'center',position:'absolute', top:'0', left:'0', height:'50%', width:'100%', backgroundColor:'rgba(40, 78, 255, 0.3)'}}>
          <div>
            <div style={{position:'absolute',left:'5%',fontSize:'2vh'}}>party1.eth</div> ERC-20 Assets
          </div>  
        </div>
        <div style={{paddingLeft:'0.5vw', display:'flex', justifyContent:'center',position:'absolute', bottom:'0', left:'0', height:'50%', width:'100%', backgroundColor:'rgba(40, 38, 255, 0.44)'}}>
          <div>
          <div style={{position:'absolute',left:'5%',fontSize:'2vh'}}>party1.eth</div> ERC-721 Assets
          </div>  
        </div>

        
        <div className={clickedFinalize?"confirmationBox":"hiddenConfirmationbox"} style={{borderRadius:'5px',  border:'1px solid rgba(255,255,255,0.2)', zIndex:'9999', display:'flex', justifyContent:'center', alignItems:'center', position:'absolute',width:'80%', height:'160%', backgroundColor:'rgba(10,80,200,1)'}}>
            <div onClick={()=>{setclickedFinalize(false)}} className="finalizeButtonWithHover" style={{ padding:'1.5vh', paddingLeft:'3vh', paddingRight:'3vh', position:'absolute', top:'1%',right:'1%',}}>
                X
            </div>
            <div style={{userSelect:'none', fontSize:'3vh', color:'#fff', textAlign:'center', position:'absolute', width:'95%', height:'60%', backgroundColor:'rgba(0,0,0,0.1)'}}>
              Review the trade <br></br><span style={{color:"#ff0000"}}>VERY CAREFULLY.</span><br></br> Refresh the page to ensure data is current before accepting! <br></br><br></br>Click the button below to confirm you are satisfied with how the trade appears.  
            </div>

            <div className="finalizeButtonWithHover" style={{fontSize:'4vh', display:'flex', justifyContent:'center', alignItems:'center', position:'absolute',bottom:'3vh', width:'40%', height:'10%'}}>
              Confirm
            </div>
        </div>
        
        
    </div>
  )
}

export default P1AssetBox