import { purchaseMineral, resetTransientState } from "./TransientState.js"

const handlePurchaseSubmission = async (clickEvent) => {
    if (clickEvent.target.id === "purchase-button") {
        await purchaseMineral()
        resetTransientState()
    }
}

export const PurchaseButton = () => {
    document.addEventListener("click", handlePurchaseSubmission)

    return `<button id='purchase-button'>Purchase Mineral</button>`
}
