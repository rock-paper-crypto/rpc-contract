const { expect } = require("chai");
const hre = require("hardhat");

describe("ChallengesContract", () => {
    let ChallengesContract;
    let challengesContract;
    let signer;
    beforeEach(async function() {
        [signer] = await hre.ethers.getSigners();
        ChallengesContract = await hre.ethers.getContractFactory("ChallengesContract");
        challengesContract = await ChallengesContract.deploy();

        await challengesContract.deployed();
    })
    it("should return challenges", async () => {
        const list = await challengesContract.listChallengers()
        expect(list[0].listerAddress).to.equal(signer.address);
        expect(list[0].amount.toString()).to.equal("100");
        expect(list[0].rockPaperScissor).to.equal(1);
    })
})
