 const { ethers } = require("hardhat");

async function mintAllSponsors(sponsorNFTs) {
    console.log('\nMinting all sponsor NFTs\n');
    for (const sponsor in sponsorNFTs) {
        const { contractAddress, contractFactory, cid } = sponsorNFTs[sponsor];
        await mintNFT(contractAddress, contractFactory, cid);
    }
}

async function mintNFT(contractAddress, contractFactory, cid) {
    const api = (await ethers.getContractFactory(contractFactory)).interface;
    const [signer] = await ethers.getSigners();
    const contract = new ethers.Contract(contractAddress, api, signer);

    const tx = await contract.mintNFT(signer.address, `ipfs://${cid}`);
    const receipt = await tx.wait();
    const { tokenId } = receipt.events[0].args;
    console.log(`Minted NFT ${contractAddress} #${tokenId}`);
}

async function main() {
    const octupusNFT = {
        contractAddress: '0x27043824EC0A07665A10045fC01cC40B1DDA5c05',
        contractFactory: 'OctopusNFT',
        cid: 'Qmdx6hxQMmPvK1Ct2pk62LRdeHozQZLUR73TWhbmEfxYzY'
    }

    const sponsorNFTs = {
        sponsor1: {
            contractAddress: '0xaC88d0F5a0bC9E8AaDCdd160aa504C2544e552DF',
            contractFactory: 'Sponsor1NFT',
            cid: 'QmdXVn5wNj5Qq697w2cHKZN5354a3D4cFviNi4AD1ayCce'
        },
        sponsor2: {
            contractAddress: '0xEBd6Db4FD2212e97Fec63025cac3517DCD18d8FA',
            contractFactory: 'Sponsor2NFT',
            cid: 'QmTpBgU8bLskegxWjbTJiuJGZDKkuaZ61NNFokHn6U9JKA'
        },
        sponsor3: {
            contractAddress: '0x8365Bf1cA81ce5D0B4a920f6644C4c65B2064734',
            contractFactory: 'Sponsor3NFT',
            cid: 'QmP2Qi97ZYTt9y3sYbyEjDbx7hakBpo6hhfTz1Kc294tp2'
        },
        sponsor4: {
            contractAddress: '0x069C0a130b8F2cFDe2bcE02e4ec0c9E12813eAdb',
            contractFactory: 'Sponsor4NFT',
            cid: 'QmQUenAbuHKtBCfWzrr7X83tHPXioeorhgfWeKCk8BWbRZ'
        },
        sponsor5: {
            contractAddress: '0xeCe66f08644b8EFDdc7CC8bbbf2495a726De8562',
            contractFactory: 'Sponsor5NFT',
            cid: 'Qme2pDVkbZg7Fotbix7C8b1Vs1NX8J3ZwPRqsBMf4DGd4v'
        }
    }

    const auctionNFT = {
        contractAddress: '0x7BF9935df6C51BF16F79D7Ea9462259FB8B57943',
        contractFactory: 'AuctionNFT',
        cid: 'QmUrv2EhB9Utrf1vpDsJ5QSwZQrEaEhyEXz7GxGnQ1FbWe'
    }

    const TimedNFT = {
        contractAddress: '',
        contractFactory: 'TimedNFT',
        cid: 'QmUrv2EhB9Utrf1vpDsJ5QSwZQrEaEhyEXz7GxGnQ1FbWe'
    }

    await mintNFT(octupusNFT.contractAddress, octupusNFT.contractFactory, octupusNFT.cid);

    // await mintAllSponsors();

    // const deployedAddress = '0x27043824EC0A07665A10045fC01cC40B1DDA5c05';
    // const cid = 'Qmdx6hxQMmPvK1Ct2pk62LRdeHozQZLUR73TWhbmEfxYzY';
    //
    // const api = (await ethers.getContractFactory('OctopusNFT')).interface;
    // const [signer] = await ethers.getSigners();
    // const octopusNFT = new ethers.Contract(deployedAddress, api, signer);
    //
    // const tx = await octopusNFT.mintNFT(signer.address, `ipfs://${cid}`);
    // const receipt = await tx.wait();
    // const { tokenId } = receipt.events[0].args;
    // console.log(`Minted NFT ${deployedAddress} #${tokenId}`);
    //
    // await mintAllSponsors();

    // const auctionAddress = '0x7BF9935df6C51BF16F79D7Ea9462259FB8B57943';
    // const auctionCid = 'QmUrv2EhB9Utrf1vpDsJ5QSwZQrEaEhyEXz7GxGnQ1FbWe';
    //
    // // const auctionApi = (await ethers.getContractFactory('AuctionNFT')).interface;
    // const auction = new ethers.Contract(auctionAddress, auctionApi, signer);
    //
    // const auctionTx = await auction.mintNFT(owner, `ipfs://${auctionCid}`);
    // const auctionReceipt = await auctionTx.wait();
    // const { auctionTokenId } = auctionReceipt.events[0].args;
    // console.log(`Minted NFT ${auctionAddress} #${auctionTokenId}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
      console.error(error);
      process.exit(1);
  });