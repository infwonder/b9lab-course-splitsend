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

function sendCoin() {
  var ss = SplitSend.deployed();

  var amount = parseInt(document.getElementById("amount").value);
  var amountWei = web3._extend.utils.toWei(amount, 'ether');

  setStatus("Initiating transaction... (please wait)");


  ss.getWei(accounts[1], accounts[2], amountWei, {from: accounts[0], to: ss_addr, value: amountWei}).then(function() {
    setStatus("Transaction complete!");
    refreshBalance(ss_addr);
    refreshBalance(accounts[0]);
    refreshBalance(accounts[1]);
    refreshBalance(accounts[2]);
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
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
