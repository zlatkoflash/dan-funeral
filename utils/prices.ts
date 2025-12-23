export const getformattedPrice = (price: number) => {
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // Use minimumFractionDigits: 0 if you want to hide decimals (.00)
        minimumFractionDigits: 0,
    }).format(price);

    return formattedPrice;

}