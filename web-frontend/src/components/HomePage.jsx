import React, {useEffect, useContext} from 'react'
import AccountTitle from './AccountTitle'
import CounterPartyAddressInput from './CounterPartyAddressInput'
import OpenEscrowTables from './OpenEscrowTables'
import Moralis, {useWeb3Contract, useMoralis, MoralisProvider, useERC20Balances} from "react-moralis";
import {tableFactoryContractAbi, tableFactoryContractAddress} from '../helpers/contractInfo.js';
import { generalContext } from '../App'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import ReadQrCodePasteCounterParty from './ReadQrCodePasteCounterParty';
import QRCode from 'react-qr-code'


const HomePage = () => {
  const {account, Moralis, enableWeb3, web3, isWeb3Enabled, authenticate, isAuthenticated, user, logout} = useMoralis();
  const {offerTableContractAddress, setofferTableContractAddress} = useContext(generalContext);

  const location = useLocation();
  const activeTableDefined = location.pathname.replace('/table/', '');
  const {UserActiveTable, setUserActiveTable} = useContext(generalContext);
  const {showCounterPartyScanner, setshowCounterPartyScanner} = useContext(generalContext);
  const {CreateErrorText, setCreateErrorText} = useContext(generalContext);
  useEffect(()=>{
    if (activeTableDefined.includes('0x')){
      console.log('active table is defined in URL: ',activeTableDefined);
      setUserActiveTable(activeTableDefined);
      
    }
  },[activeTableDefined])

  useEffect(()=>{
    if (!isWeb3Enabled){
      enableWeb3();
      setCreateErrorText('enabling web3...')
    }else {
      setCreateErrorText(JSON.stringify(isWeb3Enabled))
    }
  },[isWeb3Enabled])


  return (
    <div>
      {showCounterPartyScanner?
      <ReadQrCodePasteCounterParty />
      :
      <div style={{display:'flex', justifyContent:'center',  }}>
        <AccountTitle />
        <CounterPartyAddressInput offerTableContractAddress={offerTableContractAddress} setofferTableContractAddress={setofferTableContractAddress}/>

        <div style={{fontSize:'2vh',position:'absolute', top:'44vh',color:'#fff', zIndex:'9999', border:'2px solid #fff'}}>
            <QRCode size={160} value={account? account: "something went wrong!"} /> 
        </div>

        <OpenEscrowTables />
      </div>}
    </div>
  )
}

export default HomePage