module.exports = (amount) => {
    let arr = [[0, 0]]
    for (let i = 1; i < Math.ceil(amount / 12); i++) {
        arr.push([i, i*12])
    }
    return arr
}