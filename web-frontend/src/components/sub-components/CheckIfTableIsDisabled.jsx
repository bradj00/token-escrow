import React, {useContext} from 'react'
import { useEffect } from 'react';
import { generalContext } from '../../App';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import { tableContractAbi } from '../../helpers/contractInfo';


const CheckIfTableIsDisabled = () => {
    const {Moralis, enableWeb3, web3, isWeb3Enabled, authenticate, isAuthenticated, account, user, logout} = useMoralis();
    const {UserActiveTable, setUserActiveTable} = useContext(generalContext);
    const {isTableDisabled, setisTableDisabled} = useContext(generalContext);

    const checkIfTableDisabled = useWeb3ExecuteFunction  ({
        abi: tableContractAbi,
        contractAddress: UserActiveTable? UserActiveTable.tableId: "0x0000000000000000000000000000000000000000",
        functionName: "disableOfferTable",

      });

    useEffect(()=>{
        if (!checkIfTableDisabled.isLoading && checkIfTableDisabled.data != null){
            // console.log('table disabled: ',checkIfTableDisabled.data)
            setisTableDisabled(checkIfTableDisabled.data);
        }
    },[checkIfTableDisabled]);

    useEffect(()=>{
        if (isWeb3Enabled){
            checkIfTableDisabled.fetch({
                onError: (error) =>{
                    console.log('error getting table-disabled state: ',error);
                }
            })
        }
    },[isWeb3Enabled])

    return (
        <></>
    )
}

export default CheckIfTableIsDisabled