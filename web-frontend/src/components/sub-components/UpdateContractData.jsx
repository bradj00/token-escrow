//generic component to refresh blockchain context data used throughout the whole dapp
import React from 'react'
import { generalContext } from '../../App';
import { useWeb3Contract,useMoralis,useWeb3ExecuteFunction, } from 'react-moralis';

const UpdateContractData = () => {

    const {isTableDisabled, setisTableDisabled} = useContext(generalContext);


    return (
    <div>
        
    </div>
    )
}

export default UpdateContractData