// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract offerTable {
    address party1Address;
    address party2Address;
    
    uint256 p1RequestEjectBlock = 0;
    uint256 p2RequestEjectBlock = 0;
    event party1Erc20Add (address erc20AssetAddress, uint256 erc20AssetAmount);
    event party1Erc721Add(address erc721AssetAddress, uint256 tokenId);
    
    event party2Erc20Add (address erc20AssetAddress, uint256 erc20AssetAmount);
    event party2Erc721Add(address erc721AssetAddress, uint256 tokenId);

    event party1Swap (erc721Asset[] _party1ArrayOfErc721, erc20Asset[]  _party1ArrayOfErc20);
    event party2Swap (erc721Asset[] _party2ArrayOfErc721, erc20Asset[]  _party2ArrayOfErc20);

    bool finalizedP1 = false;
    bool finalizedP2 = false;
    bool disableOfferTable = false;

    constructor (address _party1Address, address _party2Address) {
        party1Address = _party1Address;
        party2Address = _party2Address;
    }

    modifier isOfferTableOpen() {
        require(disableOfferTable == false, "Trade has already been executed and table is closed.");
        require(p1RequestEjectBlock == 0, "p1 has initiated ejection from escrow. Cannot continue");
        require(p2RequestEjectBlock == 0, "p2 has initiated ejection from escrow. Cannot continue");
        _;
    }

    modifier onlyParty1() {
        require(msg.sender == party1Address, "Only offerTable creator can call this.");
        _;
    }
    modifier onlyParty2() {
        require(msg.sender == party2Address, "Only party2 can call this.");
        _;
    }

    struct erc721Asset {
        address contractAddress;
        uint256 tokenId;
    }

  
    struct erc20Asset {
        address contractAddress;
        uint256 amount;
    }

    erc721Asset[] party1ArrayOfErc721;
    erc20Asset[]  party1ArrayOfErc20;
    
    erc721Asset[] party2ArrayOfErc721;
    erc20Asset[]  party2ArrayOfErc20;

///////////////////////////////////////
///////////////////////////////////////
    function p1EjectAllRequest() public  onlyParty1  {
        p1RequestEjectBlock = block.number;
    }
    function p1EjectAllFulfill() public  onlyParty1 {
        require(block.number >= p1RequestEjectBlock+5, "you must wait 5 blocks before eject is possible");

        //transfer all erc721 tokens out
        //transfer all erc20 tokens out
        for (uint i = 0; i < party1ArrayOfErc721.length; i++){
            IERC721 nftContract;
            nftContract = IERC721(party1ArrayOfErc721[i].contractAddress);
            nftContract.safeTransferFrom( address(this), party1Address, party1ArrayOfErc721[i].tokenId); //transfer token from contract to party1Address
            disableOfferTable=true;
        }
        for (uint i = 0; i < party1ArrayOfErc20.length; i++){
            IERC20 erc20Contract;
            erc20Contract = IERC20(party1ArrayOfErc20[i].contractAddress);              
            erc20Contract.transferFrom( address(this), party1Address, party1ArrayOfErc20[i].amount);  //transfer tokens from contract to party1Address
            disableOfferTable=true;
        }


        // party1ArrayOfErc721 = [];
        // party1ArrayOfErc20  = [];
    }


    function p2EjectAllRequest() public  onlyParty2  {
        p2RequestEjectBlock = block.number;
    }
    function p2EjectAllFulfill() public  onlyParty2  {
        require(block.number >= p2RequestEjectBlock+5, "you must wait 5 blocks before eject is possible");

        //transfer all erc721 tokens out
        //transfer all erc20 tokens out
        for (uint i = 0; i < party2ArrayOfErc721.length; i++){
            IERC721 nftContract;
            nftContract = IERC721(party2ArrayOfErc721[i].contractAddress);
            nftContract.safeTransferFrom( address(this), party2Address, party2ArrayOfErc721[i].tokenId); //transfer token from contract to party2Address
            disableOfferTable=true;
        }
        for (uint i = 0; i < party2ArrayOfErc20.length; i++){
            IERC20 erc20Contract;
            erc20Contract = IERC20(party2ArrayOfErc20[i].contractAddress);              
            erc20Contract.transferFrom( address(this), party2Address, party2ArrayOfErc20[i].amount);  //transfer tokens from contract to party2Address
            disableOfferTable=true;
        }


        // party2ArrayOfErc721 = [];
        // party2ArrayOfErc20  = [];
    }
///////////////////////////////////////
///////////////////////////////////////

    function getparty1Offer()public view returns(erc721Asset[] memory, erc20Asset[] memory){
        //returns full list of ERC721 and ERC20 tokens p1 offered for escrow
        return(party1ArrayOfErc721, party1ArrayOfErc20);
    }

    function getparty2Offer()public view returns(erc721Asset[] memory, erc20Asset[] memory){
        //returns full list of ERC721 and ERC20 tokens p2 offered for escrow
        return(party2ArrayOfErc721, party2ArrayOfErc20);
    }

