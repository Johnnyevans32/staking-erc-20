import { providers, Signer } from 'ethers';
import { injectable } from 'inversify-props';
import { IERC20Contract } from '~/types/services';
import { UtilsModule } from '../utils';

@injectable()
export class ERC20Contract implements IERC20Contract {
  async approveErcTxn(
    erc20AssetAddress: string,
    signer: Signer,
    amountInWei: any,
    spenderAddress: string
  ) {
    const erc20Crt = UtilsModule.getERC20Contract(erc20AssetAddress, signer);

    const approvetxn = await erc20Crt.approve(spenderAddress, amountInWei);

    await approvetxn.wait(1);
  }

  async getErcTokenBalance(
    ercTokenAddress: string,
    account: string,
    signerOrProvider: Signer | providers.Web3Provider
  ): Promise<string> {
    try {
      const tokenContract = UtilsModule.getERC20Contract(
        ercTokenAddress,
        signerOrProvider
      );
      console.log('token cont', tokenContract, ercTokenAddress, account);

      return tokenContract.balanceOf(account);
    } catch (err) {
      console.log('errr from app', err);
      return '0';
    }
    // { BigNumber: "18190624174838529547383" }
  }
}
