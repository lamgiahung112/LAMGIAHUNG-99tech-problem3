import usePriority from "./usePriority"

function useBalanceFormatter() {
	const priority = usePriority()
	const format = useCallback((balances: WalletBalance[]) => {
		return balances
			.filter((bln) => {
				const prio = priority.get(bln.currency)
				return bln.amount >= 0 && prio > -99
			})
			.sort((lhs, rhs) => lhs.amount - rhs.amount)
			.map<FormattedWalletBalance>((bln) => ({
				...bln,
				formatted: bln.amount.toFixed(),
			}))
	}, [])

	return { format }
}

export default useBalanceFormatter
