// SPDX-library-Identifier: MIT

pragma solidity ^0.8.0;



contract ChallengesContract {
    struct Challenge {
        address listerAddress;
        uint amount;
        uint8 rockPaperScissor;
    }

    Challenge[] challenges;

    constructor() {
        Challenge memory c = Challenge({listerAddress: msg.sender, amount: 100, rockPaperScissor: 1});
        challenges.push(c);
    }

    function listChallengers() public view returns (Challenge[] memory) {
        return challenges;
    }
}