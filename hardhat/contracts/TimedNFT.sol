// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract TimedNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;
    uint256 public deployTime;
    uint256 constant ONE_DAY = 32 hours;
    constructor(address initialOwner)
    ERC721("TimedNFT", "TFT")
    Ownable(initialOwner)
    {
        tokenCounter = 0;
        deployTime = block.timestamp;
    }

    modifier onlyWithin24Hours() {
        require(block.timestamp <= deployTime + ONE_DAY, "Minting period has expired");
        _;
    }

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner onlyWithin24Hours  {
        uint256 tokenId = tokenCounter;
        tokenCounter = tokenCounter + 1;
        _mint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function getCurrentTimeLeft() public view returns (uint256) {
        return deployTime + ONE_DAY - block.timestamp;
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner onlyWithin24Hours  {
        _safeMint(to, tokenId);
    }
}
