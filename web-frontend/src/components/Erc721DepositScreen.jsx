import React, {useContext, useState} from 'react'
import WarningIcon from '@mui/icons-material/Warning';
import { generalContext } from '../App';
import { useEffect } from 'react';
import {useNFTBalances, useMoralis} from 'react-moralis';
import { ToggleSlider }  from "react-toggle-slider";


const Erc721DepositScreen = () => {

    const {Moralis, enableWeb3, web3, isWeb3Enabled, authenticate, isAuthenticated, account, user, logout} = useMoralis();

    const {displayErc721DepositPage, setdisplayErc721DepositPage} = useContext(generalContext);
    const {clickedFinalize, setclickedFinalize} = useContext(generalContext);
    const [UserUniqueContractArr, setUserUniqueContractArr]             = useState();
    const [SelectedErc721Address, setSelectedErc721Address]             = useState();

    const getAllUserNfts = useNFTBalances();

    useEffect(()=>{
        if (isWeb3Enabled){
            console.log('GETTING FRESH NFT BALANCES');
            getAllUserNfts.getNFTBalances({ params: { chain: "matic",  } })
        }
    },[isWeb3Enabled])

    useEffect(()=>{
        if (getAllUserNfts.data){
            // console.log('getAllUserNfts.data: \t\t', getAllUserNfts.data);
        if (getAllUserNfts.data.result){
        if (getAllUserNfts.data.result.length >  0){
            // console.log('\t\t\t-------------- got all NFTs owned by account [ '+account+' ]', getAllUserNfts.data.result);
            let tempArr = [];
            for (let i = 0; i < getAllUserNfts.data.result.length; i++){
                // console.log(getAllUserNfts.data.result[i]);
                tempArr.push({address: getAllUserNfts.data.result[i].token_address, name: getAllUserNfts.data.result[i].name, symbol: getAllUserNfts.data.result[i].symbol, });
            }
            const uniqueArr = tempArr.filter((value, index) => {
                const _value = JSON.stringify(value);
                return index === tempArr.findIndex(obj => {
                    return JSON.stringify(obj) === _value;
                });
            });

            setUserUniqueContractArr(uniqueArr);
            // console.log('unique contracts: ',uniqueArr);
        }
        }
        }
    },[getAllUserNfts.data]);




    useEffect(()=>{
        console.log('displayErc721DepositPage is: ',displayErc721DepositPage);
    },[displayErc721DepositPage]);

    return (
        <div className={displayErc721DepositPage?"confirmationBox":"hiddenConfirmationbox"} style={{borderRadius:'5px',  border:'1px solid rgba(153, 21, 121, 1)', zIndex:'10000', display:'flex', justifyContent:'center', alignItems:'center', top:'9vh', position:'absolute',width:'85vw', height:'85vh', backgroundColor:'rgba(23, 21, 121, 1)'}}>
            <div onClick={()=>{setdisplayErc721DepositPage(false)}} className="finalizeButtonWithHover" style={{ padding:'1.5vh', paddingLeft:'3vh', paddingRight:'3vh', position:'absolute', top:'1%',right:'1%',}}>
                X
            </div>
            
            <div style={{position:'absolute',top:'2vh',fontWeight:'bolder',width:'70%',height:'6vh',borderRadius:'25px',border:'1px solid #0066ff'}}>
                <input placeholder="Paste address or select from list below" style={{position:'absolute',width:'98%',height:'5vh',left:'0vw',textAlign:'center', top:'0.5vh',fontSize:'3vh',color:'#fff',backgroundColor:'rgba(0,0,0,0)',border:'rgba(0,0,0,0)', outline:'none'}}></input>
            </div>

            <div style={{display:'flex', alignItems:'center', position:'absolute', top:'11vh',left:'2vh',fontSize:'2vw', color:'#fff'}}>
                <div style={{marginRight:'1vw',}}>
                    <ToggleSlider/> 
                </div>
                <div>
                    approve mass deposit
                </div>
            </div>

            <div style={{display:'flex', justifyContent:'center', overflow:'scroll', userSelect:'none',  textAlign:'center', color:'#fff', position:'absolute',bottom:'1vh', width:'95%', height:'75%', backgroundColor:'rgba(0,0,0,0.2)',borderRadius:'5px',padding:'1vw'}}>
                

                {!SelectedErc721Address?<table className="erc721Table">
                    <thead>
                        <tr>
                            <th>Address</th>
                            <th>Name</th>
                            <th>Symbol</th>
                        </tr>
                    </thead>
                    <tbody>
                {UserUniqueContractArr? UserUniqueContractArr.map((item, index)=>{
                    return(
                            <tr key={index} onClick={()=> {console.log('selected: ',item.address); setSelectedErc721Address(item.address)} }>
                                <td>{item.address}</td>
                                <td>{item.name}</td>
                                <td>{item.symbol}</td>
                            </tr>
                        )
                    })
                    :<></>}
                    </tbody>
                </table> :
                <>
                 {/* SelectedErc721Address: {SelectedErc721Address} */}

                    <div style={{height:'45%', width:'95%', top:'1vh', display:'flex', justifyContent:'center', alignItems:'center',  backgroundColor:'rgba(0,0,0,0.3)', position:'absolute', }}>
                        
                        <div style={{height:'95%', width:'25%',marginRight:'5vw',    backgroundColor:'rgba(250,0,0,0.3)', display:'flex', justifyContent:'center', alignItems:'center' }}>
                            SELECTED TOKEN IMAGE
                        </div>
                        <div style={{height:'85%', width:'65%',marginLeft:'1vw',    backgroundColor:'rgba(0,250,0,0.3)', display:'flex', justifyContent:'center', alignItems:'center' }}>
                            METADATA
                        </div>

                    </div>

                    <div style={{overflow:'scroll', height:'50%', width:'95%', bottom:'1vh', backgroundColor:'rgba(0,0,0,0.3)', position:'absolute',display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <table style={{position:'absolute', top:'0vh',}} className="erc721Table">
                            <thead>
                                <tr>
                                    <th>Selected</th>
                                    <th>Token ID</th>
                                    <th>Name</th>
                                    <th>Symbol</th>

                                </tr>
                            </thead>
                                <tbody>
                            {UserUniqueContractArr? UserUniqueContractArr.map((item, index)=>{
                                return(
                                        <tr key={index} onClick={()=> {console.log('selected: ',item.address); setSelectedErc721Address(item.address)} }>
                                            <td><input type="checkbox"></input></td>
                                            <td>41772</td>
                                            <td>MCP Land</td>
                                            <td>MCPL</td>
                                        </tr>
                                    )
                                })
                                :
                            <></>}
                                </tbody>
                            </table>


                    </div>


                </>}
            
            </div>


            {/* <div className="finalizeButtonWithHover" style={{fontSize:'4vh', display:'flex', justifyContent:'center', alignItems:'center', position:'absolute',bottom:'3vh', width:'40%', height:'10%'}}>
                Confirm
            </div> */}


        </div>
    )
}

export default Erc721DepositScreen