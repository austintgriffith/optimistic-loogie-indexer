import fs from 'fs';
import express from 'express';
import { providers, Contract, utils, BigNumber } from "ethers";
import { Buffer } from 'buffer';
import https from 'https';
import cors from 'cors';

const title = "🫡  optimistic loogie indexer"

console.log(title)

const port = 32889;//lol


const RPCURL = "https://opt-mainnet.g.alchemy.com/v2/Qdes2RwNeTWxvZRXWbhbENw8rVtPbXiE"

console.log(" 📠 connecting to ",RPCURL,"...")

const provider = new providers.JsonRpcProvider(RPCURL);

/*provider.on("block", (blockNumber) => {
    // Emitted on every block change
    console.log(" 📦 Block: " + blockNumber);
})*/

const contractAddress = "0x006eB613cc586198003a119485594ECbbDf41230"

const startBlock = 635130;


const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"chubbiness","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"color","outputs":[{"internalType":"bytes3","name":"","type":"bytes3"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"curve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"limit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintItem","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"mouthLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"recipient","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"renderTokenById","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]


let lastBlockTracked = 0;

const fileCachingForLocalDebugging = false


let tokensOfAddress = {}

let tokens = {}

const TOKENCACHING = true
const directory = './tokens';

let lastKnownBlock = 0

const DOUBLECHECKBACKWARDS = 100 //this is how many blocks we go back to double check that we didn't miss any events
const BACKOFFFROMHEAD = 5 //seems like this call takes much longer when we demand the very latest block so when we back off a could seconds it's faster idk prob not



setInterval(async () => {

    const startTime = Date.now()

    console.log("📡 polling for new optimism blocks...")


    const currentBlock = await provider.getBlockNumber()

    lastKnownBlock = currentBlock

    let startRange = Math.max(startBlock,lastBlockTracked-DOUBLECHECKBACKWARDS)
    let endRange = currentBlock-BACKOFFFROMHEAD

    //console.log("triggered",lastBlockTracked)
    console.log(" 📦 current block is ",currentBlock," 👉 getting live events start with ",startRange," and going to ",endRange)
   
    //console.log("current block", currentBlock)

    //console.log("getting live events start with lastBlockTracked-10",startRange," and going to currentBlock-10 ",endRange)
    let newEvents = await contract.queryFilter(filter, startRange, endRange);

    for (let event in newEvents) {
        //console.log("processing new event",newEvents[event])
        await processTx(newEvents[event])
    }

    lastBlockTracked = endRange

    const endTime = Date.now()

    const elapsedTime = endTime - startTime;

    console.log(`⏱ ${elapsedTime}ms to process ${newEvents.length} events`);

}, 5000);



console.log("🌎 starting webserver...")


const app = express();

let counter=0

app.use(cors());

app.get('/:address', (req, res) => {
  const address = req.params.address;
  console.log("/:address",address)
  res.json(tokensOfAddress[address.toLowerCase()]);
  counter++
});

app.get('/balance/:address', async (req, res) => {
    const address = req.params.address;
    console.log("/balance/:address",address)
    let balance = await contract.balanceOf(address)
    try{
        res.json(balance.toNumber());
    }catch(e){
        res.send("fail");
    }
    counter++
  });

app.get('/token/:id', (req, res) => {
    const id = req.params.id;
    console.log("/token/:id",id)
    res.json(tokens[id]);
    counter++
});

app.get('/', async (req, res) => {

    res.send(`<html>    
        <h1>${title}</h1>

        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#EdEdEd',padding:64}}>
            <h2>/:address</h2>
            <b>returns all tokens owned by an address</b>
            <p>example: <a href="/0x34aA3F359A9D614239015126635CE7732c18fDF3" target="_blank">/0x34aA3F359A9D614239015126635CE7732c18fDF3</a></p>
            <h2>/token/:id</h2>
            <b>returns all metadata for a token</b>
            <p>example: <a href="/token/420" target="_blank">/token/420</a></p>
        </div>

        <hr/>
        <hr/>

        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#EdEdEd',padding:64}}>
            <p>RPCURL: ${RPCURL.substring(0, 32)+"..."}</p>
            <p>contractAddress: ${contractAddress}</p>
            <p>startBlock: ${startBlock}</p>
            <p>tokens cached: ${Object.keys(tokens).length}</p>
            <p>addresses cached: ${Object.keys(tokensOfAddress).length}</p>
            <p>lastBlockTracked: ${lastBlockTracked}</p>
            <p>lastKnownBlock: <b>${lastKnownBlock}</b></p> 
            <p>page requests served:${counter}</p>
        </div>

        <a href="https://github.com/austintgriffith/optimistic-loogie-indexer">view in github</a>

    </html>`);
    counter++
});

if (fs.existsSync("server.key") && fs.existsSync("server.cert")) {
    https
        .createServer(
            {
                key: fs.readFileSync("server.key"),
                cert: fs.readFileSync("server.cert"),
            },
            app
        )
        .listen(port, () => {
            console.log("HTTPS Listening: "+port);
        });
} else {
    var server = app.listen(port, "0.0.0.0", function () {
        console.log("HTTP Listening on port:", server.address().port);
    });
}


