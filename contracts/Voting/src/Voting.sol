// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Voting {
    string private title;
    address private owner;

    enum VotingState {
        NotStarted,
        Ongoing,
        Ended
    }

    VotingState private state;

    struct VoteOption {
        string option;
        uint16 voteCount;
        address suggester;
    }

    VoteOption[] private options;
    mapping(address => bool) hasVoted;
    mapping(address => bool) hasAddedOption;
    mapping(string => bool) optionExists;

    event optionAdded(string, string);
    event votingStarted(string);
    event votingEnded(string);
    event newVote(string, uint256);

    constructor(string memory pollTitle, address createdBy) {
        title = pollTitle;
        owner = createdBy;
        state = VotingState.NotStarted;
    }

    function addOptionToPoll(string memory addOption) public {
        require(state == VotingState.NotStarted, "Cannot add option after voting has started.");
        require(keccak256(bytes(addOption)) != keccak256(bytes("")), "Optionname cannot be empty.");
        require(!optionExists[addOption], "Option already exists.");

        if (!hasAddedOption[msg.sender]) {
            options.push(VoteOption({option: addOption, suggester: msg.sender, voteCount: 0}));
            hasAddedOption[msg.sender] = true;
            optionExists[addOption] = true;
        } else {
            revert("Can only add one option per user.");
        }
    }

    function getNumOfOptions() public view returns (uint256) {
        return options.length;
    }

    function getOption(uint256 index) public view returns (VoteOption memory) {
        require(index < options.length);
        return options[index];
    }

    function voteOnOption(uint256 index) public {
        require(state == VotingState.Ongoing, "Voting is not ongoing.");
        require(index < options.length);
        require(!hasVoted[msg.sender], "Can only vote once.");
        VoteOption storage option = options[index];
        option.voteCount += 1;
        hasVoted[msg.sender] = true;
        emit newVote(title, option.voteCount);
    }

    function startVoting() public {
        require(msg.sender == owner, "Only owner can start the poll.");
        require(state != VotingState.Ongoing, "Poll already active");
        require(options.length > 0, "There are no options yet.");
        state = VotingState.Ongoing;
        emit votingStarted(title);
    }

    function endVoting() public {
        require(msg.sender == owner, "Only owner can stop the poll");
        require(state == VotingState.Ongoing, "Voting is not active");
        state = VotingState.Ended;
        emit votingEnded(title);
    }

    function getState() public view returns (string memory) {
        if (state == VotingState.Ended) {
            return "Voting has ended.";
        } else if (state == VotingState.NotStarted) {
            return "Voting has not begun.";
        } else {
            return "Voting is ongoing.";
        }
    }

    function getTitle() public view returns (string memory) {
        return title;
    }
}
