const { expect } = require("chai");
const hre = require("hardhat");

describe("ChallengesContract", () => {
    let ChallengesContract;
    let challengesContract;
    let owner, signer1, signer2;

    beforeEach(async function() {
        [owner, signer1, signer2] = await hre.ethers.getSigners();
        ChallengesContract = await hre.ethers.getContractFactory("ChallengesContract");
        challengesContract = await ChallengesContract.deploy();

        await challengesContract.deployed();
    })
    it("should list the added challenge", async () => {
        await challengesContract.connect(owner).addChallenge(100, 1);

        const list = await challengesContract.listChallengers();

        expect(list[0].listerAddress).to.equal(owner.address);
        expect(list[0].amount.toString()).to.equal("100");
        expect(list[0].choice).to.equal(1);
    })
    it("should list the 2 added challenges", async () => {
        await challengesContract.connect(signer1).addChallenge(100, 1);
        await challengesContract.connect(signer2).addChallenge(200, 2);
        
        const list = await challengesContract.listChallengers();

        expect(list[0].listerAddress).to.equal(signer1.address);
        expect(list[0].amount.toString()).to.equal("100");
        expect(list[0].choice).to.equal(1);
        expect(list[1].listerAddress).to.equal(signer2.address);
        expect(list[1].amount.toString()).to.equal("200");
        expect(list[1].choice).to.equal(2);
    })
})
