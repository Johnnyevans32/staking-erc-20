export interface IUserLendingAccountData {
  totalCollateralETH: number;
  totalDebtETH: number;
  availableBorrowsETH: number;
  currentLiquidationThreshold: number;
  ltv: number;
  healthFactory: number;
}
