import { createModal } from "../modal-service"

export const { openEditStockModal } = createModal<'editStock', { ticker: string }>({
    id: 'editStock',
    component: ({ ticker }) => <div>Edit {ticker}</div>
})