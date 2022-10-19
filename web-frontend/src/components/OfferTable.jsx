import React, {useContext, useState, useEffect} from 'react'
import { generalContext } from '../App'

import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import BackspaceIcon from '@mui/icons-material/Backspace';
import P1AssetBox from './P1AssetBox';
import P2AssetBox from './P2AssetBox';
import { useNavigate, useLocation, Link } from 'react-router-dom'
import {getEllipsisTxt} from "../helpers/formatters";
import { tableContractAbi } from '../helpers/contractInfo';
import { useWeb3Contract,useMoralis, } from 'react-moralis';
import TheUserErc20Balances from './sub-components/TheUserErc20Balances';
import WarningIcon from '@mui/icons-material/Warning';
import '../styles.css'

const OfferTable = (props) => {
    const {showPage, setshowPage} = useContext(generalContext);
    const {clickedFinalize, setclickedFinalize} = useContext(generalContext);
    const {isWeb3Enabled,account} = useMoralis();
    const {displayUserErc20Assets, setdisplayUserErc20Assets} = useContext(generalContext);
    const location = useLocation();
    const something = location.pathname.replace('/', '');
    const {UserActiveTable, setUserActiveTable} = useContext(generalContext);
    const {userErc20TokenBalance, setuserErc20TokenBalance}   = useContext(generalContext);
    const [counterParty, setcounterParty] = useState(false);
    const [tableCreator, settableCreator] = useState(false);

    useEffect(()=>{
        console.log('table ID is: ',something);
    },[something])
    
    useEffect(()=>{
        if (account && UserActiveTable){
            if ( account.toUpperCase() == UserActiveTable.P1.toUpperCase() ) {
                console.log('we are the table creator!');
                //set TRUE
                // settableCreator(true);
                setcounterParty(true);
            } else {
                settableCreator(false);
            }
            if ( account.toUpperCase() == UserActiveTable.P2.toUpperCase() ) {
                console.log('we are the counter-party!');
                setcounterParty(true);
            }else {
                // setcounterParty(false);
            }
        }
    },[account, UserActiveTable])

    useEffect(()=>{
        if (isWeb3Enabled){
            getBothParties.runContractFunction({
                onError: (error) =>{
                    console.log('111big ERROR: ',error);
                    }
            });
        }
    },[isWeb3Enabled]);
    
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
        <div className={clickedFinalize?"confirmationBox":"hiddenConfirmationbox"} style={{borderRadius:'5px',  border:'1px solid rgba(153, 21, 121, 1)', zIndex:'10000', display:'flex', justifyContent:'center', alignItems:'center', position:'absolute',width:'85vw', height:'60vh', backgroundColor:'rgba(23, 21, 121, 1)'}}>
            <div onClick={()=>{setclickedFinalize(false)}} className="finalizeButtonWithHover" style={{ padding:'1.5vh', paddingLeft:'3vh', paddingRight:'3vh', position:'absolute', top:'1%',right:'1%',}}>
                X
            </div>
            <div style={{position:'absolute', top:'5vh',transform:'scale(4)', color:'yellow'}}>
            <WarningIcon />
            </div>
            <div style={{userSelect:'none', fontSize:'3vh', color:'#fff', textAlign:'center', position:'absolute', width:'95%', height:'60%', backgroundColor:'rgba(0,0,0,0.2)',borderRadius:'5px',padding:'1vw'}}>
            Review the trade <br></br><span style={{color:"#ff0000"}}>VERY CAREFULLY.</span><br></br> It wouldn't hurt to refresh the page to ensure data is current before accepting! <br></br><br></br>Click the button below to confirm you are satisfied with how the trade appears.  
            </div>

            <div className="finalizeButtonWithHover" style={{fontSize:'4vh', display:'flex', justifyContent:'center', alignItems:'center', position:'absolute',bottom:'3vh', width:'40%', height:'10%'}}>
            Confirm
            </div>
            

        </div>
        <div style={{display:'flex', justifyContent:'center', position:'absolute', width:'100%', height:'100vh', zIndex:'9999'}}>
           
            {displayUserErc20Assets ? 
            <div className="confirmationBox" style={{zIndex:'9999',color:'#fff',fontSize:'3vh', position:'fixed', top:'5vh', display:'flex', textAlign:'center', justifyContent:'center', alignItems:'center', width:'100%',height:'100vh', zIndex:'9999',backgroundColor:'rgba(40, 38, 120, 1)',border:'1px solid #0088ff',borderRadius:'5px'}}>
                <TheUserErc20Balances userErc20TokenBalance={userErc20TokenBalance} displayUserErc20Assets={displayUserErc20Assets} setdisplayUserErc20Assets={setdisplayUserErc20Assets}/>
            </div>
            :<></>}
            
            <div style={{overflow:'hidden', zIndex:'0',  display:'flex', justifyContent:'right', right:'0vw', top:'0vh', color:'#fff', zIndex:'9999', position:'absolute',width:'100%', fontSize:'3vh', userSelect:'none'}}>
                <div style={{marginRight:'-32vw', zIndex:'-1', position:'absolute', width:'100%', height:'100vh', transform:'skew(-15deg,-15deg) rotateZ(15deg)', backgroundColor:'#0066ff',}}>
                </div>

                <div style={{ zIndex:'-1', left:'-10.5vw', position:'absolute', width:'50%', height:'100vh', transform:'skew(-15deg,-15deg) rotateZ(15deg)', backgroundColor:'#0033bb',}}>
                </div>
                
                <div style={{position:'absolute',top:'-5%', left:'14vw', fontSize:'70%'}}>
                    Table ID
                </div>
                <div style={{position:'absolute',bottom:'0%', left:'14vw', fontSize:'1.5vh', color:'#ffff00'}}>
                    {UserActiveTable? getEllipsisTxt(UserActiveTable.tableId.replace('0x',''),5): 0x0000000}
                </div>

                <div onClick={()=>{goBackHome();}} className="backButtonHover" style={{zIndex:'9999', position:'absolute', top:'1vh',left:'5vw',transform:'scale(1.7)',}}>
                    <BackspaceIcon />
                </div>
                
                <div style={{fontSize:'80%', color: account.toUpperCase() == UserActiveTable.P1.toUpperCase()? '#00ff00':'#fff'}}>
                    {UserActiveTable? getEllipsisTxt(UserActiveTable.P1,5): 0x0000000}
                </div>

                <div style={{paddingLeft:'5vw', paddingRight:'5vw', marginTop:'1vh', textAlign:'center', transform:'scale(1.8)', color:'#ffff00' }}>
                    <SwapHorizIcon />
                </div>
                <div style={{paddingRight:'2vw', fontSize:'80%', color: account.toUpperCase() == UserActiveTable.P2.toUpperCase()? '#00ff00':'#fff'}}>
                    {UserActiveTable? getEllipsisTxt(UserActiveTable.P2,5): 0x0000000}
                </div>



            
            </div>
            <div style={{userSelect:'none',border: '1px solid #999', position:'absolute', height:'40vh', width:'95vw',top:'8vh', backgroundColor:'rgba(50,50,50,0.9)', borderRadius:'5px', padding:'0.5vh',display:'flex', justifyContent:'center', alignItems:'center', color:'#fff'}}>
                <P1AssetBox tableCreator={tableCreator}/>
            </div>
            <div onClick={()=>{setclickedFinalize(true)}} className="ejectButtonWithHover" style={{fontSize:'5vh', padding:'0.1vh', paddingLeft:'2vh', paddingRight:'2vh', position:'absolute', left:'12%', top:'50%',}}>
                Eject
            </div>
            <div onClick={()=>{setclickedFinalize(true)}} className="finalizeButtonWithHover" style={{fontSize:'5vh', padding:'0.1vh', paddingLeft:'3vh', paddingRight:'3vh', position:'absolute', right:'16%', top:'50%',}}>
                Finalize
            </div>
            <div style={{userSelect:'none',border: '1px solid #ff1155',position:'absolute', height:'40vh', width:'95vw',bottom:'1vh', backgroundColor:'rgba(50,50,50,0.9)', borderRadius:'5px', padding:'0.5vh',display:'flex', justifyContent:'center', alignItems:'center', color:'#fff'}}>
                <P2AssetBox counterParty={counterParty}/>
            </div>
        </div>
        </div>
    )
    
}

export default OfferTable