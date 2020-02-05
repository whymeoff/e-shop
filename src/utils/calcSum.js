module.exports = (items) => {
    items.fullSum = 0
    for (let i = 0; i < items.length; i++) {
        items[i].item.sum = items[i].amount * items[i].item.price
        items.fullSum += items[i].item.sum
    }
}