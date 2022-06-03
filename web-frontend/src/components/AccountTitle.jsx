import React from 'react'
import {MoralisProvider, useMoralis, useChain, account,} from 'react-moralis';
import {useEffect} from 'react';
import {getEllipsisTxt} from '../helpers/formatters';

const AccountTitle = () => {
    const {Moralis, enableWeb3, web3, isWeb3Enabled, authenticate, isAuthenticated, account, user, logout} = useMoralis();
  
    useEffect(()=>{
      if (!isWeb3Enabled || !web3){
        // console.log('enabling web3 framework');
        enableWeb3();
      }
    },[web3, isWeb3Enabled])
    useEffect(()=>{
      if (account){
        console.log('web3 linked wallet: ',account);
      }
    },[account])
    
  
    return (  
        <div style={{userSelect:'none', zIndex:'9999', position:'absolute',width:'100%',top:'0',display:'flex', justifyContent:'center',color:'#fff'}}>
            <div style={{paddingTop:'3vh'}}>
                <div style={{textAlign:'center', fontSize:'2vh',color:'#aaa'}}>
                    Hello
                </div>
                <div style={{fontSize:'3vh'}}>
                    {account? getEllipsisTxt(account, 6): <></>}
                </div>
            </div>
        </div>
    )
}

export default AccountTitle