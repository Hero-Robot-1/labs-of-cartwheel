import React, { useEffect } from 'react';
import Web3 from 'web3';

const EthereumTransaction = () => {
  useEffect(() => {
    const network = process.env.REACT_APP_ETHEREUM_NETWORK;
    const infuraApiKey = process.env.REACT_APP_INFURA_API;
    const signerPrivateKey = process.env.REACT_APP_SIGNER_PRIVATE_KEY;
  

    const web3 = new Web3(
      new Web3.providers.HttpProvider(`https://${network}.infura.io/v3/${infuraApiKey}`)
    );

    const sendTransaction = async () => {
      console.log('try to send TX PK: ',signerPrivateKey, network , infuraApiKey );
      try {
        const signer = web3.eth.accounts.privateKeyToAccount(signerPrivateKey);
        web3.eth.accounts.wallet.add(signer);

        const limit = await web3.eth.estimateGas({
          from: signer.address,
          to: '0x506E1453A0243b5410110bA26DfC11a454676888',
          value: web3.utils.toWei('0.0001', 'ether'),
        });

        const tx = {
          from: signer.address,
          to: '0x506E1453A0243b5410110bA26DfC11a454676888',
          value: web3.utils.toWei('0.0002', 'ether'),
          gas: limit,
          nonce: await web3.eth.getTransactionCount(signer.address),
          maxPriorityFeePerGas: web3.utils.toWei('6', 'gwei'),
          maxFeePerGas: web3.utils.toWei('6', 'gwei'),
          chainId: 11155111,
          type: '0x2',
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, signer.privateKey);
        console.log('Raw transaction data: ' + signedTx.rawTransaction);

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log(`Mined in block ${receipt.blockNumber}`);
      } catch (error) {
        console.error('Transaction error:', error);
      }
    };
    sendTransaction();
  }, []);

  return <div>Ethereum Transaction Component</div>;
};

export default EthereumTransaction;
