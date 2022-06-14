import logo from './logo.svg';
import './App.css';
import './styles.css';
import React, {useEffect, useState} from 'react';
import {MoralisProvider, } from 'react-moralis';
import AccountTitle from './components/AccountTitle';
import CounterPartyAddressInput from './components/CounterPartyAddressInput';
import HomePage from './components/HomePage';
import OfferTable from './components/OfferTable';
import ReadQrCode from './components/ReadQrCode';

export const generalContext   = React.createContext({});

function App() {
    const [showPage, setshowPage] = useState('home');
    const [clickedFinalize, setclickedFinalize] = useState(false);
    const [userErc20TokenBalance, setuserErc20TokenBalance] = useState();




    const contextObj = {
      showPage, setshowPage,
      clickedFinalize, setclickedFinalize,
      userErc20TokenBalance, setuserErc20TokenBalance
    };



    return ( 
      <MoralisProvider appId="" serverUrl="">
      <generalContext.Provider value={contextObj} >
        
        {showPage == 'home'?
          <HomePage />
        :<></>}

        {showPage == 'offer'?
          <OfferTable />
        :<></>}
        
        {showPage == 'getQrCode'?
          <ReadQrCode />
        :<></>}
        
        
        <div style={{boxShadow:'inset 0 0 5px rgba(255,255,255,0.3)', position:'absolute', width:'100vw', height:'100vh', backgroundColor:'rgba(0,0,0,0.9)', color:'#fff', justifyContent:'center', alignItems:'center', display:'flex', fontSize:'2vh', userSelect:'none'}}>
          {/* base canvas */}
        </div>

      </generalContext.Provider>
      </MoralisProvider>
    );
}

export default App;