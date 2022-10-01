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
import { getEllipsisTxt } from '../helpers/formatters';


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

        <div style={{display:'flex', justifyContent:'center', fontSize:'2vh',position:'absolute', top:'48vh',color:'rgba(120,250,120,1)', zIndex:'9999', border:'2px solid #fff'}}>
            <QRCode size={160} bgColor={'rgba(120,250,120,1)'} value={account? account: "something went wrong!"} /> 
            <div style={{position:'absolute',bottom:'-5vh', fontSize:'3vh'}}>
              {account? getEllipsisTxt(account, 4): "..."}
            </div>
        </div>

        <OpenEscrowTables />
      </div>}
    </div>
  )
}

export default HomePage