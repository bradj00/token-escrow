import React, {useEffect, useContext} from 'react'
import QRCode from 'react-qr-code'
import { generalContext } from '../App'
import {useMoralis} from 'react-moralis'



//CHANGE THE NAME OF THIS COMPONENT TO MATCH QR CODE. WE UPDATED THIS COMPONENTS USE CASE...
const EscrowHistory = () => {
  const {CreateErrorText, setCreateErrorText} = useContext(generalContext);
  const {account} = useMoralis();
  return (
    <div style={{userSelect:'none', position:'absolute', bottom:'32%', width:'100%', display:'flex', justifyContent:'center', color: '#fff', fontSize:'4vh', zIndex:'9999',}}>
        
        <div style={{fontSize:'2vh',position:'fixed', top:'43vh',zIndex:'9999', border:'2px solid #00ff00'}}>
            <QRCode value={account? account: "something went wrong!"} /> 
        </div>
        
        
        <div style={{textAlign:'center',position:'absolute',bottom:'-31vh',display:'flex', justifyContent:'center'}}>
            <div style={{fontSize:'2vh',position:'absolute', top:'0.1vh',}}>
                Escrow History
            </div>
            <div style={{backgroundColor:'rgba(255,255,255,0.1)', borderRadius:'5px', textAlign:'left', width:'95vw',height:'25vh',}}>
                <div style={{padding:'2vh',fontSize:'2.5vh',}}>
                    
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div>{CreateErrorText? CreateErrorText: <>no errors to display</>}</div>


                </div>
            </div>
        </div>
    </div>
  ) 
}

export default EscrowHistory