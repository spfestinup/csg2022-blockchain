# Let's goooooo

### Prerequisites

- [Hyperledger Fabric Prerequisites][1]
- Hyperledger Docker Images
  - You do not need to install this when you have installed [Hyperledger Fabric Samples and Binaries][2]. The Docker images remain on the system even if you delete the `fabric-samples` folder.
  - Otherwise, you can download the Docker images only through this command:
  ```bash
  curl -sSL https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh | bash -s -- --fabric-version 2.2.5 --ca-version 1.5.2 docker
  ```
- [Node.js][3]

### Notes

-The following note applies to:
  - WSL1 users
  - WSL2 users that load files from `mnt/c/...`

    1. Navigate to the folder that these files are located.
    2. dos2unix everything: ```find . -type f -print0 | xargs -0 dos2unix```
    3. Now you can proceed below.

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

[1]: https://hyperledger-fabric.readthedocs.io/en/release-2.2/prereqs.html
[2]: https://hyperledger-fabric.readthedocs.io/en/release-2.2/install.html
[3]: https://nodejs.org/
