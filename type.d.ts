declare type BlockchainToken = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo"

declare type WalletBalance = {
	currency: BlockchainToken
	amount: number
}
declare type FormattedWalletBalance = WalletBalance & {
	formatted: string
}
