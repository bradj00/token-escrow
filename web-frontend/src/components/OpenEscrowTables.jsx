import React, {useEffect, useContext} from 'react'

import { generalContext } from '../App'
import Moralis, {useWeb3Contract, useWeb3ExecuteFunction, useMoralis, MoralisProvider} from "react-moralis"
import {tableFactoryContractAbi, tableFactoryContractAddress} from '../helpers/contractInfo'
import { getEllipsisTxt } from '../helpers/formatters'
import '../styles.css'



const OpenEscrowTables = () => {
  const {CreateErrorText, setCreateErrorText} = useContext(generalContext);
  const {refreshUserEscrowTables, setrefreshUserEscrowTables} = useContext(generalContext);
  const {account, isWeb3Enabled} = useMoralis(); 
  const {UserActiveTable, setUserActiveTable} = useContext(generalContext);
  const {showPage, setshowPage} = useContext(generalContext);
  
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

  function goToOpenTable(tableID){
      console.log('going to table id: ',tableID)
      setUserActiveTable(tableID);
      setshowPage('offer');
  }
  return (
    <div style={{userSelect:'none', position:'absolute', bottom:'32%', width:'100%', display:'flex', justifyContent:'center', color: '#fff', fontSize:'4vh', zIndex:'9999',}}>
        

        
        
        <div  style={{ textAlign:'center',position:'absolute',bottom:'-31vh',display:'flex', justifyContent:'center'}}>

            <div className="hiddenscroll" style={{overflowY:'scroll', borderRadius:'5px', textAlign:'left', width:'95vw',height:'25vh',}}>
                <div style={{ fontSize:'2.5vh',}}>
                    
                    <table  style={{ width:'100%'}} >
                        <tbody>
                            <tr  style={{position:'sticky', top:'0',zIndex:'10000', width:'100%', textAlign:'center', backgroundColor:'rgba(50,50,150,1)',}}>
                                <th>#</th>
                                <th>ID</th>
                                <th>Counter Party</th>
                                <th>Age</th>

                            </tr>
                            {getAllMyTables.data? getAllMyTables.data.map((item, index)=>{
                                return(
                                    <tr className="hoverOpenTable" onClick={()=>{goToOpenTable(item.OT)}}  key={index}>
                                        <td>{index+1}</td>
                                        <td>{getEllipsisTxt(item.OT.replace('0x',''), 3)}</td>
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

export default OpenEscrowTables