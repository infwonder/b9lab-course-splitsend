pragma solidity ^0.4.4;

contract SplitSend {
    address owner;
    bool locked;

    function SplitSend() payable {
        owner = msg.sender;
    }

    modifier OwnerOnly() {
      if (msg.sender != owner) throw;
      _;
    }

    modifier NoReentrancy() {
      if (locked) throw;
      locked = true;
      _;
      locked = false;
    }

    function sendWei(address toWhom1, address toWhom2) payable OwnerOnly NoReentrancy returns (bool) {
        uint256 sendAmount;
        sendAmount = msg.value;

        if ( sendAmount > 0 && sendAmount % 2 == 0 ) {
            return toWhom1.send(sendAmount / 2) && toWhom2.send(sendAmount / 2);
        } else {
            return false;
        }
    }

    function killMe() OwnerOnly {
      selfdestruct(owner);
    }

    // fallback function 
    function () payable {}
} 
