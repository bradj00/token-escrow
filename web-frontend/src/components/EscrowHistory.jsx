import React, {useEffect, useContext} from 'react'
import QRCode from 'react-qr-code'
import { generalContext } from '../App'
import Moralis, {useWeb3Contract, useWeb3ExecuteFunction, useMoralis, MoralisProvider} from "react-moralis"
import {tableFactoryContractAbi, tableFactoryContractAddress} from '../helpers/contractInfo'
import { getEllipsisTxt } from '../helpers/formatters'
import '../styles.css'
//CHANGE THE NAME OF THIS COMPONENT TO MATCH QR CODE. WE UPDATED THIS COMPONENTS USE CASE...
const EscrowHistory = () => {
  const {CreateErrorText, setCreateErrorText} = useContext(generalContext);
  const {refreshUserEscrowTables, setrefreshUserEscrowTables} = useContext(generalContext);
  const {account, isWeb3Enabled} = useMoralis(); 


  const getAllMyTables = useWeb3ExecuteFunction  ({
    abi: tableFactoryContractAbi,
    contractAddress: tableFactoryContractAddress,
    functionName: "getMyTables",
  });

  useEffect(()=>{
      if (isWeb3Enabled){
          getAllMyTables.fetch({
              onError: (error) =>{
                  alert('web3 error fetching user tables: ');
                  alert(error);
                }
            })
        }
    },[isWeb3Enabled])
    
    
    
  useEffect(()=>{
    if (refreshUserEscrowTables == true){
        console.log('refreshing user tables...')
        getAllMyTables.fetch({
            onError: (error) =>{
                alert('web3 error fetching user tables: ');
                alert(error);
              }
          })
    }
  },[refreshUserEscrowTables])

  useEffect(()=>{
    if (getAllMyTables.data){
        console.log('all my tables: ',getAllMyTables.data);
    }
  },[getAllMyTables.data]);


  return (
    <div style={{userSelect:'none', position:'absolute', bottom:'32%', width:'100%', display:'flex', justifyContent:'center', color: '#fff', fontSize:'4vh', zIndex:'9999',}}>
        
        <div style={{fontSize:'2vh',position:'fixed', top:'43vh',zIndex:'9999', border:'2px solid #00ff00'}}>
            <QRCode value={account? account: "something went wrong!"} /> 
        </div>
        
        
        <div  style={{ textAlign:'center',position:'absolute',bottom:'-31vh',display:'flex', justifyContent:'center'}}>

            <div className="hiddenscroll" style={{overflowY:'scroll', borderRadius:'5px', textAlign:'left', width:'95vw',height:'25vh',}}>
                <div style={{ fontSize:'2.5vh',}}>
                    
                    <table  style={{ width:'100%'}} >
                        <tbody>
                            <tr  style={{position:'sticky', top:'0',zIndex:'10000', width:'100%', textAlign:'center', backgroundColor:'rgba(50,50,150,1)',}}>
                                <th>#</th>
                                <th>ID</th>
                                <th>Counter Party</th>

                            </tr>
                            {getAllMyTables.data? getAllMyTables.data.map((item, index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{getEllipsisTxt(item.OT.replace('0x',''), 5)}</td>
                                        <td>{getEllipsisTxt(item.CP,5)}</td>
                                    </tr>
                                )
                            }):<></>}
                            
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
  ) 
}

export default EscrowHistory