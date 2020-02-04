module.exports = (cart, goodID) => {
    let k
    for (let i = 0; i < cart.items.length; i++) {
        if (cart.items[i].item.toString() === goodID) {
            k = i;
            break;
        }
    }

    return k
}