var accounts;
var idmaps;
var ss_addr;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance(account) {
  web3.eth.getBalance(account, function(err, value) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    var ether = web3._extend.utils.fromWei(value, 'ether');
    var id = idmaps[account];
    var balance_element = document.getElementById(id);
    balance_element.innerHTML = ether;
  });
};

function addCoin() {
  var amount = parseInt(document.getElementById("amount").value);
  var amountWei = web3._extend.utils.toWei(amount, 'ether');

  setStatus("Initiating transaction... (please wait)");

  web3.eth.sendTransaction({from: accounts[0], to: ss_addr, value: amountWei}, function(err, txhash) {
      if (err != null) {
        console.log(err);
        setStatus("Error sending coin; see log.");
      }

      web3.eth.getTransactionReceipt(txhash, function(err, data) {
        if (err != null) {
          console.log(err);
          setStatus("Error sending coin; see log.");
        }

        setStatus("Transaction complete!");
        refreshBalance(ss_addr);
        refreshBalance(accounts[0]);
        refreshBalance(accounts[1]);
        refreshBalance(accounts[2]);
      });
  });
};

function flushCoin() {
  var ss = SplitSend.deployed();
  web3.eth.getBalance(ss_addr, function(err, value) {

    if (err != null) {
      console.log(err);
      setStatus("Error sending coin; see log.");
    } else if (value == 0) {
      setStatus("Nothing to be sent ...");
      return;
    }

    setStatus("Initiating transaction... (please wait)");

    ss.sendWei(accounts[1], accounts[2], {from: accounts[0]}).then(function() {
      setStatus("Transaction complete!");
      refreshBalance(ss_addr);
      refreshBalance(accounts[0]);
      refreshBalance(accounts[1]);
      refreshBalance(accounts[2]);
    }).catch(function(e) {
      console.log(e);
      setStatus("Error sending coin; see log.");
    });
  });
};

window.onload = function () {
    web3.eth.getAccounts(function(err, accs) {
        if (err != null) {
          alert("There was an error fetching your accounts.");
          return;
        }

        if (accs.length == 0) {
          alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
          return;
        }

        ss_addr = SplitSend.deployed().address;
        accounts = accs;
        idmaps = { [ss_addr]: 'contract', [accounts[0]]: 'balance', [accounts[1]]: 'guest1', [accounts[2]]: 'guest2' };

        document.getElementById("idmap0").innerHTML = ss_addr;
        document.getElementById("idmap1").innerHTML = accounts[0];
        document.getElementById("idmap2").innerHTML = accounts[1];
        document.getElementById("idmap3").innerHTML = accounts[2];

        refreshBalance(ss_addr);
        refreshBalance(accounts[0]);
        refreshBalance(accounts[1]);
        refreshBalance(accounts[2]);
    });
}
