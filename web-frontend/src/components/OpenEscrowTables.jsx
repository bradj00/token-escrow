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
                  console.log('web3 error fetching user tables: ',error);
                }
            })
        }
    },[isWeb3Enabled])
    
  useEffect(()=>{
    setInterval(()=>{
        console.log('refreshing table list')
        setrefreshUserEscrowTables(true);
    },15000)
  },[])
    

    
  useEffect(()=>{
    if (refreshUserEscrowTables == true && isWeb3Enabled){
        console.log('refreshing user tables...')
        getAllMyTables.fetch({
            onError: (error) =>{
                console.log('web3 error fetching user tables: ');
                console.log(error);
            }
          })
    }
  },[refreshUserEscrowTables, isWeb3Enabled])

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

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };



  return (
    <div style={{userSelect:'none', position:'absolute', bottom:'32%', width:'100%', display:'flex', justifyContent:'center', color: '#fff', fontSize:'4vh', zIndex:'9999',}}>
        
        <div style={{fontSize:'1vh', position:'absolute', right:'10vw', top:'2vh',transform:'scale(1.7)'}}>
        <label >
            <input
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            
            />
            Show finalized
        </label>
        </div>
        
        
        <div  style={{ textAlign:'center',position:'absolute',bottom:'-31vh',display:'flex', justifyContent:'center'}}>

            <div className="hiddenscroll" style={{overflowY:'scroll', borderRadius:'5px', textAlign:'left', width:'95vw',height:'25vh',}}>
                <div style={{ fontSize:'2.5vh',}}>
                    
                    <table  style={{ width:'100%'}} >
                        <tbody>
                            <tr  style={{position:'sticky', top:'0',zIndex:'10000', width:'100%', textAlign:'center', backgroundColor:'rgba(50,50,150,1)',}}>
                                <th>ID</th>
                                <th>Counter Party</th>
                                <th>Age</th>
                                <th>Status</th>

                            </tr>
                            {getAllMyTables.data?getAllMyTables.data.length>=1? getAllMyTables.data.map((item, index)=>{
                                // console.log('---',item);
                                return(
                                    <tr className="hoverOpenTable" onClick={()=>{goToOpenTable(item)}}  key={index}>
                                        <td>{getEllipsisTxt(item.tableId.replace('0x',''), 5)}</td>
                                        {account.toUpperCase() == item.P2.toUpperCase()? <td>{getEllipsisTxt(item.P1,5)}</td>: <td>{getEllipsisTxt(item.P2,5)}</td> }
                                    </tr>
                                )
                            }):<></>:<></>}
                            
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
  ) 
}

export default OpenEscrowTables