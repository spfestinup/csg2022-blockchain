# Let's goooooo

### Notes for Windows

1. Use WSL to run this shit
2. dos2unix everything: ```find . -type f -print0 | xargs -0 dos2unix```
3. now you can proceed below

# Quick Start

```bash
cd TracePH-ContactTracing      # or TracePH-QueryTracing
cd drugman

# start fabric test network
./startFabric.sh      # if using Hyperledger Explorer, use "./startFabric.sh explorer"

# start API server
cd javascript
node apiserver.js

# start react client (use another terminal session)
cd client
npm install
npm start



# bring down fabric test network (including Hyperledger Explorer)
./networkDown.sh      # located in drugman folder
```

## Ports used

- 3000 - React client app
- 8080 - API server
- 8081 - Hyperledger Explorer


## Hyperledger Explorer credentials

- **ID:** exploreradmin
- **Password:** exploreradminpw
