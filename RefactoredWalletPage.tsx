const RefactoredWalletPage: React.FC<BoxProps> = (props) => {
	const balances = useWalletBalances()
	const prices = usePrices()
	const balanceFormatter = useBalanceFormatter()

	const formattedBalances = useMemo(() => {
		return balanceFormatter.format(balances)
	}, [balances])

	return (
		<div {...props}>
			{formattedBalances.map((balance) => {
				const usdValue = prices[balance.currency] * balance.amount
				return (
					<WalletRow
						key={balance}
						formattedBalance={balance}
						usdValue={usdValue}
					/>
				)
			})}
		</div>
	)
}
