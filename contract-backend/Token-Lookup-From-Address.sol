// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";



contract TokenLookup {

    function lookupArrayOfErc20 (address[] memory tokenList) public view returns (string[] memory){

        // P1andP2AndTableId[] memory tablesWithInfo = new P1andP2AndTableId[]( TablesByOwner[msg.sender].length );
        string[] memory resolvedList = new string[] (tokenList.length);

        for (uint256 i = 0; i < tokenList.length; i++){
    
            ERC20 erc20Contract = ERC20(address(tokenList[i]));
            resolvedList[i] = erc20Contract.symbol();

        }
        return resolvedList;
    }



}