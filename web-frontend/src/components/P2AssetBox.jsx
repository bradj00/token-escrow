import React, {useContext, useState, useEffect} from 'react'
import QRCode from "react-qr-code";
import { generalContext } from '../App'
import { baseUrl } from '../helpers/contractInfo';

const P2AssetBox = () => {
  const [anyP2Values, setanyP2Values] = useState();

  const {UserActiveTable, setUserActiveTable} = useContext(generalContext);
  return (
    <div style={{display:'flex',justifyContent:'center',}}>
    {!anyP2Values? 
        <div style={{position:'absolute',width:'100%',height:'90%',top:'0',textAlign:'center',paddingTop:'2vh',}}>
          Counter Party:<br></br>
          <QRCode value={UserActiveTable? baseUrl+UserActiveTable: "something went wrong!"} /> 
          <div style={{}}>
             Scan QR to load this Table ID
          </div>
        </div>: 
          
        <div>
          <div style={{paddingLeft:'0.5vw', display:'flex',  justifyContent:'center',position:'absolute', top:'0', left:'0', height:'50%', width:'100%', backgroundColor:'rgba(255, 38, 0, 0.3)'}}>
            <div>
              <div style={{position:'absolute',left:'5%',fontSize:'2vh'}}>party2.eth</div> ERC-20 Assets
            </div> 

            <div style={{width:'95%',height:'75%',top:'20%', position:'absolute', backgroundColor:'rgba(0,0,0,0.3)', border:'1px dashed #999'}}>
            
            <table style={{width:'100%'}} >
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
        </table>

            </div>

          </div>
          <div style={{paddingLeft:'0.5vw', display:'flex', justifyContent:'center',position:'absolute', bottom:'0', left:'0', height:'50%', width:'100%', backgroundColor:'rgba(255, 77, 38, 0.44)'}}>
            <div>
              <div style={{position:'absolute',left:'5%',fontSize:'2vh'}}>party2.eth</div> ERC-721 Assets
            </div>  
            <div style={{width:'95%',height:'75%',top:'20%', position:'absolute', backgroundColor:'rgba(0,0,0,0.3)', border:'1px dashed #999'}}>

            <table style={{width:'100%'}} >
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
        </table>

            </div>
          </div>
        </div>
    }
    </div>
  )
}

export default P2AssetBox