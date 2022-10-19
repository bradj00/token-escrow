// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./offerTable.sol";

contract offerTableFactory {
    mapping(address => offerTable[]) public TablesByOwner;
    
    offerTable[] private _tables;

    //input address, return getParties() from table contract
    function getTableInfo(address _tableAddress) public view returns(address, address, address)
    {
        offerTable temp = offerTable( _tableAddress );
        return (temp.getParties());
    }


    function createTable(address _counterParty) public 
    {
        offerTable table = new offerTable(
            msg.sender,
            _counterParty
        );

        _tables.push(table);

        TablesByOwner[msg.sender].push(table);


        if (_counterParty != msg.sender){
            TablesByOwner[_counterParty].push(table);
        }

    }

    struct P1andP2AndTableId {
        address P1;
        address P2;
        address tableId;
    }

    function getMyTables() public view returns (P1andP2AndTableId[] memory){


        P1andP2AndTableId[] memory tablesWithInfo = new P1andP2AndTableId[]( TablesByOwner[msg.sender].length );
        for (uint256 i = 0; i < TablesByOwner[msg.sender].length; i++){
            address addy = address(TablesByOwner[msg.sender][i]);

            (address p1, address p2, address tableId) = getTableInfo( addy );
            
            tablesWithInfo[i] = P1andP2AndTableId( p1, p2, tableId );

        }
        return( tablesWithInfo );
    }
    
    function allTables() public view returns (offerTable[] memory){
        return _tables;
    }





} 