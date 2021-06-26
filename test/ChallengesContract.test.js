const { expect } = require("chai");
const hre = require("hardhat");

describe("ChallengesContract", () => {
    let ChallengesContract;
    let challengesContract;
    let owner, signer1, signer2, signer3, signer4;

    beforeEach(async function() {
        [owner, signer1, signer2, signer3, signer4] = await hre.ethers.getSigners();
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
    it("should list the remaining challenges after matched the 1st challenge", async () => {
        await challengesContract.connect(signer1).addChallenge(100, 1);
        await challengesContract.connect(signer2).addChallenge(200, 2);
        await challengesContract.connect(signer3).addChallenge(200, 2);
        const listBefore = await challengesContract.listChallengers();

        await challengesContract.matchChallenge(listBefore[0].blockNumber, 1);
        const listAfter = await challengesContract.listChallengers();

        expect(listAfter.length).to.equal(2);
        expect(listAfter[0].blockNumber).to.equal(listBefore[2].blockNumber);
        expect(listAfter[1].blockNumber).to.equal(listBefore[1].blockNumber);
    })
    it("should list the remaining challenges after matched the 3rd challenge", async () => {
        await challengesContract.connect(signer1).addChallenge(100, 1);
        await challengesContract.connect(signer2).addChallenge(200, 2);
        await challengesContract.connect(signer3).addChallenge(200, 2);
        const listBefore = await challengesContract.listChallengers();

        await challengesContract.matchChallenge(listBefore[2].blockNumber, 1);
        const listAfter = await challengesContract.listChallengers();

        expect(listAfter.length).to.equal(2);
        expect(listAfter[0].blockNumber).to.equal(listBefore[0].blockNumber);
        expect(listAfter[1].blockNumber).to.equal(listBefore[1].blockNumber);
    })
    it("should list the remaining challenges after match nothing", async () => {
        await challengesContract.connect(signer1).addChallenge(100, 1);
        await challengesContract.connect(signer2).addChallenge(200, 2);
        await challengesContract.connect(signer3).addChallenge(200, 2);
        const listBefore = await challengesContract.listChallengers();

        await challengesContract.matchChallenge(100, 1);
        const listAfter = await challengesContract.listChallengers();

        expect(listAfter.length).to.equal(3);
        expect(listAfter[0].blockNumber).to.equal(listBefore[0].blockNumber);
        expect(listAfter[1].blockNumber).to.equal(listBefore[1].blockNumber);
        expect(listAfter[2].blockNumber).to.equal(listBefore[2].blockNumber);
    })
})
