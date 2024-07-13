 const { ethers } = require("hardhat");

async function main() {
    const owner = '0xD2b856bae9E46f5803658004E8b2B2972E4EA8E1'
    const deployedAddress = '0xcBec570Caab6C54fDDaCF328dcf57F82D26c7e2E';
    const cid = 'Qmdx6hxQMmPvK1Ct2pk62LRdeHozQZLUR73TWhbmEfxYzY';

    const api = (await ethers.getContractFactory('OctopusNFT')).interface;
    const [signer] = await ethers.getSigners();
    const octopusNFT = new ethers.Contract(deployedAddress, api, signer);

    const tx = await octopusNFT.mintNFT(signer.address, `ipfs://${cid}`);
    const receipt = await tx.wait();
    const { tokenId } = receipt.events[0].args;
    console.log(`Minted NFT ${deployedAddress} #${tokenId}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
      console.error(error);
      process.exit(1);
  });