# **Anti-patterns & Inefficiencies**

### 1 - Declaring types in component file
```Typescript
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}
```
*Suggestions:* 

1. Put the type in a declaration file (*.d.ts)
2. WalletBalance and FormattedWalletBalance has the same `currency` and `amount` attributes. Hence, we can use Union type

### 2 - Declaring a non-related utility function inside a component & use of any type
```Typescript
const getPriority = (blockchain: any): number => {
		switch (blockchain) {
			case "Osmosis":
				return 100
			case "Ethereum":
				return 50
			case "Arbitrum":
				return 30
			case "Zilliqa":
				return 20
			case "Neo":
				return 20
			default:
				return -99
		}
	}
```
*Suggestions:*
1. Put the getPriority function in a seperate file
2. Create a type of `BlockchainToken` as a union type for the token names
3. Use the aforementioned `BlockchainToken` type instead of any for the parameter of the getPriority function

### 3 - Use of undefined, unused variables. Wrong filter logic, wrong sorting logic

```Typescript
const sortedBalances = useMemo(() => {
		return balances
			.filter((balance: WalletBalance) => {
				const balancePriority = getPriority(balance.blockchain)
				if (lhsPriority > -99) {
					if (balance.amount <= 0) {
						return true
					}
				}
				return false
			})
			.sort((lhs: WalletBalance, rhs: WalletBalance) => {
				const leftPriority = getPriority(lhs.blockchain)
				const rightPriority = getPriority(rhs.blockchain)
				if (leftPriority > rightPriority) {
					return -1
				} else if (rightPriority > leftPriority) {
					return 1
				}
			})
	}, [balances, prices])
```
*Suggestions:*
1. There is no `blockchain` property in the type `WalletBalance`. We should change it to `currency`.
2. In the filter callback, use the variable `balancePriority` for the condition `> -99` instead of `lhsPriority` (which in this case is undefined).
3. The if block in the filter callback aims to take the balances that are amongst the tokens defined in getPriority and is positive. Therefore, we must change the condition `<= 0` to `>0`. Furthermore, we can group the if statements to avoid nesting
4. In the sort callback, the conditions for determining order of 2 given elements are wrong. If `leftPriority` is larger than `rightPriority`, the callback should return `1` to place `leftPriority` before `rightPriority`.

### 4 - Use of wrong variable for formatting
```Typescript
const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
	return {
		...balance,
		formatted: balance.amount.toFixed(),
	}
})
const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
	const usdValue = prices[balance.currency] * balance.amount
	return (
		<WalletRow
			className={classes.row}
			key={index}
			amount={balance.amount}
			usdValue={usdValue}
			formattedAmount={balance.formatted}
		/>
	)
})
```
*Suggestions:*
1. Rows should have used formattedBalances instead
2. We should not use index as the key for a list of components rendered with `Array.map()` for they will completely rerender when we change the sort, instead we just want to change the order of components
3. Notice that the `sortedBalances` is not used for anything else but for `formattedBalance`. We can merge them into 1 variable instead of 2.