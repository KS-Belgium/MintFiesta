const { ethers } = require("hardhat");

async function deployTimedNFTContract(deployer) {
    const timedContractFactory = await ethers.getContractFactory('TimedNFT');
    const timedNft = await timedContractFactory.deploy(deployer.address);
    await timedNft.deployed();
    console.log(
        `Timed NFT deployed to: ${timedNft.address}\nCopy this address and paste to the 'mint' task in 'hardhat.config.js'`,
    );

}

async function main() {
    const [deployer] = await ethers.getSigners();

    await deployTimedNFTContract(deployer);

    // Deploy Octopus NFT collection
    const octopusContractFactory = await ethers.getContractFactory('OctopusNFT');
    const octopusNft = await octopusContractFactory.deploy(deployer.address);
    await octopusNft.deployed();
    console.log(
        `Octopus NFT deployed to: ${octopusNft.address}\nCopy this address and paste to the 'mint' task in 'hardhat.config.js'`,
    );

    // Deploy All Sponsors NFT collection
    const sponsorNFTNames = ['Sponsor1NFT', 'Sponsor2NFT', 'Sponsor3NFT', 'Sponsor4NFT', 'Sponsor5NFT'];
    const deployers = (await ethers.getSigners())[0];

    for (const name of sponsorNFTNames) {
        const contractFactory = await ethers.getContractFactory(name);
        const contract = await contractFactory.deploy(deployers.address);
        await contract.deployed();
        console.log(
            `${name} deployed to: ${contract.address}\nCopy this address and paste to the 'mint' task in 'hardhat.config.js'`
        );
    }

    // Deploy Auction contract
    const auctionContractFactory = await ethers.getContractFactory('AuctionNFT');
    const auctionNft = await auctionContractFactory.deploy(deployer.address);
    await auctionNft.deployed();
    console.log(
        `Auction deployed to: ${auctionNft.address}\nCopy this address and paste to the 'mint' task in 'hardhat.config.js'`,
    );
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
