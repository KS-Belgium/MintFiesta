// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract AuctionNFT is ERC721URIStorage, Ownable {
    bool public isMinted;
    constructor(address initialOwner)
    ERC721("AuctionNFT", "ACT")
    Ownable(initialOwner)
    {
        isMinted = false;
    }


    function mintNFT(address recipient, string memory tokenURI) public onlyOwner {
        require(!isMinted, "NFT has already been minted.");

        uint256 tokenId = 0;
        isMinted = true;

        _mint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
}
