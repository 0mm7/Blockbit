export interface IAdminInfo {
  total_wallets_created: number,
  total_wallets_sol_balance: number,
  total_wallets_active_in_the_past_24h: number,
  total_platform_volume_in_the_past_24h: number,
  avg_user_daily_trades: number,
  avg_user_auto_buy_amount: number,
  total_platform_fees: number,
  platform_fees_in_the_past_24h: number,
  avg_user_volume: number,
}

export const defaultAdminInfo: IAdminInfo = {
  total_wallets_created: 0,
  total_wallets_sol_balance: 0,
  total_wallets_active_in_the_past_24h: 0,
  total_platform_volume_in_the_past_24h: 0,
  avg_user_daily_trades: 0,
  avg_user_auto_buy_amount: 0,
  total_platform_fees: 0,
  platform_fees_in_the_past_24h: 0,
  avg_user_volume: 0,
};
