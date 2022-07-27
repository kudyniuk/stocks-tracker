import { FC } from "react"
import { useAppSelector } from "../../store/hooks"

type Props = {
    id: string
}
export const TransactionForm: FC<Props> = ({id}) => {
    const stock = useAppSelector(state => state.stocks.find(stock => stock.id === id))

    return <div>{JSON.stringify(stock)}</div>
}