// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./offerTable.sol";

contract offerTableFactory {
    mapping(address => offerTable[]) public TablesByOwner;
    
    offerTable[] private _tables;


    function createTable(address _counterParty) public 
    {
        offerTable table = new offerTable(
            _counterParty
        );

        _tables.push(table);
        TablesByOwner[msg.sender].push(table);

    }

    function getMyTables() public view returns (offerTable[] memory){
        return TablesByOwner[msg.sender];
    }
    
    function allTables() public view returns (offerTable[] memory){
        return _tables;
    }





} 