///////////////////////////////////
///////////////////////////////////
    function party1AddErc20AssetAddress(address erc20AssetAddress, uint256 erc20AssetAmount)  onlyParty1 isOfferTableOpen public {
       //web-frontend has already detected asset and sent an Approval spend before calling this
        
        IERC20 erc20Contract;
        erc20Contract = IERC20(erc20AssetAddress);              
        erc20Contract.transferFrom(msg.sender, address(this), erc20AssetAmount);  //transfer token into contract
        
        erc20Asset memory temp;
        temp.contractAddress = erc20AssetAddress; 
        temp.amount          = erc20AssetAmount; 

        party1ArrayOfErc20.push(temp);

        emit party1Erc20Add(erc20AssetAddress, erc20AssetAmount);
    }
    function party1AddErc721AssetAddress(address erc721AssetAddress, uint256 tokenId) onlyParty1 isOfferTableOpen public {
        //web-frontend has already detected asset and called setApprovalForAll(msg.sender, true) directly from its contract

        IERC721 nftContract;
        nftContract = IERC721(erc721AssetAddress);
        nftContract.safeTransferFrom(msg.sender, address(this), tokenId); //transfer token into contract


        erc721Asset memory temp;
        temp.contractAddress = erc721AssetAddress; 
        temp.tokenId         = tokenId; 

        party1ArrayOfErc721.push(temp);                     //register this token in p1 Offer Inventory
        emit party1Erc721Add(erc721AssetAddress, tokenId);
    }

    function party2AddErc20AssetAddress(address erc20AssetAddress, uint256 erc20AssetAmount)  onlyParty2 isOfferTableOpen public {
       //web-frontend has already detected asset and sent an Approval spend before calling this
        
        IERC20 erc20Contract;
        erc20Contract = IERC20(erc20AssetAddress);              
        erc20Contract.transferFrom(msg.sender, address(this), erc20AssetAmount);  //transfer token into contract
        
        erc20Asset memory temp;
        temp.contractAddress = erc20AssetAddress; 
        temp.amount          = erc20AssetAmount; 

        party2ArrayOfErc20.push(temp);
        emit party2Erc20Add(erc20AssetAddress, erc20AssetAmount);
    }
    function party2AddErc721AssetAddress(address erc721AssetAddress, uint256 tokenId) onlyParty2 isOfferTableOpen public {
        //web-frontend has already detected asset and called setApprovalForAll(msg.sender, true) directly from its contract

        IERC721 nftContract;
        nftContract = IERC721(erc721AssetAddress);
        nftContract.safeTransferFrom(msg.sender, address(this), tokenId); //transfer token into contract

        erc721Asset memory temp;
        temp.contractAddress = erc721AssetAddress; 
        temp.tokenId         = tokenId; 
        party2ArrayOfErc721.push(temp);                         //register this token in p1 Offer Inventory
        emit party2Erc721Add(erc721AssetAddress, tokenId);
    }


    function finalizeOfferParty1() onlyParty1 isOfferTableOpen public {
        finalizedP1 = true;
        if (finalizedP2 == true){
            //we have the other signature. Transfer all tokens to their counter parties
            executeSwap();
        }
    }
    function finalizeOfferParty2() onlyParty2 isOfferTableOpen public {
        finalizedP2 = true;
        if (finalizedP1 == true){
            //we have the other signature. Transfer all tokens to their counter parties
            executeSwap();
        } 
    }

    function executeSwap() public isOfferTableOpen{
        require(finalizedP1 == true, "p1 must call finalizeOfferParty1()");
        require(finalizedP2 == true, "p2 must call finalizeOfferParty2()");


        for (uint i = 0; i < party1ArrayOfErc721.length; i++){
            IERC721 nftContract;
            nftContract = IERC721(party1ArrayOfErc721[i].contractAddress);
            nftContract.safeTransferFrom( address(this), party2Address, party1ArrayOfErc721[i].tokenId); //transfer token from contract to party2Address
        }
        for (uint i = 0; i < party1ArrayOfErc20.length; i++){
            IERC20 erc20Contract;
            erc20Contract = IERC20(party1ArrayOfErc20[i].contractAddress);              
            erc20Contract.transferFrom( address(this), party2Address, party1ArrayOfErc20[i].amount);  //transfer tokens from contract to party2Address
        }

        for (uint i = 0; i < party2ArrayOfErc721.length; i++){
            IERC721 nftContract;
            nftContract = IERC721(party2ArrayOfErc721[i].contractAddress);
            nftContract.safeTransferFrom( address(this), party1Address, party2ArrayOfErc721[i].tokenId); //transfer token from contract to party2Address
        }
        for (uint i = 0; i < party2ArrayOfErc20.length; i++){
            IERC20 erc20Contract;
            erc20Contract = IERC20(party2ArrayOfErc20[i].contractAddress);              
            erc20Contract.transferFrom( address(this), party1Address, party2ArrayOfErc20[i].amount);  //transfer tokens from contract to party1Address
        }

        emit party1Swap(party1ArrayOfErc721, party1ArrayOfErc20);
        emit party2Swap(party2ArrayOfErc721, party2ArrayOfErc20);

        disableOfferTable = true;

    }


}