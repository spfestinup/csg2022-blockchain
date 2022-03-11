# Let's goooooo

## Troubleshooting

### Go not found

If running `sudo ./startFabric.sh` fails due to `go` command not found, try running

```bash
sudo env "PATH=$PATH" ./startFabric.sh
```

### Chaincode invoke fails to run due to endorsement issues

Please see [#2](../../pull/2).
