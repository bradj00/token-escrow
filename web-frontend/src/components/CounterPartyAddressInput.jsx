import React, {useContext} from 'react'
import '../styles.css'
import { generalContext } from '../App';


const CounterPartyAddressInput = () => {
    const {showPage, setshowPage} = useContext(generalContext);

    return (
    <div style={{display:'flex',justifyContent:'center', position:'absolute',top:'15%', width:'100%',color:'#fff', paddingTop:'0.5vh', height:'6vh',}}>
        <input autoComplete='off' onChange={console.log()} maxLength="42" size="45" placeholder="Paste address or ENS name" name="name"  style={{textAlign:'center', zIndex:'9999', width:'80%', height:'5vh', color:'#fff',backgroundColor:'rgba(0,0,0,0.2)',fontSize:'3vh', border:'0.5px solid #ccc', borderRadius:'15px', outline:'none'}}></input>
        <div onClick={()=>{setshowPage('offer')}} className="buttonWithHover" style={{position:'absolute', fontSize:'3vh',zIndex:'9999',bottom:'-110%',}}>
            Open New Escrow
        </div>
    </div>
)
}

export default CounterPartyAddressInput; 