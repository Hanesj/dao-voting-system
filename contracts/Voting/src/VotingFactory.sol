// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Voting} from "./Voting.sol";

contract VotingFactory {
    Voting[] private polls;

    event pollCreated(address pollAddress, string title, address createdBy);

    mapping(string => bool) pollExists;

    function createPoll(string memory title) public returns (address) {
        require(!pollExists[title]);
        Voting v = new Voting(title, msg.sender);
        polls.push(v);
        pollExists[title] = true;
        emit pollCreated(address(v), title, msg.sender);
        return address(v);
    }

    function getNumOfPolls() public view returns (uint256) {
        return polls.length;
    }

    function getPollAddress(uint256 index) public view returns (Voting) {
        require(index < polls.length);
        return polls[index];
    }
}
