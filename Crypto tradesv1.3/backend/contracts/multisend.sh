#!/bin/bash

export WEB3_RPC_URL=https://rinkeby.infura.io/v3/64fa77a39b9a4c31b186fb2148edff70
export WEB3_PRIVATE_KEY=a8f617ed9d45404af91bdacaf901fb9bb60669f6c57bc969597301277725faf3

web3 contract build MultiSend.sol
web3 contract deploy MultiSend.bin
