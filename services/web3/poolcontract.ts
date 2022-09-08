import { providers, Signer } from 'ethers';
import { injectable } from 'inversify-props';
import { IPoolContract } from '~/types/services';
import { UtilsModule } from '../utils';

@injectable()
export class PoolContract implements IPoolContract {
  async stakeAsset(
    chainId: number,
    signer: Signer,
    amountInWei: string,
    assetAddress: string
  ) {
    const tokenFarmContract = UtilsModule.getTokenFarmContract(chainId, signer);
    const stakeTransaction = await tokenFarmContract.stakeTokens(
      amountInWei,
      assetAddress
    );
    await stakeTransaction.wait();
  }

  async unstakeAsset(
    chainId: number,
    signer: Signer,
    amountInWei: string,
    assetAddress: string
  ) {
    const tokenFarmContract = UtilsModule.getTokenFarmContract(chainId, signer);
    const stakeTransaction = await tokenFarmContract.unstakeTokens(
      assetAddress
    );
    await stakeTransaction.wait();
  }

  async getStakedBalance(
    accountAddress: string,
    chainId: number,
    provider: any,
    tokenAddress?: string
  ) {
    const tokenFarmContract = UtilsModule.getTokenFarmContract(
      chainId,
      (provider as unknown) as providers.Web3Provider
    );

    if (tokenAddress) {
      return tokenFarmContract.getUserSingleTokenValue(
        accountAddress,
        tokenAddress
      );
    }

    const stakedTokenBal = await tokenFarmContract.getUserTotalValue(
      accountAddress
    );

    return stakedTokenBal;
  }
}
