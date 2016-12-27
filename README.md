I use following testrpc command to generate three accounts with one of them pre-allocated with (many) ether:

  testrpc --account="0x2730882e11b0d5a44bd748e3bae3f07d0cc2634c5cc7804c74f4ca0a952ecf82,1000000000000000000000000000000000" --account="0xcc575e9e49f1d9fbc3bf7b19270c9d9d8fe3b61123819d347e5c3bd86c5082e2,0" --account="0xd9b6939ace994513fb1ce77b0c58d6d969d6b102decc575f50544f2a833da54d,0"

then I do: 

truffle migrate --reset
truffle build
truffle serve

and then interact with the app via browser at http://127.0.0.1:8080


Jason (infwonder)
