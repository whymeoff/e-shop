document.querySelector('#goods-sort').addEventListener('change', async () => {
    const { dataset, value } = document.getElementById('goods-sort')
    window.location.replace(`/goods?manufacturer=${dataset.manufacturer}&sort=${value}`)
})