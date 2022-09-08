import { Contract, ethers, providers, Signer } from 'ethers';
import web3 from 'web3';
import { ERC20, FARM_CONTRACT } from '~/services/constants/asset-info';
import { ResponseResult } from '~/types';
import { ITokenCrt } from '~/types/chain';
import { SUPPORTEDNETWORKS } from './constants';

// import store from '~/store';

const POLLING_INTERVAL = 12000;
const RPC_URL =
  process.env.VUE_APP_RPC_URL ||
  `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`;

export class UtilsModule {
  static intChainId = {
    '0x1': 1,
    '0x3': 3,
    '0x4': 4,
    '0x2a': 42
  };

  getAxiosErrorResponse(err: any): ResponseResult<any> {
    // err.response is set for axios errors
    if (err.response && err.response.data) {
      return err.response.data;
    }

    return { message: err.message, data: undefined };
  }
  static openNotification(
    $vs: {
      notification: Function;
    },
    color: string,
    text: string,
    position = null
  ): Function {
    return $vs.notification({
      square: true,
      icon:
        color === 'success'
          ? `<i class='bx bx-select-multiple`
          : `<i class='bx bx-error' ></i>`,
      color: '#000000',
      border: color,
      position,
      title: '',
      text
    });
  }

  static getLibrary(): providers.Web3Provider {
    console.log('getting library');
    const httpProvider = new web3.providers.HttpProvider(RPC_URL);
    const web3NoAccount = new ethers.providers.Web3Provider(
      httpProvider as any
    );
    web3NoAccount.pollingInterval = POLLING_INTERVAL;
    console.log('this is the httpprovider', web3NoAccount);
    return web3NoAccount;
  }

  static simpleRpcProvider = () =>
    new ethers.providers.JsonRpcProvider(RPC_URL);

  static getNetworkName(chainId: number | string): string {
    switch (chainId) {
      case 1:
        return 'mainnet';
      case 3:
        return 'ropsten';
      case 4:
        return 'rinkeby';
      case 42:
        return 'kovan';
      case undefined:
      case null:
        return 'No Chain!';
      // if you give your ganache an id your can detect it here if you want
      default:
        return 'Unknown';
    }
  }

  static getTokenFarmContract(
    chainId: number,
    signerOrProvider: Signer | providers.Web3Provider
  ): ITokenCrt {
    const tokenFarmContract = new Contract(
      FARM_CONTRACT[chainId].address,
      FARM_CONTRACT[chainId].interface,
      signerOrProvider
    ) as ITokenCrt;

    return tokenFarmContract;
  }

  static getERC20Contract(
    tokenAddress: string,
    signerOrProvider: Signer | providers.Web3Provider
  ): any {
    // You can also use an ENS name for the contract address

    // The ERC-20 Contract ABI, which is a common contract interface
    // for tokens (this is the Human-Readable ABI format

    // The Contract object
    const erc20Contract = new Contract(
      tokenAddress,
      ERC20.abi,
      signerOrProvider
    );

    return erc20Contract;
  }

  static getRevertedReason(err: any): string {
    console.log({ err });
    const code = err.data?.replace('Reverted ', '') || null;
    if (!code) {
      return err?.message || 'something went wrong, please try again';
    }
    console.log({ err });
    let reason = ethers.utils.toUtf8String('0x' + code.substr(138));
    return reason;
  }

  static parseEtherValue(value: number): string {
    return ethers.utils.parseEther(value.toString()).toString();
  }

  static formatToEtherValue(value: number): string {
    return ethers.utils.formatEther(value.toString());
  }

  static nFormatter(num: number, digits: number | undefined) {
    var si = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i: number;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
  }

  static promiseTimeout(ms: number, promise: any) {
    // Create a promise that rejects in <ms> milliseconds
    let timeout = new Promise((resolve, reject) => {
      let id = setTimeout(() => {
        clearTimeout(id);
        reject('Timed out in ' + ms + 'ms.');
      }, ms);
    });

    // Returns a race between our timeout and the passed in promise
    return Promise.race([promise, timeout]);
  }

  static getAxiosErrorResponse(err: any): ResponseResult<any> {
    // err.response is set for axios errors
    if (err.response && err.response.data) {
      return err.response.data;
    }

    return { message: err.message, data: undefined };
  }

  async sleep(ms: number | undefined) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
