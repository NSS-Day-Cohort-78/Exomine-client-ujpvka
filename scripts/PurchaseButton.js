import { PurchaseButton } "./TransientState.js"

const handlePurchaseSubmission = (clickEvent) => {
    if (clickEvent.target.id === "purchase-button") {

            savePurchase()
    }
}


export const PurchaseButton = () => {
    document.addEventListener("click", handlePurchaseSubmission)

    return `<button id='purchase-button'>Purchase Mineral</button>`
}