import collectionsData from "./constants/collections.js"

class NftService {
  constructor(blockchainId = "ethereumSepolia") {
    this.blockchainId = blockchainId;
  }

  _getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  _getNftPrice() {
    return Math.trunc(this._getRandomArbitrary(100, 9999));
  }

  _setBlockchainId(blockchainId) {
    this.blockchainId = blockchainId;
  }

  /**
   * an example to an NFT checkout with the following mint function:
   * safemint(toAddress address, tokenId uint256) payable public
   * The abi should be taken from the compiled NFT contract
   * The params should be populated in the customMintParams object
   * There are two parameters that are getting populated from the frontend: toAddress and tokenURI
   **/
  getById(id) {
    return {
      nftId: id,
      priceInCents: this._getNftPrice(),
      tokenUri: "https://tweed-demo.web.app/tweedNft.png",
      fiatCurrencyId: "USD",
      contractAddress: collectionsData[this.blockchainId].contractAddress,
      chain: this.blockchainId,
      title: "NFT_TITLE",
      description: "NFT_DESCRIPTION",
      abi: "mint(toAddress address, tokenUri string)", //you have the option to use function signature of ABI or the longer version below
      customMintParams: {
        tokenId: id,
      },
    };
  }

  mintNFT(id) {
    console.log("doing the mint function on contract: ", process.env.REACT_APP_CONTRACT_ADDRESS);
    console.log("sending NFT to :", id.ethereumSepolia);
    console.log(" id is :", id.ethereumSepolia);

    return {
      nftId: "1",
      priceInCents: 0,
      tokenUri: "https://bafybeibgj7bhl2b7rsjfiazq6tyzucpdyw4kl2rmbitro2wmsiu5seljdy.ipfs.nftstorage.link/1.png",
      fiatCurrencyId: "USD",
      contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
      chain: "ethereumSepolia",
      title: "Lo Frayerim",
      description: "Join The Club!",
      abi: "mintNFT( toAddress address )", //I will probebly need to add the toAddress due to the way it works with Tweed and the claim contract
      customMintParams: {
        toAddress: toString(id.ethereumSepolia),
      },
    };
  }
}

export default new NftService();
