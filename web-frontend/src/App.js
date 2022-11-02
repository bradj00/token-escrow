import logo from './logo.svg';
import './App.css';
import './styles.css';
import React, {useEffect, useState} from 'react';
import {MoralisProvider, } from 'react-moralis';
import AccountTitle from './components/AccountTitle';
import CounterPartyAddressInput from './components/CounterPartyAddressInput';
import HomePage from './components/HomePage';
import OfferTableEnabled from './components/OfferTableEnabled';
import OfferTableDisabled from './components/OfferTableDisabled';
import ReadQrCode from './components/ReadQrCode';

export const generalContext   = React.createContext({});

function App() {
    const [showPage, setshowPage] = useState('home');
    const [clickedFinalize, setclickedFinalize] = useState(false);
    const [userErc20TokenBalance, setuserErc20TokenBalance] = useState();
    const [offerTableContractAddress, setofferTableContractAddress] = useState();
    const [UserActiveTable, setUserActiveTable] = useState();
    const [UserAllTables, setUserAllTables] = useState();
    const [displayUserErc20Assets, setdisplayUserErc20Assets] = useState();
    const [counterPartyAddress, setcounterPartyAddress] = useState();
    const [showCounterPartyScanner, setshowCounterPartyScanner] = useState();
    const [CreateErrorText, setCreateErrorText] = useState();
    const [refreshUserEscrowTables, setrefreshUserEscrowTables] = useState(false);
    
    const [allUserErc721s, setallUserErc721s] = useState();
    const [isTableDisabled, setisTableDisabled] = useState(false);
    const [displayErc721DepositPage, setdisplayErc721DepositPage] = useState(false);
    


    const contextObj = {
      showPage, setshowPage,
      clickedFinalize, setclickedFinalize,
      userErc20TokenBalance, setuserErc20TokenBalance,
      offerTableContractAddress, setofferTableContractAddress,
      UserActiveTable, setUserActiveTable,
      UserAllTables, setUserAllTables,
      displayUserErc20Assets, setdisplayUserErc20Assets,
      counterPartyAddress, setcounterPartyAddress,
      showCounterPartyScanner, setshowCounterPartyScanner,
      CreateErrorText, setCreateErrorText,
      refreshUserEscrowTables, setrefreshUserEscrowTables,
      isTableDisabled, setisTableDisabled,
      displayErc721DepositPage, setdisplayErc721DepositPage, 
      allUserErc721s, setallUserErc721s,
    };



    return ( 
      // <MoralisProvider appId="eDlXHRFKRZjT5Y6VyW9BiUWmUMCuIYssvPtdX6Wn" serverUrl="https://i7yceqesnmf3.grandmoralis.com:2053/server">
      <MoralisProvider appId='456' serverUrl="http://10.0.3.2:1337/server">
      <generalContext.Provider value={contextObj} >
        
        {showPage == 'home'?
          <HomePage />
        :<></>}

        {showPage == 'offer'?
         isTableDisabled?
         <OfferTableDisabled />  :
          <OfferTableEnabled />
        :<></>}
        
        {showPage == 'getQrCode'?
          <ReadQrCode />
        :<></>}
        
        
        <div style={{boxShadow:isTableDisabled? 'inset 0 0 15px rgba(255,0,0,1)' :'inset 0 0 5px rgba(255,255,255,0.3)', position:'absolute', width:'100vw', height:'100vh', backgroundColor:'rgba(0,0,0,0.9)', color:'#fff', justifyContent:'center', alignItems:'center', display:'flex', fontSize:'2vh', userSelect:'none'}}>
          {/* base canvas */}
        </div>

      </generalContext.Provider>
      </MoralisProvider>
    );
}

export default App;