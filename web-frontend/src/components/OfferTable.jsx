import React, {useContext, useState, useEffect} from 'react'
import { generalContext } from '../App'

import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import BackspaceIcon from '@mui/icons-material/Backspace';
import P1AssetBox from './P1AssetBox';
import P2AssetBox from './P2AssetBox';

const OfferTable = (props) => {
    const {showPage, setshowPage} = useContext(generalContext);
    const {clickedFinalize, setclickedFinalize} = useContext(generalContext);

    return (
        <div style={{display:'flex', justifyContent:'center', position:'absolute', width:'100%', height:'100%', zIndex:'9999'}}>
            <div style={{overflow:'hidden', zIndex:'0',  display:'flex', justifyContent:'right', right:'0vw', top:'0vh', color:'#fff', zIndex:'9999', position:'absolute',width:'100%', fontSize:'3vh', userSelect:'none'}}>
                        <div style={{marginRight:'-32vw', zIndex:'-1', position:'absolute', width:'100%', height:'100%', transform:'skew(-15deg,-15deg) rotateZ(15deg)', backgroundColor:'#0066ff',}}>
                        </div>

                        <div style={{ zIndex:'-1', left:'-10.5vw', position:'absolute', width:'50%', height:'100%', transform:'skew(-15deg,-15deg) rotateZ(15deg)', backgroundColor:'#0033bb',}}>
                        </div>
                        
                        <div style={{position:'absolute',top:'-5%', left:'14vw', fontSize:'70%'}}>
                            Table ID
                        </div>
                        <div style={{position:'absolute',bottom:'0%', left:'14vw', fontSize:'80%'}}>
                            0x0000000
                        </div>

                        <div onClick={()=>{setshowPage('home')}} className="backButtonHover" style={{zIndex:'9999', position:'absolute', top:'1vh',left:'5vw',transform:'scale(1.7)',}}>
                            <BackspaceIcon />
                        </div>
                        
                        <div style={{fontSize:'80%'}}>
                            party1.eth
                        </div>

                        <div style={{paddingLeft:'5vw', paddingRight:'5vw', marginTop:'1vh', textAlign:'center', transform:'scale(1.8)', color:'#ffff00' }}>
                            <SwapHorizIcon />
                        </div>
                        <div style={{paddingRight:'2vw', fontSize:'80%'}}>
                            party2.eth
                        </div>

            
            </div>
            <div style={{userSelect:'none',border: '1px solid #999', position:'absolute', height:'40%', width:'95%',top:'8%', backgroundColor:'rgba(50,50,50,0.9)', borderRadius:'5px', padding:'1vw',display:'flex', justifyContent:'center', alignItems:'center', color:'#fff'}}>
                <P1AssetBox />
            </div>
            <div onClick={()=>{setclickedFinalize(true)}} className="finalizeButtonWithHover" style={{padding:'1.5vh', paddingLeft:'3vh', paddingRight:'3vh', position:'absolute', top:'50%',}}>
                Finalize
            </div>
            <div style={{userSelect:'none',border: '1px solid #ff1155',position:'absolute', height:'40%', width:'95%',bottom:'1%', backgroundColor:'rgba(50,50,50,0.9)', borderRadius:'5px', padding:'1vw',display:'flex', justifyContent:'center', alignItems:'center', color:'#fff'}}>
                <P2AssetBox />
            </div>
        </div>
    )
    
}

export default OfferTable