import React, {useContext, useState} from 'react'
import WarningIcon from '@mui/icons-material/Warning';
import { generalContext } from '../App';
import { useEffect } from 'react';
import {useNFTBalances, useMoralis} from 'react-moralis';



const Erc721DepositScreen = () => {
    const {account} = useMoralis();

    const {displayErc721DepositPage, setdisplayErc721DepositPage} = useContext(generalContext);
    const {clickedFinalize, setclickedFinalize} = useContext(generalContext);
    const [UserUniqueContractArr, setUserUniqueContractArr]             = useState();


    const getAllUserNfts = useNFTBalances({
        params:{
            chain:'mumbai',
            address: account ? account : ''
        }
    });

    useEffect(()=>{
        if (getAllUserNfts.data){
            console.log('getAllUserNfts.data: \t\t', getAllUserNfts.data);
        if (getAllUserNfts.data.result){
        if (getAllUserNfts.data.result.length >  0){
            console.log('\t\t\t-------------- got all NFTs owned by account [ '+account+' ]', getAllUserNfts.data.result);
            let tempArr = [];
            for (let i = 0; i < getAllUserNfts.data.result.length; i++){
                console.log(getAllUserNfts.data.result[i]);
                tempArr.push({address: getAllUserNfts.data.result[i].token_address, name: getAllUserNfts.data.result[i].name, symbol: getAllUserNfts.data.result[i].symbol, });
            }
            const uniqueArr = tempArr.filter((value, index) => {
                const _value = JSON.stringify(value);
                return index === tempArr.findIndex(obj => {
                    return JSON.stringify(obj) === _value;
                });
            });

            setUserUniqueContractArr(uniqueArr);
            console.log('unique contracts: ',uniqueArr);
        }
        }
        }
    },[getAllUserNfts.data]);




    useEffect(()=>{
        console.log('displayErc721DepositPage is: ',displayErc721DepositPage);
    },[displayErc721DepositPage]);

    return (
        <div className={displayErc721DepositPage?"confirmationBox":"hiddenConfirmationbox"} style={{borderRadius:'5px',  border:'1px solid rgba(153, 21, 121, 1)', zIndex:'10000', display:'flex', justifyContent:'center', alignItems:'center', position:'absolute',width:'85vw', height:'60vh', backgroundColor:'rgba(23, 21, 121, 1)'}}>
            <div onClick={()=>{setdisplayErc721DepositPage(false)}} className="finalizeButtonWithHover" style={{ padding:'1.5vh', paddingLeft:'3vh', paddingRight:'3vh', position:'absolute', top:'1%',right:'1%',}}>
                X
            </div>
            
            <div style={{position:'absolute',top:'2vh',fontWeight:'bolder',width:'70%',height:'6vh',borderRadius:'25px',border:'1px solid #0066ff'}}>
                <input placeholder="Paste address or select from list below" style={{position:'absolute',width:'98%',height:'5vh',left:'0vw',textAlign:'center', top:'0.5vh',fontSize:'3vh',color:'#fff',backgroundColor:'rgba(0,0,0,0)',border:'rgba(0,0,0,0)', outline:'none'}}></input>
            </div>

            <div style={{userSelect:'none',  textAlign:'center', color:'#fff', position:'absolute',bottom:'1vh', width:'95%', height:'75%', backgroundColor:'rgba(0,0,0,0.2)',borderRadius:'5px',padding:'1vw'}}>
                <table class="erc721Table">
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
                                <tr>
                                    <td>{item.address}</td>
                                    <td>{item.name}</td>
                                    <td>{item.symbol}</td>
                                </tr>
                        )
                    })
                    :<></>}
                    </tbody>
                </table>
            
            </div>


            {/* <div className="finalizeButtonWithHover" style={{fontSize:'4vh', display:'flex', justifyContent:'center', alignItems:'center', position:'absolute',bottom:'3vh', width:'40%', height:'10%'}}>
                Confirm
            </div> */}


        </div>
    )
}

export default Erc721DepositScreen