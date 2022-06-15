import React, {useContext, useState, useEffect} from 'react'
import QRCode from "react-qr-code";
import { generalContext } from '../App'
import { baseUrl } from '../helpers/contractInfo';
import WarningIcon from '@mui/icons-material/Warning';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TheUserErc20Balances from './sub-components/TheUserErc20Balances';
import { useERC20Balances, useMoralis } from "react-moralis";

const P2AssetBox = (props) => {
  const [anyP2Values, setanyP2Values] = useState();
  const {clickedFinalize, setclickedFinalize}               = useContext(generalContext);
  const {UserActiveTable, setUserActiveTable}               = useContext(generalContext);
  const {displayUserErc20Assets, setdisplayUserErc20Assets} = useContext(generalContext);
  const {userErc20TokenBalance, setuserErc20TokenBalance}   = useContext(generalContext);

  return (
    <>



    <div style={{display:'flex',justifyContent:'center',}}>
    {!anyP2Values && !props.counterParty? 
        <div style={{ top:'10%',textAlign:'center',}}>
          
          <QRCode value={UserActiveTable? baseUrl+UserActiveTable: "something went wrong!"} /> 
          <div style={{paddingTop:'1vh',}}>
             Scan QR to load this Table ID
          </div>
        </div>: 
          
        <div>
          <div style={{paddingLeft:'0.5vw', display:'flex',  position:'absolute', top:'0', left:'0', height:'50%', width:'100%', backgroundColor:'rgba(255, 38, 0, 0.3)'}}>
            <div>
              <div style={{position:'absolute',left:'45%',fontSize:'2vh'}}>party2.eth</div> 
              ERC-20 Assets
            </div> 

            <div style={{width:props.counterParty?'80vw':'95%',height:'75%',top:'20%', position:'absolute', backgroundColor:'rgba(0,0,0,0.3)', border:'1px dashed #999'}}>
            
            <table style={{width:'100%'}} >
            <tbody>
            <tr style={{backgroundColor:'rgba(250,100,100,0.5)',}}>
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
          <div style={{paddingLeft:'0.5vw', display:'flex', position:'absolute', bottom:'0', left:'0', height:'50%', width:'100%', backgroundColor:'rgba(255, 77, 38, 0.44)'}}>
            <div>
              <div style={{position:'absolute',left:'46%',fontSize:'2vh'}}>party2.eth</div> 
              ERC-721 Assets
            </div>  
            <div style={{width:props.counterParty?'80vw':'95%',height:'75%',top:'20%', position:'absolute', backgroundColor:'rgba(0,0,0,0.3)', border:'1px dashed #999'}}>

            <table style={{width:'100%'}} >
            <tbody>
            <tr style={{backgroundColor:'rgba(250,100,100,0.5)',}}>
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

        {props.counterParty?
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
    }
    </div>
    </>
  )
}

export default P2AssetBox