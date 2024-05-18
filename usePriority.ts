const priorityMap = {
	Osmosis: 100,
	Ethereum: 50,
	Arbitrum: 30,
	Zilliqa: 20,
	Neo: 20,
} as const

function usePriority() {
	const get = useCallBack((token: BlockchainToken | string) => {
		const result = priorityMap[token]
		if (result === undefined) {
			return -99
		}
		return result
	}, [])
	return { get }
}

export default usePriority
