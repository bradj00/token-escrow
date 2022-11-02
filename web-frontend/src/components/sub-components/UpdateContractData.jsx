//generic component to refresh blockchain context data used throughout the whole dapp
import React from 'react'
import { generalContext } from '../../App';
import { useWeb3Contract,useMoralis,useWeb3ExecuteFunction, } from 'react-moralis';
import { useEffect, useContext } from 'react';




const UpdateContractData = () => {
    const {userErc20TokenBalance, setuserErc20TokenBalance} = useContext(generalContext);
    const {allUserErc721s, setallUserErc721s} = useContext(generalContext);
    useEffect(()=>{
        console.log('getting token balances (erc20 / erc721)')
        getUserErc20Balances();
        getUserErc721Balances();
    },[])
    const {isTableDisabled, setisTableDisabled} = useContext(generalContext);


    function getUserErc20Balances() {
    
    
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'x-api-key': 'T7pqHUU2RfiIe9i7Ppo0WNC3trCzDRs6bWAMhraTZSJBU1KqiJoLpHKejgUrNQJD',
                'accept': 'application/json'
            },
            
        };
        fetch('https://deep-index.moralis.io/api/v2/0x7ab8a8dC4A602fAe3342697a762be22BB2e46d4d/erc20?chain=mumbai', requestOptions)
        .then((response) => response.json())
        .then(data => {
            console.log('erc20 data: ',data) 
            setuserErc20TokenBalance(data)
        });
        
    }
    function getUserErc721Balances() {
    
    
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'x-api-key': 'T7pqHUU2RfiIe9i7Ppo0WNC3trCzDRs6bWAMhraTZSJBU1KqiJoLpHKejgUrNQJD',
                'accept': 'application/json'
            },
            
        };
        fetch('https://deep-index.moralis.io/api/v2/0x7ab8a8dC4A602fAe3342697a762be22BB2e46d4d/nft?chain=mumbai&format=decimal', requestOptions)
        .then((response) => response.json())
        .then(data => {
            console.log('erc721 data: ',data.result) 
            setallUserErc721s(data.result)
        });
        
    }



    return (
    <div>
        
    </div>
    )
}

export default UpdateContractData