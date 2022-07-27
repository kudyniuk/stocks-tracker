const modals = new Map<string, React.FC<any>>()

export const registerModal = (modalId: string, component: React.FC<any>) => {
    modals.set(modalId, component)
}

export const getModal = (modalId: string): React.FC<any> => {
    return modals.get(modalId)!
}