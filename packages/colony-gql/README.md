# colony-gql

Faffing about with ColonyJS/Ethers/Web3 is a bit of effort. This project attempts to avoid all that by wrapping the annoying parts with GraphQL. Work in progress.

## Example

You can write a query such as the following:

```graphql
{
  colony(addressOrName: "burn.colony.joincolony.eth") {
    fundingPots {
      type
      associated {
        id
      }
    }
    id
    address
    ensName
    balances {
      amount
      token {
        address
        symbol
        name
        decimals
      }
    }
    domains {
      fundingPot {
        type
      }
    }
  }
}
```

And you'll get back data like:

```json
{
  "colony": {
    "fundingPots": [
      {
        "type": "DOMAIN",
        "associated": {
          "id": "1",
          "__typename": "Domain"
        },
        "__typename": "FundingPot"
      }
    ],
    "id": "42",
    "address": "0x5A49Fb12f512451819cAeB7F4bE37e89f0eb0aFd",
    "ensName": "burn.colony.joincolony.eth",
    "balances": [
      {
        "amount": "0",
        "token": {
          "address": "0x0000000000000000000000000000000000000000",
          "symbol": "ETH",
          "name": "Ether",
          "decimals": 18,
          "__typename": "Token"
        },
        "__typename": "TokenBalance"
      },
      {
        "amount": "10998000000000000000000",
        "token": {
          "address": "0xcbCDC21ff16aa40364B088803B35d3c1ae97260f",
          "symbol": "🔥🧧",
          "name": "Burner Tokens",
          "decimals": 18,
          "__typename": "Token"
        },
        "__typename": "TokenBalance"
      }
    ],
    "domains": [
      {
        "fundingPot": {
          "type": "DOMAIN",
          "__typename": "FundingPot"
        },
        "__typename": "Domain"
      }
    ],
    "__typename": "Colony"
  }
}
```

## Progress

- ⏳ Querying blockchain data - still a few things left to implement
- ⏳ Querying data derived from contract events - more to explore
- ⏳ Querying DDB data - half-hearted attempt with colony-data package
- 🔜 Mutating blockchain and DDB
- 🔜 Subscribing to DDB changes
