import logo from './logo.svg';
import './App.css';
import './styles.css';
import React, {useEffect, useState} from 'react';
import {MoralisProvider, } from 'react-moralis';
import AccountTitle from './components/AccountTitle';
import CounterPartyAddressInput from './components/CounterPartyAddressInput';
import EscrowHistory from './components/EscrowHistory';
import HomePage from './components/HomePage';
import OfferTable from './components/OfferTable';


export const generalContext   = React.createContext({});

function App() {
    const [showPage, setshowPage] = useState('home');
    const [clickedFinalize, setclickedFinalize] = useState(false);
    const contextObj = {
      showPage, setshowPage,
      clickedFinalize, setclickedFinalize
    };



    return ( 
      <MoralisProvider appId="1hFLCQEQW1BR1vgJ1hyAivIuHzlnD0GSPPiLhajv" serverUrl="https://y1gpn8k7i4ta.usemoralis.com:2053/server">
      <generalContext.Provider value={contextObj} >
        
        {showPage == 'home'?
          <HomePage />
        :<></>}
        {showPage == 'offer'?
          <OfferTable />
        :<></>}

        <div style={{boxShadow:'inset 0 0 5px rgba(255,255,255,0.3)', position:'absolute', width:'100vw', height:'100vh', backgroundColor:'rgba(0,0,0,0.9)', color:'#fff', justifyContent:'center', alignItems:'center', display:'flex', fontSize:'2vh', userSelect:'none'}}>
          {/* base canvas */}
        </div>

      </generalContext.Provider>
      </MoralisProvider>
    );
}

export default App;