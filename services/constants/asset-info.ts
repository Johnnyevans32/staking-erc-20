import { ContractSetup } from '~/types/web3';
import { Asset } from '~/types/web3';

export const FARM_CONTRACT: { [chainId: number]: ContractSetup } = {
  1: {
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    interface: []
  },
  42: {
    address: '0xb859fd3C1C1c70AB67588F1cBE7633E7817564Fe',
    interface: [
      {
        inputs: [
          {
            internalType: 'address',
            name: '_degTokenAddress',
            type: 'address'
          }
        ],
        stateMutability: 'nonpayable',
        type: 'constructor'
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address'
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address'
          }
        ],
        name: 'OwnershipTransferred',
        type: 'event'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_token',
            type: 'address'
          }
        ],
        name: 'addAllowedTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        name: 'allowedTokens',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        name: 'degToken',
        outputs: [
          {
            internalType: 'contract IERC20',
            name: '',
            type: 'address'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_token',
            type: 'address'
          }
        ],
        name: 'getTokenValue',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_user',
            type: 'address'
          },
          {
            internalType: 'address',
            name: '_token',
            type: 'address'
          }
        ],
        name: 'getUserSingleTokenValue',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_user',
            type: 'address'
          }
        ],
        name: 'getUserTotalValue',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        name: 'issueTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_token',
            type: 'address'
          },
          {
            internalType: 'address',
            name: '_priceFeed',
            type: 'address'
          }
        ],
        name: 'setPriceFeedContract',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: '_token',
            type: 'address'
          }
        ],
        name: 'stakeTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        name: 'stakers',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address'
          },
          {
            internalType: 'address',
            name: '',
            type: 'address'
          }
        ],
        name: 'stakingBalance',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_token',
            type: 'address'
          }
        ],
        name: 'tokenIsAllowed',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool'
          }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address'
          }
        ],
        name: 'tokenPriceFeedMapping',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newOwner',
            type: 'address'
          }
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address'
          }
        ],
        name: 'uniqueTokensStaked',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_token',
            type: 'address'
          }
        ],
        name: 'unstakeTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ]
  },
  3: {
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    interface: []
  },
  4: {
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    interface: []
  }
};

export const DEGTOKEN_CONTRACT: { [chainId: number]: ContractSetup } = {
  1: {
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    interface: []
  },
  42: {
    address: '0xd07017A63e47D8923926eAD00eB0f722660FB4d8',
    interface: []
  },
  3: {
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    interface: []
  },
  4: {
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    interface: []
  }
};

export const FAU_CONTRACT: { [chainId: number]: ContractSetup } = {
  1: {
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    interface: []
  },
  42: {
    address: '0xFab46E002BbF0b4509813474841E0716E6730136',
    interface: []
  },
  3: {
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    interface: []
  },
  4: {
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    interface: []
  }
};

export const WETH_CONTRACT: { [chainId: number]: ContractSetup } = {
  1: {
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    interface: []
  },
  42: {
    address: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
    interface: []
  },
  3: {
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    interface: []
  },
  4: {
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    interface: []
  }
};

export const ASSETS: Array<Asset> = [
  {
    id: 1,
    name: 'Wrapped ethereum',
    symbol: 'WETH',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=017',
    website: 'https://ethereum.org',
    pool: 20,
    assetAddressKey: 'wethTokenAddress'
  },
  {
    id: 2,
    name: 'Dai',
    symbol: 'DAI',
    logo:
      'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg?v=017',
    website: 'dai.com',
    pool: 20,
    assetAddressKey: 'fauTokenAddress'
  },
  {
    id: 3,
    name: 'Demigod token',
    symbol: 'DEG',
    logo:
      'https://cryptologos.cc/logos/raiden-network-token-rdn-logo.svg?v=017',
    website: 'evanseburu32@gmail.com',
    pool: 20,
    assetAddressKey: 'degTokenAddress'
  }
];

export const ERC20: { abi: any } = {
  abi: [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'spender',
          type: 'address'
        }
      ],
      name: 'allowance',
      outputs: [
        {
          internalType: 'uint256',
          name: 'remaining',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'spender',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'approve',
      outputs: [
        {
          internalType: 'bool',
          name: 'success',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address'
        }
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: 'balance',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'decimals',
      outputs: [
        {
          internalType: 'uint8',
          name: 'decimalPlaces',
          type: 'uint8'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'spender',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'addedValue',
          type: 'uint256'
        }
      ],
      name: 'decreaseApproval',
      outputs: [
        {
          internalType: 'bool',
          name: 'success',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'spender',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'subtractedValue',
          type: 'uint256'
        }
      ],
      name: 'increaseApproval',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'name',
      outputs: [
        {
          internalType: 'string',
          name: 'tokenName',
          type: 'string'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          internalType: 'string',
          name: 'tokenSymbol',
          type: 'string'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'totalSupply',
      outputs: [
        {
          internalType: 'uint256',
          name: 'totalTokensIssued',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'to',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'transfer',
      outputs: [
        {
          internalType: 'bool',
          name: 'success',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address'
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'transferFrom',
      outputs: [
        {
          internalType: 'bool',
          name: 'success',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ]
};
