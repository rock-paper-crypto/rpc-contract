const hre = require("hardhat");

async function main() {
    const ChallengesContract = await hre.ethers.getContractFactory("ChallengesContract");
    const challengesContract = await ChallengesContract.deploy();

    await challengesContract.deployed();

    console.log("deploy to : ", challengesContract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });