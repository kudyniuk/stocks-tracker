import { createModal } from "../modal-service"

export const { openEditStockModal } = createModal<'editStock', { ticker: string }>({
    id: 'editStock',
    options: {
        notCloseOnClickOutside: true
    },
    component: ({ ticker }) => <div>Edit {ticker}</div>
})