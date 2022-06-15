import React, {useContext} from 'react'
import '../styles.css'
import { generalContext } from '../App';
import { useEffect } from 'react';
import Moralis, {useWeb3Contract, useWeb3ExecuteFunction, useMoralis, MoralisProvider, useERC20Balances} from "react-moralis";
import {tableFactoryContractAbi, tableFactoryContractAddress} from '../helpers/contractInfo.js';
import QrCode2Icon from '@mui/icons-material/QrCode2';

const CounterPartyAddressInput = (props) => {
    const {showPage, setshowPage} = useContext(generalContext);
    const {offerTableContractAddress, setofferTableContractAddress} = useContext(generalContext);
    const {Moralis, enableWeb3, web3, isWeb3Enabled, authenticate, isAuthenticated, user, logout} = useMoralis();
    const {UserActiveTable, setUserActiveTable}                 = useContext(generalContext);
    const {UserAllTables, setUserAllTables}                     = useContext(generalContext);
    const {counterPartyAddress, setcounterPartyAddress}         = useContext(generalContext);
    const {showCounterPartyScanner, setshowCounterPartyScanner} = useContext(generalContext);
    const {CreateErrorText, setCreateErrorText} = useContext(generalContext);
    

    // const createNewEscrowTable = useWeb3Contract({
    //     abi: tableFactoryContractAbi,
    //     contractAddress: tableFactoryContractAddress,
    //     functionName: "createTable",
    //     params: {
    //         _counterParty: offerTableContractAddress
    //     }
    //   });
    const createNewEscrowTable = useWeb3ExecuteFunction  ({
        abi: tableFactoryContractAbi,
        contractAddress: tableFactoryContractAddress,
        functionName: "createTable",
        params: {
            _counterParty: offerTableContractAddress
        }
      });
    const getUserTables = useWeb3Contract({
        abi: tableFactoryContractAbi,
        contractAddress: tableFactoryContractAddress,
        functionName: "getMyTables",
      });


    function checkInput(target){
        if (target.target.value.length <=42){
            props.setofferTableContractAddress(target.target.value);
        }
    }

    useEffect(()=>{
        if (UserAllTables){
            // window.location.href = "https://10.0.1.4:3000/table/"+getUserTables.data[getUserTables.data.length-1];
            window.history.replaceState(null, "COOL BEANS", "/table/"+getUserTables.data[getUserTables.data.length-1])
            setshowPage('offer');
        }
        if (UserActiveTable){
            setshowPage('offer');
        }
    },[UserActiveTable]);


    useEffect(()=>{
        if (counterPartyAddress){
            props.setofferTableContractAddress(counterPartyAddress);
            alert('....updating variable...');
            
        }
    },[counterPartyAddress]);


    useEffect(()=>{
        if (getUserTables.data){
            console.log('latest user table: ',getUserTables.data[getUserTables.data.length-1]); //latest table
            setUserActiveTable(getUserTables.data[getUserTables.data.length-1]); //is this the best place to trigger this? maybe not..
            setUserAllTables(getUserTables.data);
        }
    },[getUserTables.data]);

    function createNewTable(){
        console.log('creating new escrow table. Counter party: ',offerTableContractAddress);
        // setshowPage('offer');
        createNewEscrowTable.fetch({
            onError: (error) =>{
                alert('web3 error creating new Escrow Table: ');
                alert(error);
                alert('...');
                // console.log('web3 error creating new Escrow Table: ',error);
                // setCreateErrorText(JSON.stringify(error));
              },
            onSuccess:(tx2)=>tx2.wait().then(newTx2 => {
                alert('tx confirmed: ',newTx2)
                // console.log('tx confirmed: ',newTx2)
                // setCreateErrorText(JSON.stringify(newTx2));
                // getUserTables.runContractFunction({
                //     onError: (error) =>{
                //         console.log('web3 error getting User Tables: ',error);
                //       }
                
                // });

                //getMyTables[getMyTables.length] //get last entry in the array 
            }),
            onComplete: ()=>{
                alert('Awaiting confirmation...');
                // console.log('Awaiting confirmation...');
                // setCreateErrorText('Awaiting confirmation...');
            }
        });
    }

    return (
    <div style={{display:'flex',justifyContent:'center', position:'absolute',top:'15%', width:'100%',color:'#fff', paddingTop:'0.5vh', height:'6vh',}}>
        <div style={{position:'absolute', width:'95%',marginTop:'-2vh',borderRadius:'10px', height:'250%', backgroundColor:'rgba(40,40,120,0.4)',zIndex:'9999', border:'1px solid #666'}}>
            <div className="scanButtonHover" onClick={()=>{setshowCounterPartyScanner(!showCounterPartyScanner)}} style={{fontSize:'1vw',textAlign:'center', position:'absolute',zIndex:'9999',right:'2%',top:'15%',transform:'scale(2)'}}>
                <div>
                    <QrCode2Icon /><br></br>
                    SCAN
                </div>
            </div>
        

        <input autoComplete='off' onChange={checkInput} value={counterPartyAddress} maxLength="42" size="45" placeholder="Paste counter-party address" name="name"  style={{position:'absolute', textAlign:'center',left:'1%', top:'5%',zIndex:'9999', width:'92%', height:'5vh', color:'#fff',backgroundColor:'rgba(0,0,0,0.2)',fontSize:'2.5vh', border:'0.5px solid #ccc', borderRadius:'15px', outline:'none'}}></input>

        </div>


        
        <div onClick={()=>{createNewTable()}} className="buttonWithHover" style={{position:'absolute', fontSize:'3vh',zIndex:'9999',bottom:'-110%',}}>       
            Open New Escrow
        </div>
        
        <div onClick={()=>{setshowPage('getQrCode')}} className="buttonWithHover" style={{position:'absolute', fontSize:'3vh',zIndex:'9999',bottom:'-270%',}}>
            Join by QR Code
        </div>
    </div>
)
}

export default CounterPartyAddressInput; 