import React, {useEffect, useContext} from 'react'
import AccountTitle from './AccountTitle'
import CounterPartyAddressInput from './CounterPartyAddressInput'
import EscrowHistory from './EscrowHistory'
import Moralis, {useWeb3Contract, useMoralis, MoralisProvider, useERC20Balances} from "react-moralis";
import {tableFactoryContractAbi, tableFactoryContractAddress} from '../helpers/contractInfo.js';
import { generalContext } from '../App'
import { useNavigate, useLocation, Link } from 'react-router-dom'

const HomePage = () => {
  const {Moralis, enableWeb3, web3, isWeb3Enabled, authenticate, isAuthenticated, user, logout} = useMoralis();
  const {offerTableContractAddress, setofferTableContractAddress} = useContext(generalContext);

  const location = useLocation();
  const activeTableDefined = location.pathname.replace('/table/', '');
  const {UserActiveTable, setUserActiveTable} = useContext(generalContext);

  useEffect(()=>{
    if (activeTableDefined.includes('0x')){
      console.log('active table is defined in URL: ',activeTableDefined);
      setUserActiveTable(activeTableDefined);
      
    }
  },[activeTableDefined])

  useEffect(()=>{
    if (!isWeb3Enabled){
      enableWeb3();
    }
  },[isWeb3Enabled])


  return (
    <div>
        <AccountTitle />
        <CounterPartyAddressInput offerTableContractAddress={offerTableContractAddress} setofferTableContractAddress={setofferTableContractAddress}/>
        <EscrowHistory />

    </div>
  )
}

export default HomePage