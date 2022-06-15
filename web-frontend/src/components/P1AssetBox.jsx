import React, {useState, useContext} from 'react'
import { generalContext } from '../App';
import WarningIcon from '@mui/icons-material/Warning';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useERC20Balances, useMoralis } from "react-moralis";

import { useEffect } from 'react';
import TheUserErc20Balances from './sub-components/TheUserErc20Balances';

const P1AssetBox = (props) => {
  const {Moralis, enableWeb3, web3, isWeb3Enabled, authenticate, isAuthenticated, account, user, logout} = useMoralis();
 
  const {clickedFinalize, setclickedFinalize}             = useContext(generalContext);
  const {userErc20TokenBalance, setuserErc20TokenBalance} = useContext(generalContext);
  
  const [displayUserErc20Assets, setdisplayUserErc20Assets] = useState(false);
  
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


    <div style={{display:'flex', justifyContent:'center', alignItems:'center',marginTop:'50vh'}}>
        <div style={{paddingLeft:'0.5vw', display:'flex',  justifyContent:'center',position:'absolute', top:'0', left:'0', height:'50%', width:'100%', backgroundColor:'rgba(40, 78, 255, 0.3)'}}>
          <div>
            <div style={{position:'absolute',left:'5%',fontSize:'2vh'}}>party1.eth</div> ERC-20 Assets
          </div>  
          <div style={{width:props.tableCreator?'80vw':'93.6vw',height:'75%',left:'1%',top:'20%', position:'absolute', backgroundColor:'rgba(0,0,0,0.3)', border:'1px dashed #999'}}>
     
          <table style={{width:'100%'}} >
            <tbody>
            <tr style={{backgroundColor:'rgba(100,100,250,0.5)',}}>
              <th>Asset</th>
              <th>Amount</th>
              <th>Contract</th>
            </tr>
            <tr>
              <td>RUBY</td>
              <td>14,600</td>
              <td><a href="https://yahoo.com" target='blank'>https://..</a></td>
            </tr>
            <tr>
              <td>EMERALD</td>
              <td>9,500,000</td>
              <td><a href="https://yahoo.com" target='blank'>https://..</a></td>
            </tr>
            <tr>
              <td>ETH</td>
              <td>14.6</td>
              <td><a href="https://yahoo.com" target='blank'>https://..</a></td>
            </tr>
            </tbody>
        </table>

          </div>
        </div>
        <div style={{ display:'flex', justifyContent:'center',position:'absolute', bottom:'0', left:'0', height:'50%', width:'100%', backgroundColor:'rgba(40, 38, 255, 0.44)'}}>
          <div>
          <div style={{position:'absolute',left:'5%',fontSize:'2vh'}}>party1.eth</div> ERC-721 Assets
          </div>  
          <div style={{width:props.tableCreator?'80vw':'93.6vw',height:'75%',left:'1%',top:'20%', position:'absolute', backgroundColor:'rgba(0,0,0,0.3)', border:'1px dashed #999'}}>

          <table style={{width:'100%'}} >
            <tbody>
            <tr style={{backgroundColor:'rgba(100,100,250,0.5)',}}>
              <th>Asset</th>
              <th>Token ID</th>
              <th>Contract</th>
            </tr>
            <tr>
              <td>RUBY</td>
              <td>14,600</td>
              <td><a href="https://yahoo.com" target='blank'>https://..</a></td>
            </tr>
            <tr>
              <td>EMERALD</td>
              <td>9,500,000</td>
              <td><a href="https://yahoo.com" target='blank'>https://..</a></td>
            </tr>
            <tr>
              <td>ETH</td>
              <td>14.6</td>
              <td><a href="https://yahoo.com" target='blank'>https://..</a></td>
            </tr>
            </tbody>
        </table>

          </div>
        </div>

        

        {props.tableCreator?
        <>
            <div onClick={()=>{setdisplayUserErc20Assets(!displayUserErc20Assets)}} className="addAssetButton" style={{position:'absolute', top:'10vh',transform:'scale(3)', right:'5%'}}>
            <AddBoxIcon />
            </div>

            <div className="addAssetButton" style={{position:'absolute', top:'30vh',transform:'scale(3)', right:'5%'}}>
            <AddBoxIcon />
            </div>
        </>:
        <></>}
        
        
    </div>
    </>
  )
}

export default P1AssetBox