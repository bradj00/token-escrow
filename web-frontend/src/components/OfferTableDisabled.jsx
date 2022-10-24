import React, {useContext, useState, useEffect} from 'react'
import { generalContext } from '../App'

import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import BackspaceIcon from '@mui/icons-material/Backspace';
import P1AssetBox from './P1AssetBox';
import P2AssetBox from './P2AssetBox';
import { useNavigate, useLocation, Link } from 'react-router-dom'
import {getEllipsisTxt} from "../helpers/formatters";
import { useWeb3Contract,useMoralis,useWeb3ExecuteFunction, } from 'react-moralis';
import TheUserErc20Balances from './sub-components/TheUserErc20Balances';
import WarningIcon from '@mui/icons-material/Warning';
import '../styles.css'
import { Erc20Abi, tableContractAbi, TokenLookupFromAddyContract, TokenLookupFromAddyAbi } from '../helpers/contractInfo';
import CheckIfTableIsDisabled from './sub-components/CheckIfTableIsDisabled';

const OfferTable = (props) => {
    const {showPage, setshowPage} = useContext(generalContext);
    const {clickedFinalize, setclickedFinalize} = useContext(generalContext);
    const {isWeb3Enabled,account} = useMoralis();
    const {displayUserErc20Assets, setdisplayUserErc20Assets} = useContext(generalContext);
    const location = useLocation();
    const something = location.pathname.replace('/', '');
    const {UserActiveTable, setUserActiveTable} = useContext(generalContext);
    const {userErc20TokenBalance, setuserErc20TokenBalance}   = useContext(generalContext);
    const {isTableDisabled, setisTableDisabled} = useContext(generalContext);
    
    
    
    
    const [counterParty, setcounterParty] = useState(false);
    const [tableCreator, settableCreator] = useState(false);


    const LookupErcTokenSymbolsP1 = useWeb3ExecuteFunction  ({
        abi: TokenLookupFromAddyAbi,
        contractAddress: TokenLookupFromAddyContract,
        functionName: "lookupArrayOfErc20",
        params: {
            tokenList: [] 
        }
      });
    const LookupErcTokenSymbolsP2 = useWeb3ExecuteFunction  ({
        abi: TokenLookupFromAddyAbi,
        contractAddress: TokenLookupFromAddyContract,
        functionName: "lookupArrayOfErc20",
        params: {
            tokenList: [] //p2 registered tokens 
        }
      });
      

    useEffect(()=>{
        console.log('table ID is: ',something);
    },[something])
    
    useEffect(()=>{
        if (account && UserActiveTable){
            if ( account.toUpperCase() == UserActiveTable.P1.toUpperCase() ) {
                console.log('we are the table creator!');
                settableCreator(true);
            } else {
                settableCreator(false);
            }
            if ( account.toUpperCase() == UserActiveTable.P2.toUpperCase() ) {
                console.log('we are the counter-party!');
                setcounterParty(true);
            }else {
                setcounterParty(false);
            }
        }
    },[account, UserActiveTable])

    useEffect(()=>{
        if (isWeb3Enabled && UserActiveTable){
            getBothParties.runContractFunction({
                onError: (error) =>{
                    // console.log('111big ERROR: ',error);
                    }
            });
        }
    },[isWeb3Enabled, UserActiveTable]);
    
    const getBothParties = useWeb3Contract({
        abi: tableContractAbi,
        contractAddress: UserActiveTable,
        functionName: "getParties",
      });

    useEffect(()=>{
        if (getBothParties.data && account){
            console.log('p1 and p2: ',getBothParties.data);
            if (getBothParties.data[1].toLowerCase() == account){
                console.log('we are the counter-party!');
                //set TRUE
                setcounterParty(true);
            }else {
                setcounterParty(false);
            }

            if (getBothParties.data[0].toLowerCase() == account){
                console.log('we are the table creator!');
                //set TRUE
                settableCreator(true);
            }else {
                settableCreator(false);
            }
        }
    },[getBothParties.data, account])


    function goBackHome(){
        console.log('before: ',location.pathname);
        location.pathname = '';
        console.log('after: ',location.pathname);
        setUserActiveTable();
        setshowPage('home');
    }
    return (
        <div style={{position:'absolute', width:'100%', height:'100%',display:'flex', justifyContent:'center',alignItems:'center'}}>
            <CheckIfTableIsDisabled />

        <div style={{display:'flex', justifyContent:'center', position:'absolute', width:'100%', height:'100vh', zIndex:'9999'}}>
           
            {displayUserErc20Assets ? 
            <div className="confirmationBox" style={{zIndex:'9999',color:'#fff',fontSize:'3vh', position:'fixed', top:'5vh', display:'flex', textAlign:'center', justifyContent:'center', alignItems:'center', width:'100%',height:'100vh', zIndex:'9999',backgroundColor:'rgba(40, 38, 120, 1)',border:'1px solid #0088ff',borderRadius:'5px'}}>
                <TheUserErc20Balances  counterParty={counterParty} tableCreator={tableCreator} userErc20TokenBalance={userErc20TokenBalance} displayUserErc20Assets={displayUserErc20Assets} setdisplayUserErc20Assets={setdisplayUserErc20Assets}/>
            </div>
            :<></>}
            
            <div style={{overflow:'hidden', zIndex:'0',  display:'flex', alignItems:'center', justifyContent:'right', right:'0vw', top:'0.5vh', color:'#fff', zIndex:'9999', position:'absolute',width:'95%', fontSize:'3vh', userSelect:'none'}}>
                <div style={{ zIndex:'-1', right:'8.5vw', top:'0vh', position:'absolute', width:'52%',  height:'100vh',transform:'skew(-10deg,-10deg) rotateZ(10deg)',  backgroundColor:'#0066ff',}}>
                </div>
                
                <div style={{ zIndex:'-1', left:'-5vw', top:'0vh', position:'absolute', width:'46%', height:'100vh', transform:'skew(-10deg,-10deg) rotateZ(10deg)', backgroundColor:'#0033bb',}}>
                </div>
                
                <div style={{position:'absolute', left:'10vw', fontSize:'70%'}}>
                    Table ID
                </div>
                <div style={{position:'absolute',left:'20vw', fontSize:'3vh', color:'#ffff00'}}>
                    {UserActiveTable? getEllipsisTxt(UserActiveTable.tableId.replace('0x',''),5): 0x0000000}
                </div>

                <div onClick={()=>{goBackHome();setisTableDisabled(false)}} className="backButtonHover" style={{zIndex:'99999', position:'absolute', top:'1vh',left:'1vw',transform:'scale(2)',}}>
                    <BackspaceIcon />
                </div>
                
                <div style={{display:'flex',justifyContent:'center', width:'100%', marginLeft:'48vw', }}>
                    <div title={UserActiveTable.P1?UserActiveTable.P1:""}  style={{fontSize:'3vh', color: account.toUpperCase() == UserActiveTable.P1.toUpperCase()? '#00ff00':'#fff'}}>
                        {UserActiveTable? getEllipsisTxt(UserActiveTable.P1,5): 0x0000000}
                    </div>

                    <div style={{paddingLeft:'3vw', paddingRight:'3vw', marginTop:'1vh', textAlign:'center', transform:'scale(1.8)', color:'#ffff00' }}>
                        <SwapHorizIcon />
                    </div>
                    <div title={UserActiveTable.P2?UserActiveTable.P2:""} style={{paddingRight:'2vw', fontSize:'3vh',  color: account.toUpperCase() == UserActiveTable.P2.toUpperCase()? '#00ff00':'#fff'}}>
                        {UserActiveTable? getEllipsisTxt(UserActiveTable.P2,5): 0x0000000}
                    </div>
                </div>


            
            </div>
            <div style={{filter:'opacity(0.3)',userSelect:'none',border: '1px solid #999', position:'absolute', height:'40vh', width:'95vw',top:'8vh', backgroundColor:'rgba(50,50,50,0.9)', borderRadius:'5px', padding:'0.5vh',display:'flex', justifyContent:'center', alignItems:'center', color:'#fff'}}>
                <P1AssetBox tableCreator={false}/>
            </div>
            <div onClick={()=>{setclickedFinalize(true)}} className="ejectButtonWithHover" style={{textAlign:'center', border:'1px solid #ff0000', fontSize:'2.5vh', padding:'0.1vh', paddingLeft:'2vh', paddingRight:'2vh', position:'absolute',  top:'50vh',}}>
                Table has been closed.<br></br> Click here to EJECT your assets from the table
            </div>
            <div style={{filter:'opacity(0.3)', userSelect:'none',border: '1px solid #ff1155',position:'absolute', height:'40vh', width:'95vw',bottom:'1vh', backgroundColor:'rgba(50,50,50,0.9)', borderRadius:'5px', padding:'0.5vh',display:'flex', justifyContent:'center', alignItems:'center', color:'#fff'}}>
                <P2AssetBox counterParty={false}/>
            </div>
        </div>
        </div>
    )
    
}

export default OfferTable