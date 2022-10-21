import React, {useContext, useState, useEffect} from 'react'
import QRCode from "react-qr-code";
import { generalContext } from '../App'
import { baseUrl } from '../helpers/contractInfo';
import WarningIcon from '@mui/icons-material/Warning';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TheUserErc20Balances from './sub-components/TheUserErc20Balances';
import { useERC20Balances, useMoralis, useWeb3ExecuteFunction, useWeb3Contract } from "react-moralis";
import useWindowDimensions from './useWindowDimensions';
import { Erc20Abi, tableContractAbi, TokenLookupFromAddyContract, TokenLookupFromAddyAbi } from '../helpers/contractInfo';

const P2AssetBox = (props) => {
  const {Moralis, enableWeb3, web3, isWeb3Enabled, authenticate, isAuthenticated, account, user, logout} = useMoralis();
  const [anyP2Values, setanyP2Values] = useState();
  const {clickedFinalize, setclickedFinalize}               = useContext(generalContext);
  const {UserActiveTable, setUserActiveTable}               = useContext(generalContext);
  const {displayUserErc20Assets, setdisplayUserErc20Assets} = useContext(generalContext);
  const {userErc20TokenBalance, setuserErc20TokenBalance}   = useContext(generalContext);

  const { height, width } = useWindowDimensions(); //custom hook for window dimensions
  const [tokenAddys, settokenAddys] = useState([]);

  useEffect(()=>{
    console.log('new width:', width)
  },[width]);


  const lookupTokenSymbolByAddress = useWeb3ExecuteFunction  ({
    abi: TokenLookupFromAddyAbi,
    contractAddress: TokenLookupFromAddyContract,
    functionName: "lookupArrayOfErc20",
    params: {
      tokenList: tokenAddys
    }
  });

  const getP2Offer = useWeb3ExecuteFunction  ({
    abi: tableContractAbi,
    contractAddress: UserActiveTable? UserActiveTable.tableId : "0x0000000000000000000000000000000000000000",
    functionName: "getparty2Offer",
  });

  useEffect(()=>{
    console.log('tokenAddys: ',tokenAddys)
    if (getP2Offer.data){
      if (tokenAddys.length == getP2Offer.data[1].length){
        // console.log('GOT FINAL LIST: ', tokenAddys)
        lookupTokenSymbolByAddress.fetch({
          onError: (error) =>{
              console.log('error with token lookups. Did one of the addresses not have a symbol? : ',error);
            } 
        })
      }
    }
  },[tokenAddys]);

  useEffect(()=>{
    if (getP2Offer.data){
      // console.log('data getP2Offer: ',getP2Offer.data[0]); //ERC721 tokens
      console.log('P2 offers (ERC20): ',getP2Offer.data[1]); //ERC20 tokens
      settokenAddys([]);
      for (let i = 0; i <getP2Offer.data[1].length; i++){
        // console.log('item: ',getP2Offer.data[1][i].contractAddress, parseInt(getP2Offer.data[1][i].amount._hex, 16))
        settokenAddys(prevArray => [...prevArray, getP2Offer.data[1][i].contractAddress])
      } 

    }
  },[getP2Offer.data])
  
  useEffect(()=>{
    if (lookupTokenSymbolByAddress.data){
      console.log('lookupTokenSymbolByAddress: ',lookupTokenSymbolByAddress.data); 
      for (let i = 0 ; i < lookupTokenSymbolByAddress.data.length; i++){
        console.log(lookupTokenSymbolByAddress.data[i], parseInt(getP2Offer.data[1][i].amount._hex,16) )
      }
    }
  },[lookupTokenSymbolByAddress.data])


  useEffect(()=>{
    if (isWeb3Enabled){
        getP2Offer.fetch({
            onError: (error) =>{
                console.log('error with getP1Offer: ',error);
              }
          })
      }
  },[isWeb3Enabled])






  return (
    <>



    <div style={{display:'flex',justifyContent:'center',}}>
   
        <div>
          <div style={{paddingLeft:'0.5vw', display:'flex', justifyContent:'center',  position:'absolute', top:'0', left:'0', height:'50%', width:'100%', backgroundColor:'rgba(255, 38, 0, 0.3)'}}>
            <div style={{fontSize:'3vh'}}>
              ERC-20 Assets
            </div> 

            <div style={{width:'80vw',height:'75%',top:'20%', left:'0.5vw', position:'absolute', backgroundColor:'rgba(0,0,0,0.3)', border:'1px dashed #999'}}>
            
            <table style={{width:'100%'}} >
            <tbody>
            <tr style={{backgroundColor:'rgba(250,100,100,0.5)',}}>
              <th>Token</th>
              <th>Amount</th>
              <th>Contract</th>
            </tr>
            
            {lookupTokenSymbolByAddress.data?
            lookupTokenSymbolByAddress.data.map((item, index)=>{
              return(
                <tr key={index}>
                  <td>{item}</td>
                  <td>{ (parseInt(getP2Offer.data[1][index].amount._hex,16) / (10 ** 18) ) }</td>
                  <td><a href="https://yahoo.com" target='blank'>https://..</a></td>
                </tr>
              )
            })

            :
            <></>
            
          
            }
            </tbody>
        </table>

            </div>

          </div>
          <div style={{paddingLeft:'0.5vw', display:'flex', justifyContent:'center', position:'absolute', bottom:'0', left:'0', height:'50%', width:'100%', backgroundColor:'rgba(255, 77, 38, 0.44)'}}>
            <div style={{fontSize:'3vh'}}>
              ERC-721 Assets
            </div>  
            <div style={{width:'80vw',height:'75%',top:'20%', position:'absolute', left:'0.5vw', backgroundColor:'rgba(0,0,0,0.3)', border:'1px dashed #999'}}>

            <table style={{width:'100%'}} >
            <tbody>
            <tr style={{backgroundColor:'rgba(250,100,100,0.5)',}}>
              <th>Asset</th>
              <th>Image</th>
              <th>Token ID</th>
              <th>View On OpenSea</th>
            </tr>
            <tr>
              <td>Bored Ape</td>
              <td>
              </td>
              <td>157</td>
              <td><a href="https://yahoo.com" target='blank'>https://..</a></td>
            </tr>
            <tr>
              <td>MCPC</td>
              <td></td>
              <td>7206</td>
              <td><a href="https://yahoo.com" target='blank'>https://..</a></td>
            </tr>
            <tr>
              <td>Third NFT</td>
              <td></td>
              <td>72</td>
              <td><a href="https://yahoo.com" target='blank'>https://..</a></td>
            </tr>
            </tbody>
        </table>

            </div>
          </div>

        {!props.counterParty?<></>
        // tap the Table Id to get this instead....dont show it here 
        // <div style={{position:'absolute', right:'0.5vw',top:'7vh'}}>
        //     <div style={{alignItems:'center',display:'flex',justifyContent:'center'}}>

        //     <div style={{border:'2px solid #fff', top:'10%',textAlign:'center',}}>
        //       <QRCode size={185} value={UserActiveTable? baseUrl+UserActiveTable: "something went wrong!"} /> 
        //     </div>

        //     <div style={{paddingTop:'1vh',fontSize:'3vh',position:'absolute', top:'-6vh', color:'rgba(255,255,255,1)' }}>
        //       Counter Party
        //     </div>
        //     <div style={{paddingTop:'1vh',fontSize:'3vh',position:'absolute', textAlign:'center', bottom:'-8vh', color:'rgba(255,255,255,1)' }}>
        //       Scan QR to load this Table ID
        //     </div>

        //     </div>
        // </div>
        :
        <>
          <div onClick={()=>{setdisplayUserErc20Assets(!displayUserErc20Assets)}} className="addAssetButton" style={{position:'absolute', top:'10vh',transform:'scale(3)', right:'5%'}}>
          <AddBoxIcon />
          </div>

          <div className="addAssetButton" style={{position:'absolute', top:'30vh',transform:'scale(3)', right:'5%'}}>
          <AddBoxIcon />
          </div>
    </>}

        </div>
    
    </div>
    </>
  )
}

export default P2AssetBox