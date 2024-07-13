const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(1000);

    console.log("Token address:", myToken.address);

    const octopusContractFactory = await ethers.getContractFactory('OctopusNFT');
    const octopusNft = await octopusContractFactory.deploy(deployer.address);
    await octopusNft.deployed();
    console.log(
        `Meow NFT deployed to: ${octopusNft.address}\nCopy this address and paste to the 'mint' task in 'hardhat.config.js'`,
    );
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
