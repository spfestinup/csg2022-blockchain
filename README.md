# Let's goooooo
## Steps to run TracePH
### Navigate to folder needed

```bash
cd TracePH-ContactTracing
```

or

```bash
cd TracePH-QueryTracing
```

### Start the Fabric Test Network
```bash
cd drugman
./startFabric.sh
```

### Start the API server
```bash
cd javascript
npm install
node enrollAdmin.js
node registerUser.js
node apiserver.js
```
Keep this terminal open.

### Start React app
Do this in another terminal.

Navigate back to folder needed.

```bash
cd drugman/javascript/client
npm install
npm start
```

## Stopping TracePH
Close all terminals.

Navigate to folder needed.

```bash
cd drugman
./networkDown.sh
```

## Merging branches

To make use of available branches, create a local branch from `main` and merge all needed branches to the branch.

## Troubleshooting

### Go not found

#### Recommended Solution

Please see [#3](../../pull/3) (Also see [how to merge a branch](#merging-branches)).

#### Other solutions

If running `sudo ./startFabric.sh` fails due to `go` command not found, try running

```bash
sudo env "PATH=$PATH" ./startFabric.sh
```

### Chaincode invoke fails to run due to endorsement issues

#### Recommended Solution

Please see [#3](../../pull/3) (Also see [how to merge a branch](#merging-branches)).

#### Other solutions

Please see [#2](../../pull/2).
