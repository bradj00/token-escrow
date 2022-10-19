import React, {useState, useContext} from 'react'
import {useMoralis, useWeb3ExecuteFunction} from 'react-moralis'; 
import { commaNumber } from '../../helpers/formatters';
import CancelIcon from '@mui/icons-material/Cancel';
import SetErc20AddQty from './SetErc20AddQty';
import { useEffect } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Erc20Abi } from '../../helpers/contractInfo';
import { generalContext } from '../../App';

const TheUserErc20Balances = (props) => {
  const {Moralis,isWeb3Enabled,account} = useMoralis();
  const [displaySetQty, setdisplaySetQty] = useState({});
  const [selectedToken, setselectedToken] = useState();
  const [selectedTokenQty, setselectedTokenQty] = useState(0);
  const {UserActiveTable, setUserActiveTable} = useContext(generalContext);

  const getApprovalBalance = useWeb3ExecuteFunction  ({
    abi: Erc20Abi,
    contractAddress: selectedToken? selectedToken.token_address: "0x0000000000000000000000000000000000000000",
    functionName: "allowance",
    params: {
        owner: account? account: "0x0000000000000000000000000000000000000000",
        spender: UserActiveTable? UserActiveTable.tableId: "0x0000000000000000000000000000000000000000" //table address
    }
  });
  const approveAllowanceAmount = useWeb3ExecuteFunction  ({
    abi: Erc20Abi,
    contractAddress: selectedToken? selectedToken.token_address: "0x0000000000000000000000000000000000000000",
    functionName: "approve",
    params: {
        spender: UserActiveTable? UserActiveTable.tableId: "0x0000000000000000000000000000000000000000",
        amount: Moralis.Units.ETH(selectedTokenQty)
    }
  });

  useEffect(()=>{
    if (selectedToken){
        console.log('selectedToken: ',selectedToken)
    }
  },[selectedToken])


  function confirmTokenAndQty(index, item){
    console.log('token selected for deposit: ',selectedToken, selectedTokenQty);
    setdisplaySetQty({[index]: false });
    // setselectedToken(item);

    //make approval chain tx here first
    console.log('account: ',account)
    console.log('tableId: ',UserActiveTable.tableId)
    console.log('token_address: ',selectedToken)

    getApprovalBalance.fetch({
    onError: (error) =>{
        console.log('error getting ALLOWANCE SPEND amount: ',error);
        }
    })


    //then call party1AddErc20AssetAddress(address, uint256) tx


  }

  useEffect(()=>{
    if (getApprovalBalance.data){
        console.log('getApprovalBalance.data: ', parseInt(getApprovalBalance.data._hex, 16))
        if (Moralis.Units.ETH(selectedTokenQty) > parseInt(getApprovalBalance.data._hex, 16)){
            console.log('allowance set too LOW! user must approve allowance to deposit')

            console.log('spender: ',UserActiveTable.tableId);
            console.log('amount: ',selectedTokenQty);
            approveAllowanceAmount.fetch({
                onError: (error) =>{
                    console.log('error setting approval allowance: ',error);
                }
            })
        }
    }
  },[getApprovalBalance.data])


  useEffect(()=>{
    // console.log('displaySetQty: ',displaySetQty);
  },[displaySetQty])

  return (
    <>
        <div onClick={()=>{props.setdisplayUserErc20Assets(!props.displayUserErc20Assets)}} style={{cursor:'pointer', transform:'scale(1.3)', zIndex:'9999',position:'absolute',top:'1vh',right:'3%',}}>
            <CancelIcon />
        </div>
        <div style={{position:'absolute',top:'1vh',left:'1vw',fontWeight:'bolder',fontSize:'2vh'}}>
            Select a Token
        </div>
        
        <div style={{position:'absolute',top:'5vh',fontWeight:'bolder',width:'95%',height:'6vh',borderRadius:'25px',border:'1px solid #0066ff'}}>
            <input placeholder="Search name or paste address" style={{position:'absolute',width:'98%',height:'5vh',left:'0vw',textAlign:'center', top:'0.5vh',fontSize:'3vh',color:'#fff',backgroundColor:'rgba(0,0,0,0)',border:'rgba(0,0,0,0)', outline:'none'}}></input>
        </div>
        <div style={{position:'absolute',top:'13vh',border:'0.5px solid #777',width:'100%'}}>
        </div>

        <div style={{position:'absolute',top:'16vh',width:'99%'}}>
            <div style={{position:'relative',paddingBottom:'5vh', top:'0vh',textAlign:'left', fontSize:'2vh',left:'0vw',fontWeight:'bolder',}}>
                Suggested from your wallet
            </div>
            
            {props.userErc20TokenBalance? 
                props.userErc20TokenBalance.map((item, index)=>{
                    return(
                        <div style={{display:'flex', justifyContent:'center',alignItems:'center',}}>
                            
                            {displaySetQty[index]?<div className="okButtonHover" onClick={()=>{confirmTokenAndQty(index, item)}} style={{ zIndex:'60',padding:'3vh 3vw 3vh 3vw', borderRadius:'15px', position:'absolute',right:'0',}}>
                                <ThumbUpIcon />
                            </div>:<></>}
                            <div key={index} className="selectATokenEntry" onClick={()=>{setdisplaySetQty({[index]: true });}} style={{zIndex:'50',cursor:'pointer',display:'flex', alignItems:'center', fontSize:'3vh',position:'relative',width:'100%',height:'12vh',marginTop:'0.5vh',marginBottom:'0.5vh',left:'0.5vw', borderRadius:'15px'}}>
                                <div  style={{position:'absolute',left:'1vw',paddingTop:'0.5vh', top:'2%'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="5vw" height="5vh" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"  ><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
                                </div>
                                <div  style={{position:'absolute',left:'7%',top:'10%', }}>
                                    {item.symbol}
                                </div>
                                <div  style={{fontSize:'2.5vh', position:'absolute',top:'60%', left:'1vw', color:'rgba(200,200,255,0.9)' }}>
                                    Balance: {commaNumber(parseInt(Moralis.Units.FromWei(item.balance)) )} 
                                </div>
                                
                                {displaySetQty[index]?
                                    <div style={{alignItems:'center', position:'absolute', width:'50%',display:'flex', justifyContent:'center', borderRadius:'15px',right:'13vw',height:'80%',zIndex:'9999',}}>
                                        {/* <input type="number" pattern="\d*" style={{height:'100%',width:'100%',color:'#fff',borderRadius:'15px',backgroundColor:'rgba(0,0,0,0.4)',fontSize:'2.5vh',textAlign:'left',paddingLeft:'1%',fontSize:'5vh', border:'none',}} placeholder="0.0" autoFocus={true}></input> */}
                                        <input type="number" onChange={event => {setselectedTokenQty(event.target.value); setselectedToken(item)}} value={selectedTokenQty} pattern="\d*" style={{height:'100%',width:'100%',color:'#fff',borderRadius:'15px',backgroundColor:'rgba(0,0,0,0.4)',fontSize:'2.5vh',textAlign:'left',paddingLeft:'1%',fontSize:'5vh', border:'none',}} placeholder="0.0" autoFocus={true}></input>
                                        
                                        
                                    </div>
                                :<></>
                                }

                                
                            </div>
                        </div>
                        
                    )
                })

            :<></>}
        </div>

    </>
  )
}

export default TheUserErc20Balances