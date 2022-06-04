import React, {useState, useContext} from 'react'
import { generalContext } from '../App';
import WarningIcon from '@mui/icons-material/Warning';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useERC20Balances, useMoralis } from "react-moralis";

import { useEffect } from 'react';
import TheUserErc20Balances from './sub-components/TheUserErc20Balances';

const P1AssetBox = () => {
  const {Moralis, enableWeb3, web3, isWeb3Enabled, authenticate, isAuthenticated, account, user, logout} = useMoralis();
 
  const {clickedFinalize, setclickedFinalize}             = useContext(generalContext);
  const {userErc20TokenBalance, setuserErc20TokenBalance} = useContext(generalContext);
  
  const [displayUserErc20Assets, setdisplayUserErc20Assets] = useState(true);
  
  //{ fetchERC20Balances, data, isLoading, isFetching, error }
  const getUserErc20Balances = useERC20Balances();

  
  useEffect(()=>{
    if (isWeb3Enabled){
      getUserErc20Balances.fetchERC20Balances();
    }
  },[isWeb3Enabled])
  useEffect(()=>{
    if (getUserErc20Balances.data){
      console.log('[ '+account+' ] user ERC20 balances: ',getUserErc20Balances.data);
      setuserErc20TokenBalance(getUserErc20Balances.data);
    }
  },[getUserErc20Balances.data])

  return (
    <>
    {displayUserErc20Assets ? 
    <div style={{fontSize:'3vh', position:'absolute', top:'0', display:'flex', textAlign:'center', justifyContent:'center', alignItems:'center', width:'100%',height:'90vh', zIndex:'9999',backgroundColor:'rgba(40, 38, 120, 1)',border:'1px solid #0088ff',borderRadius:'5px'}}>
      <TheUserErc20Balances userErc20TokenBalance={userErc20TokenBalance} displayUserErc20Assets={displayUserErc20Assets} setdisplayUserErc20Assets={setdisplayUserErc20Assets}/>
    </div>
    :<></>}

    <div style={{display:'flex', justifyContent:'center', alignItems:'center',marginTop:'50vh'}}>
        <div style={{paddingLeft:'0.5vw', display:'flex',  justifyContent:'center',position:'absolute', top:'0', left:'0', height:'50%', width:'100%', backgroundColor:'rgba(40, 78, 255, 0.3)'}}>
          <div>
            <div style={{position:'absolute',left:'5%',fontSize:'2vh'}}>party1.eth</div> ERC-20 Assets
          </div>  
          <div style={{width:'83%',height:'75%',left:'1%',top:'20%', position:'absolute', backgroundColor:'rgba(0,0,0,0.3)', border:'1px dashed #999'}}>

          </div>
        </div>
        <div style={{paddingLeft:'0.5vw', display:'flex', justifyContent:'center',position:'absolute', bottom:'0', left:'0', height:'50%', width:'100%', backgroundColor:'rgba(40, 38, 255, 0.44)'}}>
          <div>
          <div style={{position:'absolute',left:'5%',fontSize:'2vh'}}>party1.eth</div> ERC-721 Assets
          </div>  
          <div style={{width:'83%',height:'75%',left:'1%',top:'20%', position:'absolute', backgroundColor:'rgba(0,0,0,0.3)', border:'1px dashed #999'}}>

          </div>
        </div>

        
        <div className={clickedFinalize?"confirmationBox":"hiddenConfirmationbox"} style={{borderRadius:'5px',  border:'1px solid rgba(153, 21, 121, 1)', zIndex:'9999', display:'flex', justifyContent:'center', alignItems:'center', position:'absolute',width:'80%', height:'160%', backgroundColor:'rgba(23, 21, 121, 1)'}}>
            <div onClick={()=>{setclickedFinalize(false)}} className="finalizeButtonWithHover" style={{ padding:'1.5vh', paddingLeft:'3vh', paddingRight:'3vh', position:'absolute', top:'1%',right:'1%',}}>
                X
            </div>
            <div style={{position:'absolute', top:'5vh',transform:'scale(4)', color:'yellow'}}>
            <WarningIcon />
            </div>
            <div style={{userSelect:'none', fontSize:'3vh', color:'#fff', textAlign:'center', position:'absolute', width:'95%', height:'60%', backgroundColor:'rgba(0,0,0,0.2)',borderRadius:'5px',padding:'1vw'}}>
              Review the trade <br></br><span style={{color:"#ff0000"}}>VERY CAREFULLY.</span><br></br> Refresh the page to ensure data is current before accepting! <br></br><br></br>Click the button below to confirm you are satisfied with how the trade appears.  
            </div>

            <div className="finalizeButtonWithHover" style={{fontSize:'4vh', display:'flex', justifyContent:'center', alignItems:'center', position:'absolute',bottom:'3vh', width:'40%', height:'10%'}}>
              Confirm
            </div>
            

        </div>
            <div onClick={()=>{setdisplayUserErc20Assets(!displayUserErc20Assets)}} className="addAssetButton" style={{position:'absolute', top:'10vh',transform:'scale(3)', right:'5%'}}>
            <AddBoxIcon />
            </div>

            <div className="addAssetButton" style={{position:'absolute', top:'30vh',transform:'scale(3)', right:'5%'}}>
            <AddBoxIcon />
            </div>

        
        
    </div>
    </>
  )
}

export default P1AssetBox