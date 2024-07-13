// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Sponsor2NFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;
    constructor(address initialOwner)
    ERC721("Sponsor2NFT", "SPS")
    Ownable(initialOwner)
    {
        tokenCounter = 0;
    }


    function mintNFT(address recipient, string memory tokenURI) public onlyOwner {
        uint256 tokenId = tokenCounter;
        tokenCounter = tokenCounter + 1;
        _mint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
}
