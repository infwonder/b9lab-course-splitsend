pragma solidity ^0.4.4;

contract SplitSend {
    address owner;
    bool    good;

    function SplitSend(address recipient) payable {
        owner = msg.sender;
        good = owner.send(2000000000000000000);
    }

    function getBalance() returns (uint) {
         return address(this).balance;
    }

    function getWei(address toWhom1, address toWhom2, uint256 sendAmount) payable returns (bool) {
        return toWhom1.send(sendAmount / 2) && toWhom2.send(sendAmount / 2);
    }

    function killMe() {
        if (msg.sender == owner) {
            suicide(owner);
        }
    }

    function () payable {}
} 
