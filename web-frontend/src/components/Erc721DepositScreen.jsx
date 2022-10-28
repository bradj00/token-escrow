import React, {useContext, useState} from 'react'
import WarningIcon from '@mui/icons-material/Warning';
import { generalContext } from '../App';
import { useEffect } from 'react';
import {useNFTBalances, useMoralis} from 'react-moralis';
import { ToggleSlider }  from "react-toggle-slider";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const Erc721DepositScreen = () => {

    const {Moralis, enableWeb3, web3, isWeb3Enabled, authenticate, isAuthenticated, account, user, logout} = useMoralis();

    const {displayErc721DepositPage, setdisplayErc721DepositPage} = useContext(generalContext);
    const {clickedFinalize, setclickedFinalize} = useContext(generalContext);
    const [UserUniqueContractArr, setUserUniqueContractArr]                     = useState();
    const [SelectedErc721Address, setSelectedErc721Address]                     = useState();
    const [displayErc721DepositAddy, setdisplayErc721DepositAddy]               = useState();
    const [DisplayErc721DepositTokenArr, setDisplayErc721DepositTokenArr]       = useState();
    const [SelectedErc721TokenUrl, setSelectedErc721TokenUrl]                   = useState();
    const [SelectedErc721Object, setSelectedErc721Object]                       = useState();

    const getAllUserNfts = useNFTBalances();

    useEffect(()=>{
        if (isWeb3Enabled){
            console.log('GETTING FRESH NFT BALANCES');
            getAllUserNfts.getNFTBalances({ params: { chain: "matic",  } })
        }
    },[isWeb3Enabled])

    useEffect(()=>{
        if (displayErc721DepositAddy){
            console.log('displayErc721DepositAddy:',displayErc721DepositAddy);
            // getAllUserNfts.getNFTBalances({ params: { chain: "matic",  } })

            const temp = getAllUserNfts.data.result.filter((item)=>{
                return (item.token_address == displayErc721DepositAddy? item : null) 
            })
            console.log('temp:',temp);
            setDisplayErc721DepositTokenArr(temp);
        }
    },[displayErc721DepositAddy])

    useEffect(()=>{
        if (getAllUserNfts.data){
            console.log('getAllUserNfts.data: \t\t', getAllUserNfts.data);
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
        <div className={displayErc721DepositPage?"confirmationBox":"hiddenConfirmationbox"} style={{borderRadius:'5px',  border:'1px solid rgba(153, 21, 121, 1)', zIndex:'10000', display:'flex', justifyContent:'center', alignItems:'center', top:'9vh', position:'absolute',width:'85vw', height:'88vh', backgroundColor:'rgba(23, 21, 121, 1)'}}>
            <div onClick={()=>{setdisplayErc721DepositPage(false)}} className="finalizeButtonWithHover" style={{zIndex:'9999', padding:'1.5vh', paddingLeft:'3vh', paddingRight:'3vh', position:'absolute', top:'1%',right:'1%',}}>
                X
            </div>
            {/* {SelectedErc721Address ?
                <div onClick={()=>{setSelectedErc721Address()}} className="finalizeButtonWithHover" style={{ padding:'1.5vh', paddingLeft:'3vh', paddingRight:'3vh', position:'absolute', top:'1%',left:'1%',}}>
                    <KeyboardReturnIcon />
                    
                </div>
                : <></>
            } */}
            {!SelectedErc721Address?
            <div style={{position:'absolute',top:'2vh',fontWeight:'bolder',width:'70%',height:'6vh',borderRadius:'25px',border:'1px solid #0066ff'}}>
                <input placeholder="Paste address or select from list below" style={{position:'absolute',width:'98%',height:'5vh',left:'0vw',textAlign:'center', top:'0.5vh',fontSize:'3vh',color:'#fff',backgroundColor:'rgba(0,0,0,0)',border:'rgba(0,0,0,0)', outline:'none'}}></input>
            </div>
            :<></>}
            {SelectedErc721Address?
            <div style={{display:'flex', alignItems:'center', position:'absolute', top:'2vh',left:'2vh',fontSize:'1.25vw', color:'#fff'}}>
                <div style={{marginRight:'1vw',}}>
                    <ToggleSlider/> 
                </div>
                <div>
                    approve mass deposit
                </div>
            </div>
            :<></>}

            <div style={{display:'flex', justifyContent:'center', overflow:'scroll', userSelect:'none',  textAlign:'center', color:'#fff', position:'absolute',bottom:'1vh', width:'100%', height:'85%', borderRadius:'5px',}}>
                

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
                            <tr key={index} onClick={()=> {setdisplayErc721DepositAddy(item.address); setSelectedErc721Address(item.address)} }>
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

                    <div style={{border:'1px solid rgba(0,0,0,0.5)', height:'45%', width:'95%', bottom:'1vh', display:'flex', justifyContent:'center', alignItems:'center',  backgroundColor:'rgba(0,0,0,0.3)', position:'absolute', }}>
                        
                        <div style={{borderRadius:'0.6vw',height:'75%', marginTop:'8vh', width:'25%',marginRight:'5vw',    backgroundColor:'rgba(0,0,0,0.3)', display:'flex', justifyContent:'center', alignItems:'center' }}>
                            
                            {
                                SelectedErc721TokenUrl? 
                                <img src={SelectedErc721TokenUrl} style={{height:'95%', width:'95%', objectFit:'contain'}}></img>
                            : <>SELECTED TOKEN IMAGE</>
                            }
                        </div>

                        <div style={{position:'absolute', top:'1vh', fontSize:'2vw',color:'#f5f5f5', width:'50%', right:'10%', }}>
                        {
                                SelectedErc721Object?
                                SelectedErc721Object.metadata.name
                        :<></>
                        }

                        </div>
                        <div style={{borderRadius:'0.6vw', placeItems:'center', height:'72%',  marginTop:'8vh', width:'65%',marginLeft:'1vw',  gridTemplateColumns:'repeat(5,1fr)',gridColumnGap:'1vw',gridRowGap:'2vh',  backgroundColor:'rgba(0,0,0,0.3)', padding:'0.5vw', display:'grid',  alignItems:'center' }}>
                            
                            
                            {
                                SelectedErc721Object?
                                //map out each of the metadata fields here from DisplayErc721DepositTokenArr.metadata as a grid of 5 columns

                                SelectedErc721Object.metadata.attributes.map((item, index)=>{
                                    return(
                                        <div style={{backgroundColor:'rgba(150,0,0,0.4)', position:'relative', display:'flex', justifyContent:'center',  width:'6vw', height:'6vw', border:'1px solid rgba(150,0,0,0.6)', borderRadius:'0.5vw'}}>
                                            <div style={{position:'absolute', top:'1%', fontSize:'90%', fontWeight:'bolder', color:'rgba(255,150,150,1)', }}>
                                                {item.trait_type}
                                            </div>
                                            <div style={{position:'absolute', bottom:'20%',}}>
                                                {item.value}
                                            </div>
                                        </div>
                                    )
                                })
                            : <>METADATA</>
                            }
                        </div>

                    </div>

                    <div style={{border:'1px solid rgba(0,0,0,0.5)', overflow:'scroll', height:'50%', width:'95%', top:'1vh', backgroundColor:'rgba(0,0,0,0.3)', position:'absolute',display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <table style={{position:'absolute', top:'0vh',}} className="erc721Table">
                            <thead >
                                <tr style={{position:'sticky', top:'0vh', background:'rgba(0,0,0,0.9)'}}>
                                    <th>Selected</th>
                                    <th>Token ID</th>
                                    <th>Name</th>
                                    <th>Symbol</th>

                                </tr>
                            </thead>
                                <tbody>
                            {DisplayErc721DepositTokenArr? DisplayErc721DepositTokenArr.map((item, index)=>{
                                return(
                                        <tr key={index} onClick={()=> {console.log('selected: ',item); setSelectedErc721TokenUrl(item.metadata.image); setSelectedErc721Object(item) } }>
                                            <td><input type="checkbox"></input></td>
                                            <td>{item.token_id}</td>
                                            <td>{item.metadata.name}</td>
                                            <td>{item.symbol}</td>
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