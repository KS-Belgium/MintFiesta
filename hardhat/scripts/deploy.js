async function main() {
    const Sign = await ethers.getContractFactory("Sign");
    const sign = await Sign.deploy();
    await sign.deployed();
    console.log("Sign deployed to:", sign.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
