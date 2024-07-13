 const { ethers } = require("hardhat");

async function mintAllSponsors() {
    console.log('\nMinting all sponsor NFTs\n');
    const sponsorNFTNames = ['Sponsor1NFT', 'Sponsor2NFT', 'Sponsor3NFT', 'Sponsor4NFT', 'Sponsor5NFT'];

    const deployedAddress = [
        '0xaC88d0F5a0bC9E8AaDCdd160aa504C2544e552DF',
        '0xEBd6Db4FD2212e97Fec63025cac3517DCD18d8FA',
        '0x8365Bf1cA81ce5D0B4a920f6644C4c65B2064734',
        '0x069C0a130b8F2cFDe2bcE02e4ec0c9E12813eAdb',
        '0xeCe66f08644b8EFDdc7CC8bbbf2495a726De8562'
    ];
    const cids = [
        'QmdXVn5wNj5Qq697w2cHKZN5354a3D4cFviNi4AD1ayCce',
        'QmTpBgU8bLskegxWjbTJiuJGZDKkuaZ61NNFokHn6U9JKA',
        'QmP2Qi97ZYTt9y3sYbyEjDbx7hakBpo6hhfTz1Kc294tp2',
        'QmQUenAbuHKtBCfWzrr7X83tHPXioeorhgfWeKCk8BWbRZ',
        'Qme2pDVkbZg7Fotbix7C8b1Vs1NX8J3ZwPRqsBMf4DGd4v'
    ];

    for (let i = 0; i < sponsorNFTNames.length; i++) {
        let api = (await ethers.getContractFactory(sponsorNFTNames[i])).interface;
        let [signer] = await ethers.getSigners();
        let contract = new ethers.Contract(deployedAddress[i], api, signer);

        let tx = await contract.mintNFT(signer.address, `ipfs://${cids[i]}`);
        let receipt = await tx.wait();
        let {tokenId} = receipt.events[0].args;
        console.log(`Minted NFT ${deployedAddress[i]} #${tokenId}`);
    }
}

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

    await mintAllSponsors();

    const auctionAddress = '0x020EEa5A5fCc97114F6cA060b0C38A3E8cEa85F1';
    const auctionCid = 'QmUrv2EhB9Utrf1vpDsJ5QSwZQrEaEhyEXz7GxGnQ1FbWe';

    const auctionApi = (await ethers.getContractFactory('AuctionNFT')).interface;
    const auction = new ethers.Contract(auctionAddress, auctionApi, signer);

    const auctionTx = await auction.mintNFT(owner, `ipfs://${auctionCid}`);
    const auctionReceipt = await auctionTx.wait();
    const { auctionTokenId } = auctionReceipt.events[0].args;
    console.log(`Minted NFT ${auctionAddress} #${auctionTokenId}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
      console.error(error);
      process.exit(1);
  });