pragma solidity ^0.4.4;

contract SplitSend {
    address owner;

    function SplitSend() payable {
        owner = msg.sender;
    }

    function sendWei(address toWhom1, address toWhom2) payable returns (bool) {
        uint256 sendAmount;
        sendAmount = address(this).balance;

        if (sendAmount > 0) {
            return toWhom1.send(sendAmount / 2) && toWhom2.send(sendAmount / 2);
        }
    }

    function killMe() {
        if (msg.sender == owner) {
            suicide(owner);
        }
    }

    function () payable {}
} 
