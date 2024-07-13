const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    // Check the balance of the deployer account
    const balance = await deployer.getBalance();
    console.log(`Deployer balance: ${ethers.utils.formatEther(balance)} ETH`);

    if (balance.lt(ethers.utils.parseEther("0.1"))) { // Example threshold
        throw new Error("Deployer does not have enough funds");
    }

    // Estimate gas costs for deploying the OctopusNFT contract
    const octopusContractFactory = await ethers.getContractFactory('OctopusNFT');
    const gasEstimate = await octopusContractFactory.signer.estimateGas(octopusContractFactory.getDeployTransaction(deployer.address));
    console.log(`Estimated gas cost: ${ethers.utils.formatUnits(gasEstimate, "gwei")} Gwei`);

    // Deploy Octopus NFT collection
    const octopusNft = await octopusContractFactory.deploy(deployer.address);
    await octopusNft.deployed();
    console.log(`Octopus NFT deployed to: ${octopusNft.address}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
});