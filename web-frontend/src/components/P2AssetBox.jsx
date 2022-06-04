import React, {useState} from 'react'
import QRCode from "react-qr-code";

const P2AssetBox = () => {
  const [anyP2Values, setanyP2Values] = useState();
  return (
    <div >
        {anyP2Values? <QRCode value="some test text" /> : <></>}
        <div style={{paddingLeft:'0.5vw', display:'flex',  justifyContent:'center',position:'absolute', top:'0', left:'0', height:'50%', width:'100%', backgroundColor:'rgba(255, 38, 0, 0.3)'}}>
          <div>
            <div style={{position:'absolute',left:'5%',fontSize:'2vh'}}>party2.eth</div> ERC-20 Assets
          </div>  
          <div style={{width:'83%',height:'75%',left:'1%',top:'20%', position:'absolute', backgroundColor:'rgba(0,0,0,0.3)', border:'1px dashed #999'}}>

          </div>
        </div>
        <div style={{paddingLeft:'0.5vw', display:'flex', justifyContent:'center',position:'absolute', bottom:'0', left:'0', height:'50%', width:'100%', backgroundColor:'rgba(255, 77, 38, 0.44)'}}>
          <div>
          <div style={{position:'absolute',left:'5%',fontSize:'2vh'}}>party2.eth</div> ERC-721 Assets
          </div>  
          <div style={{width:'83%',height:'75%',left:'1%',top:'20%', position:'absolute', backgroundColor:'rgba(0,0,0,0.3)', border:'1px dashed #999'}}>

          </div>
        </div>
        
    </div>
  )
}

export default P2AssetBox