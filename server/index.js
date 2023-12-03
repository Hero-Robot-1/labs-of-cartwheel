import express from 'express';
import bodyParser from 'body-parser';
import cors  from 'cors';
import { routes } from './routes/transactions.routes.js';
import { db } from './models/index.js'
import tweedService from './tweed.service.js';
import authService from "./auth.service.js";
import nftService from './nft.service.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.use(express.json());
/// tweed part 

const tweedClient = await tweedService.initialize();

  app.post("/blockchain-id", (req, res) => {
    const { blockchainId } = req.body;
    nftService._setBlockchainId(blockchainId);
  });


  app.post("/mintNFT", (req, res) => {
    // const { blockchainId } = req.body;
    const NFT = nftService.mintNFT();
    console.log("result NFT ", NFT);
    res.send(NFT);
  });

  let users = []; // Keep users in memory (for demo purposes)

  app.get("/user", async (req, res) => {
    const authUser = authService.getAuthUser();
    console.log("fetching user data: " , authUser);
    res.send(authUser);
  });


  app.post("/user", async (req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    const updatedUser = authService.updateUser({ id, email });
    res.send(updatedUser);
  });

  app.post("/message", async (req, res) => {
    const authenticatedUser = authService.getAuthUser();
    const answer = await tweedClient.handleMessageFromFrontend(
      req.body.message,
      authenticatedUser.id,
      authenticatedUser.email
    );
    res.send({ answer });
  });

  //// tweed part end 

db.sequelize.sync({ force: true } )
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.use(routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


