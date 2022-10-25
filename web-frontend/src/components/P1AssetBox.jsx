import React, {useState, useContext} from 'react'
import { generalContext } from '../App';
import WarningIcon from '@mui/icons-material/Warning';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useERC20Balances, useMoralis, useWeb3ExecuteFunction, useWeb3Contract } from "react-moralis";
import { useEffect } from 'react';
import TheUserErc20Balances from './sub-components/TheUserErc20Balances';
import { Erc20Abi, tableContractAbi, TokenLookupFromAddyContract, TokenLookupFromAddyAbi } from '../helpers/contractInfo';
const P1AssetBox = (props) => {
  const {Moralis, enableWeb3, web3, isWeb3Enabled, authenticate, isAuthenticated, account, user, logout} = useMoralis();
 
  const {clickedFinalize, setclickedFinalize}             = useContext(generalContext);
  const {userErc20TokenBalance, setuserErc20TokenBalance} = useContext(generalContext);
  const {UserActiveTable, setUserActiveTable} = useContext(generalContext);
  const {displayUserErc20Assets, setdisplayUserErc20Assets} = useContext(generalContext);
  const {displayErc721DepositPage, setdisplayErc721DepositPage} = useContext(generalContext);

  const [tokenAddys, settokenAddys] = useState([]);
  //{ fetchERC20Balances, data, isLoading, isFetching, error }
  const getUserErc20Balances = useERC20Balances();
  
  
  useEffect(()=>{
    if (isWeb3Enabled){
      
    }
  },[isWeb3Enabled])

  useEffect(()=>{
    if (getUserErc20Balances.data){
      // console.log('[ '+account+' ] user ERC20 balances: ',getUserErc20Balances.data);
      setuserErc20TokenBalance(getUserErc20Balances.data);
    }
  },[getUserErc20Balances.data])
  
  const lookupTokenSymbolByAddress = useWeb3ExecuteFunction  ({
    abi: TokenLookupFromAddyAbi,
    contractAddress: TokenLookupFromAddyContract,
    functionName: "lookupArrayOfErc20",
    params: {
      tokenList: tokenAddys
    }
  });

  const getP1Offer = useWeb3ExecuteFunction  ({
    abi: tableContractAbi,
    contractAddress: UserActiveTable? UserActiveTable.tableId : "0x0000000000000000000000000000000000000000",
    functionName: "getparty1Offer",
  });

  useEffect(()=>{
    // console.log('tokenAddys: ',tokenAddys)
    if (getP1Offer.data){
      if (tokenAddys.length == getP1Offer.data[1].length){
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
    if (getP1Offer.data){
      // console.log('data getP1Offer: ',getP1Offer.data[0]); //ERC721 tokens
      // console.log('P1 offers (ERC20): ',getP1Offer.data[1]); //ERC20 tokens
      settokenAddys([]);
      for (let i = 0; i <getP1Offer.data[1].length; i++){
        // console.log('item: ',getP1Offer.data[1][i].contractAddress, parseInt(getP1Offer.data[1][i].amount._hex, 16))
        settokenAddys(prevArray => [...prevArray, getP1Offer.data[1][i].contractAddress])
      } 

    }
  },[getP1Offer.data])
  
  useEffect(()=>{
    if (lookupTokenSymbolByAddress.data){
      // console.log('lookupTokenSymbolByAddress: ',lookupTokenSymbolByAddress.data); 
      for (let i = 0 ; i < lookupTokenSymbolByAddress.data.length; i++){
        // console.log(lookupTokenSymbolByAddress.data[i], parseInt(getP1Offer.data[1][i].amount._hex,16) )
      }
    }
  },[lookupTokenSymbolByAddress.data])





  useEffect(()=>{
    if (isWeb3Enabled){
        getUserErc20Balances.fetchERC20Balances();
        getP1Offer.fetch({
            onError: (error) =>{
                console.log('error with getP1Offer: ',error);
              }
          })
      }
  },[isWeb3Enabled])



  return (
    <>


    <div style={{display:'flex', justifyContent:'center', alignItems:'center',marginTop:'50vh'}}>
        <div style={{ display:'flex',  justifyContent:'center',position:'absolute', top:'0', left:'0', height:'50%', width:'100%', backgroundColor:'rgba(40, 78, 255, 0.3)'}}>
        <div style={{fontSize:'3vh'}}>
             ERC-20 Assets
          </div>  
          <div style={{width:props.tableCreator?'80vw':'93.6vw',height:'75%',left:'1%',top:'20%', overflow:'scroll', position:'absolute', backgroundColor:'rgba(0,0,0,0.3)', border:'1px dashed #999'}}>
     
          <table style={{width:'100%', }} >
            <tbody>
            <tr style={{backgroundColor:'rgba(100,100,250,0.5)',}}>
              <th>Token</th>
              <th>Amount</th>
              <th>Contract</th>
            </tr>

            {/* {console.log(lookupTokenSymbolByAddress.data[i], parseInt(getP1Offer.data[1][i].amount._hex,16) )} */}
            {lookupTokenSymbolByAddress.data?
            lookupTokenSymbolByAddress.data.map((item, index)=>{
              return(
                <tr key={index}>
                  <td>{item}</td>
                  <td>{ (parseInt(getP1Offer.data[1][index].amount._hex,16) / (10 ** 18) ) }</td>
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
        <div style={{ display:'flex', justifyContent:'center',position:'absolute', bottom:'0', left:'0', height:'50%', width:'100%', backgroundColor:'rgba(40, 38, 255, 0.44)'}}>
          <div style={{fontSize:'3vh'}}>
          ERC-721 Assets
          </div>  
          <div style={{width:props.tableCreator?'80vw':'93.6vw',height:'75%',left:'1%',top:'20%', position:'absolute', backgroundColor:'rgba(0,0,0,0.3)', border:'1px dashed #999'}}>

          <table style={{width:'100%'}} >
            <tbody>
            <tr style={{backgroundColor:'rgba(100,100,250,0.5)',}}>
              <th>Asset</th>
              <th>Image</th>
              <th>Token ID</th>
              <th>View On OpenSea</th>
            </tr>
            <tr>
              <td>Bored Ape</td>
              <td></td>
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

        

        {props.tableCreator?
        <>
            <div onClick={()=>{setdisplayUserErc20Assets(!displayUserErc20Assets)}} className="addAssetButton" style={{position:'absolute', top:'10vh',transform:'scale(3)', right:'5%'}}>
            <AddBoxIcon />
            </div>

            <div onClick={()=>{setdisplayErc721DepositPage(!displayErc721DepositPage)}} className="addAssetButton" style={{position:'absolute', top:'30vh',transform:'scale(3)', right:'5%'}}>
            <AddBoxIcon />
            </div>
        </>:
        <></>}
        
        
    </div>
    </>
  )
}

export default P1AssetBox