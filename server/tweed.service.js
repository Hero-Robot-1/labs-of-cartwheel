import { TweedBackendSDK } from "@paytweed/backend-sdk";
import nftService from "./nft.service.js";

class TweedService {
  async initialize() {
    this._client = await TweedBackendSDK.setup({
      apiKey: "2nkLzCDtBjEs4UwuLg2DGXAodeSOcI38",
      apiSecret: "Hbtc1iW8yGSFL1rKPJh6fO63o_egECofSkF0_vkoPTBkRP6SIgN4uwuj69WlVm2M",
      defaultBlockchainIds: ["ethereumGoerli"],
      callbacks: {
        // getNftPurchaseData: async ({ nftId }) => nftService.getById(nftId),
        getNftPurchaseData: async ({ nftId }) => nftService.mintNFT(nftId),
      },
    });
    return this._client;
  }
}

export default new TweedService();