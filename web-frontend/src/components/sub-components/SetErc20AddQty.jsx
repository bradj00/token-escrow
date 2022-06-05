import React from 'react'
import { useEffect } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
const SetErc20AddQty = (props) => {
    useEffect(()=>{
        console.log(props.selectedToken);
    },[])
    return (
        <>
        <div onClick={()=>{props.setdisplaySetQty(!props.displaySetQty)}} style={{cursor:'pointer', transform:'scale(1.3)', zIndex:'9999',position:'absolute',top:'1vh',right:'3%',}}>
            <CancelIcon />
        </div>
        <div style={{position:'absolute',top:'1%',fontSize:'4vh'}}>            
            {props.selectedToken? props.selectedToken.name : <></> }
        </div>
        <div style={{position:'absolute',top:'13%',fontSize:'2vh'}}>            
            {props.selectedToken? props.selectedToken.symbol : <></> }
        </div>
        <div style={{position:'absolute',top:'30%',}}>            
            Offer Quantity? 
        </div>
        <div className="counterButtons" style={{position:'absolute',marginLeft:'40%', transform:'scale(4)',bottom:'30%',}}>            
            <AddBoxIcon />
        </div>
        <div className="counterButtons" style={{position:'absolute',marginRight:'40%', transform:'scale(4)',bottom:'30%',}}>            
            <IndeterminateCheckBoxIcon />
        </div>

        </>
    )
}

export default SetErc20AddQty