console.log("🎛   http://localhost:"+port+"/")










console.log("⚙️ loading all optimistic loogies events...")

// Instantiate the contract instance

const contract = new Contract(contractAddress, abi, provider);


let liveFilter = {
    address: contractAddress,
    topics: [
        utils.id("Transfer(address,address,uint256)"),
    ]
}

console.log("📡 listening for transfers maybe...")
provider.on(liveFilter, (event) => {
    console.log("🛰 🛰 🛰 Transfer event: ",event);

    let tx = event

    fs.writeFileSync("./tx.json", JSON.stringify(tx))

    console.log("from",utils.defaultAbiCoder.decode(['address'],tx.topics[1]))
    console.log("to",utils.defaultAbiCoder.decode(['address'],tx.topics[2]))
    console.log("id",utils.defaultAbiCoder.decode(['uint256'],tx.topics[3]))

    let txObj = {args:[ 
        utils.defaultAbiCoder.decode(['address'],tx.topics[1])[0],
        utils.defaultAbiCoder.decode(['address'],tx.topics[2])[0],
        utils.defaultAbiCoder.decode(['uint256'],tx.topics[3])[0]
    ]}
    console.log("txObj",txObj)

    processTx(txObj)
})



const filter = contract.filters.Transfer(null, null);



const currentBlock = await provider.getBlockNumber()
console.log("current block", currentBlock)
lastKnownBlock = currentBlock;



let allEvents
if(fileCachingForLocalDebugging){
    try{
        const stringOfEvents = fs.readFileSync('cache.json', 'utf8');
        allEvents = JSON.parse(stringOfEvents)
    }catch(e){
       
    }
}

if(!allEvents){
    console.log("can't read cache querying RPC...")
    // Set up event filter to get all Transfer events
    // Get all past Transfer events
    console.log(" only getting up to currentBlock-10...",currentBlock-10)
    lastBlockTracked = currentBlock-10
    allEvents = await contract.queryFilter(filter, startBlock, lastBlockTracked);

    console.log("caching",allEvents.length," events...")
    fs.writeFileSync('./cache.json', JSON.stringify(allEvents));
}


console.log("loaded ",allEvents.length, "events")



const processTx = async (tx) => {
    let to = tx.args[1].toLowerCase()
    if(!tokensOfAddress[to]){
        tokensOfAddress[to] = []
    }
    let tokenId
    if(BigNumber.isBigNumber(tx.args[2])){
        tokenId = tx.args[2].toNumber()
    }else{
        tokenId = BigNumber.from(tx.args[2].hex).toNumber()
    }
    //console.log("tokenId", tokenId)
    if(!(await tokenExistsForAddress(to, tokenId))){
        tokensOfAddress[to].push(tokenId)
    }

    let from = tx.args[0].toLowerCase()
    removeTokenFromAddress(from, tokenId);


   // console.log("checking for tokenUri of tokenId ",tokenId)

    if (!fs.existsSync(directory)) { fs.mkdirSync(directory) }
    if(!tokens[tokenId]){
        tokens[tokenId] = await loadTokienUri(tokenId)
    }

}

const loadTokienUri = async (tokenId) => {
    if(TOKENCACHING){
        let possibleToken
        try{
            possibleToken = fs.readFileSync("./tokens/"+tokenId+".json")
            if(possibleToken){
                return JSON.parse(possibleToken)
            }
        }catch(e){
            //console.log("cache miss")
        }
    }
    console.log("📡 looking up token ",tokenId)
    const base64Encoded = await contract.tokenURI(tokenId)
    const decodedString = Buffer.from(base64Encoded.replace("data:application/json;base64,",""), 'base64').toString();
    fs.writeFileSync("./tokens/"+tokenId+".json", decodedString)
    const tokenObject = JSON.parse(decodedString)
    return tokenObject
}

const removeTokenFromAddress = async (address, tokenId) => {
    for (let tokenIndex in tokensOfAddress[address]) {
        if(tokensOfAddress[address][tokenIndex]===(tokenId)){
            tokensOfAddress[address].splice(tokenIndex, 1)
        }
    }
}

const tokenExistsForAddress = async (address, tokenId) => {
    for (let tokenIndex in tokensOfAddress[address]) {
        if(tokensOfAddress[address][tokenIndex]===(tokenId)){
            return true
        }
    }
    return false;
}

for (let event in allEvents) {
    await processTx(allEvents[event])
}










/*
console.log("0x703086058f1662f450D36DEcfeCE1fAA9B482d86 HAS ", tokensOfAddress['0x703086058f1662f450D36DEcfeCE1fAA9B482d86'])
console.log("0x90aF5fD18dD688a558a4de9c2bD859A188350D45 HAS ", tokensOfAddress['0x90aF5fD18dD688a558a4de9c2bD859A188350D45'])
console.log("0xC78A09D6a4badecc7614A339FD264B7290361ef1 HAS ", tokensOfAddress['0xC78A09D6a4badecc7614A339FD264B7290361ef1'])

console.log("ATG.eth has",tokensOfAddress['0x34aA3F359A9D614239015126635CE7732c18fDF3'].length, tokensOfAddress['0x34aA3F359A9D614239015126635CE7732c18fDF3'])


*/
