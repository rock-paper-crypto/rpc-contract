// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract ChallengesContract {
    enum ChallengeChoice {
        Rock, Paper, Scissor
    }

    struct Challenge {
        uint blockNumber;
        address listerAddress;
        uint amount;
        ChallengeChoice choice;
    }

    Challenge[] challenges;

    constructor() {
    }

    function listChallengers() public view returns (Challenge[] memory) {
        return challenges;
    }

    function addChallenge(uint amount, ChallengeChoice choice) public {
        Challenge memory c = Challenge({blockNumber: block.number, listerAddress: msg.sender, amount: amount, choice: choice});
        challenges.push(c);
    }

    function matchChallenge(uint blockNumber, ChallengeChoice choice) public {
        uint length = challenges.length;
        for (uint256 index = 0; index < length; index++) {
            if (challenges[index].blockNumber == blockNumber) {
                //TODO: Pay to winner

                challenges[index] = challenges[length-1];
                challenges.pop();
                return;
            }
        }
    }
}
